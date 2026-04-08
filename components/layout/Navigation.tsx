"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { personal } from "@/content/personal";

const navItems = personal.navigation;

const fluidEase = [0.32, 0.72, 0, 1] as const;

export function Navigation() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0, filter: "blur(10px)" }}
        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
        transition={{ delay: 0.3, duration: 0.8, ease: fluidEase as unknown as [number, number, number, number] }}
        className="fixed top-5 left-1/2 -translate-x-1/2 z-50 hidden sm:block"
      >
        <div className="relative p-1.5 rounded-full bg-white/70 backdrop-blur-xl shadow-[0_8px_34px_rgba(10,10,10,0.08)] ring-1 ring-black/[0.04]">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[var(--color-cyan)]/0 via-[var(--color-cyan)]/8 to-[var(--color-gold)]/10 pointer-events-none" />
          <div className="relative flex items-center gap-0.5 px-1 py-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-5 py-2.5 text-sm font-medium cursor-pointer",
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

      {/* Mobile Navigation */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8, ease: fluidEase as unknown as [number, number, number, number] }}
        className="fixed top-4 right-4 z-50 sm:hidden"
      >
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          className={cn(
            "relative w-11 h-11 rounded-full flex items-center justify-center cursor-pointer",
            "bg-white/80 backdrop-blur-xl ring-1 ring-black/[0.06]",
            "shadow-[0_4px_20px_rgba(10,10,10,0.08)]",
            "transition-all duration-500",
            mobileOpen && "bg-[var(--color-ink)] ring-0"
          )}
        >
          <div className="relative w-4 h-3 flex flex-col justify-between">
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.4, ease: fluidEase as unknown as [number, number, number, number] }}
              className={cn(
                "block w-full h-[1.5px] rounded-full origin-center transition-colors duration-500",
                mobileOpen ? "bg-white" : "bg-[var(--color-ink)]"
              )}
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "block w-full h-[1.5px] rounded-full transition-colors duration-500",
                mobileOpen ? "bg-white" : "bg-[var(--color-ink)]"
              )}
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.4, ease: fluidEase as unknown as [number, number, number, number] }}
              className={cn(
                "block w-full h-[1.5px] rounded-full origin-center transition-colors duration-500",
                mobileOpen ? "bg-white" : "bg-[var(--color-ink)]"
              )}
            />
          </div>
        </button>
      </motion.div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 sm:hidden bg-[var(--color-cream)]/95 backdrop-blur-2xl"
          >
            <div className="flex flex-col items-center justify-center h-full gap-2">
              {navItems.map((item, index) => {
                const isActive = pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href));

                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.08,
                      ease: fluidEase as unknown as [number, number, number, number],
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "block text-4xl font-[var(--font-display)] font-light tracking-tight py-3 px-8 rounded-2xl",
                        "transition-all duration-300 cursor-pointer",
                        isActive
                          ? "text-[var(--color-ink)] bg-white/60"
                          : "text-[var(--color-ink-light)] hover:text-[var(--color-ink)] hover:bg-white/30"
                      )}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.4, ease: fluidEase as unknown as [number, number, number, number] }}
                className="mt-8 text-center"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
                  {personal.location}
                </p>
                <a
                  href={`mailto:${personal.email}`}
                  className="text-sm text-[var(--color-cyan)] mt-2 block"
                >
                  {personal.email}
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
