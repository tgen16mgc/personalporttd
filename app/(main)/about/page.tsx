"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Footer } from "@/components/layout/Footer";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Camera } from "lucide-react";
import { CrossMark } from "@/components/ui/Decorative";
import { personal } from "@/content/personal";
import {
  aboutHero,
  experience,
  recognition,
  education,
  personalBits,
  philosophy,
  afterwork,
  aboutCta,
} from "@/content/pages/about";

const isSafeHref = (href: string) => {
  if (href.startsWith("//")) return false;
  if (href.startsWith("/") || href.startsWith("#")) return true;
  try {
    const { protocol } = new URL(href);
    return protocol === "http:" || protocol === "https:" || protocol === "mailto:" || protocol === "tel:";
  } catch {
    return false;
  }
};

export default function AboutPage() {
  return (
    <>
      {/* Hero - Big Photo + Simple Intro */}
      <section className="pt-40 pb-24 relative overflow-hidden">
        <Container>
          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
              {/* Left: Photo */}
              <motion.div 
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                className="lg:col-span-5"
              >
                <div className="p-2 rounded-[2rem] bg-white/60 ring-1 ring-black/[0.04]">
                  <div className="rounded-[calc(2rem-0.5rem)] bg-[var(--color-cream-dark)] aspect-[3/4] overflow-hidden relative">
                    {personal.aboutImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={personal.aboutImage} alt={personal.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-[var(--color-ink-muted)]">
                        <div className="text-center">
                          <Camera className="w-16 h-16 mx-auto mb-3 text-[var(--color-ink-muted)]" strokeWidth={1} />
                          <p className="text-sm">Upload via Keystatic</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Right: Content */}
              <motion.div 
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="lg:col-span-7"
              >
                {/* The Hook */}
                <motion.h1 
                  variants={fadeInUp}
                  className="text-[clamp(1.75rem,4vw,2.5rem)] font-[var(--font-display)] font-semibold text-[var(--color-ink)] mb-8 leading-[1.2]"
                >
                  {aboutHero.hookLine}<br />
                  <span className="text-[var(--color-ink-light)]">
                    {aboutHero.hookSub}
                  </span>
                </motion.h1>

                {/* Experience */}
                <motion.div variants={fadeInUp} className="mb-8">
                  <p className="text-sm font-medium text-[var(--color-ink)] uppercase tracking-wider mb-4">Experience</p>
                  <ul className="space-y-2 text-[var(--color-ink-light)]">
                    {experience.map((exp) => (
                      <li key={`${exp.company}-${exp.period}`}>
                        <span className="text-[var(--color-ink)] font-medium">{exp.company}</span>, {exp.location} | {exp.role} ({exp.period})
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Personal bits */}
                <motion.div variants={fadeInUp} className="mb-8 space-y-2">
                  {personalBits.map((bit) => (
                    <p
                      key={`${bit.text}-${bit.linkHref ?? "nolink"}-${bit.linkText ?? ""}-${bit.suffix ?? ""}`}
                      className="text-[var(--color-ink-light)]"
                    >
                      &bull;{" "}
                      {bit.text}
                      {bit.linkText && bit.linkHref && isSafeHref(bit.linkHref) ? (
                        <>
                          {" "}
                          {bit.linkHref.startsWith("/") ? (
                            <Link href={bit.linkHref} className="text-[var(--color-cyan)] hover:underline">
                              {bit.linkText}
                            </Link>
                          ) : (
                            <a
                              href={bit.linkHref}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[var(--color-cyan)] hover:underline"
                            >
                              {bit.linkText}
                            </a>
                          )}
                          {bit.suffix}
                        </>
                      ) : null}
                      {(!bit.linkText || !bit.linkHref) && bit.suffix ? bit.suffix : null}
                    </p>
                  ))}
                </motion.div>

                {/* Recognition */}
                <motion.div variants={fadeInUp} className="mb-8">
                  <p className="text-sm font-medium text-[var(--color-ink)] uppercase tracking-wider mb-4">Recognition</p>
                  <ul className="space-y-2 text-[var(--color-ink-light)]">
                    {recognition.map((award) => (
                      <li key={`${award.title}-${award.event}`}>
                        <span className="text-[var(--color-ink)] font-medium">{award.title}</span>, {award.event}{"note" in award && award.note ? ` (${award.note})` : ""}
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Education */}
                <motion.div variants={fadeInUp}>
                  <p className="text-sm font-medium text-[var(--color-ink)] uppercase tracking-wider mb-4">Education</p>
                  <p className="text-[var(--color-ink-light)]">
                    <span className="text-[var(--color-ink)] font-medium">{education.school}</span> | {education.location}<br />
                    {education.degree} (Graduating {education.graduation}) | GPA {education.gpa}
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* How I Think About Marketing */}
      <section className="py-24 bg-white relative">
        <Container>
          <ScrollReveal>
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <CrossMark size={10} color="var(--color-cyan)" />
                <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-cyan)]">
                  My Approach
                </p>
              </div>
              <h2 className="text-3xl font-[var(--font-display)] font-semibold text-[var(--color-ink)] mb-8 leading-tight">
                {philosophy.approach.headline}<br />
                <span className="text-[var(--color-ink-light)]">{philosophy.approach.subheadline}</span>
              </h2>

              <div className="space-y-8 text-lg text-[var(--color-ink-light)] leading-relaxed">
                {philosophy.approach.paragraphs.map((p, i) => (
                  <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
                ))}
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* What Shapes How I Work */}
      <section className="py-24">
        <Container>
          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-5xl">
              {philosophy.reflections.map((reflection) => (
                <div key={reflection.title}>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-ink-muted)] mb-4">
                    {reflection.kicker}
                  </p>
                  <h2 className="text-2xl font-[var(--font-display)] font-semibold text-[var(--color-ink)] mb-6">
                    {reflection.title}
                  </h2>
                  <div className="space-y-4 text-[var(--color-ink-light)]">
                    {reflection.paragraphs.map((p, i) => (
                      <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Afterwork Section - Visual Grid Layout */}
      <section className="py-24 bg-white relative">
        <Container>
          <ScrollReveal>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-ink-muted)] mb-4">
                  Life outside work
                </p>
                <h2 className="text-3xl font-[var(--font-display)] font-semibold text-[var(--color-ink)]">
                  After&middot;work
                </h2>
              </div>
              <p className="text-[var(--color-ink-light)] max-w-md mt-4 lg:mt-0">
                The things that make me better at understanding people.
              </p>
            </div>

            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {afterwork.map((item) => (
                <motion.div
                  key={item.id}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className={item.size === "large" ? "lg:col-span-2 group" : "group"}
                >
                  <div className="p-2 rounded-[2rem] bg-white/60 ring-1 ring-black/[0.04] h-full">
                    <div className={`rounded-[calc(2rem-0.5rem)] bg-gradient-to-br ${item.bgGradient} ${item.size === "large" ? "p-8" : "p-6"} h-full ${item.size === "large" ? "flex flex-col md:flex-row gap-6" : ""}`}>
                      {item.size === "large" && item.id !== "cat" && (
                        <>
                          <div className="w-full md:w-48 h-48 md:h-auto rounded-xl bg-white/60 flex-shrink-0 overflow-hidden">
                            {item.image ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-[var(--color-ink-muted)]">
                                <span className="text-4xl">{item.emoji}</span>
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-medium text-[var(--color-ink)] mb-3">{item.title}</h3>
                            {item.subtitle && <p className="text-sm text-[var(--color-ink-muted)] mb-4">{item.subtitle}</p>}
                            <p className="text-[var(--color-ink-light)] leading-relaxed mb-4">{item.description}</p>
                            <p className="text-sm text-[var(--color-ink)] font-medium">&darr; {item.takeaway}</p>
                          </div>
                        </>
                      )}

                      {item.size === "large" && item.id === "cat" && (
                        <>
                          <div className="flex-1 order-2 md:order-1">
                            <h3 className="text-xl font-medium text-[var(--color-ink)] mb-3">{item.title}</h3>
                            {item.subtitle && <p className="text-sm text-[var(--color-ink-muted)] mb-4">{item.subtitle}</p>}
                            <p className="text-[var(--color-ink-light)] leading-relaxed mb-4">{item.description}</p>
                            <p className="text-sm text-[var(--color-ink)] font-medium">&darr; {item.takeaway}</p>
                          </div>
                          <div className="w-full md:w-48 h-48 md:h-auto rounded-xl bg-white/60 flex-shrink-0 overflow-hidden order-1 md:order-2">
                            {item.image ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-[var(--color-ink-muted)]">
                                <span className="text-4xl">{item.emoji}</span>
                              </div>
                            )}
                          </div>
                        </>
                      )}

                      {item.size === "small" && (
                        <>
                          <div className="w-full h-32 rounded-xl bg-white/60 mb-4 overflow-hidden">
                            {item.image ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-[var(--color-ink-muted)]">
                                <span className="text-3xl">{item.emoji}</span>
                              </div>
                            )}
                          </div>
                          <h3 className="text-lg font-medium text-[var(--color-ink)] mb-2">{item.title}</h3>
                          <p className="text-sm text-[var(--color-ink-light)] leading-relaxed mb-3">{item.description}</p>
                          <p className="text-xs text-[var(--color-ink)] font-medium">&darr; {item.takeaway}</p>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Philosophy */}
      <section className="py-24">
        <Container>
          <ScrollReveal>
            <div className="max-w-3xl">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-ink-muted)] mb-6">
                What Guides Me
              </p>
              <blockquote className="text-[clamp(1.5rem,4vw,2.5rem)] font-[var(--font-display)] text-[var(--color-ink)] leading-[1.3]">
                {philosophy.quote}
              </blockquote>
              <div className="mt-10 pt-8 border-t border-[var(--color-cream-dark)] space-y-4">
                <p className="text-[var(--color-ink-light)]" dangerouslySetInnerHTML={{ __html: philosophy.mission }} />
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Let's Talk - Soft editorial CTA */}
      <section className="py-32 relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[var(--color-cream)] via-[var(--color-cream-dark)] to-[var(--color-cream)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.06),transparent_70%)]"
        />
        <Container>
          <ScrollReveal>
            <div className="max-w-2xl mx-auto text-center relative">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-cyan)] mb-4">
                {aboutCta.kicker}
              </p>
              <h2 className="font-[var(--font-display)] text-4xl sm:text-5xl mb-6 text-[var(--color-ink)]">
                {aboutCta.headline}
              </h2>
              <p className="text-[var(--color-ink-light)] mb-10">
                {aboutCta.body}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a
                  href={`mailto:${personal.email}`}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-b from-[var(--color-ink)] to-[#101010] text-white rounded-full font-medium ring-1 ring-black/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_10px_22px_rgba(10,10,10,0.18)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.28),0_14px_30px_rgba(10,10,10,0.2)] transition-all duration-500 active:scale-[0.98]"
                >
                  {personal.email}
                </a>
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/70 border border-[var(--color-ink)]/15 text-[var(--color-ink)] rounded-full font-medium shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_8px_20px_rgba(10,10,10,0.08)] hover:bg-[var(--color-ink)] hover:text-white hover:shadow-[0_12px_24px_rgba(10,10,10,0.12)] transition-all duration-500 active:scale-[0.98]"
                >
                  Connect on LinkedIn
                </a>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <Footer />
    </>
  );
}
