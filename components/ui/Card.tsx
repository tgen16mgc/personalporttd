"use client";

import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  bezel?: boolean;
}

const fluidEase: [number, number, number, number] = [0.32, 0.72, 0, 1];

export function Card({
  children,
  className,
  hover = true,
  bezel = true,
}: CardProps) {
  const outerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!outerRef.current) return;
    const rect = outerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    outerRef.current.style.setProperty("--spotlight-x", `${x}px`);
    outerRef.current.style.setProperty("--spotlight-y", `${y}px`);
  }, []);

  return (
    <div
      ref={outerRef}
      onMouseMove={handleMouseMove}
      className={cn(
        "group/card card-spotlight p-1.5 rounded-[2rem] bg-black/[0.02] ring-1 ring-black/[0.04]",
        "transition-[box-shadow] duration-700",
        "hover:shadow-[0_16px_40px_rgba(6,182,212,0.08)]",
        bezel && "backdrop-blur-sm"
      )}
    >
      <motion.div
        whileHover={hover ? { y: -6, scale: 1.015 } : undefined}
        transition={{ duration: 0.7, ease: fluidEase }}
        className={cn(
          "relative bg-white rounded-[calc(2rem-0.375rem)] overflow-hidden cursor-pointer",
          "ring-1 ring-black/[0.03]",
          "shadow-[inset_0_1px_1px_rgba(255,255,255,0.75),0_6px_24px_rgba(0,0,0,0.05)]",
          "group-hover/card:shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),0_14px_34px_rgba(0,0,0,0.08)]",
          className
        )}
      >
        {children}
      </motion.div>
    </div>
  );
}

interface CardImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: "video" | "square" | "portrait";
}

export function CardImage({
  src,
  alt,
  className,
  aspectRatio = "video",
}: CardImageProps) {
  const ratioClasses = {
    video: "aspect-video",
    square: "aspect-square",
    portrait: "aspect-[3/4]",
  };

  return (
    <div className={cn("relative overflow-hidden", ratioClasses[aspectRatio], className)}>
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover will-change-transform"
        whileHover={{ scale: 1.08 }}
        transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
      />
    </div>
  );
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function CardContent({ children, className }: CardContentProps) {
  return <div className={cn("p-6", className)}>{children}</div>;
}

interface CardTagProps {
  children: React.ReactNode;
  color?: string;
}

export function CardTag({ children, color }: CardTagProps) {
  return (
    <span
      className="inline-flex items-center px-3 py-1 text-[10px] uppercase tracking-[0.15em] font-medium rounded-full"
      style={{
        backgroundColor: color ? `${color}12` : "var(--color-cream-dark)",
        color: color || "var(--color-ink-light)",
      }}
    >
      {children}
    </span>
  );
}
