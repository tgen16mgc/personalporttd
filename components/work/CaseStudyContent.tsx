import Link from "next/link";
import { ChevronLeft, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Footer } from "@/components/layout/Footer";
import { ProjectGallery } from "@/components/work/ProjectGallery";
import type { Project, StoryBlock, DocumentNode, DocumentTextNode } from "@/content/projects";
import { formatSafeInlineMarkdown, getSafeContentHref, getTrustedFacebookEmbedInfo, getTrustedGoogleDrivePdfEmbedInfo, isExternalHref } from "@/lib/security.mjs";
import { FadeInUp, StaggerContainer, StaggerItem, AnimatedDivider, HeroMetric, SupportMetric, SectionHeading } from "./CaseStudyAnimations";

interface Props { project: Project; prevProject: Project | null; nextProject: Project | null; }

export function CaseStudyContent({ project, prevProject, nextProject }: Props) {
  const color = "#0b0b0a";
  return <article className="case-study">
    <section className="case-hero" id="overview">
      <Link href="/work" className="back-button" aria-label="Back to work" data-cursor="Work"><ChevronLeft size={21} /></Link>
      <div className="case-heading"><p className="eyebrow" data-reveal>{project.industry} / {project.year}</p><h1 data-reveal-heading>{project.title}</h1><p className="case-tagline" data-reveal>{project.tagline}</p></div>
      <dl className="case-meta" data-reveal>{[["Client", project.client], ["Brand", project.brand], ["Role", project.role], ["Year", project.year]].filter(([, value]) => value).map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
      {project.awards && <ul className="case-awards" data-reveal>{project.awards.map((award) => <li key={award}>{award}</li>)}</ul>}
    </section>
    {(project.heroImage || project.thumbnail) && <div className="case-cover">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={project.heroImage || project.thumbnail!} alt={project.title} fetchPriority="high" />
    </div>}
    {project.gallery && project.gallery.length > 0 && <ProjectGallery items={project.gallery} color={color} title={project.title} />}
    {project.story && project.story.length > 0 ? <section id="story" className="case-story">{project.story.map((block, index) => <StoryBlockRenderer key={index} block={block} color={color} index={index} isFirst={index === 0} />)}</section> : <section id="story" className="case-legacy">{[["The Challenge", project.challenge], ["The Insight", project.insight], ["The Approach", project.approach]].filter(([, body]) => body).map(([heading, body]) => <FadeInUp key={heading}><h2>{heading}</h2><p>{body}</p></FadeInUp>)}{project.execution && <div><h2>The Execution</h2><ol>{project.execution.map((item, index) => <li key={index}>{item}</li>)}</ol></div>}</section>}
    {project.results && project.results.length > 0 && <section id="results" className="case-results"><ResultsBlock results={project.results} color={color} /></section>}
    {project.credits && project.credits.length > 0 && <section id="credits" className="case-credits"><CreditsBlock credits={project.credits} color={color} /></section>}
    <nav className="case-navigation" aria-label="More projects">{[prevProject, nextProject].filter((item): item is Project => Boolean(item)).map((item) => <Link href={`/work/${item.slug}`} key={item.slug} data-cursor="View Project">{item.thumbnail &&
      // eslint-disable-next-line @next/next/no-img-element
      <img src={item.thumbnail} alt="" loading="lazy" />}<span><small>{item === prevProject ? "Previous project" : "Next project"}</small><span>{item.title}<ArrowRight size={22} /></span></span></Link>)}</nav>
    <Footer />
  </article>;
}

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
  return formatSafeInlineMarkdown(text);
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
      const href = getSafeContentHref(child.href);
      if (!href) {
        return <span key={i}>{renderInlineChildren(child.children)}</span>;
      }

      return (
        <a
          key={i}
          href={href}
          target={isExternalHref(href) ? "_blank" : undefined}
          rel={isExternalHref(href) ? "noopener noreferrer" : undefined}
        >
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

    case "facebook": {
      if (!block.value.url) return null;
      return (
        <FacebookPostBlock
          url={block.value.url}
          caption={block.value.caption}
          color={color}
        />
      );
    }

    case "pdf": {
      if (!block.value.url) return null;
      return (
        <GoogleDrivePdfBlock
          url={block.value.url}
          title={block.value.title}
          caption={block.value.caption}
          color={color}
        />
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
      const rounded = size === "full" ? "" : "rounded-none overflow-hidden";

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

function FacebookPostBlock({
  url,
  caption,
}: {
  url: string;
  caption: string;
  color: string;
}) {
  const embed = getTrustedFacebookEmbedInfo(url);
  if (!embed) return null;
  const label = embed.type === "video" ? "Facebook video" : "Facebook post";

  return (
    <div className="mx-auto max-w-[42rem] px-4 sm:px-6 lg:px-8 py-10">
      <FadeInUp delay={0.1}>
        <div
          className="rounded-none overflow-hidden ring-1 ring-black/[0.06] bg-white"

        >
          <iframe
            src={embed.url}
            title={caption || label}
            className="block w-full h-[620px] sm:h-[700px]"
            style={{ border: "none" }}
            loading="lazy"
            scrolling="yes"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-[12px] leading-relaxed text-[var(--color-ink-muted)]">
          {caption && <p>{caption}</p>}
          <a
            href={embed.href}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 decoration-black/20 transition-colors hover:text-[var(--color-ink)]"
          >
            View {embed.type === "video" ? "video" : "post"} on Facebook
          </a>
        </div>
      </FadeInUp>
    </div>
  );
}

function GoogleDrivePdfBlock({
  url,
  title,
  caption,
}: {
  url: string;
  title: string;
  caption: string;
  color: string;
}) {
  const embed = getTrustedGoogleDrivePdfEmbedInfo(url);
  if (!embed) return null;
  const label = title || "Google Drive PDF";

  return (
    <div className="mx-auto max-w-[48rem] px-4 sm:px-6 lg:px-8 py-10">
      <FadeInUp delay={0.1}>
        {title && (
          <p className="mb-4 text-[0.8125rem] uppercase tracking-[0.18em] text-[var(--color-ink-muted)]">
            {title}
          </p>
        )}
        <div
          className="rounded-none overflow-hidden ring-1 ring-black/[0.06] bg-white"

        >
          <iframe
            src={embed.url}
            title={label}
            className="block w-full h-[520px] sm:h-[680px]"
            style={{ border: "none" }}
            loading="lazy"
            allow="autoplay"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-[12px] leading-relaxed text-[var(--color-ink-muted)]">
          {caption && <p>{caption}</p>}
          <a
            href={embed.href}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 decoration-black/20 transition-colors hover:text-[var(--color-ink)]"
          >
            Open PDF in Google Drive
          </a>
        </div>
      </FadeInUp>
    </div>
  );
}
