"use client";

import { useState, useRef, useEffect } from "react";
import type { GalleryItem } from "@/content/projects";

type EmbedResult = {
  url: string;
  platform: "youtube" | "vimeo" | "tiktok";
  isVertical: boolean;
};

function getEmbedInfo(url: string): EmbedResult | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtube.com") || u.hostname.includes("youtu.be")) {
      const id = u.hostname.includes("youtu.be")
        ? u.pathname.slice(1)
        : u.searchParams.get("v");
      if (!id) return null;
      const isShort = u.pathname.startsWith("/shorts/");
      const shortId = isShort ? u.pathname.split("/shorts/")[1] : null;
      return { url: `https://www.youtube.com/embed/${shortId || id}`, platform: "youtube", isVertical: isShort };
    }
    if (u.hostname.includes("vimeo.com")) {
      const id = u.pathname.split("/").filter(Boolean).pop();
      return id ? { url: `https://player.vimeo.com/video/${id}`, platform: "vimeo", isVertical: false } : null;
    }
    if (u.hostname.includes("tiktok.com")) {
      const segments = u.pathname.split("/").filter(Boolean);
      const videoIdx = segments.indexOf("video");
      const id = videoIdx !== -1 ? segments[videoIdx + 1] : null;
      return id ? { url: `https://www.tiktok.com/embed/v2/${id}`, platform: "tiktok", isVertical: true } : null;
    }
  } catch { /* invalid URL */ }
  return null;
}

interface Props {
  items: GalleryItem[];
  color: string;
  title: string;
}

const COLLAPSED_HEIGHT = 280;

export function ProjectGallery({ items, color, title }: Props) {
  const [expanded, setExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [overflows, setOverflows] = useState(false);
  const [naturalHeight, setNaturalHeight] = useState(0);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const measure = () => {
      const sh = el.scrollHeight;
      setNaturalHeight(sh);
      setOverflows(sh > COLLAPSED_HEIGHT + 40);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [items]);

  const rows: { items: GalleryItem[]; type: "full" | "pair" }[] = [];
  let idx = 0;
  while (idx < items.length) {
    const cur = items[idx];
    const next = items[idx + 1];
    if (cur.size === "half" && next?.size === "half") {
      rows.push({ items: [cur, next], type: "pair" });
      idx += 2;
    } else {
      rows.push({ items: [cur], type: "full" });
      idx += 1;
    }
  }

  const isCollapsed = overflows && !expanded;

  return (
    <section className="pb-20">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center gap-3 mb-8">
          <span
            className="w-1.5 h-1.5 rounded-full shrink-0"
            style={{ backgroundColor: color }}
            aria-hidden="true"
          />
          <p className="text-[10px] text-[var(--color-ink-muted)] uppercase tracking-[0.15em] font-medium">
            Project gallery
          </p>
          <span className="flex-1 h-px bg-black/[0.06]" />
          <span className="text-[10px] text-[var(--color-ink-muted)] tabular-nums font-medium tracking-wide">
            {items.length}
          </span>
        </div>

        <div className="relative">
          <div
            ref={contentRef}
            className="space-y-5 overflow-hidden"
            style={{
              maxHeight: isCollapsed ? `${COLLAPSED_HEIGHT}px` : `${naturalHeight || 99999}px`,
              transition: "max-height 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            {rows.map((row, rowIdx) => (
              <div
                key={rowIdx}
                className={row.type === "pair" ? "grid grid-cols-1 md:grid-cols-2 gap-5" : ""}
              >
                {row.items.map((item, itemIdx) => (
                  <GalleryCard
                    key={`${rowIdx}-${itemIdx}`}
                    item={item}
                    color={color}
                    title={title}
                  />
                ))}
              </div>
            ))}
          </div>

          {overflows && !expanded && (
            <>
              <div
                className="absolute bottom-0 inset-x-0 h-40 pointer-events-none"
                style={{
                  background: "linear-gradient(to bottom, transparent, var(--color-cream) 80%)",
                }}
              />
              <div className="absolute bottom-0 inset-x-0 flex justify-center pb-1">
                <button
                  onClick={() => setExpanded(true)}
                  className="group relative inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-white ring-1 ring-black/[0.06] shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-all duration-500 active:scale-[0.97]"
                >
                  <span className="text-sm font-medium text-[var(--color-ink)]">
                    Show all {items.length} items
                  </span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="opacity-40 group-hover:opacity-100 transition-opacity">
                    <path d="M7 2v10M3 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </>
          )}

          {expanded && overflows && (
            <div className="flex justify-center pt-8">
              <button
                onClick={() => {
                  setExpanded(false);
                  contentRef.current?.parentElement?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] ring-1 ring-black/[0.04] hover:ring-black/[0.08] transition-all duration-500"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="rotate-180">
                  <path d="M7 2v10M3 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Collapse
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function GalleryCard({ item, color, title }: { item: GalleryItem; color: string; title: string }) {
  const isVideo = item.type === "video" || item.type === "videoFile";
  const embed = item.type === "video" && item.videoUrl ? getEmbedInfo(item.videoUrl) : null;

  return (
    <div className="group">
      <div className="p-1.5 rounded-[1.25rem] bg-black/[0.02] ring-1 ring-black/[0.04] transition-shadow duration-500 group-hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)]">
        <div
          className="rounded-[calc(1.25rem-0.375rem)] overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]"
          style={{ backgroundColor: color + "08" }}
        >
          {item.type === "image" && item.image && (
            <img
              src={item.image}
              alt={item.caption || `${title} gallery`}
              className="w-full h-auto block"
              loading="lazy"
            />
          )}

          {item.type === "video" && item.videoUrl && (() => {
            if (!embed) {
              return (
                <div className="aspect-video flex items-center justify-center text-[var(--color-ink-muted)]">
                  <a
                    href={item.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full ring-1 ring-black/[0.06] text-sm hover:bg-black/[0.02] transition-colors"
                  >
                    <span className="text-base">&#9654;</span>
                    Watch video
                  </a>
                </div>
              );
            }
            const aspectClass = embed.isVertical ? "aspect-[9/16] max-w-sm mx-auto" : "aspect-video";
            return (
              <div className={aspectClass}>
                <iframe
                  src={embed.url}
                  title={item.caption || `${title} video`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            );
          })()}

          {item.type === "videoFile" && item.videoFile && (
            <video
              src={item.videoFile}
              controls
              playsInline
              preload="metadata"
              className="w-full h-auto block"
            >
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      </div>

      {(item.caption || isVideo) && (
        <div className="flex items-baseline gap-2.5 mt-2.5 px-1.5">
          {isVideo && (embed || item.type === "videoFile") && (
            <span
              className="shrink-0 inline-flex items-center px-2 py-0.5 text-[9px] uppercase tracking-[0.12em] font-semibold rounded-full"
              style={{ backgroundColor: color + "12", color }}
            >
              {embed?.platform || "video"}
            </span>
          )}
          {item.caption && (
            <p className="text-[13px] text-[var(--color-ink-muted)] leading-relaxed">
              {item.caption}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
