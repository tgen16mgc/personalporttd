import data from "../keystatic/homepage.json";

export const heroContent = data.heroContent as {
  greeting: string;
  namePrefix?: string;
  nameTrailing?: string;
  nameAliases?: string[];
  tagline: string;
  currentRole: { label: string; company: string };
  previousRole: { label: string; company: string };
  education: string;
  industries: string[];
  tools: string[];
  gravityTags: { label: string; color: string }[];
};

export const quickIntroContent = data.quickIntroContent as {
  kicker: string;
  headline: string;
  headlineSub: string;
  body: string;
  facts: { label: string; primary: string; secondary: string }[];
};

export interface Brand {
  name: string;
  logo: string | null;
}

export const brands: Brand[] = data.brands;
