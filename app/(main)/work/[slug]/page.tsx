import { notFound } from "next/navigation";
import { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import { projects, getProjectBySlug } from "@/content/projects";
import { personal } from "@/content/personal";
import { CaseStudyContent } from "@/components/work/CaseStudyContent";

interface Props {
  params: Promise<{ slug: string }>;
}

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

function resolveStoryBodiesFromMdoc(slug: string) {
  const project = getProjectBySlug(slug);
  if (!project || !project.story || project.story.length === 0) return project;

  const projectIndex = projects.findIndex((p) => p.slug === slug);
  if (projectIndex < 0) return project;

  const story = project.story.map((block, blockIndex) => {
    if (block.discriminant !== "text") return block;

    const hasBody =
      typeof block.value.body === "string"
        ? block.value.body.trim().length > 0
        : Array.isArray(block.value.body) && block.value.body.length > 0;
    if (hasBody) return block;

    const bodyPath = path.join(
      process.cwd(),
      "content",
      "keystatic",
      "projects",
      "items",
      String(projectIndex),
      "story",
      String(blockIndex),
      "value",
      "body.mdoc"
    );

    if (!fs.existsSync(bodyPath)) return block;

    const body = fs.readFileSync(bodyPath, "utf8").trim();
    if (!body) return block;

    return {
      ...block,
      value: {
        ...block.value,
        body,
      },
    };
  });

  return {
    ...project,
    story,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = resolveStoryBodiesFromMdoc(slug);

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
