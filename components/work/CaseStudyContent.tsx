"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Trophy } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Footer } from "@/components/layout/Footer";
import { ProjectGallery } from "@/components/work/ProjectGallery";
import type { Project, StoryBlock, DocumentNode, DocumentTextNode } from "@/content/projects";
import {
  FadeInUp,
  StaggerContainer,
  StaggerItem,
  ParallaxHeroImage,
  AnimatedDivider,
  InsightQuote,
  ResultCard,
  NavCard,
  SectionHeading,
} from "./CaseStudyAnimations";

interface Props {
  project: Project;
  prevProject: Project | null;
  nextProject: Project | null;
}

export function CaseStudyContent({ project, prevProject, nextProject }: Props) {
  return (
    <>
      {/* ═══ HERO — Asymmetric editorial layout ═══ */}
      <section className="pt-32 pb-8 relative overflow-hidden">
        {/* Ambient gradient — project color tinted */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-0 w-[700px] h-[500px] rounded-full opacity-25"
          style={{
            background: `radial-gradient(ellipse at 20% 30%, ${project.color}18, transparent 70%)`,
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 right-0 w-[500px] h-[400px] rounded-full opacity-15"
          style={{
            background: `radial-gradient(ellipse at 80% 70%, ${project.color}10, transparent 70%)`,
          }}
        />

        <Container>
          {/* Back navigation */}
          <FadeInUp>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-sm text-[var(--color-ink-light)] hover:text-[var(--color-ink)] transition-colors mb-12 group cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to work
            </Link>
          </FadeInUp>

          {/* Asymmetric 2-column hero: Left = meta + title, Right = details sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12 lg:gap-16 items-start">
            {/* Left: Main content */}
            <div>
              {/* Meta tags row */}
              <FadeInUp delay={0.05}>
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span
                    className="inline-flex items-center px-3 py-1 text-[10px] uppercase tracking-[0.15em] font-medium rounded-full"
                    style={{
                      backgroundColor: project.color + "12",
                      color: project.color,
                    }}
                  >
                    {project.industry}
                  </span>
                  <span className="text-tag text-[var(--color-ink-muted)]">
                    {project.year}
                  </span>
                </div>
              </FadeInUp>

              {/* Title — editorial weight */}
              <FadeInUp delay={0.1}>
                <h1 className="font-[var(--font-display)] text-[clamp(2.25rem,5.5vw,4rem)] font-light text-[var(--color-ink)] leading-[1.05] tracking-tight mb-6 max-w-3xl">
                  {project.title}
                </h1>
              </FadeInUp>

              {/* Tagline — the emotional hook */}
              <FadeInUp delay={0.15}>
                <p className="text-[clamp(1.125rem,2.5vw,1.5rem)] text-[var(--color-ink-light)] leading-relaxed max-w-2xl">
                  {project.tagline}
                </p>
              </FadeInUp>
            </div>

            {/* Right: Sidebar meta — sticky on desktop */}
            <FadeInUp delay={0.2} className="hidden lg:block">
              <div className="sticky top-32 space-y-6 pt-2">
                {/* Client */}
                <div>
                  <p className="text-tag text-[var(--color-ink-muted)] mb-1.5">
                    Client
                  </p>
                  <p className="text-sm font-medium text-[var(--color-ink)]">
                    {project.client}
                  </p>
                </div>
                {/* Brand */}
                {project.brand && (
                  <div>
                    <p className="text-tag text-[var(--color-ink-muted)] mb-1.5">
                      Brand
                    </p>
                    <p className="text-sm font-medium text-[var(--color-ink)]">
                      {project.brand}
                    </p>
                  </div>
                )}
                {/* Role */}
                <div>
                  <p className="text-tag text-[var(--color-ink-muted)] mb-1.5">
                    Role
                  </p>
                  <p className="text-sm font-medium text-[var(--color-ink)]">
                    {project.role}
                  </p>
                </div>
                {/* Year */}
                <div>
                  <p className="text-tag text-[var(--color-ink-muted)] mb-1.5">
                    Year
                  </p>
                  <p className="text-sm font-medium text-[var(--color-ink)]">
                    {project.year}
                  </p>
                </div>
                {/* Awards inline */}
                {project.awards && project.awards.length > 0 && (
                  <div className="pt-4 border-t border-[var(--color-cream-dark)]">
                    {project.awards.map((award) => (
                      <div
                        key={award}
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-xl ring-1 ring-black/[0.04] mb-2"
                        style={{ backgroundColor: project.color + "06" }}
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
                )}
              </div>
            </FadeInUp>
          </div>

          {/* Mobile-only meta details — horizontal scroll */}
          <FadeInUp delay={0.2} className="lg:hidden mt-8">
            <div className="flex flex-wrap gap-x-8 gap-y-4 pb-8 border-b border-[var(--color-cream-dark)]">
              <div>
                <p className="text-tag text-[var(--color-ink-muted)] mb-1">
                  Client
                </p>
                <p className="text-sm font-medium text-[var(--color-ink)]">
                  {project.client}
                </p>
              </div>
              {project.brand && (
                <div>
                  <p className="text-tag text-[var(--color-ink-muted)] mb-1">
                    Brand
                  </p>
                  <p className="text-sm font-medium text-[var(--color-ink)]">
                    {project.brand}
                  </p>
                </div>
              )}
              <div>
                <p className="text-tag text-[var(--color-ink-muted)] mb-1">
                  Role
                </p>
                <p className="text-sm font-medium text-[var(--color-ink)]">
                  {project.role}
                </p>
              </div>
              <div>
                <p className="text-tag text-[var(--color-ink-muted)] mb-1">
                  Year
                </p>
                <p className="text-sm font-medium text-[var(--color-ink)]">
                  {project.year}
                </p>
              </div>
            </div>
          </FadeInUp>
        </Container>
      </section>

      {/* ═══ HERO IMAGE — Parallax zoom effect ═══ */}
      <section className="pb-16">
        <Container size="wide">
          <FadeInUp delay={0.25}>
            <ParallaxHeroImage
              src={project.heroImage || project.thumbnail}
              alt={project.title}
              color={project.color}
              fallbackTitle={project.title}
            />
          </FadeInUp>
        </Container>
      </section>

      {/* ═══ AWARDS — mobile only (already shown in sidebar on desktop) ═══ */}
      {project.awards && project.awards.length > 0 && (
        <section className="pb-10 lg:hidden">
          <Container>
            <FadeInUp>
              <div className="flex flex-wrap gap-3">
                {project.awards.map((award) => (
                  <div
                    key={award}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full ring-1 ring-black/[0.04]"
                    style={{ backgroundColor: project.color + "08" }}
                  >
                    <Trophy
                      className="w-4 h-4"
                      style={{ color: project.color }}
                    />
                    <span className="text-sm font-medium text-[var(--color-ink)]">
                      {award}
                    </span>
                  </div>
                ))}
              </div>
            </FadeInUp>
          </Container>
        </section>
      )}

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
        <section className="pb-24">
          {project.story.map((block, i) => (
            <StoryBlockRenderer
              key={i}
              block={block}
              color={project.color}
              index={i}
            />
          ))}

          {/* Results after story */}
          {project.results && project.results.length > 0 && (
            <Container size="narrow">
              <AnimatedDivider color={project.color} />
              <div className="pt-12">
                <SectionHeading color={project.color}>
                  The Results
                </SectionHeading>
                <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {project.results.map((result, i) => (
                    <ResultCard
                      key={result.metric}
                      metric={result.metric}
                      value={result.value}
                      color={project.color}
                      index={i}
                    />
                  ))}
                </StaggerContainer>
              </div>
            </Container>
          )}

          {/* Credits */}
          {project.credits && project.credits.length > 0 && (
            <Container size="narrow">
              <div className="pt-16">
                <SectionHeading color={project.color}>Credits</SectionHeading>
                <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                  {project.credits.map((credit) => (
                    <StaggerItem key={credit.role}>
                      <p className="text-tag text-[var(--color-ink-muted)] mb-1">
                        {credit.role}
                      </p>
                      <p className="text-[var(--color-ink)]">{credit.name}</p>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </Container>
          )}
        </section>
      ) : (
        /* Legacy content sections (backward compatible) */
        <section className="pb-24">
          <Container size="narrow">
            <div className="space-y-20">
              {/* Challenge */}
              {project.challenge && (
                <div>
                  <SectionHeading color={project.color}>
                    The Challenge
                  </SectionHeading>
                  <FadeInUp delay={0.1}>
                    <p className="text-lg text-[var(--color-ink-light)] leading-[1.8]">
                      {project.challenge}
                    </p>
                  </FadeInUp>
                </div>
              )}

              {/* Insight */}
              {project.insight && (
                <div>
                  <SectionHeading color={project.color}>
                    The Insight
                  </SectionHeading>
                  <InsightQuote color={project.color}>
                    <p className="text-xl text-[var(--color-ink)] leading-relaxed font-[var(--font-display)] font-light italic">
                      {project.insight}
                    </p>
                  </InsightQuote>
                </div>
              )}

              {/* Approach */}
              {project.approach && (
                <div>
                  <SectionHeading color={project.color}>
                    The Approach
                  </SectionHeading>
                  <FadeInUp delay={0.1}>
                    <p className="text-lg text-[var(--color-ink-light)] leading-[1.8]">
                      {project.approach}
                    </p>
                  </FadeInUp>
                </div>
              )}

              {/* Execution — staggered numbered list */}
              {project.execution && project.execution.length > 0 && (
                <div>
                  <SectionHeading color={project.color}>
                    The Execution
                  </SectionHeading>
                  <StaggerContainer className="space-y-5">
                    {project.execution.map((item, index) => (
                      <StaggerItem key={index}>
                        <div className="flex items-start gap-4 text-lg text-[var(--color-ink-light)] leading-relaxed">
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

              {/* Divider before results */}
              {project.results && project.results.length > 0 && (
                <AnimatedDivider color={project.color} />
              )}

              {/* Results — wider for card breathing room */}
              {project.results && project.results.length > 0 && (
                <div>
                  <SectionHeading color={project.color}>
                    The Results
                  </SectionHeading>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {project.results.map((result, i) => (
                      <ResultCard
                        key={result.metric}
                        metric={result.metric}
                        value={result.value}
                        color={project.color}
                        index={i}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Credits */}
              {project.credits && project.credits.length > 0 && (
                <div>
                  <SectionHeading color={project.color}>Credits</SectionHeading>
                  <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                    {project.credits.map((credit) => (
                      <StaggerItem key={credit.role}>
                        <p className="text-tag text-[var(--color-ink-muted)] mb-1">
                          {credit.role}
                        </p>
                        <p className="text-[var(--color-ink)]">{credit.name}</p>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </div>
              )}
            </div>
          </Container>
        </section>
      )}

      {/* ═══ PROJECT NAVIGATION — Asymmetric with hover lift ═══ */}
      <section className="py-16 relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-black/8 to-transparent"
        />
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prevProject ? (
              <NavCard>
                <Link
                  href={`/work/${prevProject.slug}`}
                  className="group flex items-center gap-4 p-6 rounded-2xl hover:bg-white/70 transition-all duration-500 ring-1 ring-transparent hover:ring-black/[0.04] hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)] cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-full bg-[var(--color-cream-dark)] flex items-center justify-center group-hover:bg-[var(--color-ink)] group-hover:text-white transition-all duration-500 shrink-0">
                    <ArrowLeft className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-tag text-[var(--color-ink-muted)] mb-1">
                      Previous
                    </p>
                    <p className="text-sm font-medium text-[var(--color-ink)] group-hover:text-[var(--color-cyan)] transition-colors truncate">
                      {prevProject.title}
                    </p>
                  </div>
                </Link>
              </NavCard>
            ) : (
              <div />
            )}
            {nextProject ? (
              <NavCard>
                <Link
                  href={`/work/${nextProject.slug}`}
                  className="group flex items-center justify-end gap-4 p-6 rounded-2xl hover:bg-white/70 transition-all duration-500 ring-1 ring-transparent hover:ring-black/[0.04] hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)] text-right cursor-pointer"
                >
                  <div className="min-w-0">
                    <p className="text-tag text-[var(--color-ink-muted)] mb-1">
                      Next
                    </p>
                    <p className="text-sm font-medium text-[var(--color-ink)] group-hover:text-[var(--color-cyan)] transition-colors truncate">
                      {nextProject.title}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[var(--color-cream-dark)] flex items-center justify-center group-hover:bg-[var(--color-ink)] group-hover:text-white transition-all duration-500 shrink-0">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </NavCard>
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
/* ─── Inline markdown → HTML helper ─── */

function parseInlineMarkdown(
  text: string,
): string {
  // 1. Escape HTML (but preserve existing <a> tags)
  const hasRawHtml = /<a\s/.test(text);
  let html = hasRawHtml
    ? text
    : text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

  // 2. Convert markdown links [text](url) → <a>
  html = html.replace(
    /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
  );

  // 4. Convert **bold** → <strong>
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

  // 5. Convert newlines → <br>
  html = html.replace(/\n/g, "<br />");

  return html;
}

/* ─── Document node renderer (for fields.document output) ─── */

function renderDocumentNodes(nodes: DocumentNode[]): React.ReactNode {
  return nodes.map((node, i) => {
    // Paragraph node
    if (node.type === "paragraph" && node.children) {
      return <p key={i}>{renderInlineChildren(node.children)}</p>;
    }
    // Fallback: treat as paragraph if it has children
    if (node.children) {
      return <p key={i}>{renderInlineChildren(node.children)}</p>;
    }
    return null;
  });
}

function renderInlineChildren(
  children: (DocumentNode | DocumentTextNode)[]
): React.ReactNode {
  return children.map((child, i) => {
    // Text node (leaf)
    if ("text" in child) {
      let content: React.ReactNode = child.text;
      if (child.bold) content = <strong key={`b${i}`}>{content}</strong>;
      if (child.italic) content = <em key={`i${i}`}>{content}</em>;
      if (child.strikethrough) content = <s key={`s${i}`}>{content}</s>;
      return <span key={i}>{content}</span>;
    }
    // Link node
    if (child.type === "link" && child.href && child.children) {
      return (
        <a
          key={i}
          href={child.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {renderInlineChildren(child.children)}
        </a>
      );
    }
    // Nested node with children
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
}: {
  block: StoryBlock;
  color: string;
  index: number;
}) {
  switch (block.discriminant) {
    case "heading": {
      if (!block.value.body) return null;
      return (
        <Container size="narrow">
          <div className="pt-14 pb-4">
            <SectionHeading color={color}>{block.value.body}</SectionHeading>
          </div>
        </Container>
      );
    }

    case "text": {
      if (!block.value.body) return null;
      const { body } = block.value;

      // Handle document nodes (from fields.document) vs legacy strings
      const isDocumentNodes = Array.isArray(body);

      return (
        <Container size="narrow">
          <div className="py-3">
            <FadeInUp delay={0.05}>
              {isDocumentNodes ? (
                <div className="text-lg text-[var(--color-ink-light)] leading-[1.8] [&_a]:text-[var(--color-cyan)] [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-[var(--color-cyan)]/30 [&_a:hover]:decoration-[var(--color-cyan)] [&_a]:transition-colors">
                  {renderDocumentNodes(body as DocumentNode[])}
                </div>
              ) : (
                <div
                  className="text-lg text-[var(--color-ink-light)] leading-[1.8] [&_a]:text-[var(--color-cyan)] [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-[var(--color-cyan)]/30 [&_a:hover]:decoration-[var(--color-cyan)] [&_a]:transition-colors"
                  dangerouslySetInnerHTML={{ __html: parseInlineMarkdown(body as string) }}
                />
              )}
            </FadeInUp>
          </div>
        </Container>
      );
    }

    case "quote": {
      if (!block.value.body) return null;
      return (
        <Container size="narrow">
          <div className="py-10">
            <InsightQuote color={color}>
              <p className="text-xl text-[var(--color-ink)] leading-relaxed font-[var(--font-display)] font-light italic">
                {block.value.body}
              </p>
            </InsightQuote>
          </div>
        </Container>
      );
    }

    case "image": {
      if (!block.value.image) return null;
      const sizeMap = {
        content: "max-w-3xl",
        wide: "max-w-7xl",
        full: "max-w-[100vw] px-0",
      };
      const isFullBleed = block.value.size === "full";
      const wrapperClass = sizeMap[block.value.size] || sizeMap.wide;

      return (
        <FadeInUp delay={0.1}>
          <div
            className={`mx-auto py-8 ${isFullBleed ? "" : "px-4 sm:px-6 lg:px-8"} ${wrapperClass}`}
          >
            <div
              className={
                isFullBleed
                  ? ""
                  : "p-1.5 rounded-[1.25rem] bg-black/[0.02] ring-1 ring-black/[0.04]"
              }
            >
              <div
                className={
                  isFullBleed
                    ? ""
                    : "rounded-[calc(1.25rem-0.375rem)] overflow-hidden"
                }
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={block.value.image}
                  alt={block.value.caption || ""}
                  className="w-full h-auto block"
                  loading="lazy"
                />
              </div>
            </div>
            {block.value.caption && (
              <p
                className={`text-[13px] text-[var(--color-ink-muted)] leading-relaxed mt-3 ${isFullBleed ? "px-4 sm:px-6 lg:px-8" : "px-1.5"}`}
              >
                {block.value.caption}
              </p>
            )}
          </div>
        </FadeInUp>
      );
    }

    case "steps": {
      const { heading, items } = block.value;
      if (!items || items.length === 0) return null;
      return (
        <Container size="narrow">
          <div className="py-8">
            {heading && (
              <SectionHeading color={color}>{heading}</SectionHeading>
            )}
            <StaggerContainer className="space-y-5">
              {items.map((step, idx) => (
                <StaggerItem key={idx}>
                  <div className="flex items-start gap-4 text-lg text-[var(--color-ink-light)] leading-relaxed">
                    <span
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium shrink-0 mt-0.5 ring-1"
                      style={{
                        backgroundColor: color + "10",
                        color,
                        borderColor: color + "20",
                      }}
                    >
                      {idx + 1}
                    </span>
                    {step}
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </Container>
      );
    }

    default:
      return null;
  }
}
