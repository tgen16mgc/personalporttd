"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { brands, type Brand } from "@/content/pages/home";

function LogoItem({ brand }: { brand: Brand }) {
  return (
    <div className="flex items-center justify-center h-10 px-8 shrink-0">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={brand.logo}
        alt={brand.name}
        className="h-7 w-auto object-contain opacity-40 hover:opacity-100 transition-opacity duration-500 grayscale hover:grayscale-0"
        onError={(e) => {
          const target = e.currentTarget;
          target.style.display = "none";
          const fallback = target.nextElementSibling as HTMLElement;
          if (fallback) fallback.style.display = "block";
        }}
      />
      <span
        className="hidden text-lg font-[var(--font-display)] font-light text-[var(--color-ink)] opacity-40 tracking-tight whitespace-nowrap"
      >
        {brand.name}
      </span>
    </div>
  );
}

export function BrandStrip() {
  const doubled = [...brands, ...brands];

  return (
    <section className="py-20 overflow-hidden">
      <Container>
        <ScrollReveal>
          <p className="section-kicker text-center mb-10">
            Worked with
          </p>
        </ScrollReveal>
      </Container>

      <div className="relative">
        {/* Edge fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-[120px] bg-gradient-to-r from-[var(--color-cream)] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-[120px] bg-gradient-to-l from-[var(--color-cream)] to-transparent z-10 pointer-events-none" />

        {/* Scrolling track */}
        <motion.div
          className="flex items-center gap-4 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: {
              repeat: Infinity,
              ease: "linear",
              duration: 30,
            },
          }}
        >
          {doubled.map((brand, i) => (
            <LogoItem key={`${brand.name}-${i}`} brand={brand} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
