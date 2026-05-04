"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { CrossMark, Divider } from "@/components/ui/Decorative";
import { quickIntroContent } from "@/content/pages/home";

export function QuickIntro() {
  return (
    <section className="py-32 lg:py-40 relative">
      <Container>
        <ScrollReveal>
          <div className="max-w-4xl">
            {/* Section label */}
            <div className="flex items-center gap-3 mb-6">
              <CrossMark size={10} color="var(--color-cyan)" />
              <p className="section-kicker text-[var(--color-cyan)]">
                {quickIntroContent.kicker}
              </p>
            </div>
            
            {/* Big statement */}
            <h2 className="text-headline text-[var(--color-ink)] mb-8 leading-tight">
              {quickIntroContent.headline}{" "}
              <span className="text-[var(--color-ink-light)]">
                {quickIntroContent.headlineSub}
              </span>
            </h2>

            {/* The explanation - simpler */}
            <p className="text-xl text-[var(--color-ink-light)] leading-relaxed max-w-2xl mb-12">
              {quickIntroContent.body}
            </p>

            {/* Decorative divider */}
            <Divider accent color="cyan" className="mb-8" />

            {/* What I actually do - less corporate */}
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {quickIntroContent.facts.map((fact) => (
                <motion.div key={fact.label} variants={fadeInUp}>
                  <p className="text-sm text-[var(--color-ink-muted)] mb-2">{fact.label}</p>
                  <p className="font-medium text-[var(--color-ink)]">{fact.primary}</p>
                  <p className="text-[var(--color-ink-light)]">{fact.secondary}</p>
                </motion.div>
              ))}
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
