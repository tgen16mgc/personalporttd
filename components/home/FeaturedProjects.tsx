"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ProjectCard } from "@/components/work/ProjectCard";
import { getFeaturedProjects } from "@/content/projects";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { ArrowRight } from "lucide-react";
import { CrossMark } from "@/components/ui/Decorative";

export function FeaturedProjects() {
  const projects = getFeaturedProjects();

  return (
    <section className="relative py-32 lg:py-40 bg-white/70">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent"
      />
      <Container size="wide">
        <ScrollReveal>
          <div className="flex justify-between items-end mb-16">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <CrossMark size={10} />
                <p className="section-kicker">
                  Selected Work
                </p>
              </div>
              <h2 className="text-headline text-[var(--color-ink)]">
                Featured projects
              </h2>
            </div>
            <Link
              href="/work"
              className="hidden sm:flex items-center gap-2 text-[var(--color-ink-light)] hover:text-[var(--color-ink)] transition-colors group"
            >
              View all work
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </ScrollReveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={index}
              featured
            />
          ))}
        </motion.div>

        {/* Mobile view all link */}
        <div className="mt-8 sm:hidden">
          <Link
            href="/work"
            className="flex items-center justify-center gap-2 py-3 text-[var(--color-ink-light)] hover:text-[var(--color-ink)] transition-colors"
          >
            View all work
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
