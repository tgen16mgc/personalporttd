"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { revealOnScroll, fadeInUp, staggerContainer } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "fade" | "stagger";
  delay?: number;
  once?: boolean;
}

export function ScrollReveal({
  children,
  className,
  variant = "default",
  delay = 0,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-100px" });

  const variants = {
    default: revealOnScroll,
    fade: fadeInUp,
    stagger: staggerContainer,
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants[variant]}
      custom={delay}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
