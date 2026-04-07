import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Footer } from "@/components/layout/Footer";
import { projects, getProjectBySlug } from "@/content/projects";
import { ArrowLeft, ArrowRight, Trophy } from "lucide-react";

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
    title: `${project.title} | Tien Duong Ngoc`,
    description: project.tagline,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const projectIndex = projects.findIndex((p) => p.slug === slug);
  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const nextProject =
    projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16">
        <Container>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-[var(--color-ink-light)] hover:text-[var(--color-ink)] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to work
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
              <p className="text-tag text-[var(--color-ink-light)] mb-4">
                {project.industry} · {project.year}
              </p>
              <h1 className="text-display text-[var(--color-ink)] mb-4">
                {project.title}
              </h1>
              <p className="text-headline text-[var(--color-ink-light)]">
                {project.tagline}
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-tag text-[var(--color-ink-muted)] mb-1">Client</p>
                <p className="text-[var(--color-ink)]">{project.client}</p>
              </div>
              {project.brand && (
                <div>
                  <p className="text-tag text-[var(--color-ink-muted)] mb-1">Brand</p>
                  <p className="text-[var(--color-ink)]">{project.brand}</p>
                </div>
              )}
              <div>
                <p className="text-tag text-[var(--color-ink-muted)] mb-1">Role</p>
                <p className="text-[var(--color-ink)]">{project.role}</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div
            className="aspect-video rounded-xl overflow-hidden mb-16"
            style={{ backgroundColor: project.color + "20" }}
          >
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Awards */}
          {project.awards && project.awards.length > 0 && (
            <div className="flex flex-wrap gap-3 mb-16">
              {project.awards.map((award) => (
                <div
                  key={award}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-gold)]/10 rounded-full"
                >
                  <Trophy className="w-4 h-4 text-[var(--color-gold)]" />
                  <span className="text-sm font-medium text-[var(--color-ink)]">
                    {award}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Content Sections */}
          <div className="max-w-3xl space-y-12">
            {project.challenge && (
              <div>
                <h2 className="text-headline text-[var(--color-ink)] mb-4">
                  The Challenge
                </h2>
                <p className="text-body-lg text-[var(--color-ink-light)]">
                  {project.challenge}
                </p>
              </div>
            )}

            {project.insight && (
              <div>
                <h2 className="text-headline text-[var(--color-ink)] mb-4">
                  The Insight
                </h2>
                <p className="text-body-lg text-[var(--color-ink-light)]">
                  {project.insight}
                </p>
              </div>
            )}

            {project.approach && (
              <div>
                <h2 className="text-headline text-[var(--color-ink)] mb-4">
                  The Approach
                </h2>
                <p className="text-body-lg text-[var(--color-ink-light)]">
                  {project.approach}
                </p>
              </div>
            )}

            {project.execution && project.execution.length > 0 && (
              <div>
                <h2 className="text-headline text-[var(--color-ink)] mb-4">
                  The Execution
                </h2>
                <ul className="space-y-3">
                  {project.execution.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-body-lg text-[var(--color-ink-light)]"
                    >
                      <span
                        className="w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium shrink-0 mt-1"
                        style={{
                          backgroundColor: project.color + "20",
                          color: project.color,
                        }}
                      >
                        {index + 1}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.results && project.results.length > 0 && (
              <div>
                <h2 className="text-headline text-[var(--color-ink)] mb-6">
                  The Results
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                  {project.results.map((result) => (
                    <div
                      key={result.metric}
                      className="p-6 rounded-xl bg-white border border-[var(--color-cream-dark)]"
                    >
                      <p
                        className="text-3xl font-semibold mb-1"
                        style={{ color: project.color }}
                      >
                        {result.value}
                      </p>
                      <p className="text-sm text-[var(--color-ink-light)]">
                        {result.metric}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {project.credits && project.credits.length > 0 && (
              <div>
                <h2 className="text-headline text-[var(--color-ink)] mb-4">
                  Credits
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {project.credits.map((credit) => (
                    <div key={credit.role}>
                      <p className="text-tag text-[var(--color-ink-muted)] mb-1">
                        {credit.role}
                      </p>
                      <p className="text-[var(--color-ink)]">{credit.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Navigation */}
      <section className="py-16 border-t border-[var(--color-cream-dark)]">
        <Container>
          <div className="flex justify-between items-center">
            {prevProject ? (
              <Link
                href={`/work/${prevProject.slug}`}
                className="group flex items-center gap-3"
              >
                <ArrowLeft className="w-5 h-5 text-[var(--color-ink-light)] group-hover:text-[var(--color-ink)] transition-colors" />
                <div>
                  <p className="text-tag text-[var(--color-ink-muted)]">Previous</p>
                  <p className="text-[var(--color-ink)] group-hover:text-[var(--color-cyan)] transition-colors">
                    {prevProject.title}
                  </p>
                </div>
              </Link>
            ) : (
              <div />
            )}
            {nextProject && (
              <Link
                href={`/work/${nextProject.slug}`}
                className="group flex items-center gap-3 text-right"
              >
                <div>
                  <p className="text-tag text-[var(--color-ink-muted)]">Next</p>
                  <p className="text-[var(--color-ink)] group-hover:text-[var(--color-cyan)] transition-colors">
                    {nextProject.title}
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-[var(--color-ink-light)] group-hover:text-[var(--color-ink)] transition-colors" />
              </Link>
            )}
          </div>
        </Container>
      </section>

      <Footer />
    </>
  );
}
