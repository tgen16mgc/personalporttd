import data from "./keystatic/projects.json";

/* eslint-disable @typescript-eslint/no-explicit-any */
export type DocumentNode = {
  type?: string;
  children?: (DocumentNode | DocumentTextNode)[];
  href?: string;
  [key: string]: any;
};
export type DocumentTextNode = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  strikethrough?: boolean;
  [key: string]: any;
};

export type StoryBlock =
  | { discriminant: "text"; value: { body: string | DocumentNode[] } }
  | { discriminant: "heading"; value: { body: string } }
  | { discriminant: "image"; value: { image: string | null; caption: string; size: "content" | "wide" | "full" } }
  | { discriminant: "quote"; value: { body: string } }
  | { discriminant: "steps"; value: { heading: string; items: string[] } };

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
  type RawBlock = Record<string, unknown>;
  const results: StoryBlock[] = [];

  for (const raw of item.story as RawBlock[]) {
    const d = (raw.discriminant as string) || (raw.blockType as string) || "text";
    const v = (raw.value as Record<string, unknown>) || raw;

    switch (d) {
      case "heading":
        results.push({ discriminant: "heading", value: { body: (v.body as string) || "" } });
        break;
      case "image":
        results.push({
          discriminant: "image",
          value: {
            image: (v.image as string | null) ?? null,
            caption: (v.caption as string) || (v.imageCaption as string) || "",
            size: ((v.size as string) || (v.imageSize as string) || "wide") as "content" | "wide" | "full",
          },
        });
        break;
      case "quote":
        results.push({ discriminant: "quote", value: { body: (v.body as string) || "" } });
        break;
      case "steps":
        results.push({
          discriminant: "steps",
          value: {
            heading: (v.heading as string) || "",
            items: Array.isArray(v.items) ? (v.items as string[]) : [],
          },
        });
        break;
      default: {
        // body can be a plain string (legacy) or document nodes (new fields.document)
        const body = v.body;
        results.push({
          discriminant: "text",
          value: {
            body: (typeof body === "string" ? body : Array.isArray(body) ? body : String(body || "")) as string | DocumentNode[],
          },
        });
        if (v.image) {
          results.push({
            discriminant: "image",
            value: {
              image: (v.image as string | null) ?? null,
              caption: (v.imageCaption as string) || "",
              size: ((v.imageSize as string) || "wide") as "content" | "wide" | "full",
            },
          });
        }
        break;
      }
    }
  }
  return results.length > 0 ? results : undefined;
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
