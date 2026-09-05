"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft } from "lucide-react";
import { aboutHero } from "@/content/pages/about";
import { personal } from "@/content/personal";
import { heroContent } from "@/content/pages/home";
import { createMailtoHref, getSafeExternalHref } from "@/lib/security.mjs";

export function AboutIntro() {
  const [language, setLanguage] = useState("en");
  const vietnamese = language === "vi";
  const heading = vietnamese ? aboutHero.hookLineVi : aboutHero.hookLine;
  const body = vietnamese ? aboutHero.hookSubVi : aboutHero.hookSub;
  const email = createMailtoHref(personal.email);
  const linkedin = getSafeExternalHref(personal.linkedin);

  return <section className="about-page page-shell" aria-label="About">
    <Link href="/" className="back-button" aria-label="Back to home" data-cursor="Home"><ChevronLeft size={21} /></Link>
    {aboutHero.hookLineVi && aboutHero.hookSubVi && <div className="about-language" aria-label="Language">{["en", "vi"].map((lang) => <button key={lang} type="button" aria-pressed={language === lang} onClick={() => setLanguage(lang)}>{lang.toUpperCase()}</button>)}</div>}
    <div className="about-content" lang={language} key={language}>
      <header className="center-intro"><p className="eyebrow" data-reveal>{vietnamese ? "Về mình" : "About"}</p><h1>{heading.split(/(?<=[.!?])\s+/).map((line, index) => <span data-reveal key={index}>{line}</span>)}</h1></header>
      <div className="about-body" data-reveal><p>{body}</p>
        <dl className="about-meta">
          <div><dt>{vietnamese ? "Họ tên" : "Name"}</dt><dd>{personal.name}</dd></div>
          <div><dt>{vietnamese ? "Công việc" : "Role"}</dt><dd>{heroContent.currentRole.label}</dd></div>
          <div><dt>{vietnamese ? "Liên hệ" : "Contact"}</dt><dd className="about-contact-links">{email && <a href={email}>{personal.email}<ArrowUpRight size={14} /></a>}{linkedin && <a href={linkedin} target="_blank" rel="noopener noreferrer">LinkedIn<ArrowUpRight size={14} /></a>}</dd></div>
        </dl>
      </div>
    </div>
  </section>;
}
