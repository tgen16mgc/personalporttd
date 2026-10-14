import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUp } from "lucide-react";
import { personal } from "@/content/personal";
import { brands } from "@/content/pages/home";
import { projects } from "@/content/projects";
import {
  aboutHero, uiLabels, proof, capabilities, aiPractice, profileFacts,
  sectionLabels, experience, recognition, education, afterwork,
  afterworkDisplay, aboutCta, type AfterworkItem,
} from "@/content/pages/about";
import { getSafeExternalHref, normalizeNavigationHref } from "@/lib/security.mjs";
import { AboutIntro } from "@/components/about/AboutIntro";
import { AboutCapabilities } from "@/components/about/AboutCapabilities";
import "@/components/about/about-design.css";

export const metadata: Metadata = {
  title: `${uiLabels.metadataTitle} | ${personal.name}`,
  description: aboutHero.hookSub,
};

function CaseLink({ projectSlug, linkLabel }: { projectSlug?: string; linkLabel?: string }) {
  const project = projects.find((item) => item.slug === projectSlug);
  if (!project || !linkLabel) return null;
  return <Link className="vucko-link" href={`/work/${project.slug}`}>{linkLabel}<ArrowRight size={14} /></Link>;
}

function PersonalPhoto({ item }: { item: AfterworkItem }) {
  return <details className="vucko-photo" data-native-cursor>
    <summary>
      {item.image && <Image src={item.image} alt={item.title} loading="lazy" width={900} height={1000} unoptimized />}
      <span>{item.title}<span className="vucko-photo-plus" aria-hidden="true">+</span></span>
      {item.subtitle && <small>{item.subtitle}</small>}
    </summary>
    <div><p>{item.description}</p>{item.takeaway && <p>{item.takeaway}</p>}</div>
  </details>;
}

export default function AboutPage() {
  const resume = getSafeExternalHref(personal.resumeUrl);
  const workNav = personal.navigation.find((item) => item.href === "/work");
  const featuredPhotos = [...new Set<string>(afterworkDisplay.featuredIds)]
    .map((id) => afterwork.find((item) => item.id === id))
    .filter((item): item is AfterworkItem => Boolean(item));
  const archivedPhotos = afterwork.filter((item) => !featuredPhotos.some((featured) => featured.id === item.id));
  const visibleBrands = brands.filter((brand) => brand.logo);
  const socials = [
    {label:"LinkedIn", href:getSafeExternalHref(personal.linkedin)},
    {label:"Facebook", href:getSafeExternalHref(personal.facebook)},
  ].filter((item) => item.href);

  return <div className="vucko-about">
    <AboutIntro />
    {aiPractice.items.length > 0 && <section className="vucko-work" aria-labelledby="about-work-heading">
      <header className="vucko-work-heading">
        <h2 id="about-work-heading">{workNav?.label || aboutHero.workLabel}</h2>
        <p>{aiPractice.heading}</p>
        <span className="vucko-section-label">({aiPractice.kicker})</span>
      </header>
      <div className="vucko-project-grid">{aiPractice.items.map((item, index) => <article key={`${item.title}-${index}`}>
        {item.image && <figure><Image src={item.image} alt={item.imageAlt} loading="lazy" width={1200} height={1000} unoptimized /></figure>}
        <h3>{item.title}</h3><p className="vucko-project-caption">{item.caption}</p><p>{item.body}</p><CaseLink {...item} />
      </article>)}</div>
      <div className="vucko-work-end"><p>{aiPractice.body}</p><Link className="vucko-large-link" href="/work"><ArrowRight size={28} />{aboutHero.workLabel}</Link></div>
    </section>}

    {capabilities.items.length > 0 && <AboutCapabilities />}

    {proof.items.length > 0 && <section className="vucko-proof" aria-labelledby="about-proof-heading">
      <h2 id="about-proof-heading" className="vucko-section-label">({proof.heading})</h2>
      <div>{proof.items.map((item, index) => <article key={`${item.title}-${index}`}>
        <p className="vucko-proof-value">{item.value}</p><h3>{item.title}</h3><p>{item.body}</p><CaseLink {...item} />
      </article>)}</div>
    </section>}

    <section className="vucko-career" aria-label={uiLabels.experienceAriaLabel}>
      {personal.portraitImage && <figure className="vucko-career-photo"><Image src={personal.portraitImage} alt={personal.name} width={900} height={1200} loading="lazy" unoptimized /></figure>}
      <div className="vucko-career-copy">
        <h2>{sectionLabels.experience}</h2>
        {experience.map((item) => <article className="vucko-career-role" key={`${item.company}-${item.role}`}>
          <h3>{item.company}</h3><p className="vucko-career-position">{item.role}</p><p>{item.period} / {item.location}</p>{item.summary && <p>{item.summary}</p>}
        </article>)}
        {resume && <a href={resume} className="vucko-link" target="_blank" rel="noopener noreferrer">{aboutHero.resumeLabel}</a>}
      </div>
    </section>

    <section className="vucko-credentials">
      {recognition.length > 0 && <div><h2 className="vucko-section-label">({sectionLabels.recognition})</h2><div className="vucko-awards">{recognition.map((item) => <article key={item.event}>
        <h3>{item.title}</h3><p>{item.event}</p>{item.note && <p>{item.note}</p>}
      </article>)}</div></div>}
      <div className="vucko-education"><h2 className="vucko-section-label">({sectionLabels.education})</h2><div><h3>{education.school}</h3><p>{education.degree}</p><p>{uiLabels.gpaLabel} {education.gpa}</p><p>{education.graduation}</p>
        {profileFacts.length > 0 && <dl>{profileFacts.map((fact, index) => <div key={`${fact.label}-${index}`}><dt>{fact.label}</dt><dd>{fact.primary}<span>{fact.secondary}</span></dd></div>)}</dl>}
      </div></div>
    </section>

    {visibleBrands.length > 0 && <section className="vucko-brands" aria-label={uiLabels.brandsAriaLabel}>
      <p>{sectionLabels.brands}</p><div>{visibleBrands.map((brand) =>
        // eslint-disable-next-line @next/next/no-img-element
        <img key={brand.name} src={brand.logo!} alt={brand.name} loading="lazy" />)}</div>
    </section>}

    {afterwork.length > 0 && <section className="vucko-afterwork" id="afterwork" aria-labelledby="afterwork-heading">
      <header className="vucko-work-heading"><h2 id="afterwork-heading">{afterworkDisplay.heading}</h2><p>{afterworkDisplay.body}</p></header>
      <div className="vucko-photo-grid">{featuredPhotos.map((item) => <PersonalPhoto key={item.id} item={item} />)}</div>
      {archivedPhotos.length > 0 && <details className="vucko-photo-archive" data-native-cursor>
        <summary>{afterworkDisplay.moreLabel}<span aria-hidden="true">+</span></summary>
        <div className="vucko-photo-grid">{archivedPhotos.map((item) => <PersonalPhoto key={item.id} item={item} />)}</div>
      </details>}
    </section>}

    <section className="vucko-contact" aria-labelledby="about-contact-heading">
      <div><p className="vucko-section-label">({aboutCta.kicker})</p><h2 id="about-contact-heading">{aboutCta.headline}</h2><p>{aboutCta.body}</p></div>
      <Link href="/contact" className="vucko-large-link">{aboutCta.linkLabel}<ArrowRight size={32} /></Link>
    </section>

    <footer className="vucko-footer">
      <div className="vucko-footer-links"><nav aria-label="Footer">{personal.navigation.map((item) => <Link key={item.href} href={normalizeNavigationHref(item.href)}>{item.label}</Link>)}</nav>
        <div>{socials.map((item) => <a key={item.label} href={item.href!} target="_blank" rel="noopener noreferrer">{item.label}</a>)}{resume && <a href={resume} target="_blank" rel="noopener noreferrer">{aboutHero.resumeLabel}</a>}</div>
      </div>
      <div className="vucko-footer-bottom"><Link href="/" className="vucko-footer-wordmark">{personal.shortName.toUpperCase()}</Link><a href="#about-top" aria-label={uiLabels.pageAriaLabel}><ArrowUp size={22} /></a><p>© {new Date().getFullYear()} {personal.name}</p></div>
    </footer>
  </div>;
}
