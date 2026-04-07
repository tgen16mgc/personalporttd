"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export function QuickIntro() {
  return (
    <section className="py-32 lg:py-40">
      <Container>
        <ScrollReveal>
          <div className="max-w-4xl">
            {/* Section label */}
            <p className="section-kicker mb-6 text-[var(--color-cyan)]">
              The Short Version
            </p>
            
            {/* Big statement */}
            <h2 className="text-headline text-[var(--color-ink)] mb-8 leading-tight">
              Good marketing doesn't feel like marketing.{" "}
              <span className="text-[var(--color-ink-light)]">
                That's what I aim for.
              </span>
            </h2>

            {/* The explanation - simpler */}
            <p className="text-xl text-[var(--color-ink-light)] leading-relaxed max-w-2xl mb-12">
              I work at the intersection of strategy and creativity — figuring out 
              what makes people care, then finding interesting ways to say it. 
              Currently focused on F&B, tech, and lifestyle brands targeting Gen Z.
            </p>

            {/* What I actually do - less corporate */}
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-[var(--color-cream-dark)]"
            >
              <motion.div variants={fadeInUp}>
                <p className="text-sm text-[var(--color-ink-muted)] mb-2">Currently</p>
                <p className="font-medium text-[var(--color-ink)]">Account Executive</p>
                <p className="text-[var(--color-ink-light)]">Red Agency JSC</p>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <p className="text-sm text-[var(--color-ink-muted)] mb-2">Education</p>
                <p className="font-medium text-[var(--color-ink)]">Marketing, NEU</p>
                <p className="text-[var(--color-ink-light)]">3.69 GPA · 2027</p>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <p className="text-sm text-[var(--color-ink-muted)] mb-2">Industry</p>
                <p className="font-medium text-[var(--color-ink)]">F&B, Tech, Lifestyle</p>
                <p className="text-[var(--color-ink-light)]">Gen Z focus</p>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <p className="text-sm text-[var(--color-ink-muted)] mb-2">Approach</p>
                <p className="font-medium text-[var(--color-ink)]">Insight → Story</p>
                <p className="text-[var(--color-ink-light)]">Strategy meets craft</p>
              </motion.div>
            </motion.div>

            {/* Link to about */}
            <motion.div 
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-12"
            >
              <Link 
                href="/about" 
                className="inline-flex items-center gap-2 text-[var(--color-ink)] hover:text-[var(--color-cyan)] transition-colors group"
              >
                <span className="border-b border-current">Read the full story</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </motion.div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
