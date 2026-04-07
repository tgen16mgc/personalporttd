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
              src={project.thumbnail}
              alt={project.title}
              aspectRatio={featured ? "video" : "square"}
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 flex items-end p-5">
              <motion.span
                initial={{ x: 0, y: 0 }}
                whileHover={{ x: 4, y: -4 }}
                className="text-white flex items-center gap-1 text-sm font-medium"
              >
                View case study
                <ArrowUpRight className="w-4 h-4" />
              </motion.span>
            </div>
          </div>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-3">
              <CardTag color={project.color}>{project.industry}</CardTag>
              <CardTag>{project.year}</CardTag>
            </div>
            <h3 className="text-xl font-medium text-[var(--color-ink)] mb-2 group-hover:text-[var(--color-cyan)] transition-colors">
              {project.title}
            </h3>
            <p className="text-[var(--color-ink-light)] text-sm line-clamp-2">
              {project.tagline}
            </p>
            <p className="text-tag text-[var(--color-ink-muted)] mt-3">
              {project.role}
            </p>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
