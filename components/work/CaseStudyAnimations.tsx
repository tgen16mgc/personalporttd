"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";

type RevealProps = { children: ReactNode; className?: string; delay?: number };

export function FadeInUp({ children, className = "", delay = 0 }: RevealProps) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = root.current;
    if (!element || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let tween: gsap.core.Tween | undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      tween = gsap.from(element, { opacity: 0, y: 16, duration: 1.02, delay, ease: "power2.out", clearProps: "all" });
    }, { threshold: 0.08 });
    observer.observe(element);
    return () => { observer.disconnect(); tween?.revert(); };
  }, [delay]);
  return <div ref={root} className={className}>{children}</div>;
}

export function StaggerContainer({ children, className = "" }: RevealProps) {
  return <div className={className}>{children}</div>;
}

export function StaggerItem({ children, className = "" }: RevealProps) {
  return <FadeInUp className={className}>{children}</FadeInUp>;
}

export function AnimatedDivider({ color }: { color: string }) {
  return <hr className="case-divider" style={{ borderColor: color + "29" }} />;
}

export function HeroMetric({ metric, value }: { metric: string; value: string; color: string }) {
  return <FadeInUp><div className="case-hero-metric"><strong>{value}</strong><span>{metric}</span></div></FadeInUp>;
}

export function SupportMetric({ metric, value, index }: { metric: string; value: string; color: string; index: number }) {
  return <FadeInUp delay={index * 0.075}><div className="case-support-metric"><span>{metric}</span><strong>{value}</strong></div></FadeInUp>;
}

export function SectionHeading({ children, eyebrow, as: Tag = "h2" }: { children: ReactNode; color: string; eyebrow?: string; as?: "h2" | "h3" }) {
  return <FadeInUp className="case-section-heading">{eyebrow && <p className="eyebrow">{eyebrow}</p>}<Tag>{children}</Tag></FadeInUp>;
}
