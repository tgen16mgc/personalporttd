import { notFound } from "next/navigation";
import { Metadata } from "next";
import { readFile } from "node:fs/promises";
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

/**
 * Story text blocks may contain either a legacy plain string body
 * or document-node arrays from Keystatic's rich text field.
 */
function hasStoryBlockBody(body: unknown) {
  if (typeof body === "string") return body.trim().length > 0;
  if (Array.isArray(body)) return body.length > 0;
  return false;
}

async function resolveStoryBodiesFromMdoc(slug: string) {
  const projectIndex = projects.findIndex((p) => p.slug === slug);
  if (projectIndex < 0) return null;

  const project = projects[projectIndex];
  if (!project || !project.story || project.story.length === 0) return project;

  const story = [];
  for (const [blockIndex, block] of project.story.entries()) {
    if (block.discriminant !== "text") {
      story.push(block);
      continue;
    }

    if (hasStoryBlockBody(block.value.body)) {
      story.push(block);
      continue;
    }

    const bodyPath = getStoryBodyPath(projectIndex, blockIndex);

    try {
      const body = (await readFile(bodyPath, "utf8")).trim();
      if (!body) {
        story.push(block);
        continue;
      }

      story.push({
        ...block,
        value: {
          ...block.value,
          body,
        },
      });
    } catch (error) {
      const errorCode = (error as NodeJS.ErrnoException).code;
      if (errorCode && errorCode !== "ENOENT") {
        throw error;
      }
      story.push(block);
    }
  }

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
