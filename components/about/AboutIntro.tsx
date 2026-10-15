"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowDown, ArrowRight } from "lucide-react";
import { aboutHero, uiLabels } from "@/content/pages/about";
import { personal } from "@/content/personal";
import { getSafeExternalHref } from "@/lib/security.mjs";

export function AboutIntro() {
  const [language, setLanguage] = useState("en");
  const vietnamese = language === "vi";
  const heading = vietnamese ? aboutHero.hookLineVi : aboutHero.hookLine;
  const body = vietnamese ? aboutHero.hookSubVi : aboutHero.hookSub;
  const sentences = body.split(/(?<=[.!?])\s+/);
  const resume = getSafeExternalHref(personal.resumeUrl);
  const photo = personal.aboutImage || personal.portraitImage;

  return <>
    <div className="vucko-header">
      <Link href="/" className="vucko-brand" aria-label={uiLabels.backToHomeLabel}>{personal.shortName.toUpperCase()}</Link>
      <p className="vucko-location">{personal.location}</p>
      {aboutHero.hookLineVi && aboutHero.hookSubVi && <div className="vucko-language" role="group" aria-label={uiLabels.languageGroupLabel} data-native-cursor>
        <button type="button" aria-label={uiLabels.englishIntroLabel} aria-pressed={!vietnamese} onClick={() => setLanguage("en")}>{uiLabels.englishLanguageCode}</button>
        <button type="button" aria-label={uiLabels.vietnameseIntroLabel} aria-pressed={vietnamese} onClick={() => setLanguage("vi")}>{uiLabels.vietnameseLanguageCode}</button>
      </div>}
    </div>
    <section className="vucko-hero" aria-label={uiLabels.pageAriaLabel} id="about-top">
      <div className="vucko-wordmark" aria-hidden="true">{Array.from(personal.shortName.toUpperCase()).map((letter, index) => <span className="vucko-letter-mask" key={index}><span>{letter}</span></span>)}</div>
      {photo && <div className="vucko-hero-preview">
        <a className="vucko-preview-motion" href="#about-biography" aria-label={aboutHero.introLabel}>
          <div className="vucko-preview-media"><Image src={photo} alt={personal.name} width={1600} height={1000} unoptimized loading="eager" fetchPriority="high" /></div>
          <span>{personal.name}<br />{personal.location}</span>
        </a>
      </div>}
      <div className="vucko-hero-bottom" lang={language}>
        <div>
          <h1>{heading}</h1>
          <a className="vucko-link" href="#about-biography">{aboutHero.introLabel}<ArrowRight size={16} /></a>
        </div>
        <a className="vucko-scroll" href="#about-biography" aria-label={aboutHero.introLabel}><ArrowDown size={18} /></a>
      </div>
    </section>
    {photo && <figure className="vucko-wide-portrait">
      <div className="vucko-portrait-frame"><Image src={photo} alt={personal.name} width={1600} height={1000} unoptimized loading="eager" /></div>
      <figcaption>{personal.name}<br />{personal.location}</figcaption>
    </figure>}
    <section className="vucko-statement" id="about-biography" lang={language}>
      <ArrowRight className="vucko-statement-arrow" size={36} aria-hidden="true" />
      <h2>{sentences[0]}</h2>
      <p className="vucko-section-label">({aboutHero.introLabel})</p>
      <div className="vucko-statement-copy">
        {sentences.slice(1).map((sentence, index) => <p key={index}>{sentence}</p>)}
        <div className="vucko-inline-links">
          {resume && <a className="vucko-link" href={resume} target="_blank" rel="noopener noreferrer">{aboutHero.resumeLabel}</a>}
          <Link className="vucko-link" href="/work">{aboutHero.workLabel}</Link>
        </div>
      </div>
    </section>
  </>;
}
