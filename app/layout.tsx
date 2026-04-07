import type { Metadata } from "next";
import { fontVariables } from "@/lib/fonts";
import { FilmGrain } from "@/components/layout/FilmGrain";
import { Navigation } from "@/components/layout/Navigation";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tien Duong Ngoc | Marketing Strategist",
  description: "Marketing. Strategy. Meaning. Portfolio of Tien Duong Ngoc, a marketer who finds beauty in every brief.",
  keywords: ["marketing", "strategy", "portfolio", "Tien Duong", "creative"],
  authors: [{ name: "Tien Duong Ngoc" }],
  openGraph: {
    title: "Tien Duong Ngoc | Marketing Strategist",
    description: "Marketing. Strategy. Meaning.",
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
        <FilmGrain />
        <Navigation />
        <main className="relative z-10 flex-1">{children}</main>
      </body>
    </html>
  );
}
