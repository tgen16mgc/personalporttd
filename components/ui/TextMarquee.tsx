"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextMarqueeProps {
  text: string;
  repeat?: number;
  duration?: number;
  className?: string;
  strokeColor?: string;
}

export function TextMarquee({
  text,
  repeat = 6,
  duration = 25,
  className,
  strokeColor = "rgba(26,26,26,0.08)",
}: TextMarqueeProps) {
  return (
    <div
      className={cn("relative w-full overflow-hidden py-10 select-none", className)}
      aria-hidden="true"
    >
      <div className="absolute left-0 top-0 bottom-0 w-[15%] bg-gradient-to-r from-[var(--color-cream)] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-[15%] bg-gradient-to-l from-[var(--color-cream)] to-transparent z-10" />

      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration,
        }}
      >
        {Array.from({ length: repeat }).map((_, index) => (
          <span
            key={index}
            className="text-[clamp(4rem,10vw,8rem)] font-[var(--font-display)] font-light tracking-tight px-8 text-transparent"
            style={{
              WebkitTextStroke: `1.5px ${strokeColor}`,
            }}
          >
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
