"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

// Premium cubic-bezier
const fluidEase = [0.32, 0.72, 0, 1] as const;

export function Navigation() {
  const pathname = usePathname();

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0, filter: "blur(10px)" }}
      animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
      transition={{ delay: 0.3, duration: 0.8, ease: fluidEase as unknown as [number, number, number, number] }}
      className="fixed top-5 left-1/2 -translate-x-1/2 z-50"
    >
      {/* Fluid Island: Outer shell */}
      <div className="relative p-1.5 rounded-full bg-white/70 backdrop-blur-xl shadow-[0_8px_34px_rgba(10,10,10,0.08)] ring-1 ring-black/[0.04]">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[var(--color-cyan)]/0 via-[var(--color-cyan)]/8 to-[var(--color-gold)]/10 pointer-events-none" />
        {/* Inner pill */}
        <div className="relative flex items-center gap-0.5 px-1 py-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== "/" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-medium cursor-pointer",
                  "rounded-full transition-colors duration-500",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-cyan)] focus-visible:ring-offset-2",
                  isActive
                    ? "text-[var(--color-ink)]"
                    : "text-[var(--color-ink-light)] hover:text-[var(--color-ink)]"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_6px_16px_rgba(0,0,0,0.06)] bg-gradient-to-b from-white to-white/85 ring-1 ring-black/[0.04] -z-10"
                    transition={{ duration: 0.5, ease: fluidEase }}
                  />
                )}
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
}
