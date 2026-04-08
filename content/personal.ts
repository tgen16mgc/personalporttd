import data from "./keystatic/personal.json";

export const personal = data as {
  name: string;
  shortName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  linkedinHandle: string;
  facebook: string;
  resumeUrl: string;
  status: string;
  portraitImage: string | null;
  aboutImage: string | null;
  seo: {
    title: string;
    description: string;
    shortDescription: string;
    keywords: string[];
  };
  navigation: { href: string; label: string }[];
  footerQuote: string;
};
