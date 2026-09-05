"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ArrowUpRight, ChevronLeft, ChevronRight, Pause, Play, X } from "lucide-react";
import { projects, getIndustries } from "@/content/projects";
import { wheelPixels, wrap } from "@/lib/experience-math.mjs";

export function WorkArchive() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const firstSet = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const previewImage = useRef<HTMLDivElement>(null);
  const previewBody = useRef<HTMLDivElement>(null);
  const source = useRef<HTMLElement | null>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const closing = useRef<gsap.core.Timeline | null>(null);
  const drag = useRef<{ x: number; y: number; lastX: number; lastY: number } | null>(null);
  const moved = useRef(false);
  const speed = useRef({ velocity: 0, position: 0, scale: 1, paused: false, hovered: false, focused: false });
  const [selected, setSelected] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? projects : projects.filter((project) => project.industry === filter);
  const selectedProject = selected === null ? null : projects[selected];
  const selectedRef = useRef(selected);
  useLayoutEffect(() => { selectedRef.current = selected; speed.current.paused = paused || selected !== null; }, [paused, selected]);

  useLayoutEffect(() => {
    const element = track.current;
    const set = firstSet.current;
    if (!element || !set) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let width = set.getBoundingClientRect().width;
    const resize = new ResizeObserver(() => { const next = set.getBoundingClientRect().width; if (width > 0) speed.current.position *= next / width; width = next; });
    resize.observe(set);
    const draw = () => { if (!reduced.matches && !speed.current.focused) gsap.set(element, { x: -width - wrap(speed.current.position, width) }); };
    draw();
    const tick = (_: number, milliseconds: number) => {
      if (reduced.matches || document.hidden) return;
      const dt = Math.min(milliseconds / 1000, 0.064);
      const state = speed.current;
      const target = state.paused || state.hovered || state.focused || drag.current ? 0 : 1;
      state.scale += (target - state.scale) * (1 - Math.exp(-dt / 0.24));
      if (!state.paused) state.position += (48 * state.scale + state.velocity) * dt;
      state.velocity *= Math.pow(0.018, dt);
      draw();
    };
    gsap.ticker.add(tick);
    let entry: gsap.core.Tween | undefined;
    const enter = () => {
      if (reduced.matches || entry) return;
      const cards = Array.from(element.querySelectorAll<HTMLElement>(".archive-card"));
      const visible = cards.filter((card) => { const rect = card.getBoundingClientRect(); return rect.right > -innerWidth * 0.1 && rect.left < innerWidth * 1.1; });
      entry = gsap.from(visible, { autoAlpha: 0, y: 84, scale: 0.985, duration: 1.28, stagger: 0.085, delay: 0.6, ease: "expo.out", clearProps: "all" });
    };
    if (root.current?.closest("[data-ready='true']")) enter();
    window.addEventListener("portfolio:ready", enter);
    const wheel = (event: WheelEvent) => {
      if (selectedRef.current !== null || reduced.matches || event.ctrlKey) return;
      event.preventDefault();
      speed.current.velocity = gsap.utils.clamp(-2800, 2800, speed.current.velocity + wheelPixels(event, innerHeight) * 4);
    };
    const section = root.current!;
    section.addEventListener("wheel", wheel, { passive: false });
    return () => { gsap.ticker.remove(tick); resize.disconnect(); entry?.kill(); section.removeEventListener("wheel", wheel); window.removeEventListener("portfolio:ready", enter); };
  }, [filter]);

  const open = (index: number, element: HTMLElement) => {
    if (moved.current) return;
    source.current = element;
    returnFocus.current = element;
    setSelected(index);
  };
  const close = () => {
    const modal = dialog.current;
    if (!modal || closing.current?.isActive()) return;
    const finish = () => { modal.close(); setSelected(null); returnFocus.current?.focus({ preventScroll: true }); };
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { finish(); return; }
    const from = previewImage.current?.getBoundingClientRect();
    const to = source.current?.getBoundingClientRect();
    closing.current = gsap.timeline({ onComplete: finish });
    closing.current.to(previewBody.current, { autoAlpha: 0, y: 18, duration: 0.3 }, 0);
    if (from && to) closing.current.to(previewImage.current, { x: to.left - from.left, y: to.top - from.top, scaleX: to.width / from.width, scaleY: to.height / from.height, transformOrigin: "top left", duration: 0.8, ease: "expo.inOut" }, 0);
    closing.current.to(modal, { opacity: 0, duration: 0.3 }, to ? 0.5 : 0);
  };
  const change = (direction: number) => { source.current = null; setSelected((current) => wrap((current ?? 0) + direction, projects.length)); };

  useLayoutEffect(() => {
    const modal = dialog.current;
    if (selected === null || !modal) return;
    const wasOpen = modal.open;
    if (!wasOpen) modal.showModal();
    gsap.set(modal, { opacity: 1 });
    document.body.classList.add("preview-open");
    const image = previewImage.current;
    const body = previewBody.current;
    const context = gsap.context(() => {
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(body, { autoAlpha: 0, y: 18, duration: 0.7, delay: wasOpen ? 0 : 0.35, ease: "power2.out" });
      if (image && source.current && !wasOpen) {
        const from = source.current.getBoundingClientRect();
        const to = image.getBoundingClientRect();
        gsap.from(image, { x: from.left - to.left, y: from.top - to.top, scaleX: from.width / to.width, scaleY: from.height / to.height, transformOrigin: "top left", duration: 0.95, ease: "expo.inOut", clearProps: "all" });
      } else gsap.from(image, { autoAlpha: 0, scale: 0.97, duration: 0.65, ease: "power3.out", clearProps: "all" });
    }, modal);
    return () => { context.revert(); document.body.classList.remove("preview-open"); };
  }, [selected]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (selectedRef.current === null) return;
      if (event.key === "ArrowRight") { event.preventDefault(); source.current = null; setSelected((current) => wrap((current ?? 0) + 1, projects.length)); }
      if (event.key === "ArrowLeft") { event.preventDefault(); source.current = null; setSelected((current) => wrap((current ?? 0) - 1, projects.length)); }
    };
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); closing.current?.kill(); };
  }, []);

  return (
    <section className="work-page" ref={root} aria-label="Work">
      <Link href="/" className="back-button" aria-label="Back to home" data-cursor="Home"><ChevronLeft size={21} strokeWidth={2} /></Link>
      <header className="work-intro">
        <p className="eyebrow" data-reveal>Selected Work</p>
        <h1 data-reveal-heading>Projects spanning brand strategy, campaigns, consumer research, and creative execution.</h1>
      </header>
      <div className="archive-stage" aria-label="Looping project gallery"
        onPointerDown={(event) => { if (event.button !== 0) return; drag.current = { x: event.clientX, y: event.clientY, lastX: event.clientX, lastY: event.clientY }; moved.current = false; }}
        onPointerMove={(event) => {
          const start = drag.current; if (!start) return;
          const dx = start.lastX - event.clientX; const dy = start.lastY - event.clientY;
          if (Math.hypot(event.clientX - start.x, event.clientY - start.y) > 7) { moved.current = true; event.currentTarget.setPointerCapture(event.pointerId); }
          if (moved.current) speed.current.position += Math.abs(dx) > Math.abs(dy) ? dx : dy;
          start.lastX = event.clientX; start.lastY = event.clientY;
        }}
        onPointerUp={() => { drag.current = null; }} onPointerCancel={() => { drag.current = null; }} onPointerLeave={() => { if (!moved.current) drag.current = null; }}>
        <div className="archive-track" ref={track}>
          {[0, 1, 2].map((setIndex) => <div className="archive-set" ref={setIndex === 0 ? firstSet : undefined} key={setIndex}>
            {filtered.map((project) => {
              const index = projects.indexOf(project);
              return <button className="archive-item" key={project.slug} type="button" tabIndex={setIndex === 0 ? 0 : -1} aria-label={`Preview ${project.title}`} data-cursor="View Project"
                onClick={(event) => open(index, event.currentTarget)}
                onPointerEnter={() => { speed.current.hovered = true; setHovered(index); }}
                onPointerLeave={() => { speed.current.hovered = false; setHovered(null); }}
                onFocus={(event) => {
                  speed.current.hovered = true; setHovered(index);
                  if (!event.currentTarget.matches(":focus-visible") || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
                  speed.current.focused = true; speed.current.velocity = 0;
                  const card = event.currentTarget;
                  gsap.set(track.current, { x: innerWidth / 2 - card.offsetLeft - card.offsetWidth / 2 });
                  event.currentTarget.closest(".archive-stage")!.scrollLeft = 0;
                  if (root.current) root.current.scrollLeft = 0;
                }}
                onBlur={() => {
                  if (speed.current.focused && track.current && firstSet.current) speed.current.position = -Number(gsap.getProperty(track.current, "x")) - firstSet.current.offsetWidth;
                  speed.current.focused = speed.current.hovered = false; setHovered(null);
                }}>
                <span className="archive-card"><span className="archive-figure">{project.thumbnail ?
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={project.thumbnail} alt="" draggable={false} decoding="async" /> : <span className="archive-placeholder">{project.title}</span>}</span></span>
              </button>;
            })}
          </div>)}
        </div>
      </div>
      <div className="archive-caption" aria-live="polite">{hovered !== null && <><span>{projects[hovered].industry} / {projects[hovered].role}</span><p>{projects[hovered].title}</p></>}</div>
      <div className="archive-controls">
        <label><span className="sr-only">Filter projects by industry</span><select aria-label="Filter projects by industry" value={filter} onChange={(event) => setFilter(event.target.value)}>{["All", ...getIndustries()].map((industry) => <option key={industry}>{industry}</option>)}</select></label>
        <button type="button" aria-label={paused ? "Play gallery" : "Pause gallery"} aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? <Play size={14} /> : <Pause size={14} />}</button>
      </div>
      <dialog className="project-preview" ref={dialog} aria-labelledby="preview-title" onCancel={(event) => { event.preventDefault(); close(); }}>
        {selectedProject && <>
          <button type="button" className="back-button" aria-label="Close project preview" data-cursor="Close" onClick={close}><X size={20} /></button>
          <div className="preview-image" ref={previewImage}>{selectedProject.heroImage || selectedProject.thumbnail ?
            // eslint-disable-next-line @next/next/no-img-element
            <img src={selectedProject.heroImage || selectedProject.thumbnail!} alt={selectedProject.title} /> : null}</div>
          <div className="preview-body" ref={previewBody}>
            <p className="eyebrow">{selectedProject.year}</p>
            <h2 id="preview-title">{selectedProject.title}</h2>
            <p className="preview-description">{selectedProject.tagline}</p>
            <dl className="preview-meta"><div><dt>Category</dt><dd>{selectedProject.industry}</dd></div><div><dt>Role</dt><dd>{selectedProject.role}</dd></div></dl>
            <Link href={`/work/${selectedProject.slug}`} className="text-link" data-cursor="Read case study" onClick={() => { dialog.current?.close(); document.body.classList.remove("preview-open"); }}>View Project <ArrowUpRight size={17} /></Link>
          </div>
          <div className="preview-map" aria-label="Project selector">
            <button type="button" aria-label="Previous project" onClick={() => change(-1)}><ChevronLeft size={18} /></button>
            {projects.map((project, index) => <button key={project.slug} type="button" aria-label={`Show ${project.title}`} aria-pressed={selected === index} onClick={() => { source.current = null; setSelected(index); }}>{project.thumbnail ?
              // eslint-disable-next-line @next/next/no-img-element
              <img src={project.thumbnail} alt="" /> : index + 1}</button>)}
            <button type="button" aria-label="Next project" onClick={() => change(1)}><ChevronRight size={18} /></button>
          </div>
        </>}
      </dialog>
    </section>
  );
}
