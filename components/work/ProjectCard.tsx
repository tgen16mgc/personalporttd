"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardImage, CardContent, CardTag } from "@/components/ui/Card";
import { cardCascade } from "@/lib/animations";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
  featured?: boolean;
}

export function ProjectCard({ project, index, featured = false }: ProjectCardProps) {
  return (
    <motion.div
      variants={cardCascade(index)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      <Link href={`/work/${project.slug}`} className="block group cursor-pointer">
        <Card className={featured ? "overflow-visible" : ""}>
          <div className="relative">
            <CardImage
              src={featured ? (project.heroImage || project.thumbnail) : project.thumbnail}
              alt={project.title}
              aspectRatio={featured ? "video" : "square"}
            />
            {/* Premium hover overlay with gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-500 flex items-end p-6">
              <motion.span
                className="text-white flex items-center gap-2 text-sm font-medium"
              >
                View case study
                <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </motion.span>
            </div>
          </div>
          <CardContent className="p-6 sm:p-7">
            <div className="flex flex-wrap gap-2 mb-3">
              <CardTag color={project.color}>{project.industry}</CardTag>
              <CardTag>{project.year}</CardTag>
            </div>
            <h3 className="text-lg sm:text-xl font-medium text-[var(--color-ink)] mb-2 group-hover:text-[var(--color-cyan)] transition-colors duration-500">
              {project.title}
            </h3>
            <p className="text-[var(--color-ink-light)] text-sm leading-relaxed line-clamp-2">
              {project.tagline}
            </p>
            <p className="text-tag text-[var(--color-ink-muted)] mt-4">
              {project.role}
            </p>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
