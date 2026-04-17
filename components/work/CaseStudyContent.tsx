"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Trophy } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Footer } from "@/components/layout/Footer";
import { ProjectGallery } from "@/components/work/ProjectGallery";
import type { Project, StoryBlock, DocumentNode, DocumentTextNode } from "@/content/projects";
import {
  FadeInUp,
  StaggerContainer,
  StaggerItem,
  ClipImageReveal,
  AnimatedDivider,
  InsightQuote,
  HeroMetric,
  SupportMetric,
  NavCard,
  SectionHeading,
  WordReveal,
  SectionProgressRail,
} from "./CaseStudyAnimations";

interface Props {
  project: Project;
  prevProject: Project | null;
  nextProject: Project | null;
}

export function CaseStudyContent({ project, prevProject, nextProject }: Props) {
  const pageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ["start start", "end end"],
  });
  const reduced = useReducedMotion();

  // Parallax for hero title block (subtle drift on scroll)
  const heroTextY = useTransform(scrollYProgress, [0, 0.2], ["0%", "-12%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);

  const sections = [
    { id: "overview", label: "Overview" },
    ...(project.story && project.story.length > 0 ? [{ id: "story", label: "Story" }] : []),
    ...(project.results && project.results.length > 0 ? [{ id: "results", label: "Results" }] : []),
    ...(project.credits && project.credits.length > 0 ? [{ id: "credits", label: "Credits" }] : []),
  ];

  return (
    <div ref={pageRef}>
      <SectionProgressRail sections={sections} color={project.color} />

      {/* ═══ HERO — full-bleed editorial type ═══ */}
      <section
        id="overview"
        className="pt-28 md:pt-36 pb-6 relative overflow-hidden"
      >
        {/* Ambient wash */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 -left-32 w-[900px] h-[700px] rounded-full opacity-30 blur-3xl"
          style={{
            background: `radial-gradient(ellipse at center, ${project.color}1f, transparent 70%)`,
          }}
        />

        <Container size="wide">
          {/* Back navigation */}
          <FadeInUp>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-sm text-[var(--color-ink-light)] hover:text-[var(--color-ink)] transition-colors mb-14 group cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to work
            </Link>
          </FadeInUp>

          <motion.div
            style={reduced ? undefined : { y: heroTextY, opacity: heroOpacity }}
            className="will-change-transform"
          >
            {/* Meta strip above title */}
            <FadeInUp delay={0.05}>
              <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-5 gap-y-2 text-[10px] sm:text-[11px] uppercase tracking-[0.18em] sm:tracking-[0.22em] text-[var(--color-ink-muted)] mb-8 sm:mb-10">
                <span
                  className="inline-flex items-center px-2.5 py-1 rounded-full font-medium"
                  style={{
                    backgroundColor: project.color + "14",
                    color: project.color,
                  }}
                >
                  {project.industry}
                </span>
                <span className="opacity-30" aria-hidden="true">·</span>
                <span>{project.year}</span>
                <span className="hidden sm:inline opacity-30" aria-hidden="true">·</span>
                <span className="hidden sm:inline">{project.role}</span>
                {project.client && (
                  <>
                    <span className="hidden md:inline opacity-30" aria-hidden="true">·</span>
                    <span className="hidden md:inline">{project.client}</span>
                  </>
                )}
                {project.brand && (
                  <>
                    <span className="hidden md:inline opacity-30" aria-hidden="true">·</span>
                    <span className="hidden md:inline">{project.brand}</span>
                  </>
                )}
              </div>
            </FadeInUp>

            {/* Oversized display title — word-by-word reveal */}
            <WordReveal
              text={project.title}
              className="font-[var(--font-display)] font-light text-[var(--color-ink)] leading-[0.95] tracking-[-0.025em] mb-10 max-w-[14ch] text-[clamp(3rem,8.5vw,7.5rem)]"
              delay={0.15}
            />

            {/* Tagline — editorial measure */}
            <FadeInUp delay={0.35}>
              <p className="text-[clamp(1.0625rem,2vw,1.5rem)] text-[var(--color-ink-light)] leading-[1.5] max-w-[46ch]">
                {project.tagline}
              </p>
            </FadeInUp>

            {/* Compact meta for smaller viewports (role/client/brand hidden from strip) */}
            <FadeInUp delay={0.4}>
              <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 md:hidden">
                <div className="sm:hidden">
                  <dt className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-ink-muted)] mb-1">
                    Role
                  </dt>
                  <dd className="text-sm text-[var(--color-ink)]">{project.role}</dd>
                </div>
                {project.client && (
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-ink-muted)] mb-1">
                      Client
                    </dt>
                    <dd className="text-sm text-[var(--color-ink)]">{project.client}</dd>
                  </div>
                )}
                {project.brand && (
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-ink-muted)] mb-1">
                      Brand
                    </dt>
                    <dd className="text-sm text-[var(--color-ink)]">{project.brand}</dd>
                  </div>
                )}
              </dl>
            </FadeInUp>

            {/* Awards inline */}
            {project.awards && project.awards.length > 0 && (
              <FadeInUp delay={0.45}>
                <div className="flex flex-wrap gap-3 mt-10">
                  {project.awards.map((award) => (
                    <div
                      key={award}
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full ring-1 ring-black/[0.06]"
                      style={{ backgroundColor: project.color + "0a" }}
                    >
                      <Trophy
                        className="w-3.5 h-3.5"
                        style={{ color: project.color }}
                      />
                      <span className="text-xs font-medium text-[var(--color-ink)]">
                        {award}
                      </span>
                    </div>
                  ))}
                </div>
              </FadeInUp>
            )}
          </motion.div>
        </Container>
      </section>

      {/* ═══ HERO IMAGE — 4:5 mobile, 21:9 desktop, clip-path reveal ═══ */}
      <section className="pb-16 md:pb-28">
        <Container size="wide">
          <ClipImageReveal
            src={project.heroImage || project.thumbnail}
            alt={project.title}
            color={project.color}
            fallbackTitle={project.title}
            aspectClass="aspect-[4/5] md:aspect-[21/9]"
          />
        </Container>
      </section>

      {/* ═══ GALLERY ═══ */}
      {project.gallery && project.gallery.length > 0 && (
        <ProjectGallery
          items={project.gallery}
          color={project.color}
          title={project.title}
        />
      )}

      {/* ═══ EDITORIAL STORY BLOCKS / LEGACY CONTENT ═══ */}
      {project.story && project.story.length > 0 ? (
        <section id="story" className="pb-24">
          {(() => {
            let headingCount = 0;
            return project.story.map((block, i) => {
              let chapterNumber: number | undefined;
              if (block.discriminant === "heading" && block.value.body) {
                headingCount += 1;
                chapterNumber = headingCount;
              }
              return (
                <StoryBlockRenderer
                  key={i}
                  block={block}
                  color={project.color}
                  index={i}
                  chapterNumber={chapterNumber}
                  isFirst={i === 0}
                  isFirstTextBlock={
                    block.discriminant === "text" &&
                    !project.story!.slice(0, i).some((b) => b.discriminant === "text")
                  }
                />
              );
            });
          })()}

          {/* Results after story */}
          {project.results && project.results.length > 0 && (
            <section id="results" className="pt-12">
              <ResultsBlock results={project.results} color={project.color} />
            </section>
          )}

          {/* Credits */}
          {project.credits && project.credits.length > 0 && (
            <section id="credits">
              <CreditsBlock credits={project.credits} color={project.color} />
            </section>
          )}
        </section>
      ) : (
        /* Legacy content sections (backward compatible) */
        <section className="pb-24">
          <Container size="narrow">
            <div className="space-y-24">
              {project.challenge && (
                <div>
                  <SectionHeading color={project.color} eyebrow="01 — Challenge">
                    The Challenge
                  </SectionHeading>
                  <FadeInUp delay={0.1}>
                    <p className="text-[1.1875rem] text-[var(--color-ink-light)] leading-[1.75] max-w-[66ch]">
                      {project.challenge}
                    </p>
                  </FadeInUp>
                </div>
              )}

              {project.insight && (
                <div>
                  <SectionHeading color={project.color} eyebrow="02 — Insight">
                    The Insight
                  </SectionHeading>
                  <InsightQuote color={project.color}>
                    <p className="text-[clamp(1.375rem,2vw,1.75rem)] text-[var(--color-ink)] leading-[1.35] font-[var(--font-display)] font-light italic">
                      {project.insight}
                    </p>
                  </InsightQuote>
                </div>
              )}

              {project.approach && (
                <div>
                  <SectionHeading color={project.color} eyebrow="03 — Approach">
                    The Approach
                  </SectionHeading>
                  <FadeInUp delay={0.1}>
                    <p className="text-[1.1875rem] text-[var(--color-ink-light)] leading-[1.75] max-w-[66ch]">
                      {project.approach}
                    </p>
                  </FadeInUp>
                </div>
              )}

              {project.execution && project.execution.length > 0 && (
                <div>
                  <SectionHeading color={project.color} eyebrow="04 — Execution">
                    The Execution
                  </SectionHeading>
                  <StaggerContainer className="space-y-6 max-w-[66ch]">
                    {project.execution.map((item, index) => (
                      <StaggerItem key={index}>
                        <div className="flex items-start gap-4 text-[1.0625rem] text-[var(--color-ink-light)] leading-relaxed">
                          <span
                            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium shrink-0 mt-0.5 ring-1"
                            style={{
                              backgroundColor: project.color + "10",
                              color: project.color,
                              borderColor: project.color + "20",
                            }}
                          >
                            {index + 1}
                          </span>
                          <span>{item}</span>
                        </div>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </div>
              )}

              {project.results && project.results.length > 0 && (
                <AnimatedDivider color={project.color} />
              )}
            </div>
          </Container>

          {project.results && project.results.length > 0 && (
            <section id="results" className="pt-16">
              <ResultsBlock results={project.results} color={project.color} />
            </section>
          )}

          {project.credits && project.credits.length > 0 && (
            <section id="credits">
              <CreditsBlock credits={project.credits} color={project.color} />
            </section>
          )}
        </section>
      )}

      {/* ═══ PROJECT NAVIGATION — cinematic thumbnail scrim preview ═══ */}
      <section className="pt-24 pb-20 relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent"
        />
        <Container size="wide">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {prevProject ? (
              <CinematicNav project={prevProject} direction="prev" />
            ) : (
              <div className="hidden md:block" />
            )}
            {nextProject ? (
              <CinematicNav project={nextProject} direction="next" />
            ) : (
              <div className="hidden md:block" />
            )}
          </div>
        </Container>
      </section>

      <Footer />
    </div>
  );
}

/* ─── Cinematic prev/next with thumbnail scrim ─── */
function CinematicNav({
  project,
  direction,
}: {
  project: Project;
  direction: "prev" | "next";
}) {
  const isPrev = direction === "prev";
  const img = project.thumbnail || project.heroImage;

  return (
    <NavCard>
      <Link
        href={`/work/${project.slug}`}
        className="group relative block overflow-hidden rounded-[1.5rem] ring-1 ring-black/[0.05] bg-[var(--color-cream-dark)]"
      >
        {/* Thumbnail background */}
        <div className="aspect-[16/9] md:aspect-[3/1] overflow-hidden">
          {img ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={img}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
            />
          ) : (
            <div
              className="w-full h-full"
              style={{ backgroundColor: project.color + "18" }}
            />
          )}
        </div>

        {/* Color scrim */}
        <div
          aria-hidden="true"
          className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-70"
          style={{
            background: `linear-gradient(${isPrev ? "90deg" : "270deg"}, ${project.color}d0, ${project.color}60 55%, transparent)`,
            opacity: 0.85,
          }}
        />

        {/* Content */}
        <div
          className={`absolute inset-0 p-6 md:p-8 flex flex-col justify-between ${
            isPrev ? "items-start" : "items-end text-right"
          }`}
        >
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-white/90">
            {isPrev && <ArrowLeft className="w-3.5 h-3.5" />}
            <span>{isPrev ? "Previous" : "Next"}</span>
            {!isPrev && <ArrowRight className="w-3.5 h-3.5" />}
          </div>
          <div className={isPrev ? "" : "w-full flex flex-col items-end"}>
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/70 mb-1">
              {project.industry}
            </p>
            <p className="font-[var(--font-display)] text-[clamp(1.5rem,3vw,2.25rem)] font-light text-white leading-[1.05] tracking-tight max-w-[18ch]">
              {project.title}
            </p>
          </div>
        </div>
      </Link>
    </NavCard>
  );
}

/* ─── Results — magazine numbers ─── */
function ResultsBlock({
  results,
  color,
}: {
  results: { metric: string; value: string }[];
  color: string;
}) {
  if (results.length === 0) return null;
  const [hero, ...support] = results;

  return (
    <Container size="narrow">
      <AnimatedDivider color={color} />
      <div className="pt-14">
        <SectionHeading color={color} eyebrow="Results">
          The Results
        </SectionHeading>
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-x-16 gap-y-6 items-start">
          <HeroMetric metric={hero.metric} value={hero.value} color={color} />
          {support.length > 0 && (
            <div>
              {support.map((r, i) => (
                <SupportMetric
                  key={r.metric}
                  metric={r.metric}
                  value={r.value}
                  color={color}
                  index={i}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}

/* ─── Credits ─── */
function CreditsBlock({
  credits,
  color,
}: {
  credits: { role: string; name: string }[];
  color: string;
}) {
  return (
    <Container size="narrow">
      <div className="pt-20">
        <SectionHeading color={color} eyebrow="Credits">
          Credits
        </SectionHeading>
        <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-7">
          {credits.map((credit) => (
            <StaggerItem key={credit.role}>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-ink-muted)] mb-1.5">
                {credit.role}
              </p>
              <p className="text-[var(--color-ink)] text-sm">{credit.name}</p>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </Container>
  );
}

/* ─── Inline markdown → HTML helper ─── */
function parseInlineMarkdown(text: string): string {
  const hasRawHtml = /<a\s/.test(text);
  let html = hasRawHtml
    ? text
    : text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
  html = html.replace(
    /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>',
  );
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\n/g, "<br />");
  return html;
}

function renderDocumentNodes(nodes: DocumentNode[]): React.ReactNode {
  return nodes.map((node, i) => {
    if (node.type === "paragraph" && node.children) {
      return <p key={i}>{renderInlineChildren(node.children)}</p>;
    }
    if (node.children) {
      return <p key={i}>{renderInlineChildren(node.children)}</p>;
    }
    return null;
  });
}

function renderInlineChildren(
  children: (DocumentNode | DocumentTextNode)[],
): React.ReactNode {
  return children.map((child, i) => {
    if ("text" in child) {
      let content: React.ReactNode = child.text;
      if (child.bold) content = <strong key={`b${i}`}>{content}</strong>;
      if (child.italic) content = <em key={`i${i}`}>{content}</em>;
      if (child.strikethrough) content = <s key={`s${i}`}>{content}</s>;
      return <span key={i}>{content}</span>;
    }
    if (child.type === "link" && child.href && child.children) {
      return (
        <a key={i} href={child.href} target="_blank" rel="noopener noreferrer">
          {renderInlineChildren(child.children)}
        </a>
      );
    }
    if (child.children) {
      return <span key={i}>{renderInlineChildren(child.children)}</span>;
    }
    return null;
  });
}

/* ─── Editorial Story Block Renderer ─── */
function StoryBlockRenderer({
  block,
  color,
  index,
  chapterNumber,
  isFirst,
  isFirstTextBlock,
}: {
  block: StoryBlock;
  color: string;
  index: number;
  chapterNumber?: number;
  isFirst?: boolean;
  isFirstTextBlock?: boolean;
}) {
  void index;
  switch (block.discriminant) {
    case "heading": {
      if (!block.value.body) return null;
      return (
        <div className={`mx-auto max-w-[44rem] px-4 sm:px-6 lg:px-8 ${isFirst ? "pt-6" : "pt-16"} pb-4`}>
          <SectionHeading
            color={color}
            eyebrow={
              chapterNumber !== undefined
                ? `Chapter ${String(chapterNumber).padStart(2, "0")}`
                : undefined
            }
          >
            {block.value.body}
          </SectionHeading>
        </div>
      );
    }

    case "text": {
      if (!block.value.body) return null;
      const { body } = block.value;
      const isDocumentNodes = Array.isArray(body);

      return (
        <div className="mx-auto max-w-[42rem] px-4 sm:px-6 lg:px-8 py-3">
          <FadeInUp delay={0.05}>
            {isDocumentNodes ? (
              <div
                className={`text-[1.1875rem] text-[var(--color-ink-light)] leading-[1.75] [&_a]:text-[var(--color-cyan)] [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-[var(--color-cyan)]/30 [&_a:hover]:decoration-[var(--color-cyan)] [&_a]:transition-colors [&_p]:mb-5 [&_p:last-child]:mb-0 ${
                  isFirstTextBlock ? "first-paragraph-dropcap" : ""
                }`}
                style={
                  isFirstTextBlock
                    ? ({ "--dropcap-color": color } as React.CSSProperties)
                    : undefined
                }
              >
                {renderDocumentNodes(body as DocumentNode[])}
              </div>
            ) : (
              <div
                className={`text-[1.1875rem] text-[var(--color-ink-light)] leading-[1.75] [&_a]:text-[var(--color-cyan)] [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-[var(--color-cyan)]/30 [&_a:hover]:decoration-[var(--color-cyan)] [&_a]:transition-colors ${
                  isFirstTextBlock ? "first-paragraph-dropcap" : ""
                }`}
                style={
                  isFirstTextBlock
                    ? ({ "--dropcap-color": color } as React.CSSProperties)
                    : undefined
                }
                dangerouslySetInnerHTML={{
                  __html: parseInlineMarkdown(body as string),
                }}
              />
            )}
          </FadeInUp>
        </div>
      );
    }

    case "quote": {
      if (!block.value.body) return null;
      return (
        <div className="relative mx-auto max-w-[48rem] px-4 sm:px-6 lg:px-8 py-10 sm:py-14 overflow-hidden sm:overflow-visible">
          <FadeInUp>
            <div
              aria-hidden="true"
              className="absolute left-2 sm:-left-6 lg:-left-10 top-6 sm:top-14 font-[var(--font-display)] font-light select-none pointer-events-none leading-none"
              style={{
                fontSize: "clamp(4rem, 10vw, 9rem)",
                color: color,
                opacity: 0.14,
              }}
            >
              &ldquo;
            </div>
            <blockquote
              className="relative pl-5 sm:pl-6 border-l-[3px] ml-0"
              style={{ borderColor: color + "50" }}
            >
              <p
                className="text-[clamp(1.25rem,2.5vw,1.875rem)] text-[var(--color-ink)] leading-[1.35] font-[var(--font-display)] font-light italic"
              >
                {block.value.body}
              </p>
            </blockquote>
          </FadeInUp>
        </div>
      );
    }

    case "image": {
      if (!block.value.image) return null;
      const size = block.value.size;
      const wrapperClass =
        size === "full"
          ? "w-full px-0"
          : size === "wide"
            ? "mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"
            : "mx-auto max-w-[42rem] px-4 sm:px-6 lg:px-8";
      const rounded = size === "full" ? "" : "rounded-[1.25rem] overflow-hidden";

      return (
        <div className={`${wrapperClass} py-10`}>
          <FadeInUp delay={0.1}>
            <div className={rounded}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={block.value.image}
                alt={block.value.caption || ""}
                className="w-full h-auto block"
                loading="lazy"
              />
            </div>
            {block.value.caption && (
              <p
                className={`text-[12px] text-[var(--color-ink-muted)] leading-relaxed mt-4 ${
                  size === "full" ? "px-4 sm:px-6 lg:px-8 max-w-[42rem] mx-auto" : ""
                }`}
              >
                {block.value.caption}
              </p>
            )}
          </FadeInUp>
        </div>
      );
    }

    case "steps": {
      const { heading, items } = block.value;
      if (!items || items.length === 0) return null;
      return (
        <div className="mx-auto max-w-[42rem] px-4 sm:px-6 lg:px-8 py-10">
          {heading && (
            <SectionHeading color={color} eyebrow="Playbook">
              {heading}
            </SectionHeading>
          )}
          <StaggerContainer className="space-y-6">
            {items.map((step, idx) => (
              <StaggerItem key={idx}>
                <div className="flex items-start gap-5 text-[1.0625rem] text-[var(--color-ink-light)] leading-[1.7]">
                  <span
                    className="font-[var(--font-display)] font-light leading-none shrink-0 mt-1 tabular-nums"
                    style={{
                      color,
                      fontSize: "1.75rem",
                      opacity: 0.85,
                    }}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="pt-1.5">{step}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      );
    }

    default:
      return null;
  }
}
