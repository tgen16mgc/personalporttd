"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const fluidEase: [number, number, number, number] = [0.32, 0.72, 0, 1];

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
              <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--color-ink-muted)] mb-6">
                Hanoi, Vietnam · Open to opportunities
              </p>

              {/* Name */}
              <h1 className="text-[clamp(2.5rem,7vw,5rem)] font-[var(--font-display)] font-semibold text-[var(--color-ink)] leading-[0.95] tracking-tight mb-6">
                Hi, I&apos;m Tien.
              </h1>

              {/* The Hook */}
              <p className="text-xl md:text-2xl text-[var(--color-ink-light)] max-w-xl leading-relaxed mb-8">
                I help brands stop talking at people and start talking with them. The kind of work that makes someone say &quot;finally, they get it&quot; not just &quot;oh, another ad.&quot;
              </p>

              {/* Quick context */}
              <div className="space-y-3 text-[var(--color-ink)] mb-10">
                <p>
                  <span className="text-[var(--color-ink-muted)]">Currently →</span>{" "}
                  <span className="font-medium">Account Executive (Hybrid) @ Red Agency JSC</span>
                </p>
                <p>
                  <span className="text-[var(--color-ink-muted)]">Previously →</span>{" "}
                  Creative Executive (Part-time) @ VuVer.vn
                </p>
                <p>
                  <span className="text-[var(--color-ink-muted)]">Education →</span>{" "}
                  Marketing @ NEU, GPA 3.69 (yes, I actually study)
                </p>
              </div>

              {/* Focus + toolkit */}
              <div className="mb-10 space-y-4">
                <div className="flex flex-wrap gap-2">
                  {["F&B", "Hospitality", "Lifestyle", "FMCG"].map((industry) => (
                    <span
                      key={industry}
                      className="inline-block px-3 py-1.5 text-xs font-medium rounded-full bg-[var(--color-cream-dark)] text-[var(--color-ink)] ring-1 ring-black/[0.04]"
                    >
                      {industry}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {["Meta", "TikTok", "AI Tools"].map((tool) => (
                    <span
                      key={tool}
                      className="inline-block px-3 py-1.5 text-xs font-medium rounded-full border border-[var(--color-cream-dark)] bg-white/65 text-[var(--color-ink-muted)]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4">
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
              </div>
            </motion.div>
          </div>

          {/* Right Column: Image */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: fluidEase }}
              className="relative aspect-[3/4] max-w-md mx-auto"
            >
              <div className="absolute inset-0 p-2 rounded-[1.25rem] bg-white/70 ring-1 ring-black/[0.05]">
                <div className="relative w-full h-full rounded-[1rem] overflow-hidden ring-1 ring-black/[0.06] bg-[#F9F8F5]">
                  <Image
                    src="/tien.jpg"
                    alt="Tien Duong portrait"
                    fill
                    priority
                    sizes="(max-width: 1024px) 70vw, 28vw"
                    className="object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/10" />

                  {[
                    { label: "cà phê mode", className: "top-4 left-4 -rotate-6" },
                    { label: "keep it human", className: "top-4 right-5 rotate-3" },
                    { label: "idea in progress", className: "top-14 right-10 -rotate-2" },
                  ].map((tag) => (
                    <span
                      key={tag.label}
                      className={`absolute z-10 px-2.5 py-1 rounded-md text-[10px] font-medium tracking-[0.08em] uppercase bg-white/85 ring-1 ring-black/[0.06] text-[var(--color-ink-light)] ${tag.className}`}
                    >
                      {tag.label}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </Container>

      {/* Bottom trust line */}
      <div className="absolute bottom-8 left-0 right-0">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: fluidEase }}
            className="flex justify-center lg:justify-start"
          >
            <p className="max-w-2xl text-xs md:text-sm text-[var(--color-ink-muted)] bg-white/70 px-4 py-2 rounded-md ring-1 ring-black/[0.05]">
              I focus on insight-led strategy, honest storytelling, and creative work people can actually feel.
            </p>
          </motion.div>
        </Container>
      </div>
    </section>
  );
}
