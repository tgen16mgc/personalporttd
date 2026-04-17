"use client";

import { LayoutGroup, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { GravityTags } from "@/components/ui/GravityTags";
import { personal } from "@/content/personal";
import { heroContent } from "@/content/pages/home";
import TextRotate from "@/components/ui/TextRotate";

const fluidEase: [number, number, number, number] = [0.32, 0.72, 0, 1];

function splitGreeting(greeting: string): { prefix: string; trailing: string } {
  const match = greeting.match(/^(.*?)([A-Za-z][A-Za-z\s]*?)(\.?)\s*$/);
  if (match && match[1]) return { prefix: match[1], trailing: match[3] ?? "" };
  return { prefix: greeting, trailing: "" };
}

const fallback = splitGreeting(heroContent.greeting);
const greetingPrefix = heroContent.namePrefix ?? fallback.prefix;
const baseAliases =
  heroContent.nameAliases && heroContent.nameAliases.length > 0
    ? heroContent.nameAliases
    : ["Tien"];
const nameAliases = baseAliases;

const pillPalette: { bg: string; text: string }[] = [
  { bg: "var(--color-ink)", text: "var(--color-cream)" },
  { bg: "var(--color-cyan)", text: "var(--color-ink)" },
  { bg: "var(--color-gold)", text: "var(--color-ink)" },
  { bg: "var(--color-pink)", text: "var(--color-cream)" },
];

export function Hero() {
  const [pillIndex, setPillIndex] = useState(0);
  const pill = pillPalette[pillIndex % pillPalette.length];

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

              {/* Name - prefix + rotating pill with layout animation */}
              <LayoutGroup>
                <motion.h1
                  layout
                  className="flex flex-wrap items-center gap-x-[0.25em] gap-y-2 text-[clamp(2.5rem,7vw,5rem)] font-[var(--font-display)] font-light text-[var(--color-ink)] leading-[0.95] tracking-tight mb-6"
                >
                  <motion.span
                    layout
                    transition={{ type: "spring", damping: 30, stiffness: 400 }}
                    initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  >
                    {greetingPrefix.trimEnd()}
                  </motion.span>
                  <motion.div
                    layout
                    transition={{ type: "spring", damping: 30, stiffness: 400 }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={
                      {
                        "--pill-bg": pill.bg,
                        "--pill-text": pill.text,
                      } as React.CSSProperties
                    }
                  >
                    <TextRotate
                      texts={nameAliases}
                      rotationInterval={2400}
                      staggerFrom="last"
                      staggerDuration={0.025}
                      splitBy="characters"
                      transition={{
                        type: "spring",
                        damping: 30,
                        stiffness: 400,
                      }}
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "-120%" }}
                      onNext={() =>
                        setPillIndex((i) => (i + 1) % pillPalette.length)
                      }
                      mainClassName="px-[0.45em] py-[0.08em] rounded-full overflow-hidden leading-[1] justify-center font-medium transition-colors duration-500 ease-out"
                      splitLevelClassName="overflow-hidden pb-[0.12em]"
                      elementLevelClassName="will-change-transform"
                      style={{
                        backgroundColor: "var(--pill-bg)",
                        color: "var(--pill-text)",
                      }}
                    />
                  </motion.div>
                </motion.h1>
              </LayoutGroup>

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

          {/* Right Column: Portrait card */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1, delay: 0.3, ease: fluidEase }}
              className="relative aspect-[3/4] max-w-md mx-auto"
            >
              <div className="absolute inset-0 p-2 rounded-[2rem] bg-white/70 ring-1 ring-black/[0.05] shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
                <div className="relative w-full h-full rounded-[calc(2rem-0.5rem)] overflow-hidden ring-1 ring-black/[0.06] bg-[#F9F8F5]">
                  {personal.portraitImage && (
                    <Image
                      src={personal.portraitImage}
                      alt={`${personal.name} portrait`}
                      fill
                      priority
                      sizes="(max-width: 1024px) 70vw, 28vw"
                      className="object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/10" />
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
