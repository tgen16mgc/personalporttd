import type { Metadata } from "next";
import { fontVariables } from "@/lib/fonts";
import { personal } from "@/content/personal";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const faviconPath = personal.seo.favicon || "/favicon.ico";

export const metadata: Metadata = {
  title: personal.seo.title,
  description: personal.seo.description,
  keywords: personal.seo.keywords,
  authors: [{ name: personal.name }],
  icons: {
    icon: faviconPath,
    shortcut: faviconPath,
  },
  openGraph: {
    title: personal.seo.title,
    description: personal.seo.shortDescription,
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("h-full", "antialiased", fontVariables, "font-sans", geist.variable)}>
      <body className="site-ambient min-h-full flex flex-col bg-[var(--color-cream)]">
        {children}
      </body>
    </html>
  );
}
