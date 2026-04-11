import type { Metadata } from "next";
import { fontVariables } from "@/lib/fonts";
import { personal } from "@/content/personal";
import "./globals.css";

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
    <html lang="en" className={`${fontVariables} h-full antialiased`}>
      <body className="site-ambient min-h-full flex flex-col bg-[var(--color-cream)]">
        {children}
      </body>
    </html>
  );
}
