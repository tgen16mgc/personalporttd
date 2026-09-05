import { notFound } from "next/navigation";
import { Metadata } from "next";
import { createReader } from "@keystatic/core/reader";
import config from "../../../../keystatic.config";
import { projects, getProjectBySlug, type StoryBlock } from "@/content/projects";
import { personal } from "@/content/personal";
import { CaseStudyContent } from "@/components/work/CaseStudyContent";

interface Props {
  params: Promise<{ slug: string }>;
}

const reader = createReader(process.cwd(), config);

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} | ${personal.name}`,
    description: project.tagline,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const entries = await reader.singletons.projects.readOrThrow();
  const entry = entries.items.find((item) => item.slug === slug);
  if (!entry) notFound();
  const story = await Promise.all(entry.story.map(async (block) => {
    if (block.discriminant !== "text") return block;
    return { ...block, value: { body: await block.value.body() } };
  }));

  const projectIndex = projects.findIndex((p) => p.slug === slug);
  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const nextProject =
    projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;

  return (
    <CaseStudyContent
      project={{ ...project, story: structuredClone(story) as StoryBlock[] }}
      prevProject={prevProject}
      nextProject={nextProject}
    />
  );
}
