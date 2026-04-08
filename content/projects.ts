import data from "./keystatic/projects.json";

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  client: string;
  brand?: string;
  industry: string;
  role: string;
  year: string;
  thumbnail: string | null;
  heroImage: string | null;
  featured: boolean;
  color: string;
  challenge?: string;
  insight?: string;
  approach?: string;
  execution?: string[];
  results?: { metric: string; value: string }[];
  awards?: string[];
  credits?: { role: string; name: string }[];
  images?: string[];
}

export const projects: Project[] = data.items.map((item) => ({
  ...item,
  thumbnail: item.thumbnail ?? null,
  heroImage: "heroImage" in item ? (item.heroImage as string | null) : null,
  brand: item.brand || undefined,
  challenge: item.challenge || undefined,
  insight: item.insight || undefined,
  approach: item.approach || undefined,
  execution: item.execution.length > 0 ? item.execution : undefined,
  results: item.results.length > 0 ? item.results : undefined,
  awards: item.awards.length > 0 ? item.awards : undefined,
  credits: item.credits.length > 0 ? item.credits : undefined,
}));

export const getFeaturedProjects = () => projects.filter((p) => p.featured);
export const getProjectBySlug = (slug: string) =>
  projects.find((p) => p.slug === slug);
export const getIndustries = () => [
  ...new Set(projects.map((p) => p.industry)),
];
