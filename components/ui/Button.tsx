"use client";

import { forwardRef, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: boolean;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

// Premium spring config for magnetic effect
const springConfig = { damping: 25, stiffness: 400 };

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button(
    { children, href, variant = "primary", size = "md", icon = false, className, onClick, type = "button", disabled = false },
    ref
  ) {
    const buttonRef = useRef<HTMLDivElement>(null);
    
    // Use motion values instead of useState for performance
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
      if (!buttonRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      x.set((e.clientX - rect.left - rect.width / 2) * 0.15);
      y.set((e.clientY - rect.top - rect.height / 2) * 0.15);
    }, [x, y]);

    const handleMouseLeave = useCallback(() => {
      x.set(0);
      y.set(0);
    }, [x, y]);

    const baseStyles = cn(
      "relative inline-flex items-center justify-center gap-2 font-medium cursor-pointer",
      "transition-all duration-500 rounded-full",
      "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
      {
        "bg-gradient-to-b from-[var(--color-ink)] to-[#101010] text-white ring-1 ring-black/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_10px_22px_rgba(10,10,10,0.18)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.28),0_14px_30px_rgba(10,10,10,0.2)] focus-visible:ring-[var(--color-ink)]":
          variant === "primary",
        "bg-white/70 border border-[var(--color-ink)]/15 text-[var(--color-ink)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_8px_20px_rgba(10,10,10,0.08)] hover:bg-[var(--color-ink)] hover:text-white hover:shadow-[0_12px_24px_rgba(10,10,10,0.12)] focus-visible:ring-[var(--color-ink)]":
          variant === "secondary",
        "bg-white/55 text-[var(--color-ink)] border border-black/[0.04] hover:bg-[var(--color-cream-dark)] focus-visible:ring-[var(--color-ink)]":
          variant === "ghost",
        "px-4 py-2 text-sm": size === "sm",
        "px-6 py-3 text-base": size === "md",
        "px-8 py-4 text-lg": size === "lg",
      },
      className
    );

    const content = (
      <>
        {children}
        {icon && (
          /* Button-in-Button: Nested icon wrapper */
          <motion.span
            className={cn(
              "ml-1 w-8 h-8 rounded-full flex items-center justify-center",
              variant === "primary"
                ? "bg-white/20"
                : "bg-[var(--color-cream-dark)] ring-1 ring-black/[0.06]"
            )}
            whileHover={{ x: 3, y: -1, scale: 1.08 }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
          >
            <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
          </motion.span>
        )}
      </>
    );

    if (href) {
      return (
        <div
          ref={buttonRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="inline-block"
        >
          <motion.div
            style={{ x: springX, y: springY }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              href={href}
              className={baseStyles}
              ref={ref as React.Ref<HTMLAnchorElement>}
            >
              {content}
            </Link>
          </motion.div>
        </div>
      );
    }

    return (
      <div
        ref={buttonRef}
        onMouseMove={!disabled ? handleMouseMove : undefined}
        onMouseLeave={!disabled ? handleMouseLeave : undefined}
        className="inline-block"
      >
        <motion.button
          style={{ x: springX, y: springY }}
          whileHover={!disabled ? { scale: 1.02 } : undefined}
          whileTap={!disabled ? { scale: 0.98 } : undefined}
          type={type}
          disabled={disabled}
          onClick={onClick}
          className={cn(baseStyles, disabled && "opacity-50 cursor-not-allowed")}
          ref={ref as React.Ref<HTMLButtonElement>}
        >
          {content}
        </motion.button>
      </div>
    );
  }
);
