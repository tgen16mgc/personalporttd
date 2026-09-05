import data from "../keystatic/about.json";

export const aboutHero = data.aboutHero;
export const uiLabels = data.uiLabels;
export const proof = data.proof;
export const capabilities = data.capabilities;
export const aiPractice = data.aiPractice;
export const profileFacts = data.profileFacts;
export const sectionLabels = data.sectionLabels;
export const afterworkDisplay = data.afterworkDisplay;

export const experience = data.experience;

export const recognition = data.recognition.map(
  (r: { title: string; event: string; note?: string }) => ({
    title: r.title,
    event: r.event,
    ...(r.note ? { note: r.note } : {}),
  })
);

export const education = data.education;

export const personalBits = data.personalBits.map(
  (b: { text: string; linkText?: string; linkHref?: string; suffix?: string }) => ({
    text: b.text,
    ...(b.linkText ? { linkText: b.linkText } : {}),
    ...(b.linkHref ? { linkHref: b.linkHref } : {}),
    ...(b.suffix ? { suffix: b.suffix } : {}),
  })
);

export const philosophy = data.philosophy;

export interface AfterworkItem {
  id: string;
  title: string;
  subtitle: string | null;
  description: string;
  takeaway: string;
  image: string | null;
  emoji: string;
  bgGradient: string;
  size: "large" | "small";
}

type RawAfterworkItem = Omit<AfterworkItem, "subtitle" | "image" | "takeaway" | "size"> & {
  subtitle?: string;
  image?: string;
  takeaway?: string;
  size: string;
};

export const afterwork: AfterworkItem[] = (data.afterwork as RawAfterworkItem[]).map((item) => ({
  ...item,
  subtitle: item.subtitle || null,
  image: item.image ?? null,
  takeaway: item.takeaway ?? "",
  size: item.size as "large" | "small",
}));

export const aboutCta = data.aboutCta;
