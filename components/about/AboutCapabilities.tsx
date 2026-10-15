"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { capabilities, aboutHero } from "@/content/pages/about";
import { projects } from "@/content/projects";

export function AboutCapabilities() {
  const [selected, setSelected] = useState(0);
  const item = capabilities.items[selected];
  if (!item) return null;
  const project = projects.find((project) => project.slug === item.projectSlug);
  const image = project?.thumbnail || project?.heroImage;
  return <section className="vucko-capabilities" aria-labelledby="about-capabilities-heading">
    <header className="vucko-section-header">
      <h2 id="about-capabilities-heading" className="vucko-section-label">({capabilities.heading})</h2>
      <p>{capabilities.body}</p>
      <Link className="vucko-link" href="/work">{aboutHero.workLabel}</Link>
    </header>
    <div className="vucko-services-grid">
      <div className="vucko-service-preview" aria-live="polite">
        <div className="vucko-service-content" key={selected}>
        {image && <Image src={image} alt={item.title} width={600} height={380} unoptimized />}
        <p>{item.body}</p><p className="vucko-methods">{item.tools}</p>
        {project && item.linkLabel && <Link className="vucko-link" href={`/work/${project.slug}`}>{item.linkLabel}</Link>}
        </div>
      </div>
      <div className="vucko-service-list" role="group" aria-label={capabilities.heading} data-native-cursor>
        {capabilities.items.map((item, index) => <button type="button" key={item.title} aria-pressed={selected === index}
          onPointerEnter={(event) => { if (event.pointerType === "mouse") setSelected(index); }}
          onFocus={() => setSelected(index)} onClick={() => setSelected(index)}>{item.title}</button>)}
      </div>
    </div>
  </section>;
}
