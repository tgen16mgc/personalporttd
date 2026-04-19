"use client";

import { useEffect, useCallback, useState } from "react";
import { motion, AnimatePresence, useAnimate } from "framer-motion";
import Floating, {
  FloatingElement,
} from "@/components/fancy/image/parallax-floating";
import { afterwork, AfterworkItem } from "@/content/pages/about";

/* ───────────────────────────────────────────────────── 
   Lightbox / Story Slide  
   ───────────────────────────────────────────────────── */

function StoryLightbox({
  item,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}: {
  item: AfterworkItem;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}) {
  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasPrev) onPrev();
      if (e.key === "ArrowRight" && hasNext) onNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onPrev, onNext, hasPrev, hasNext]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-white/92 backdrop-blur-2xl"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-[var(--color-ink)]/5 hover:bg-[var(--color-ink)]/10 flex items-center justify-center transition-colors duration-300 group"
        aria-label="Close"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          className="text-[var(--color-ink)] group-hover:rotate-90 transition-transform duration-300"
        >
          <path d="M1 1L17 17M17 1L1 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {/* Navigation arrows */}
      {hasPrev && (
        <button
          onClick={onPrev}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-[var(--color-ink)]/5 hover:bg-[var(--color-ink)]/10 flex items-center justify-center transition-colors duration-300"
          aria-label="Previous"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-[var(--color-ink)]">
            <path d="M12 1L4 9L12 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
      {hasNext && (
        <button
          onClick={onNext}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-[var(--color-ink)]/5 hover:bg-[var(--color-ink)]/10 flex items-center justify-center transition-colors duration-300"
          aria-label="Next"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-[var(--color-ink)]">
            <path d="M6 1L14 9L6 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      {/* Content */}
      <motion.div
        key={item.id}
        className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-16 max-w-5xl w-full px-6 md:px-16"
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.97 }}
        transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
      >
        {/* Image */}
        <div className="w-full md:w-1/2 flex-shrink-0">
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
            {item.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <span className="text-7xl">{item.emoji}</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Story */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <motion.p
            className="text-[10px] uppercase tracking-[0.25em] text-[var(--color-ink-muted)] mb-3 font-[var(--font-mono)]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
          >
            {item.emoji} Life Outside Work
          </motion.p>

          <motion.h3
            className="text-3xl md:text-4xl font-[var(--font-display)] font-semibold text-[var(--color-ink)] mb-3 leading-tight"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
          >
            {item.title}
          </motion.h3>

          {item.subtitle && (
            <motion.p
              className="text-sm text-[var(--color-ink-muted)] italic mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.28, duration: 0.5 }}
            >
              {item.subtitle}
            </motion.p>
          )}

          <motion.p
            className="text-lg text-[var(--color-ink-light)] leading-relaxed mb-6"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32, duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
          >
            {item.description}
          </motion.p>

          <motion.div
            className="flex items-center gap-2 justify-center md:justify-start"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
          >
            <span className="w-5 h-px bg-[var(--color-cyan)]" />
            <p className="text-sm font-medium text-[var(--color-ink)]">
              {item.takeaway}
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Progress dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {afterwork.map((aw) => (
          <div
            key={aw.id}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              aw.id === item.id
                ? "bg-[var(--color-ink)] w-6"
                : "bg-[var(--color-ink)]/20 w-1.5"
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}

/* ───────────────────────────────────────────────────── 
   Card wrapper for each floating image  
   ───────────────────────────────────────────────────── */

function FloatingCard({
  item,
  index,
  onClick,
}: {
  item: AfterworkItem;
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.div
      className="afterwork-card group cursor-pointer"
      initial={{ opacity: 0 }}
      onClick={onClick}
    >
      <div className="p-1.5 rounded-2xl bg-white/80 ring-1 ring-black/[0.06] shadow-[0_8px_32px_rgba(0,0,0,0.06),0_2px_8px_rgba(0,0,0,0.04)] group-hover:shadow-[0_16px_48px_rgba(0,0,0,0.1),0_4px_16px_rgba(0,0,0,0.06)] transition-all duration-500 group-hover:scale-105">
        <div className="rounded-[calc(1rem-0.25rem)] overflow-hidden relative">
          {item.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${item.bgGradient} flex items-center justify-center`}>
              <span className="text-4xl">{item.emoji}</span>
            </div>
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-3">
            <p className="text-white text-xs font-medium">{item.title}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ───────────────────────────────────────────────────── 
   Main Component  
   ───────────────────────────────────────────────────── */

export default function AfterworkSection() {
  const [scope, animate] = useAnimate();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    animate(
      ".afterwork-card",
      { opacity: [0, 1] },
      { duration: 0.5, delay: 0.15 }
    );
  }, [animate]);

  const openStory = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  const closeStory = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  const prevStory = useCallback(() => {
    setSelectedIndex((prev) =>
      prev !== null && prev > 0 ? prev - 1 : prev
    );
  }, []);

  const nextStory = useCallback(() => {
    setSelectedIndex((prev) =>
      prev !== null && prev < afterwork.length - 1 ? prev + 1 : prev
    );
  }, []);

  // Map afterwork items by id for easy access
  const itemMap: Record<string, { item: AfterworkItem; index: number }> = {};
  afterwork.forEach((item, i) => {
    itemMap[item.id] = { item, index: i };
  });

  return (
    <>
      <section
        className="relative bg-white overflow-hidden"
        style={{ height: "100dvh", minHeight: "700px", maxHeight: "1000px" }}
      >
        <div ref={scope} className="relative w-full h-full">
          {/* Center text */}
          <motion.div
            className="absolute inset-0 z-50 flex flex-col items-center justify-center pointer-events-none"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.8, ease: [0.32, 0.72, 0, 1] }}
          >
            <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--color-ink-muted)] mb-4 font-[var(--font-mono)]">
              Life outside work
            </p>
            <h2 className="font-[var(--font-display)] text-[clamp(3rem,8vw,6.5rem)] font-light text-[var(--color-ink)] leading-[0.95] tracking-[-0.03em] text-center">
              After
              <span className="text-[var(--color-ink-muted)]">·</span>
              work
            </h2>
            <p className="mt-4 text-sm text-[var(--color-ink-muted)] max-w-xs text-center tracking-wide">
              The things that make me better at understanding people.
            </p>
            <motion.p
              className="mt-6 text-[10px] uppercase tracking-[0.2em] text-[var(--color-cyan)]"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              Click any image to explore
            </motion.p>
          </motion.div>

          {/* Floating images - dynamically mapped to up to 12 scattered constellation nodes */}
          <Floating sensitivity={-1} className="overflow-hidden">
            {afterwork.slice(0, 12).map((item, index) => {
              // Reordered for optimal distribution:
              // No matter how many items (1-12), taking the first N items 
              // will naturally scatter them evenly across the viewport.
              const scatterNodes = [
                { top: "4%", left: "4%", depth: 0.5, className: "w-28 h-36 md:w-48 md:h-64", z: 10 },      // 1. Top Left
                { top: "85%", left: "85%", depth: 1, className: "w-24 h-32 md:w-40 md:h-48", z: 20 },     // 2. Bottom Right
                { top: "12%", left: "68%", depth: 1, className: "w-32 h-24 md:w-48 md:h-32", z: 20 },     // 3. Top Right Center
                { top: "82%", left: "8%", depth: 2, className: "w-32 h-40 md:w-48 md:h-60", z: 40 },      // 4. Bottom Left
                { top: "60%", left: "22%", depth: 2.5, className: "w-36 h-28 md:w-56 md:h-40", z: 60 },   // 5. Mid Left Center
                { top: "35%", left: "90%", depth: 1.8, className: "w-24 h-24 md:w-36 md:h-36", z: 30 },   // 6. Mid Right
                { top: "15%", left: "28%", depth: 1.5, className: "w-24 h-24 md:w-36 md:h-36", z: 30 },   // 7. Top Left Center
                { top: "80%", left: "62%", depth: 1.5, className: "w-40 h-28 md:w-64 md:h-44", z: 30 },   // 8. Bottom Right Center
                { top: "40%", left: "2%", depth: 1.2, className: "w-24 h-24 md:w-32 md:h-32", z: 20 },    // 9. Mid Left
                { top: "6%", left: "85%", depth: 2, className: "w-20 h-28 md:w-32 md:h-48", z: 40 },      // 10. Top Right
                { top: "75%", left: "32%", depth: 0.5, className: "w-20 h-20 md:w-32 md:h-32", z: 10 },   // 11. Bottom Left Center
                { top: "48%", left: "75%", depth: 0.8, className: "w-28 h-36 md:w-44 md:h-56", z: 10 },   // 12. Mid Right Center
              ];

              const node = scatterNodes[index];
              if (!node) return null;

              return (
                <FloatingElement
                  key={item.id}
                  depth={node.depth}
                  className={`top-[${node.top}] left-[${node.left}]`} 
                  style={{ top: node.top, left: node.left, zIndex: node.z }}
                >
                  <div className={node.className}>
                    <FloatingCard
                      item={item}
                      index={index}
                      onClick={() => openStory(index)}
                    />
                  </div>
                </FloatingElement>
              );
            })}
          </Floating>

          {/* Subtle radial gradient so center text is readable */}
          <div className="absolute inset-0 pointer-events-none z-20 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.9)_0%,rgba(255,255,255,0.4)_35%,transparent_65%)]" />
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <StoryLightbox
            item={afterwork[selectedIndex]}
            onClose={closeStory}
            onPrev={prevStory}
            onNext={nextStory}
            hasPrev={selectedIndex > 0}
            hasNext={selectedIndex < afterwork.length - 1}
          />
        )}
      </AnimatePresence>
    </>
  );
}
