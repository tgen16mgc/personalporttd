"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode } from "react";

/* ─── Shared spring config (design-taste-frontend: stiffness 100, damping 20) ─── */
const springConfig = { type: "spring" as const, stiffness: 100, damping: 20 };
const instantConfig = { duration: 0 };

/* ─── Fade-in-up animation for section reveals ─── */
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
      transition={reduced ? instantConfig : { ...springConfig, delay }}
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
          transition: {
            staggerChildren: reduced ? 0 : staggerDelay,
          },
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

/* ─── Parallax hero image with subtle zoom-on-scroll ─── */
export function ParallaxHeroImage({
  src,
  alt,
  color,
  fallbackTitle,
}: {
  src?: string | null;
  alt: string;
  color: string;
  fallbackTitle: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1.06, 1]);
  const y = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);

  const reduced = useReducedMotion();

  return (
    <div ref={ref} className="relative overflow-hidden">
      {/* Double bezel container */}
      <div className="p-2 rounded-[2rem] bg-black/[0.02] ring-1 ring-black/[0.04]">
        <div
          className="rounded-[calc(2rem-0.5rem)] overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.75),0_6px_24px_rgba(0,0,0,0.05)]"
          style={{ backgroundColor: color + "0A" }}
        >
          <div className="aspect-[16/9] overflow-hidden">
            {src ? (
              <motion.img
                src={src}
                alt={alt}
                className="w-full h-full object-cover will-change-transform"
                style={reduced ? undefined : { scale, y }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[var(--color-ink-muted)]">
                <span className="text-lg font-[var(--font-display)]">
                  {fallbackTitle}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Scroll-reveal line for section dividers ─── */
export function AnimatedDivider({ color }: { color: string }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={reduced ? instantConfig : { duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="h-px origin-left"
      style={{
        backgroundImage: `linear-gradient(to right, transparent, ${color}30, transparent)`,
      }}
    />
  );
}

/* ─── Insight quote with dramatic entrance ─── */
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
      transition={reduced ? instantConfig : { ...springConfig, delay: 0.1 }}
      className="pl-6 border-l-[3px] ml-0"
      style={{ borderColor: color + "50" }}
    >
      {children}
    </motion.blockquote>
  );
}

/* ─── Result card with scale-in ─── */
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
      transition={reduced ? instantConfig : { ...springConfig, delay: index * 0.1 }}
      className="group relative p-6 rounded-2xl bg-white ring-1 ring-black/[0.04] shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] transition-shadow duration-500 cursor-default"
    >
      {/* Accent top-border glow */}
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
      transition={springConfig}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Section heading with accent dot animation ─── */
export function SectionHeading({
  children,
  color,
  as = "h2",
}: {
  children: ReactNode;
  color: string;
  as?: "h2" | "h3";
}) {
  const Tag = as;
  return (
    <FadeInUp className="flex items-center gap-3 mb-6">
      <motion.span
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ ...springConfig, delay: 0.2 }}
        className="w-2 h-2 rounded-full shrink-0"
        style={{ backgroundColor: color }}
        aria-hidden="true"
      />
      <Tag className="font-[var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-light text-[var(--color-ink)] tracking-tight">
        {children}
      </Tag>
    </FadeInUp>
  );
}
