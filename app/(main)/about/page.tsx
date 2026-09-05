import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { personal } from "@/content/personal";
import { heroContent, quickIntroContent, brands } from "@/content/pages/home";
import { experience, recognition, education, personalBits, philosophy, afterwork, aboutCta } from "@/content/pages/about";
import { getSafeExternalHref, normalizeNavigationHref, sanitizeInlineHtml } from "@/lib/security.mjs";
import { Footer } from "@/components/layout/Footer";
import { AboutIntro } from "@/components/about/AboutIntro";

export const metadata: Metadata = { title: `About | ${personal.name}` };

export default function AboutPage() {
  const resume = getSafeExternalHref(personal.resumeUrl);
  return <>
    <AboutIntro />
    <div className="about-editorial">
      <section className="about-biography" id="the-short-version">
        <figure>{personal.aboutImage &&
          // eslint-disable-next-line @next/next/no-img-element
          <img src={personal.aboutImage} alt={personal.name} loading="lazy" />}</figure>
        <div><p className="eyebrow">{quickIntroContent.kicker}</p><h2>{quickIntroContent.headline}</h2><p className="intro-sub">{quickIntroContent.headlineSub}</p><p>{quickIntroContent.body}</p><p>{heroContent.tagline}</p>
          {personalBits.map((bit, index) => <p key={index}><span dangerouslySetInnerHTML={{ __html: sanitizeInlineHtml(bit.text) }} />{bit.linkText && bit.linkHref && <> <Link href={normalizeNavigationHref(bit.linkHref)}>{bit.linkText}</Link>{bit.suffix}</>}</p>)}
          {resume && <a className="text-link" href={resume} target="_blank" rel="noopener noreferrer">View Resume <ArrowUpRight size={16} /></a>}
        </div>
      </section>
      <section className="about-facts" aria-label="At a glance"><dl>{quickIntroContent.facts.map((fact) => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.primary}<span>{fact.secondary}</span></dd></div>)}</dl>{heroContent.tools.length > 0 && <p>Tools: {heroContent.tools.join(" / ")}</p>}</section>
      <section className="about-records" aria-label="Experience and education">
        <div><h2>Experience</h2>{experience.map((item) => <article key={`${item.company}-${item.role}`}><p className="record-date">{item.period} / {item.location}</p><h3>{item.company}</h3><p>{item.role}</p>{item.summary && <p>{item.summary}</p>}</article>)}</div>
        <div><h2>Recognition</h2>{recognition.map((item) => <article key={item.event}><h3>{item.title}</h3><p>{item.event}{item.note ? ` (${item.note})` : ""}</p></article>)}</div>
        <div><h2>Education</h2><article><p className="record-date">{education.location} / {education.graduation}</p><h3>{education.school}</h3><p>{education.degree}</p><p>GPA {education.gpa}</p></article></div>
      </section>
      <section className="about-approach"><h2>{philosophy.approach.headline}</h2><p className="intro-sub">{philosophy.approach.subheadline}</p>{philosophy.approach.paragraphs.map((text, index) => <p key={index} dangerouslySetInnerHTML={{ __html: sanitizeInlineHtml(text) }} />)}</section>
      <section className="about-reflections">{philosophy.reflections.map((reflection) => <article key={reflection.title}><p className="eyebrow">{reflection.kicker}</p><h2>{reflection.title}</h2>{reflection.paragraphs.map((text, index) => <p key={index} dangerouslySetInnerHTML={{ __html: sanitizeInlineHtml(text) }} />)}</article>)}</section>
      <p>Selected brands, agency partners and employers represented in my work. Individual cases describe my role and the team involved.</p>
      <section className="about-brands" aria-label="Selected brands, agency partners and employers">{brands.filter((brand) => brand.logo).map((brand) =>
        // eslint-disable-next-line @next/next/no-img-element
        <img key={brand.name} src={brand.logo!} alt={brand.name} loading="lazy" />)}</section>
      <section className="afterwork-archive" id="afterwork"><h2>Afterwork</h2><div className="afterwork-grid">{afterwork.map((item) => <details key={item.id} className="afterwork-item"><summary>{item.image &&
        // eslint-disable-next-line @next/next/no-img-element
        <img src={item.image} alt={item.title} loading="lazy" />}<span>{item.title}<span className="afterwork-plus" aria-hidden="true">+</span></span>{item.subtitle && <small>{item.subtitle}</small>}</summary><div><p>{item.description}</p>{item.takeaway && <p className="afterwork-takeaway">{item.takeaway}</p>}</div></details>)}</div></section>
      {(philosophy.quote || philosophy.mission) && <section className="about-approach">{philosophy.quote && <blockquote>{philosophy.quote}</blockquote>}{philosophy.mission && <p dangerouslySetInnerHTML={{ __html: sanitizeInlineHtml(philosophy.mission) }} />}</section>}
      <section className="about-outro"><p className="eyebrow">{aboutCta.kicker}</p><h2>{aboutCta.headline}</h2><p>{aboutCta.body}</p><Link href="/contact" className="text-link">Get in touch <ArrowUpRight size={16} /></Link></section>
    </div>
    <Footer />
  </>;
}
