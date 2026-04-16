import { notFound } from "next/navigation";
import { Metadata } from "next";
import { constants as fsConstants } from "node:fs";
import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { projects, getProjectBySlug } from "@/content/projects";
import { personal } from "@/content/personal";
import { CaseStudyContent } from "@/components/work/CaseStudyContent";

interface Props {
  params: Promise<{ slug: string }>;
}

const KEYSTATIC_PROJECTS_DIR = path.join(
  process.cwd(),
  "content",
  "keystatic",
  "projects"
);

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

function getStoryBodyPath(projectIndex: number, blockIndex: number) {
  return path.join(
    KEYSTATIC_PROJECTS_DIR,
    "items",
    String(projectIndex),
    "story",
    String(blockIndex),
    "value",
    "body.mdoc"
  );
}

async function resolveStoryBodiesFromMdoc(slug: string) {
  const projectIndex = projects.findIndex((p) => p.slug === slug);
  if (projectIndex < 0) return null;

  const project = projects[projectIndex];
  if (!project || !project.story || project.story.length === 0) return project;

  const story = await Promise.all(project.story.map(async (block, blockIndex) => {
    if (block.discriminant !== "text") return block;

    const hasBody =
      typeof block.value.body === "string"
        ? block.value.body.trim().length > 0
        : Array.isArray(block.value.body) && block.value.body.length > 0;
    if (hasBody) return block;

    const bodyPath = getStoryBodyPath(projectIndex, blockIndex);

    try {
      await access(bodyPath, fsConstants.R_OK);
    } catch {
      return block;
    }

    const body = (await readFile(bodyPath, "utf8")).trim();
    if (!body) return block;

    return {
      ...block,
      value: {
        ...block.value,
        body,
      },
    };
  }));

  return {
    ...project,
    story,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = await resolveStoryBodiesFromMdoc(slug);

  if (!project) {
    notFound();
  }

  const projectIndex = projects.findIndex((p) => p.slug === slug);
  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const nextProject =
    projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;

  return (
    <CaseStudyContent
      project={project}
      prevProject={prevProject}
      nextProject={nextProject}
    />
  );
}
