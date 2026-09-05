import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { personal } from "@/content/personal";
import { brands } from "@/content/pages/home";
import { projects } from "@/content/projects";
import {
  aboutHero, uiLabels, proof, capabilities, aiPractice, profileFacts,
  sectionLabels, experience, recognition, education, afterwork,
  afterworkDisplay, aboutCta, type AfterworkItem,
} from "@/content/pages/about";
import { getSafeExternalHref } from "@/lib/security.mjs";
import { Footer } from "@/components/layout/Footer";
import { AboutIntro } from "@/components/about/AboutIntro";

export const metadata: Metadata = {
  title: `${uiLabels.metadataTitle} | ${personal.name}`,
  description: aboutHero.hookSub,
};

function CaseLink({ projectSlug, linkLabel }: { projectSlug?: string; linkLabel?: string }) {
  if (!projectSlug || !linkLabel) return null;
  const project = projects.find((item) => item.slug === projectSlug);
  if (!project) return null;
  return <Link className="about-case-link" href={`/work/${project.slug}`}>{linkLabel}<ArrowUpRight size={15} /></Link>;
}

function PersonalPhoto({ item }: { item: AfterworkItem }) {
  return <details className="afterwork-item" data-native-cursor>
    <summary>
      {item.image && <Image src={item.image} alt={item.title} loading="lazy" width={600} height={600} unoptimized />}
      <span>{item.title}<span className="afterwork-plus" aria-hidden="true">+</span></span>
      {item.subtitle && <small>{item.subtitle}</small>}
    </summary>
    <div><p>{item.description}</p>{item.takeaway && <p className="afterwork-takeaway">{item.takeaway}</p>}</div>
  </details>;
}

export default function AboutPage() {
  const resume = getSafeExternalHref(personal.resumeUrl);
  const featuredPhotos = [...new Set<string>(afterworkDisplay.featuredIds)]
    .map((id) => afterwork.find((item) => item.id === id))
    .filter((item): item is AfterworkItem => Boolean(item));
  const archivedPhotos = afterwork.filter((item) => !featuredPhotos.some((featured) => featured.id === item.id));
  const visibleBrands = brands.filter((brand) => brand.logo);

  return <>
    <AboutIntro />
    <div className="about-editorial about-refresh">
      {proof.items.length > 0 && <section className="about-proof" aria-labelledby="about-proof-heading">
        <h2 id="about-proof-heading">{proof.heading}</h2>
        <div className="about-proof-grid">{proof.items.map((item, index) => <article key={`${item.title}-${index}`}>
          <p className="about-proof-value">{item.value}</p>
          <h3>{item.title}</h3><p>{item.body}</p>
          <CaseLink {...item} />
        </article>)}</div>
      </section>}

      {capabilities.items.length > 0 && <section className="about-capabilities" aria-labelledby="about-capabilities-heading">
        <header className="about-section-intro"><h2 id="about-capabilities-heading">{capabilities.heading}</h2><p>{capabilities.body}</p></header>
        <div>{capabilities.items.map((item, index) => <article className="about-capability" key={`${item.title}-${index}`}>
          <h3><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>{item.title}</h3>
          <div><p>{item.body}</p><p className="about-methods">{item.tools}</p><CaseLink {...item} /></div>
        </article>)}</div>
      </section>}

      {aiPractice.items.length > 0 && <section className="about-ai" aria-labelledby="about-ai-heading">
        <p className="eyebrow">{aiPractice.kicker}</p>
        <header className="about-section-intro"><h2 id="about-ai-heading">{aiPractice.heading}</h2><p>{aiPractice.body}</p></header>
        <div className="about-ai-grid">{aiPractice.items.map((item, index) => <article key={`${item.title}-${index}`}>
          {item.image && <figure><Image src={item.image} alt={item.imageAlt} loading="lazy" width={1000} height={625} unoptimized /><figcaption>{item.caption}</figcaption></figure>}
          <h3>{item.title}</h3><p>{item.body}</p><CaseLink {...item} />
        </article>)}</div>
      </section>}

      <section className="about-records" aria-label={uiLabels.experienceAriaLabel}>
        <div><h2>{sectionLabels.experience}</h2>{experience.map((item) => <article key={`${item.company}-${item.role}`}>
          <p className="record-date">{item.period} / {item.location}</p><h3>{item.company}</h3><p className="about-record-role">{item.role}</p>{item.summary && <p>{item.summary}</p>}
        </article>)}</div>
        <div className="about-credentials">
          {recognition.length > 0 && <div><h2>{sectionLabels.recognition}</h2>{recognition.map((item) => <article key={item.event}><h3>{item.title}</h3><p>{item.event}</p>{item.note && <p>{item.note}</p>}</article>)}</div>}
          <div><h2>{sectionLabels.education}</h2><article><h3>{education.school}</h3><p>{education.degree}</p><p>{uiLabels.gpaLabel} {education.gpa}</p><p>{education.graduation}</p></article></div>
          {profileFacts.length > 0 && <dl className="about-profile-facts">{profileFacts.map((fact, index) => <div key={`${fact.label}-${index}`}><dt>{fact.label}</dt><dd>{fact.primary}<span>{fact.secondary}</span></dd></div>)}</dl>}
        </div>
      </section>

      {visibleBrands.length > 0 && <section className="about-brand-context" aria-label={uiLabels.brandsAriaLabel}>
        <p>{sectionLabels.brands}</p><div className="about-brands">{visibleBrands.map((brand) =>
          // eslint-disable-next-line @next/next/no-img-element
          <img key={brand.name} src={brand.logo!} alt={brand.name} loading="lazy" />)}</div>
      </section>}

      <section className="about-outro" aria-labelledby="about-contact-heading">
        <p className="eyebrow">{aboutCta.kicker}</p><h2 id="about-contact-heading">{aboutCta.headline}</h2><p>{aboutCta.body}</p>
        <div className="about-actions"><Link href="/contact" className="text-link">{aboutCta.linkLabel}<ArrowUpRight size={16} /></Link>
          {resume && <a href={resume} className="about-case-link" target="_blank" rel="noopener noreferrer">{aboutHero.resumeLabel}<ArrowUpRight size={16} /></a>}
        </div>
      </section>

      {afterwork.length > 0 && <section className="afterwork-archive" id="afterwork" aria-labelledby="afterwork-heading">
        <header className="about-section-intro"><h2 id="afterwork-heading">{afterworkDisplay.heading}</h2><p>{afterworkDisplay.body}</p></header>
        {featuredPhotos.length > 0 && <div className="afterwork-grid">{featuredPhotos.map((item) => <PersonalPhoto key={item.id} item={item} />)}</div>}
        {archivedPhotos.length > 0 && <details className="about-photo-archive" data-native-cursor>
          <summary>{afterworkDisplay.moreLabel}<span aria-hidden="true">+</span></summary>
          <div className="afterwork-grid">{archivedPhotos.map((item) => <PersonalPhoto key={item.id} item={item} />)}</div>
        </details>}
      </section>}
    </div>
    <Footer />
  </>;
}
