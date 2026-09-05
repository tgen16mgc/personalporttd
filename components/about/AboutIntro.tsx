"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ChevronLeft } from "lucide-react";
import { aboutHero, uiLabels } from "@/content/pages/about";
import { personal } from "@/content/personal";
import { getSafeExternalHref } from "@/lib/security.mjs";

export function AboutIntro() {
  const [language, setLanguage] = useState("en");
  const vietnamese = language === "vi";
  const heading = vietnamese ? aboutHero.hookLineVi : aboutHero.hookLine;
  const body = vietnamese ? aboutHero.hookSubVi : aboutHero.hookSub;
  const resume = getSafeExternalHref(personal.resumeUrl);

  const languages = [
    { id: "en", code: uiLabels.englishLanguageCode, label: uiLabels.englishIntroLabel },
    { id: "vi", code: uiLabels.vietnameseLanguageCode, label: uiLabels.vietnameseIntroLabel },
  ] as const;

  return <section className="about-page about-hero page-shell" aria-label={uiLabels.pageAriaLabel}>
    <Link href="/" className="back-button" aria-label={uiLabels.backToHomeLabel} data-cursor={uiLabels.homeCursorLabel}><ChevronLeft size={21} /></Link>
    {aboutHero.hookLineVi && aboutHero.hookSubVi && <div className="about-language" role="group" aria-label={uiLabels.languageGroupLabel} data-native-cursor>
      {languages.map((option) => <button key={option.id} type="button" aria-label={option.label} aria-pressed={language === option.id} onClick={() => setLanguage(option.id)}>{option.code}</button>)}
    </div>}
    <div className="about-hero-grid">
      <div className="about-content">
        <p className="eyebrow" data-reveal>{aboutHero.introLabel}</p>
        <div lang={language}>
          <h1 data-reveal>{heading.split(/(?<=[.!?])\s+/).map((line, index) => <span key={index}>{line}</span>)}</h1>
          <p className="about-hero-description" data-reveal>{body}</p>
        </div>
        <div className="about-actions" data-reveal>
          {resume && <a className="text-link" href={resume} target="_blank" rel="noopener noreferrer">{aboutHero.resumeLabel}<ArrowUpRight size={16} /></a>}
          <Link className="about-case-link" href="/work">{aboutHero.workLabel}<ArrowUpRight size={16} /></Link>
        </div>
      </div>
      <figure className="about-hero-portrait">
        {personal.aboutImage && <Image src={personal.aboutImage} alt={personal.name} width={600} height={800} unoptimized loading="eager" fetchPriority="high" style={{ width: "100%", height: "auto" }} />}
      </figure>
    </div>
  </section>;
}
