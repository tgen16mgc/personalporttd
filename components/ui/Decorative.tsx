"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/* ═══════════════════════════════════════════════════════════════
   FLOATING GRADIENT ORB
   Translucent pill that floats perpetually.
   Adapted for cream/warm editorial backgrounds.
   ═══════════════════════════════════════════════════════════════ */

interface FloatingOrbProps {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  color?: "cyan" | "gold" | "pink" | "cream";
  duration?: number;
}

const orbColors = {
  cyan: "from-[rgba(6,182,212,0.08)] to-transparent",
  gold: "from-[rgba(212,165,116,0.1)] to-transparent",
  pink: "from-[rgba(236,72,153,0.06)] to-transparent",
  cream: "from-[rgba(245,243,239,0.6)] to-transparent",
};

export function FloatingOrb({
  className,
  delay = 0,
  width = 300,
  height = 80,
  rotate = 0,
  color = "cyan",
  duration = 14,
}: FloatingOrbProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -60, rotate: rotate - 10 }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{
        duration: 2,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute pointer-events-none", className)}
      aria-hidden="true"
    >
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ width, height }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r",
            orbColors[color],
            "border border-white/[0.12]",
            "shadow-[0_4px_24px_0_rgba(0,0,0,0.02)]"
          )}
        />
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION DIVIDER
   Gradient line with optional accent dot.
   ═══════════════════════════════════════════════════════════════ */

interface DividerProps {
  className?: string;
  accent?: boolean;
  color?: "cyan" | "gold" | "pink" | "neutral";
}

const dividerColors = {
  cyan: "via-[var(--color-cyan)]/40",
  gold: "via-[var(--color-gold)]/40",
  pink: "via-[var(--color-pink)]/40",
  neutral: "via-black/10",
};

const dotColors = {
  cyan: "bg-[var(--color-cyan)]",
  gold: "bg-[var(--color-gold)]",
  pink: "bg-[var(--color-pink)]",
  neutral: "bg-[var(--color-ink-muted)]",
};

export function Divider({ className, accent = false, color = "neutral" }: DividerProps) {
  return (
    <div className={cn("relative flex items-center", className)} aria-hidden="true">
      <div className={cn("flex-1 h-px bg-gradient-to-r from-transparent", dividerColors[color], "to-transparent")} />
      {accent && (
        <div className={cn("w-1.5 h-1.5 rounded-full mx-4 shrink-0", dotColors[color])} />
      )}
      {accent && (
        <div className={cn("flex-1 h-px bg-gradient-to-r from-transparent", dividerColors[color], "to-transparent")} />
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   DOT GRID BACKGROUND
   Subtle dot pattern for sections.
   ═══════════════════════════════════════════════════════════════ */

interface DotGridProps {
  className?: string;
  spacing?: number;
  opacity?: number;
}

export function DotGrid({ className, spacing = 24, opacity = 0.08 }: DotGridProps) {
  return (
    <div
      className={cn("absolute inset-0 pointer-events-none", className)}
      aria-hidden="true"
      style={{
        backgroundImage: `radial-gradient(circle, rgba(26,26,26,${opacity}) 1px, transparent 1px)`,
        backgroundSize: `${spacing}px ${spacing}px`,
      }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════════
   DECORATIVE CROSS MARK
   Small + mark for editorial accent near section kickers.
   ═══════════════════════════════════════════════════════════════ */

interface CrossMarkProps {
  className?: string;
  size?: number;
  color?: string;
}

export function CrossMark({ className, size = 12, color = "var(--color-ink-muted)" }: CrossMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="none"
      className={cn("inline-block", className)}
      aria-hidden="true"
    >
      <line x1="6" y1="0" x2="6" y2="12" stroke={color} strokeWidth="0.75" />
      <line x1="0" y1="6" x2="12" y2="6" stroke={color} strokeWidth="0.75" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   DECORATIVE RING
   Thin animated ring that slowly rotates, for page accents.
   ═══════════════════════════════════════════════════════════════ */

interface DecorativeRingProps {
  className?: string;
  size?: number;
  color?: string;
}

export function DecorativeRing({ className, size = 200, color = "rgba(6,182,212,0.12)" }: DecorativeRingProps) {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      className={cn("absolute pointer-events-none", className)}
      aria-hidden="true"
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
        <circle cx="100" cy="100" r="95" stroke={color} strokeWidth="0.5" strokeDasharray="4 8" />
        <circle cx="100" cy="100" r="70" stroke={color} strokeWidth="0.3" strokeDasharray="2 12" />
      </svg>
    </motion.div>
  );
}
