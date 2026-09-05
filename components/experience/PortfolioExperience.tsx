"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { usePathname, useRouter } from "next/navigation";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { ArrowRight } from "lucide-react";
import { Navigation } from "@/components/layout/Navigation";
import { scrambleText, wavePath } from "@/lib/experience-math.mjs";

const SignalPole = dynamic(() => import("./SignalPole"), { ssr: false });
gsap.registerPlugin(CustomEase, SplitText, ScrambleTextPlugin);
CustomEase.create("portfolio-route", "M0,0 C0.22,0.28 0.28,1 1,1");
CustomEase.create("portfolio-settle", "M0,0 C0.2,1 0.25,1 1,1");

export function PortfolioExperience({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const surface = useRef<HTMLElement>(null);
  const snapshot = useRef<HTMLDivElement>(null);
  const mask = useRef<SVGPathElement>(null);
  const transition = useRef<gsap.core.Timeline | null>(null);
  const pending = useRef(false);
  const previousPath = useRef(pathname);
  const [ready, setReady] = useState(false);
  const [entered, setEntered] = useState(false);
  const [sceneLoaded, setSceneLoaded] = useState(pathname !== "/");

  useEffect(() => {
    const capture = () => {
      transition.current?.kill();
      const target = snapshot.current;
      const main = surface.current;
      if (!target || !main) return;
      const frame = document.createElement("div");
      frame.className = "route-snapshot-frame";
      if (previousPath.current === "/") {
        const source = document.querySelector<HTMLCanvasElement>(".signal-scene canvas");
        if (source) {
          const canvas = document.createElement("canvas");
          canvas.width = source.width;
          canvas.height = source.height;
          canvas.getContext("2d")?.drawImage(source, 0, 0);
          canvas.className = "route-scene-snapshot";
          frame.append(canvas);
        }
      }
      const copy = main.cloneNode(true) as HTMLElement;
      copy.removeAttribute("id");
      copy.querySelectorAll("[id]").forEach((element) => element.removeAttribute("id"));
      copy.style.transform = `translateY(${-window.scrollY}px)`;
      frame.append(copy);
      target.replaceChildren(frame);
      gsap.set(target, { autoAlpha: 1, filter: "brightness(1)" });
      mask.current?.setAttribute("d", wavePath(100, 100, innerWidth, innerHeight, true));
    };
    const navigate = (href: string) => {
      if (href === pathname) return;
      if (!matchMedia("(prefers-reduced-motion: reduce)").matches) capture();
      pending.current = true;
      router.push(href);
    };
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element).closest<HTMLAnchorElement>("a[href]");
      if (!link || link.target || link.hasAttribute("download") || link.dataset.noTransition !== undefined) return;
      const url = new URL(link.href, location.href);
      if (url.origin !== location.origin || url.hash || url.pathname.startsWith("/keystatic") || url.pathname === pathname) return;
      event.preventDefault();
      navigate(url.pathname + url.search);
    };
    const onSceneNavigate = (event: Event) => navigate((event as CustomEvent<string>).detail);
    const onHistory = () => {
      if (location.pathname === previousPath.current) return;
      if (!matchMedia("(prefers-reduced-motion: reduce)").matches) capture();
      pending.current = true;
    };
    document.addEventListener("click", onClick, true);
    window.addEventListener("portfolio:navigate", onSceneNavigate);
    window.addEventListener("popstate", onHistory);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("portfolio:navigate", onSceneNavigate);
      window.removeEventListener("popstate", onHistory);
    };
  }, [pathname, router]);

  useLayoutEffect(() => {
    if (pathname === previousPath.current) return;
    previousPath.current = pathname;
    window.dispatchEvent(new Event("portfolio:route-change"));
    transition.current?.kill();
    const finish = () => {
      pending.current = false;
      if (snapshot.current) {
        gsap.set(snapshot.current, { autoAlpha: 0 });
        snapshot.current.replaceChildren();
      }
    };
    if (!snapshot.current?.childElementCount || matchMedia("(prefers-reduced-motion: reduce)").matches) { finish(); return; }
    const wave = { edge: 100, control: 100 };
    const update = () => mask.current?.setAttribute("d", wavePath(wave.edge, wave.control, innerWidth, innerHeight, true));
    transition.current = gsap.timeline({ onComplete: finish })
      .to(snapshot.current, { filter: "brightness(0.32)", duration: 0.5, ease: "power2.inOut" }, 0)
      .to(wave, { edge: 50, duration: 1.3, ease: "portfolio-route", onUpdate: update }, 0)
      .to(wave, { edge: 0, control: 0, duration: 1.3, ease: "portfolio-settle", onUpdate: update }, 0.65)
      .to(snapshot.current, { autoAlpha: 0, duration: 0.18 }, 1.97);
  }, [pathname]);

  useLayoutEffect(() => {
    if (!ready || !surface.current || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    window.dispatchEvent(new Event("portfolio:ready"));
    const context = gsap.context(() => {
      const headings = surface.current!.querySelectorAll<HTMLElement>("[data-reveal-heading]");
      const splits = Array.from(headings, (heading) => SplitText.create(heading, { type: "lines", tag: "span", linesClass: "reveal-line" }));
      const elements = surface.current!.querySelectorAll<HTMLElement>("[data-reveal], .reveal-line");
      gsap.from(elements, { autoAlpha: 0, y: 16, duration: 1.02, stagger: 0.075, delay: pending.current ? 0.65 : 0, ease: "power2.out", clearProps: "all" });
      return () => splits.forEach((split) => split.revert());
    }, surface);
    return () => context.revert();
  }, [pathname, ready]);

  useEffect(() => () => { transition.current?.kill(); }, []);
  return (
    <div className="portfolio-experience" data-home={pathname === "/"} data-ready={ready}>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <SignalPole active={pathname === "/" && ready} onReady={() => setSceneLoaded(true)} />
      <main id="main-content" className="experience-content" ref={surface} tabIndex={-1}>{children}</main>
      <Navigation />
      <svg className="transition-definitions" aria-hidden="true"><defs><clipPath id="portfolio-route-mask" clipPathUnits="userSpaceOnUse"><path ref={mask} fillRule="evenodd" clipRule="evenodd" /></clipPath></defs></svg>
      <div className="route-snapshot" ref={snapshot} aria-hidden="true" inert />
      <Pointer />
      {!entered && <Preloader loaded={sceneLoaded} onReveal={() => setReady(true)} onComplete={() => setEntered(true)} />}
    </div>
  );
}

function Preloader({ loaded, onReveal, onComplete }: { loaded: boolean; onReveal: () => void; onComplete: () => void }) {
  const label = useRef<HTMLSpanElement>(null);
  const shape = useRef<SVGPathElement>(null);
  const complete = useRef(onComplete);
  const reveal = useRef(onReveal);
  const loadedRef = useRef(loaded);
  useEffect(() => { loadedRef.current = loaded; }, [loaded]);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { reveal.current(); complete.current(); return; }
    let elapsed = 0;
    let started = false;
    let timeline: gsap.core.Timeline | undefined;
    const tick = (_: number, delta: number) => {
      elapsed += delta / 1000;
      if (!started && label.current) label.current.textContent = scrambleText("", ["Loading...", "Almost there...", "Just a moment..."][Math.floor(elapsed / 1.5) % 3], Math.min((elapsed % 1.5) / 0.8, 1), Math.floor(elapsed / 1.5));
      if (started || (!loadedRef.current && elapsed < 3.5)) return;
      started = true;
      const wave = { edge: 100, control: 100 };
      let revealed = false;
      const draw = () => {
        shape.current?.setAttribute("d", `M 0 0 V ${wave.edge} Q 50 ${wave.control} 100 ${wave.edge} V 0 Z`);
        if (!revealed && wave.edge <= 26) { revealed = true; reveal.current(); }
      };
      timeline = gsap.timeline({ onComplete: () => complete.current() })
        .to(label.current, { duration: 0.52, scrambleText: { text: "Thanks for waiting - all set.", chars: "upperAndLowerCase", revealDelay: 0.18, speed: 0.82 }, ease: "none" }, 0)
        .to(label.current, { opacity: 0, duration: 0.6, scrambleText: { text: "", chars: "upperAndLowerCase0123456789<>!?_#*+", speed: 0.82 }, ease: "power2.in" }, 1.15)
        .to(wave, { edge: 50, duration: 1.3, ease: "portfolio-route", onUpdate: draw }, 1.15)
        .to(wave, { edge: 0, control: 0, duration: 1.3, ease: "portfolio-settle", onUpdate: draw }, 1.8);
    };
    gsap.ticker.add(tick);
    return () => { gsap.ticker.remove(tick); timeline?.kill(); };
  }, []);
  return <div className="preloader" aria-label="Loading portfolio" role="status"><svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMin slice" aria-hidden="true"><path ref={shape} fill="#050505" d="M 0 0 V 100 Q 50 100 100 100 V 0 Z" /></svg><span ref={label} aria-hidden="true">Loading...</span></div>;
}

function Pointer() {
  const cursor = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!cursor.current || !matchMedia("(pointer: fine)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const element = cursor.current;
    const x = gsap.quickTo(element, "x", { duration: 0.42, ease: "power3.out" });
    const y = gsap.quickTo(element, "y", { duration: 0.42, ease: "power3.out" });
    let currentLabel = "";
    const setLabel = (text: string) => {
      if (text === currentLabel) return;
      currentLabel = text;
      if (label.current) label.current.textContent = text;
      element.dataset.expanded = String(Boolean(text));
      gsap.to(element, { autoAlpha: text ? 1 : 0, rotate: text ? 0 : -16, duration: 0.18, overwrite: "auto" });
    };
    const move = (event: PointerEvent) => {
      x(Math.max(8, Math.min(event.clientX - element.offsetWidth / 2 - 3, innerWidth - element.offsetWidth - 8)));
      y(Math.max(8, Math.min(event.clientY - element.offsetHeight - 1, innerHeight - element.offsetHeight - 8)));
      const target = (event.target as Element).closest<HTMLElement>("[data-cursor],a,button,summary");
      if (!(event.target as Element).closest(".signal-scene")) setLabel(target?.dataset.cursor || (target?.matches("a,button,summary") ? "Open" : ""));
    };
    const sceneLabel = (event: Event) => setLabel((event as CustomEvent<string>).detail);
    const leave = () => { currentLabel = ""; gsap.set(element, { autoAlpha: 0 }); };
    const reset = () => { setLabel(""); leave(); };
    window.addEventListener("pointermove", move);
    document.documentElement.addEventListener("pointerleave", leave);
    window.addEventListener("portfolio:cursor", sceneLabel);
    window.addEventListener("portfolio:route-change", reset);
    return () => {
      x.tween.kill(); y.tween.kill();
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
      window.removeEventListener("portfolio:cursor", sceneLabel);
      window.removeEventListener("portfolio:route-change", reset);
    };
  }, []);
  return <div className="pointer-stalker" ref={cursor} aria-hidden="true"><span ref={label} /><ArrowRight size={18} strokeWidth={1.4} /></div>;
}
