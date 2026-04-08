import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Footer } from "@/components/layout/Footer";
import { projects, getProjectBySlug } from "@/content/projects";
import { personal } from "@/content/personal";
import { ArrowLeft, ArrowRight, Trophy } from "lucide-react";

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
      return {
        url: `https://www.youtube.com/embed/${shortId || id}`,
        platform: "youtube",
        isVertical: isShort,
      };
    }

    if (u.hostname.includes("vimeo.com")) {
      const id = u.pathname.split("/").filter(Boolean).pop();
      return id
        ? { url: `https://player.vimeo.com/video/${id}`, platform: "vimeo", isVertical: false }
        : null;
    }

    if (u.hostname.includes("tiktok.com")) {
      const segments = u.pathname.split("/").filter(Boolean);
      const videoIdx = segments.indexOf("video");
      const id = videoIdx !== -1 ? segments[videoIdx + 1] : null;
      return id
        ? { url: `https://www.tiktok.com/embed/v2/${id}`, platform: "tiktok", isVertical: true }
        : null;
    }
  } catch { /* invalid URL */ }
  return null;
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} | ${personal.name}`,
    description: project.tagline,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const projectIndex = projects.findIndex((p) => p.slug === slug);
  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const nextProject =
    projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-8 relative overflow-hidden">
        {/* Decorative ambient gradient */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-0 w-[600px] h-[400px] rounded-full opacity-30"
          style={{
            background: `radial-gradient(ellipse at center, ${project.color}15, transparent 70%)`,
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 right-0 w-[400px] h-[300px] rounded-full opacity-20"
          style={{
            background: `radial-gradient(ellipse at center, ${project.color}10, transparent 70%)`,
          }}
        />

        <Container>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm text-[var(--color-ink-light)] hover:text-[var(--color-ink)] transition-colors mb-10 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to work
          </Link>

          {/* Project Meta Row */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span
              className="inline-flex items-center px-3 py-1 text-[10px] uppercase tracking-[0.15em] font-medium rounded-full"
              style={{ backgroundColor: project.color + "15", color: project.color }}
            >
              {project.industry}
            </span>
            <span className="text-tag text-[var(--color-ink-muted)]">{project.year}</span>
            <span className="text-[var(--color-ink-muted)]">·</span>
            <span className="text-sm text-[var(--color-ink-light)]">{project.role}</span>
          </div>

          {/* Title - scaled down from text-display for readability */}
          <h1 className="font-[var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-light text-[var(--color-ink)] leading-[1.1] tracking-tight mb-5 max-w-3xl">
            {project.title}
          </h1>

          {/* Tagline - scaled down, comfortable reading */}
          <p className="text-[clamp(1.125rem,2.5vw,1.5rem)] text-[var(--color-ink-light)] leading-relaxed max-w-2xl mb-10">
            {project.tagline}
          </p>

          {/* Project details sidebar (inline) */}
          <div className="flex flex-wrap gap-x-10 gap-y-4 pb-10 border-b border-[var(--color-cream-dark)]">
            <div>
              <p className="text-tag text-[var(--color-ink-muted)] mb-1">Client</p>
              <p className="text-sm font-medium text-[var(--color-ink)]">{project.client}</p>
            </div>
            {project.brand && (
              <div>
                <p className="text-tag text-[var(--color-ink-muted)] mb-1">Brand</p>
                <p className="text-sm font-medium text-[var(--color-ink)]">{project.brand}</p>
              </div>
            )}
            <div>
              <p className="text-tag text-[var(--color-ink-muted)] mb-1">Role</p>
              <p className="text-sm font-medium text-[var(--color-ink)]">{project.role}</p>
            </div>
            <div>
              <p className="text-tag text-[var(--color-ink-muted)] mb-1">Year</p>
              <p className="text-sm font-medium text-[var(--color-ink)]">{project.year}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Hero Image - Double Bezel */}
      <section className="pb-16">
        <Container size="wide">
          <div className="p-2 rounded-[2rem] bg-black/[0.02] ring-1 ring-black/[0.04]">
            <div
              className="rounded-[calc(2rem-0.5rem)] overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.75),0_6px_24px_rgba(0,0,0,0.05)]"
              style={{ backgroundColor: project.color + "12" }}
            >
              <div className="aspect-[16/9]">
                {(project.heroImage || project.thumbnail) ? (
                  <img
                    src={(project.heroImage || project.thumbnail)!}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[var(--color-ink-muted)]">
                    <span className="text-lg">{project.title}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Gallery */}
      {project.gallery && project.gallery.length > 0 && (() => {
        const items = project.gallery;
        const rows: { items: typeof items; type: "full" | "pair" }[] = [];
        let i = 0;
        while (i < items.length) {
          const cur = items[i];
          const next = items[i + 1];
          if (cur.size === "half" && next?.size === "half") {
            rows.push({ items: [cur, next], type: "pair" });
            i += 2;
          } else {
            rows.push({ items: [cur], type: "full" });
            i += 1;
          }
        }

        return (
          <section className="pb-20">
            <Container size="wide">
              <div className="flex items-center gap-3 mb-10">
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: project.color }}
                  aria-hidden="true"
                />
                <p className="text-tag text-[var(--color-ink-muted)] uppercase tracking-[0.15em]">
                  Project gallery
                </p>
                <span className="flex-1 h-px bg-black/[0.06]" />
                <span className="text-tag text-[var(--color-ink-muted)] tabular-nums">
                  {items.length} {items.length === 1 ? "item" : "items"}
                </span>
              </div>

              <div className="space-y-6">
                {rows.map((row, rowIdx) => (
                  <div
                    key={rowIdx}
                    className={row.type === "pair" ? "grid grid-cols-1 md:grid-cols-2 gap-6" : ""}
                  >
                    {row.items.map((item, itemIdx) => {
                      const isVideo = item.type === "video" || item.type === "videoFile";
                      const embed = item.type === "video" && item.videoUrl
                        ? getEmbedInfo(item.videoUrl)
                        : null;
                      const isVertical = embed?.isVertical ||
                        (item.type === "videoFile" && item.videoFile);

                      return (
                        <div key={`${rowIdx}-${itemIdx}`} className="group">
                          <div className="p-1.5 rounded-[1.5rem] bg-black/[0.02] ring-1 ring-black/[0.04] transition-shadow duration-500 group-hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)]">
                            <div
                              className="rounded-[calc(1.5rem-0.375rem)] overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]"
                              style={{ backgroundColor: project.color + "08" }}
                            >
                              {/* Image */}
                              {item.type === "image" && item.image && (
                                <img
                                  src={item.image}
                                  alt={item.caption || `${project.title} gallery`}
                                  className="w-full h-auto block"
                                  loading="lazy"
                                />
                              )}

                              {/* Video embed (YouTube / Vimeo / TikTok) */}
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
                                const aspectClass = embed.isVertical
                                  ? "aspect-[9/16] max-w-sm mx-auto"
                                  : "aspect-video";
                                return (
                                  <div className={aspectClass}>
                                    <iframe
                                      src={embed.url}
                                      title={item.caption || `${project.title} video`}
                                      className="w-full h-full"
                                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                      allowFullScreen
                                    />
                                  </div>
                                );
                              })()}

                              {/* Direct video file */}
                              {item.type === "videoFile" && item.videoFile && (
                                <div className={isVertical ? "max-w-sm mx-auto" : ""}>
                                  <video
                                    src={item.videoFile}
                                    controls
                                    playsInline
                                    preload="metadata"
                                    className="w-full h-auto block"
                                  >
                                    Your browser does not support the video tag.
                                  </video>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Caption */}
                          {(item.caption || isVideo) && (
                            <div className="flex items-baseline gap-3 mt-3 px-2">
                              {isVideo && embed && (
                                <span
                                  className="shrink-0 inline-flex items-center px-2 py-0.5 text-[10px] uppercase tracking-[0.1em] font-medium rounded-full"
                                  style={{ backgroundColor: project.color + "12", color: project.color }}
                                >
                                  {embed.platform}
                                </span>
                              )}
                              {item.type === "videoFile" && (
                                <span
                                  className="shrink-0 inline-flex items-center px-2 py-0.5 text-[10px] uppercase tracking-[0.1em] font-medium rounded-full"
                                  style={{ backgroundColor: project.color + "12", color: project.color }}
                                >
                                  video
                                </span>
                              )}
                              {item.caption && (
                                <p className="text-sm text-[var(--color-ink-muted)] leading-relaxed">
                                  {item.caption}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </Container>
          </section>
        );
      })()}

      {/* Awards */}
      {project.awards && project.awards.length > 0 && (
        <section className="pb-12">
          <Container>
            <div className="flex flex-wrap gap-3">
              {project.awards.map((award) => (
                <div
                  key={award}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full ring-1 ring-black/[0.04]"
                  style={{ backgroundColor: project.color + "08" }}
                >
                  <Trophy className="w-4 h-4" style={{ color: project.color }} />
                  <span className="text-sm font-medium text-[var(--color-ink)]">
                    {award}
                  </span>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Content Sections */}
      <section className="pb-24">
        <Container>
          <div className="max-w-3xl space-y-16">
            {project.challenge && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: project.color }}
                    aria-hidden="true"
                  />
                  <h2 className="font-[var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-light text-[var(--color-ink)] tracking-tight">
                    The Challenge
                  </h2>
                </div>
                <p className="text-lg text-[var(--color-ink-light)] leading-relaxed pl-5">
                  {project.challenge}
                </p>
              </div>
            )}

            {project.insight && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: project.color }}
                    aria-hidden="true"
                  />
                  <h2 className="font-[var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-light text-[var(--color-ink)] tracking-tight">
                    The Insight
                  </h2>
                </div>
                {/* Insight as a pull quote for visual interest */}
                <blockquote className="pl-5 border-l-2 ml-0" style={{ borderColor: project.color + "40" }}>
                  <p className="text-xl text-[var(--color-ink)] leading-relaxed font-[var(--font-display)] font-light italic">
                    {project.insight}
                  </p>
                </blockquote>
              </div>
            )}

            {project.approach && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: project.color }}
                    aria-hidden="true"
                  />
                  <h2 className="font-[var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-light text-[var(--color-ink)] tracking-tight">
                    The Approach
                  </h2>
                </div>
                <p className="text-lg text-[var(--color-ink-light)] leading-relaxed pl-5">
                  {project.approach}
                </p>
              </div>
            )}

            {project.execution && project.execution.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: project.color }}
                    aria-hidden="true"
                  />
                  <h2 className="font-[var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-light text-[var(--color-ink)] tracking-tight">
                    The Execution
                  </h2>
                </div>
                <ul className="space-y-4 pl-5">
                  {project.execution.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-4 text-lg text-[var(--color-ink-light)] leading-relaxed"
                    >
                      <span
                        className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium shrink-0 mt-0.5 ring-1"
                        style={{
                          backgroundColor: project.color + "10",
                          color: project.color,
                          borderColor: project.color + "20",
                        }}
                      >
                        {index + 1}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Decorative divider before results */}
            {project.results && project.results.length > 0 && (
              <div
                aria-hidden="true"
                className="h-px bg-gradient-to-r from-transparent to-transparent"
                style={{
                  backgroundImage: `linear-gradient(to right, transparent, ${project.color}30, transparent)`,
                }}
              />
            )}

            {project.results && project.results.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: project.color }}
                    aria-hidden="true"
                  />
                  <h2 className="font-[var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-light text-[var(--color-ink)] tracking-tight">
                    The Results
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {project.results.map((result) => (
                    <div
                      key={result.metric}
                      className="p-5 rounded-2xl bg-white ring-1 ring-black/[0.04] shadow-[0_2px_12px_rgba(0,0,0,0.03)]"
                    >
                      <p
                        className="text-lg sm:text-xl font-semibold mb-1.5 leading-snug"
                        style={{ color: project.color }}
                      >
                        {result.value}
                      </p>
                      <p className="text-sm text-[var(--color-ink-light)]">
                        {result.metric}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {project.credits && project.credits.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: project.color }}
                    aria-hidden="true"
                  />
                  <h2 className="font-[var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-light text-[var(--color-ink)] tracking-tight">
                    Credits
                  </h2>
                </div>
                <div className="grid grid-cols-2 gap-4 pl-5">
                  {project.credits.map((credit) => (
                    <div key={credit.role}>
                      <p className="text-tag text-[var(--color-ink-muted)] mb-1">
                        {credit.role}
                      </p>
                      <p className="text-[var(--color-ink)]">{credit.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Project Navigation */}
      <section className="py-12 relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-black/8 to-transparent"
        />
        <Container>
          <div className="grid grid-cols-2 gap-4">
            {prevProject ? (
              <Link
                href={`/work/${prevProject.slug}`}
                className="group flex items-center gap-4 p-5 rounded-2xl hover:bg-white/70 transition-all duration-500 ring-1 ring-transparent hover:ring-black/[0.04] hover:shadow-[0_4px_16px_rgba(0,0,0,0.04)]"
              >
                <div className="w-9 h-9 rounded-full bg-[var(--color-cream-dark)] flex items-center justify-center group-hover:bg-[var(--color-ink)] group-hover:text-white transition-all duration-500 shrink-0">
                  <ArrowLeft className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-tag text-[var(--color-ink-muted)] mb-0.5">Previous</p>
                  <p className="text-sm font-medium text-[var(--color-ink)] group-hover:text-[var(--color-cyan)] transition-colors truncate">
                    {prevProject.title}
                  </p>
                </div>
              </Link>
            ) : (
              <div />
            )}
            {nextProject ? (
              <Link
                href={`/work/${nextProject.slug}`}
                className="group flex items-center justify-end gap-4 p-5 rounded-2xl hover:bg-white/70 transition-all duration-500 ring-1 ring-transparent hover:ring-black/[0.04] hover:shadow-[0_4px_16px_rgba(0,0,0,0.04)] text-right"
              >
                <div className="min-w-0">
                  <p className="text-tag text-[var(--color-ink-muted)] mb-0.5">Next</p>
                  <p className="text-sm font-medium text-[var(--color-ink)] group-hover:text-[var(--color-cyan)] transition-colors truncate">
                    {nextProject.title}
                  </p>
                </div>
                <div className="w-9 h-9 rounded-full bg-[var(--color-cream-dark)] flex items-center justify-center group-hover:bg-[var(--color-ink)] group-hover:text-white transition-all duration-500 shrink-0">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </Container>
      </section>

      <Footer />
    </>
  );
}
