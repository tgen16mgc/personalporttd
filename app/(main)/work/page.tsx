"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ProjectCard } from "@/components/work/ProjectCard";
import { Footer } from "@/components/layout/Footer";
import { projects, getIndustries } from "@/content/projects";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { CrossMark } from "@/components/ui/Decorative";

export default function WorkPage() {
  const industries = ["All", ...getIndustries()];
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.industry === activeFilter);

  return (
    <>
      <section className="pt-32 pb-16 relative overflow-hidden">
        <Container>
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-4">
              <CrossMark size={10} />
              <p className="section-kicker">
                Portfolio
              </p>
            </div>
            <h1 className="text-display text-[var(--color-ink)] mb-6">
              Selected Work
            </h1>
            <p className="text-body-lg text-[var(--color-ink-light)] max-w-2xl mb-12">
              A collection of projects spanning brand strategy, campaign 
              development, consumer research, and creative execution.
            </p>
          </ScrollReveal>

          {/* Filter Pills with animated indicator */}
          <ScrollReveal>
            <div className="flex flex-wrap gap-2 mb-12">
              {industries.map((industry) => (
                <button
                  key={industry}
                  onClick={() => setActiveFilter(industry)}
                  className={cn(
                    "relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-500 cursor-pointer",
                    activeFilter === industry
                      ? "text-white"
                      : "text-[var(--color-ink-light)] hover:text-[var(--color-ink)] ring-1 ring-black/[0.05] bg-white/70"
                  )}
                >
                  {activeFilter === industry && (
                    <motion.span
                      layoutId="filter-pill"
                      className="absolute inset-0 rounded-full bg-[var(--color-ink)] shadow-[0_8px_20px_rgba(10,10,10,0.14)] -z-10"
                      transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                    />
                  )}
                  {industry}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Projects Grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </motion.div>

          {filteredProjects.length === 0 && (
            <p className="text-center text-[var(--color-ink-light)] py-12">
              No projects found in this category.
            </p>
          )}
        </Container>
      </section>
      <Footer />
    </>
  );
}
