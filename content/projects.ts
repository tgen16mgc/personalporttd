import data from "./keystatic/projects.json";

export interface StoryBlock {
  blockType: "text" | "heading" | "image" | "quote";
  body: string;
  image: string | null;
  imageCaption: string;
  imageSize: "content" | "wide" | "full";
}

export interface GalleryItem {
  type: "image" | "video" | "videoFile";
  image: string | null;
  videoUrl: string;
  videoFile: string | null;
  size: "full" | "half";
  caption: string;
}

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
  story?: StoryBlock[];
  challenge?: string;
  insight?: string;
  approach?: string;
  execution?: string[];
  results?: { metric: string; value: string }[];
  awards?: string[];
  credits?: { role: string; name: string }[];
  gallery?: GalleryItem[];
}

type RawItem = (typeof data.items)[number] & Record<string, unknown>;

function parseGallery(item: RawItem): GalleryItem[] | undefined {
  if (!("gallery" in item) || !Array.isArray(item.gallery)) return undefined;
  const arr = item.gallery as {
    type: string; image: string | null; videoUrl: string;
    videoFile?: string | null; size?: string; caption: string;
  }[];
  return arr.map((g) => ({
    ...g,
    type: g.type as GalleryItem["type"],
    image: g.image ?? null,
    videoFile: g.videoFile ?? null,
    size: (g.size as GalleryItem["size"]) || "full",
  }));
}

function parseStory(item: RawItem): StoryBlock[] | undefined {
  if (!("story" in item) || !Array.isArray(item.story) || item.story.length === 0) return undefined;
  return (item.story as {
    blockType: string; body: string; image?: string | null;
    imageCaption?: string; imageSize?: string;
  }[]).map((b) => ({
    blockType: b.blockType as StoryBlock["blockType"],
    body: b.body || "",
    image: b.image ?? null,
    imageCaption: b.imageCaption || "",
    imageSize: (b.imageSize as StoryBlock["imageSize"]) || "wide",
  }));
}

export const projects: Project[] = data.items.map((item) => {
  const raw = item as RawItem;
  return {
    ...item,
    thumbnail: item.thumbnail ?? null,
    heroImage: "heroImage" in item ? (item.heroImage as string | null) : null,
    brand: item.brand || undefined,
    story: parseStory(raw),
    challenge: item.challenge || undefined,
    insight: item.insight || undefined,
    approach: item.approach || undefined,
    execution: item.execution.length > 0 ? item.execution : undefined,
    results: item.results.length > 0 ? item.results : undefined,
    awards: item.awards.length > 0 ? item.awards : undefined,
    credits: item.credits.length > 0 ? item.credits : undefined,
    gallery: parseGallery(raw),
  };
});

export const getFeaturedProjects = () => projects.filter((p) => p.featured);
export const getProjectBySlug = (slug: string) =>
  projects.find((p) => p.slug === slug);
export const getIndustries = () => [
  ...new Set(projects.map((p) => p.industry)),
];
