"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Own only this page's motion; the shared route transition and hovers stay independent. */
export function AboutMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const page = root.current;
    if (!page) return;
    const shell = page.closest<HTMLElement>(".portfolio-experience");
    const media = gsap.matchMedia();
    let started = false;
    let refreshFrame = 0;
    let observer: ResizeObserver | undefined;

    const refresh = () => {
      cancelAnimationFrame(refreshFrame);
      refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());
    };
    const start = () => {
      if (started) return;
      started = true;
      media.add({ motion: "(prefers-reduced-motion: no-preference)" }, (context) => {
        if (!context.conditions?.motion) return;
        const select = gsap.utils.selector(page);

        const entrance = gsap.timeline({ defaults: { ease: "power3.out" } });
        entrance.from(select(".vucko-letter-mask > span"), { yPercent: 110, stagger: .06, duration: .7 })
          .from(select(".vucko-preview-media img"), { scale: 1.03, duration: 1 }, 0)
          .from(select(".vucko-hero-bottom"), { y: 12, duration: .52 }, .4);

        // One continuous image travels from the hero thumbnail to its full-width slot.
        // The stationary holder makes refresh measurements independent of the tween.
        const holder = page.querySelector<HTMLElement>(".vucko-hero-preview");
        const preview = page.querySelector<HTMLElement>(".vucko-preview-motion");
        const previewMedia = page.querySelector<HTMLElement>(".vucko-preview-media");
        const frame = page.querySelector<HTMLElement>(".vucko-portrait-frame");
        if (holder && preview && previewMedia && frame) {
          page.classList.add("vucko-morph-active");
          const expansion = gsap.timeline({
            defaults: { ease: "power2.inOut" },
            scrollTrigger: { trigger: page, start: "top top", endTrigger: frame, end: "top 100px", scrub: .65, invalidateOnRefresh: true },
          });
          expansion.fromTo(preview, { x: 0, y: 0, width: () => holder.clientWidth }, {
            x: () => frame.getBoundingClientRect().left - holder.getBoundingClientRect().left,
            y: () => frame.getBoundingClientRect().top - holder.getBoundingClientRect().top,
            width: () => frame.clientWidth,
          }, 0).fromTo(previewMedia, { height: () => holder.clientWidth * 9 / 16 }, { height: () => frame.clientHeight }, 0);
        }

        refresh();
        return () => {
          page.classList.remove("vucko-morph-active");
        };
      }, page);
      // Native photo disclosures, language changes and late media can alter page height.
      observer = new ResizeObserver(refresh);
      observer.observe(page);
    };

    if (!shell || shell.dataset.ready === "true" || matchMedia("(prefers-reduced-motion: reduce)").matches) start();
    window.addEventListener("portfolio:ready", start);
    page.addEventListener("load", refresh, true);
    page.addEventListener("toggle", refresh, true);
    return () => {
      window.removeEventListener("portfolio:ready", start);
      page.removeEventListener("load", refresh, true);
      page.removeEventListener("toggle", refresh, true);
      observer?.disconnect();
      cancelAnimationFrame(refreshFrame);
      media.revert();
    };
  }, []);

  return <div className="vucko-about" ref={root}>{children}</div>;
}
