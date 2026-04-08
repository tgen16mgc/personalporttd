"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { GravityTags } from "@/components/ui/GravityTags";
import { personal } from "@/content/personal";
import { heroContent } from "@/content/pages/home";

const fluidEase: [number, number, number, number] = [0.32, 0.72, 0, 1];

const nameChars = heroContent.greeting.split("");

export function Hero() {
  return (
    <section className="min-h-[100dvh] relative overflow-hidden">
      <Container>
        <div className="min-h-[100dvh] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-32 pb-20">
          
          {/* Left Column: Text + Info */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: fluidEase }}
            >
              {/* Eyebrow */}
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: fluidEase }}
                className="text-[11px] uppercase tracking-[0.2em] text-[var(--color-ink-muted)] mb-6"
              >
                {personal.location} · {personal.status}
              </motion.p>

              {/* Name - Character-by-character reveal */}
              <h1 className="text-[clamp(2.5rem,7vw,5rem)] font-[var(--font-display)] font-light text-[var(--color-ink)] leading-[0.95] tracking-tight mb-6">
                {nameChars.map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{
                      duration: 0.5,
                      delay: 0.2 + i * 0.04,
                      ease: fluidEase,
                    }}
                    className="inline-block"
                    style={char === " " ? { width: "0.25em" } : undefined}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </h1>

              {/* The Hook */}
              <motion.p
                initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, delay: 0.7, ease: fluidEase }}
                className="text-xl md:text-2xl text-[var(--color-ink-light)] max-w-xl leading-relaxed mb-8"
              >
                {heroContent.tagline}
              </motion.p>

              {/* Quick context */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.9, ease: fluidEase }}
                className="space-y-3 text-[var(--color-ink)] mb-10"
              >
                <p>
                  <span className="text-[var(--color-ink-muted)]">Currently →</span>{" "}
                  <span className="font-medium">{heroContent.currentRole.label} @ {heroContent.currentRole.company}</span>
                </p>
                <p>
                  <span className="text-[var(--color-ink-muted)]">Previously →</span>{" "}
                  {heroContent.previousRole.label} @ {heroContent.previousRole.company}
                </p>
                <p>
                  <span className="text-[var(--color-ink-muted)]">Education →</span>{" "}
                  {heroContent.education}
                </p>
              </motion.div>

              {/* Focus + toolkit */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.0, ease: fluidEase }}
                className="mb-10 space-y-4"
              >
                <div className="flex flex-wrap gap-2">
                  {heroContent.industries.map((industry) => (
                    <span
                      key={industry}
                      className="inline-block px-3 py-1.5 text-xs font-medium rounded-full bg-[var(--color-cream-dark)] text-[var(--color-ink)] ring-1 ring-black/[0.04]"
                    >
                      {industry}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {heroContent.tools.map((tool) => (
                    <span
                      key={tool}
                      className="inline-block px-3 py-1.5 text-xs font-medium rounded-full border border-[var(--color-cream-dark)] bg-white/65 text-[var(--color-ink-muted)]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.1, ease: fluidEase }}
                className="flex flex-wrap gap-4"
              >
                <Link href="/work">
                  <Button variant="primary" size="lg">
                    View case studies
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="secondary" size="lg">
                    Get in touch
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column: Image */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1, delay: 0.3, ease: fluidEase }}
              className="relative aspect-[3/4] max-w-md mx-auto"
            >
              <div className="absolute inset-0 p-2 rounded-[2rem] bg-white/70 ring-1 ring-black/[0.05] shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
                <div className="relative w-full h-full rounded-[calc(2rem-0.5rem)] overflow-hidden ring-1 ring-black/[0.06] bg-[#F9F8F5]">
                  <Image
                    src={personal.portraitImage}
                    alt={`${personal.name} portrait`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 70vw, 28vw"
                    className="object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/10" />

                  {/* Gravity-based falling tags */}
                  <GravityTags />
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </Container>

    </section>
  );
}
