"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

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
      media.add({ motion: "(prefers-reduced-motion: no-preference)", desktop: "(min-width: 761px)" }, (context) => {
        if (!context.conditions?.motion) return;
        const desktop = context.conditions.desktop;
        const select = gsap.utils.selector(page);
        const splits: SplitText[] = [];

        const entrance = gsap.timeline({ defaults: { ease: "power3.out", duration: 1.15 }, delay: .15 });
        entrance.from(select(".vucko-letter-mask > span"), { yPercent: 110, rotate: 3, stagger: .065, duration: 1.35 })
          .from(select(".vucko-preview-motion"), { opacity: 0, duration: .85 }, .4)
          .from(select(".vucko-hero-bottom"), { y: 28, opacity: 0 }, .45);

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

        // Mask whole lines instead of fading the large typography as a single block.
        select(".vucko-work-heading h2, .vucko-career-copy h2, .vucko-contact h2, .vucko-footer-wordmark").forEach((heading: HTMLElement) => {
          splits.push(SplitText.create(heading, {
            type: "lines", mask: "lines", autoSplit: true, linesClass: "vucko-reveal-line",
            onSplit: (split) => gsap.from(split.lines, {
              yPercent: 105, duration: 1.1, stagger: .09, ease: "power3.out",
              scrollTrigger: { trigger: heading, start: "top 92%", once: true },
            }),
          }));
        });

        // Bilingual text remains React-owned, so it can change without split wrappers.
        select(".vucko-statement h2").forEach((heading: HTMLElement) => {
          gsap.from(heading, { clipPath: "inset(0 0 100% 0)", y: 28, duration: 1.15, ease: "power3.out",
            scrollTrigger: { trigger: heading, start: "top 88%", once: true }, clearProps: "clipPath,transform" });
        });

        const groups = [
          ".vucko-statement-copy > *", ".vucko-work-heading > p, .vucko-work-heading > .vucko-section-label",
          ".vucko-project-grid > article", ".vucko-work-end > *", ".vucko-section-header > *",
          ".vucko-service-list > button", ".vucko-proof article", ".vucko-career-role",
          ".vucko-awards > article", ".vucko-education > div", ".vucko-brands img",
          ".vucko-afterwork > .vucko-photo-grid > .vucko-photo", ".vucko-contact > div > p", ".vucko-footer-links > *",
        ];
        groups.forEach((selector) => {
          select(selector).forEach((element: HTMLElement, index: number) => {
            gsap.from(element, { y: desktop ? 38 : 22, opacity: 0, duration: .9,
              delay: Math.min(index % 3 * .075, .15), ease: "power3.out", clearProps: "opacity,transform",
              scrollTrigger: { trigger: element, start: "top 94%", once: true } });
          });
        });

        const careerPhoto = page.querySelector<HTMLElement>(".vucko-career-photo");
        if (careerPhoto) gsap.from(careerPhoto, { clipPath: "inset(12% 0 12% 0 round 7px)", duration: 1.25, ease: "power3.out",
          scrollTrigger: { trigger: careerPhoto, start: "top 90%", once: true }, clearProps: "clipPath" });

        if (desktop) {
          gsap.to(select(".vucko-wordmark"), { y: -75, ease: "none",
            scrollTrigger: { trigger: page, start: "top top", end: "+=900", scrub: .8 } });
          gsap.fromTo(select(".vucko-statement-arrow"), { x: -18 }, { x: 12, ease: "none",
            scrollTrigger: { trigger: select(".vucko-statement")[0], start: "top bottom", end: "bottom top", scrub: 1 } });
        }

        refresh();
        return () => {
          splits.forEach((split) => split.revert());
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
