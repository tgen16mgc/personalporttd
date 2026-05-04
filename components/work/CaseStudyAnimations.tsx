"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValue,
  animate,
  useInView,
} from "framer-motion";
import { useRef, useEffect, useState, type ReactNode } from "react";

/* ─── Three motion tempos (used by role, not uniformly) ─── */
const SPRING = {
  fast: { type: "spring" as const, stiffness: 180, damping: 24 },
  editorial: { type: "spring" as const, stiffness: 100, damping: 20 },
  slow: { type: "spring" as const, stiffness: 60, damping: 14 },
};
const INSTANT = { duration: 0 };

// Back-compat: existing callers referenced a single spring config.
const springConfig = SPRING.editorial;

/* ─── Fade-in-up (legacy, kept for compatibility) ─── */
export function FadeInUp({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={reduced ? INSTANT : { ...springConfig, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Staggered list container ─── */
export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.08,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: reduced ? 0 : staggerDelay },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: springConfig },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Word-by-word mask reveal for hero titles ─── */
export function WordReveal({
  text,
  className = "",
  delay = 0,
  as: Tag = "h1",
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p";
}) {
  const reduced = useReducedMotion();
  const words = text.split(/(\s+)/);

  if (reduced) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={className}>
      {words.map((word, i) =>
        word.trim() === "" ? (
          <span key={i}>{word}</span>
        ) : (
          <span
            key={i}
            className="inline-block align-baseline"
            style={{
              // Clip only the top edge; leave descenders visible below baseline.
              clipPath: "inset(-0.05em -0.1em 0 -0.1em)",
              WebkitClipPath: "inset(-0.05em -0.1em 0 -0.1em)",
              paddingBottom: "0.18em",
              lineHeight: 1,
            }}
          >
            <motion.span
              className="inline-block"
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{
                ...SPRING.slow,
                delay: delay + i * 0.045,
              }}
            >
              {word}
            </motion.span>
          </span>
        ),
      )}
    </Tag>
  );
}

/* ─── Clip-path image reveal with continuous parallax ─── */
export function ClipImageReveal({
  src,
  alt,
  color,
  fallbackTitle,
  aspectClass = "aspect-[21/9] md:aspect-[21/9]",
  parallaxStrength = 6,
}: {
  src?: string | null;
  alt: string;
  color: string;
  fallbackTitle: string;
  aspectClass?: string;
  parallaxStrength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`-${parallaxStrength}%`, `${parallaxStrength}%`],
  );
  const scale = useTransform(scrollYProgress, [0, 1], [1.08, 1.0]);
  const reduced = useReducedMotion();

  // CSS keyframe reveal (not framer-motion whileInView) guarantees the
  // image ends visible even if JS is slow or IntersectionObserver misfires.
  // Parallax transforms on the inner img still use framer-motion scroll.
  return (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-[1.25rem] md:rounded-[1.75rem] will-change-transform ${
        reduced ? "" : "clip-reveal-anim"
      }`}
      style={{ backgroundColor: color + "0A" }}
    >
      <div className={`${aspectClass} overflow-hidden`}>
        {src ? (
          <motion.img
            src={src}
            alt={alt}
            className="w-full h-full object-cover will-change-transform"
            style={reduced ? undefined : { y, scale }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[var(--color-ink-muted)]">
            <span className="text-2xl font-[var(--font-display)]">
              {fallbackTitle}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

/* Back-compat alias */
export const ParallaxHeroImage = ClipImageReveal;

/* ─── Count-up for metric numbers ─── */
function parseNumericValue(value: string): {
  prefix: string;
  num: number | null;
  suffix: string;
} {
  const match = value.match(/^(\D*)([\d,]+\.?\d*)(\D*)$/);
  if (!match) return { prefix: "", num: null, suffix: "" };
  const num = parseFloat(match[2].replace(/,/g, ""));
  if (Number.isNaN(num)) return { prefix: "", num: null, suffix: "" };
  return { prefix: match[1], num, suffix: match[3] };
}

export function CountUp({
  value,
  className = "",
  color,
}: {
  value: string;
  className?: string;
  color?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = useReducedMotion();
  const motionValue = useMotionValue(0);
  const [animated, setAnimated] = useState<number | null>(null);
  const parsed = parseNumericValue(value);
  const { prefix, num, suffix } = parsed;

  useEffect(() => {
    if (!inView || reduced || num === null) return;
    const controls = animate(motionValue, num, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setAnimated(latest),
    });
    return () => controls.stop();
  }, [inView, reduced, num, motionValue]);

  const display =
    animated === null || num === null
      ? value
      : (() => {
          const hasDecimal = /\./.test(String(num));
          const formatted = hasDecimal
            ? animated.toFixed(1)
            : Math.round(animated).toLocaleString();
          return `${prefix}${formatted}${suffix}`;
        })();

  return (
    <span ref={ref} className={className} style={color ? { color } : undefined}>
      {display}
    </span>
  );
}

/* ─── Scroll-reveal divider ─── */
export function AnimatedDivider({ color }: { color: string }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={reduced ? INSTANT : { duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="h-px origin-left"
      style={{
        backgroundImage: `linear-gradient(to right, transparent, ${color}30, transparent)`,
      }}
    />
  );
}

/* ─── Insight quote ─── */
export function InsightQuote({
  children,
  color,
}: {
  children: ReactNode;
  color: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.blockquote
      initial={reduced ? false : { opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={reduced ? INSTANT : { ...SPRING.editorial, delay: 0.1 }}
      className="pl-6 border-l-[3px] ml-0"
      style={{ borderColor: color + "50" }}
    >
      {children}
    </motion.blockquote>
  );
}

/* ─── Result card (kept for back-compat; redesigned layout below) ─── */
export function ResultCard({
  metric,
  value,
  color,
  index,
}: {
  metric: string;
  value: string;
  color: string;
  index: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={reduced ? INSTANT : { ...SPRING.editorial, delay: index * 0.1 }}
      className="group relative p-6 rounded-2xl bg-white ring-1 ring-black/[0.04] shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] transition-shadow duration-500 cursor-default"
    >
      <div
        className="absolute inset-x-0 top-0 h-[2px] rounded-t-2xl opacity-60"
        style={{ backgroundColor: color }}
      />
      <p
        className="text-xl sm:text-2xl font-semibold mb-2 leading-snug tracking-tight"
        style={{ color }}
      >
        {value}
      </p>
      <p className="text-sm text-[var(--color-ink-light)]">{metric}</p>
    </motion.div>
  );
}

/* ─── Hero metric (magazine-style big number) ─── */
export function HeroMetric({
  metric,
  value,
  color,
}: {
  metric: string;
  value: string;
  color: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={reduced ? INSTANT : { ...SPRING.slow }}
      className="py-6"
    >
      <p
        className="font-[var(--font-display)] font-light leading-[0.95] tracking-[-0.02em]"
        style={{
          fontSize: "clamp(4rem, 10vw, 9rem)",
          color,
        }}
      >
        <CountUp value={value} color={color} />
      </p>
      <p className="mt-4 text-base md:text-lg text-[var(--color-ink-light)] max-w-md">
        {metric}
      </p>
    </motion.div>
  );
}

/* ─── Support metric row (inline stats beneath hero metric) ─── */
export function SupportMetric({
  metric,
  value,
  color,
  index,
}: {
  metric: string;
  value: string;
  color: string;
  index: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={
        reduced ? INSTANT : { ...SPRING.editorial, delay: 0.1 + index * 0.08 }
      }
      className="py-5 border-t border-black/[0.08] flex items-baseline justify-between gap-6"
    >
      <span className="text-tag text-[var(--color-ink-muted)] uppercase tracking-[0.18em] text-[11px]">
        {metric}
      </span>
      <span
        className="font-[var(--font-display)] font-light leading-none tracking-tight"
        style={{
          fontSize: "clamp(1.75rem, 3.5vw, 3rem)",
          color,
        }}
      >
        <CountUp value={value} color={color} />
      </span>
    </motion.div>
  );
}

/* ─── Nav card hover effect ─── */
export function NavCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={SPRING.fast}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Section heading ─── */
export function SectionHeading({
  children,
  color,
  eyebrow,
  as = "h2",
}: {
  children: ReactNode;
  color: string;
  eyebrow?: string;
  as?: "h2" | "h3";
}) {
  const Tag = as;
  return (
    <FadeInUp className="mb-8">
      <div className="flex items-center gap-3 mb-3">
        <motion.span
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ ...SPRING.editorial, delay: 0.2 }}
          className="w-2 h-2 rounded-full shrink-0"
          style={{ backgroundColor: color }}
          aria-hidden="true"
        />
        {eyebrow && (
          <span
            className="text-[10px] uppercase tracking-[0.22em] font-medium"
            style={{ color: color }}
          >
            {eyebrow}
          </span>
        )}
      </div>
      <Tag className="font-[var(--font-display)] text-[clamp(1.75rem,3.5vw,2.5rem)] font-light text-[var(--color-ink)] tracking-tight leading-[1.1]">
        {children}
      </Tag>
    </FadeInUp>
  );
}

/* ─── Section progress rail (sticky left dot column with active highlight) ─── */
export function SectionProgressRail({
  sections,
  color,
}: {
  sections: { id: string; label: string }[];
  color: string;
}) {
  const reduced = useReducedMotion();
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? "");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const nodes = sections
      .map((s) => document.getElementById(s.id))
      .filter((n): n is HTMLElement => n !== null);
    if (nodes.length === 0) return;

    const visibility = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibility.set(entry.target.id, entry.intersectionRatio);
        }
        let bestId = sections[0].id;
        let bestRatio = -1;
        for (const [id, ratio] of visibility) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        }
        if (bestRatio > 0) setActiveId(bestId);
      },
      {
        // Center-weighted: trigger when section crosses the viewport middle.
        rootMargin: "-40% 0px -40% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [sections]);

  return (
    <motion.aside
      initial={reduced ? false : { opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6, duration: 0.6 }}
      className="fixed left-6 top-1/2 -translate-y-1/2 z-20 hidden xl:block"
    >
      <ul className="flex flex-col gap-5">
        {sections.map((s) => {
          const isActive = s.id === activeId;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="group flex items-center gap-3 cursor-pointer"
                aria-current={isActive ? "true" : undefined}
              >
                <span
                  className="relative block h-px transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{
                    width: isActive ? "28px" : "14px",
                    backgroundColor: isActive ? color : "rgba(0,0,0,0.25)",
                  }}
                />
                <span
                  className="text-[10px] uppercase tracking-[0.22em] whitespace-nowrap transition-all duration-500"
                  style={{
                    color: isActive ? "var(--color-ink)" : "var(--color-ink-muted)",
                    opacity: isActive ? 1 : 0.55,
                    fontWeight: isActive ? 600 : 500,
                  }}
                >
                  {s.label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </motion.aside>
  );
}

/* ─── Scroll progress tracker hook (returns motion value for a ref) ─── */
export { useScroll as useScrollProgress };
