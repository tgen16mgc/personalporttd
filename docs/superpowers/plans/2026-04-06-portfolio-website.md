# Tien Duong Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a creative marketing portfolio website for Tien Duong Ngoc that stands out with craft, warmth, and personality — targeting agency recruiters.

**Architecture:** Next.js 14 App Router with Server Components. Tailwind CSS for styling with custom design tokens (warm cream palette). Framer Motion for scroll-triggered animations and micro-interactions. Content stored as TypeScript data files for type safety.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS 4, Framer Motion 11, Lucide React icons, next/font (Fraunces, Space Grotesk, JetBrains Mono)

---

## File Structure

```
/Users/tienduonn/Downloads/portnew/
├── app/
│   ├── layout.tsx              # Root layout with fonts, metadata, FilmGrain
│   ├── page.tsx                # Home page
│   ├── globals.css             # Tailwind directives + custom utilities
│   ├── work/
│   │   ├── page.tsx            # Projects grid
│   │   └── [slug]/page.tsx     # Individual case study
│   ├── about/page.tsx          # About page
│   └── contact/page.tsx        # Contact page
├── components/
│   ├── ui/
│   │   ├── Button.tsx          # Magnetic hover button
│   │   ├── Card.tsx            # Double-bezel card
│   │   ├── Container.tsx       # Max-width wrapper
│   │   └── ScrollReveal.tsx    # Intersection Observer wrapper
│   ├── layout/
│   │   ├── Navigation.tsx      # Floating pill nav
│   │   ├── Footer.tsx          # Contact CTA footer
│   │   └── FilmGrain.tsx       # Film grain texture overlay
│   ├── home/
│   │   ├── Hero.tsx            # Hero section
│   │   ├── QuickIntro.tsx      # Stats + intro
│   │   ├── FeaturedProjects.tsx # Project grid
│   │   └── SkillsGlimpse.tsx   # Skills section
│   ├── work/
│   │   ├── ProjectCard.tsx     # Z-axis cascade card
│   │   └── CaseStudyLayout.tsx # Case study template
│   └── about/
│       ├── Philosophy.tsx      # Life philosophy section
│       ├── Journey.tsx         # Career timeline
│       └── PersonalCorner.tsx  # Hobbies/interests
├── content/
│   └── projects.ts             # Project data
├── lib/
│   ├── fonts.ts                # Font configuration
│   ├── animations.ts           # Framer Motion variants
│   └── utils.ts                # cn() utility
├── public/
│   └── images/                 # Project images
├── tailwind.config.ts
├── next.config.ts
├── tsconfig.json
└── package.json
```

---

## Task 1: Initialize Next.js Project

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `tailwind.config.ts`
- Create: `app/globals.css`

- [ ] **Step 1: Create Next.js project**

Run:
```bash
cd /Users/tienduonn/Downloads/portnew
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --use-npm
```

When prompted:
- Would you like to use Turbopack? → **Yes**

Expected: Project initialized with default Next.js structure

- [ ] **Step 2: Install additional dependencies**

Run:
```bash
npm install framer-motion lucide-react clsx tailwind-merge
```

Expected: Dependencies added to package.json

- [ ] **Step 3: Verify installation**

Run:
```bash
npm run dev
```

Expected: Dev server starts at http://localhost:3000

- [ ] **Step 4: Commit**

```bash
git init
git add .
git commit -m "chore: initialize Next.js 14 project with dependencies"
```

---

## Task 2: Configure Design Tokens

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `app/globals.css`

- [ ] **Step 1: Update Tailwind config with design tokens**

Replace `tailwind.config.ts` with:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#FDFBF7",
          100: "#F5F3EF",
          200: "#EBE7E0",
        },
        ink: {
          DEFAULT: "#1A1A1A",
          light: "#666666",
          muted: "#999999",
        },
        accent: {
          cyan: "#06B6D4",
          gold: "#D4A574",
          pink: "#EC4899",
        },
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      letterSpacing: {
        tighter: "-0.02em",
        tight: "-0.01em",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "grain": "grain 8s steps(10) infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-5%, -10%)" },
          "20%": { transform: "translate(-15%, 5%)" },
          "30%": { transform: "translate(7%, -25%)" },
          "40%": { transform: "translate(-5%, 25%)" },
          "50%": { transform: "translate(-15%, 10%)" },
          "60%": { transform: "translate(15%, 0%)" },
          "70%": { transform: "translate(0%, 15%)" },
          "80%": { transform: "translate(3%, 35%)" },
          "90%": { transform: "translate(-10%, 10%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 2: Update globals.css with base styles**

Replace `app/globals.css` with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    @apply bg-cream-50 text-ink antialiased;
  }

  ::selection {
    @apply bg-accent-cyan/20 text-ink;
  }
}

@layer components {
  .container-wide {
    @apply mx-auto w-full max-w-7xl px-6 md:px-8 lg:px-12;
  }

  .text-balance {
    text-wrap: balance;
  }
}

@layer utilities {
  .min-h-dvh {
    min-height: 100dvh;
  }
}
```

- [ ] **Step 3: Verify styles**

Run:
```bash
npm run dev
```

Visit http://localhost:3000 — page should have warm cream background

- [ ] **Step 4: Commit**

```bash
git add tailwind.config.ts app/globals.css
git commit -m "style: add design tokens and base styles"
```

---

## Task 3: Configure Fonts

**Files:**
- Create: `lib/fonts.ts`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Create fonts configuration**

Create `lib/fonts.ts`:

```typescript
import { Fraunces, Space_Grotesk, JetBrains_Mono } from "next/font/google";

export const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: ["400", "500"],
});
```

- [ ] **Step 2: Update root layout with fonts**

Replace `app/layout.tsx` with:

```typescript
import type { Metadata } from "next";
import { fraunces, spaceGrotesk, jetbrainsMono } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tien Duong Ngoc | Marketing Portfolio",
  description: "Where insight meets intention. Creative marketing portfolio showcasing strategy, storytelling, and soul.",
  keywords: ["marketing", "portfolio", "creative", "strategy", "Tien Duong"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-sans">{children}</body>
    </html>
  );
}
```

- [ ] **Step 3: Verify fonts load**

Run:
```bash
npm run dev
```

Open DevTools → Network → check that Fraunces, Space Grotesk, JetBrains Mono fonts load

- [ ] **Step 4: Commit**

```bash
mkdir -p lib
git add lib/fonts.ts app/layout.tsx
git commit -m "feat: configure custom fonts (Fraunces, Space Grotesk, JetBrains Mono)"
```

---

## Task 4: Create Utility Functions

**Files:**
- Create: `lib/utils.ts`

- [ ] **Step 1: Create cn utility for class merging**

Create `lib/utils.ts`:

```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 2: Commit**

```bash
git add lib/utils.ts
git commit -m "feat: add cn utility for class merging"
```

---

## Task 5: Create Animation Variants

**Files:**
- Create: `lib/animations.ts`

- [ ] **Step 1: Create Framer Motion animation variants**

Create `lib/animations.ts`:

```typescript
import { Variants } from "framer-motion";

export const springConfig = {
  type: "spring" as const,
  stiffness: 100,
  damping: 20,
};

export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: springConfig,
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: springConfig,
  },
};

export const slideInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: springConfig,
  },
};
```

- [ ] **Step 2: Commit**

```bash
git add lib/animations.ts
git commit -m "feat: add Framer Motion animation variants"
```

---

## Task 6: Create FilmGrain Component

**Files:**
- Create: `components/layout/FilmGrain.tsx`

- [ ] **Step 1: Create film grain overlay component**

Create `components/layout/FilmGrain.tsx`:

```typescript
"use client";

export function FilmGrain() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 opacity-[0.03]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
      }}
    />
  );
}
```

- [ ] **Step 2: Add FilmGrain to root layout**

Update `app/layout.tsx`:

```typescript
import type { Metadata } from "next";
import { fraunces, spaceGrotesk, jetbrainsMono } from "@/lib/fonts";
import { FilmGrain } from "@/components/layout/FilmGrain";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tien Duong Ngoc | Marketing Portfolio",
  description: "Where insight meets intention. Creative marketing portfolio showcasing strategy, storytelling, and soul.",
  keywords: ["marketing", "portfolio", "creative", "strategy", "Tien Duong"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-sans">
        {children}
        <FilmGrain />
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Verify film grain appears**

Run:
```bash
npm run dev
```

Page should have subtle noise texture overlay

- [ ] **Step 4: Commit**

```bash
mkdir -p components/layout
git add components/layout/FilmGrain.tsx app/layout.tsx
git commit -m "feat: add film grain texture overlay"
```

---

## Task 7: Create Container Component

**Files:**
- Create: `components/ui/Container.tsx`

- [ ] **Step 1: Create Container component**

Create `components/ui/Container.tsx`:

```typescript
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "main";
}

export function Container({
  children,
  className,
  as: Component = "div",
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "mx-auto w-full max-w-7xl px-6 md:px-8 lg:px-12",
        className
      )}
    >
      {children}
    </Component>
  );
}
```

- [ ] **Step 2: Commit**

```bash
mkdir -p components/ui
git add components/ui/Container.tsx
git commit -m "feat: add Container component"
```

---

## Task 8: Create ScrollReveal Component

**Files:**
- Create: `components/ui/ScrollReveal.tsx`

- [ ] **Step 1: Create ScrollReveal component using Framer Motion**

Create `components/ui/ScrollReveal.tsx`:

```typescript
"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";
import { fadeInUp } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
  once?: boolean;
}

export function ScrollReveal({
  children,
  className,
  variants = fadeInUp,
  delay = 0,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{ delay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/ui/ScrollReveal.tsx
git commit -m "feat: add ScrollReveal component with Intersection Observer"
```

---

## Task 9: Create Button Component with Magnetic Hover

**Files:**
- Create: `components/ui/Button.tsx`

- [ ] **Step 1: Create Button component with magnetic effect**

Create `components/ui/Button.tsx`:

```typescript
"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className,
}: ButtonProps) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set((e.clientX - centerX) * 0.15);
    y.set((e.clientY - centerY) * 0.15);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const variants = {
    primary: "bg-ink text-cream-50 hover:bg-ink/90",
    secondary: "bg-cream-100 text-ink border border-ink/10 hover:border-ink/20",
    ghost: "bg-transparent text-ink hover:bg-cream-100",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      ref={ref as any}
      href={href}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-200",
        variants[variant],
        sizes[size],
        className
      )}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </Component>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/ui/Button.tsx
git commit -m "feat: add Button component with magnetic hover effect"
```

---

## Task 10: Create Card Component

**Files:**
- Create: `components/ui/Card.tsx`

- [ ] **Step 1: Create double-bezel Card component**

Create `components/ui/Card.tsx`:

```typescript
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        "relative rounded-2xl bg-cream-100/50 p-[1px]",
        "before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-cream-200/80 before:to-transparent before:opacity-50",
        hover && "transition-transform duration-300 hover:-translate-y-1",
        className
      )}
    >
      <div className="relative rounded-[15px] bg-cream-50 p-6 shadow-sm">
        {children}
      </div>
    </div>
  );
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("mb-4", className)}>{children}</div>;
}

export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn(className)}>{children}</div>;
}
```

- [ ] **Step 2: Commit**

```bash
git add components/ui/Card.tsx
git commit -m "feat: add Card component with double-bezel style"
```

---

## Task 11: Create Navigation Component

**Files:**
- Create: `components/layout/Navigation.tsx`

- [ ] **Step 1: Create floating pill navigation**

Create `components/layout/Navigation.tsx`:

```typescript
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navigation() {
  const pathname = usePathname();
  const { scrollY } = useScroll();

  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(253, 251, 247, 0)", "rgba(253, 251, 247, 0.8)"]
  );

  const backdropBlur = useTransform(
    scrollY,
    [0, 100],
    ["blur(0px)", "blur(12px)"]
  );

  return (
    <motion.header
      style={{ backgroundColor, backdropFilter: backdropBlur }}
      className="fixed left-1/2 top-6 z-40 -translate-x-1/2"
    >
      <nav className="flex items-center gap-1 rounded-full border border-ink/5 bg-cream-50/50 px-2 py-2 shadow-lg shadow-ink/5">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative px-4 py-2 text-sm font-medium transition-colors duration-200",
                isActive ? "text-ink" : "text-ink-light hover:text-ink"
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-cream-200"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{link.label}</span>
            </Link>
          );
        })}
      </nav>
    </motion.header>
  );
}
```

- [ ] **Step 2: Add Navigation to layout**

Update `app/layout.tsx`:

```typescript
import type { Metadata } from "next";
import { fraunces, spaceGrotesk, jetbrainsMono } from "@/lib/fonts";
import { FilmGrain } from "@/components/layout/FilmGrain";
import { Navigation } from "@/components/layout/Navigation";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tien Duong Ngoc | Marketing Portfolio",
  description: "Where insight meets intention. Creative marketing portfolio showcasing strategy, storytelling, and soul.",
  keywords: ["marketing", "portfolio", "creative", "strategy", "Tien Duong"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-sans">
        <Navigation />
        {children}
        <FilmGrain />
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Verify navigation works**

Run:
```bash
npm run dev
```

Floating pill nav should appear at top center, with active state indicator

- [ ] **Step 4: Commit**

```bash
git add components/layout/Navigation.tsx app/layout.tsx
git commit -m "feat: add floating pill Navigation component"
```

---

## Task 12: Create Footer Component

**Files:**
- Create: `components/layout/Footer.tsx`

- [ ] **Step 1: Create Footer with contact CTA**

Create `components/layout/Footer.tsx`:

```typescript
import { Mail, Linkedin, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function Footer() {
  return (
    <footer className="border-t border-ink/5 bg-cream-100/30 py-16">
      <Container>
        <div className="flex flex-col items-center text-center">
          <p className="mb-2 font-mono text-sm uppercase tracking-wider text-ink-muted">
            Let's create something meaningful
          </p>
          <h2 className="mb-8 font-serif text-4xl font-medium tracking-tight md:text-5xl">
            Get in touch
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button href="mailto:tiendn.fw@gmail.com" variant="primary">
              <Mail className="h-4 w-4" />
              Email me
            </Button>
            <Button
              href="https://www.linkedin.com/in/tienduongngoc/"
              variant="secondary"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
              <ArrowUpRight className="h-3 w-3" />
            </Button>
          </div>

          <p className="mt-12 text-sm text-ink-muted">
            © {new Date().getFullYear()} Tien Duong Ngoc. Crafted with intention.
          </p>
        </div>
      </Container>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/layout/Footer.tsx
git commit -m "feat: add Footer component with contact CTA"
```

---

## Task 13: Create Project Data Structure

**Files:**
- Create: `content/projects.ts`

- [ ] **Step 1: Create project data with type definitions**

Create `content/projects.ts`:

```typescript
export interface Project {
  slug: string;
  title: string;
  tagline: string;
  client: string;
  role: string;
  industry: string;
  year: string;
  thumbnail: string;
  featured: boolean;
  awards?: string[];
  metrics?: {
    label: string;
    value: string;
  }[];
  challenge?: string;
  insight?: string;
  approach?: string;
  results?: string;
  images?: string[];
  videoUrl?: string;
}

export const projects: Project[] = [
  {
    slug: "pixself",
    title: "Pixself",
    tagline: "Turning memories into keychain moments",
    client: "Self-initiated D2C",
    role: "Project Leader, Marketing & Design Lead",
    industry: "E-commerce / D2C",
    year: "2025",
    thumbnail: "/images/projects/pixself-thumb.jpg",
    featured: true,
    metrics: [
      { label: "Views", value: "100K+" },
      { label: "Reach", value: "25.2K" },
      { label: "Orders", value: "150 in 2 weeks" },
      { label: "Visitors", value: "2.35K unique" },
    ],
    challenge: "Launch a D2C keychain business from zero with no brand awareness and limited budget.",
    insight: "Gen Z values personalization and memories they can carry physically — not just digitally.",
    approach: "Built complete brand identity, landing page optimized for customer journey, and Meta Ads funnel targeting emotion-driven purchases.",
    results: "100K views, 25.2K reach, 2.35K landing page visitors, and 150 orders in just 2 weeks of launch.",
  },
  {
    slug: "social-pioneers-champion",
    title: "Chuon Ngo Pearl Inlay Art",
    tagline: "Champion case that preserved heritage",
    client: "Social Pioneers 2025",
    role: "Strategy & Comms Lead",
    industry: "Cultural Heritage / NGO",
    year: "2025",
    thumbnail: "/images/projects/social-pioneers-thumb.jpg",
    featured: true,
    awards: ["Champion out of 2,100+ contestants"],
    challenge: "Develop communication strategy to promote and preserve traditional Vietnamese pearl inlay art.",
    insight: "Young Vietnamese feel disconnected from heritage crafts because they see them as 'old' — not relevant to their identity.",
    approach: "Reframed pearl inlay as modern artistry, not museum relic. Created big idea connecting craft to contemporary self-expression.",
    results: "Champion award, beating 2,100+ contestants with a strategy that made heritage feel personal.",
  },
  {
    slug: "bidv-esg",
    title: "BIDV Green Bank",
    tagline: "Strengthening ESG positioning",
    client: "Marketing On Air 2025",
    role: "Strategist",
    industry: "Banking / Finance",
    year: "2025",
    thumbnail: "/images/projects/bidv-thumb.jpg",
    featured: true,
    awards: ["Semi-finalist (Top 5 of ~3,500 contestants)"],
    challenge: "Develop product innovation and communication strategy to highlight BIDV's ESG initiatives.",
    insight: "Consumers want to support sustainable banking but don't understand what 'green finance' actually means for them.",
    approach: "Made ESG tangible through product innovations tied to customer benefits, not just corporate messaging.",
    results: "Semi-finalist among 3,500+ contestants with actionable strategy framework.",
  },
  {
    slug: "kingsport",
    title: "Kingsport Gen Z Moms",
    tagline: "Understanding the new mother",
    client: "Digital Creatory 2025",
    role: "Consumer Research Lead",
    industry: "Healthcare / Fitness",
    year: "2025",
    thumbnail: "/images/projects/kingsport-thumb.jpg",
    featured: true,
    awards: ["1st Runner-up"],
    metrics: [
      { label: "Interviews", value: "20 in-depth" },
    ],
    challenge: "Reposition Kingsport fitness equipment for Gen Z mothers.",
    insight: "Gen Z moms don't want 'mom fitness' — they want to maintain their pre-mom identity while adapting to new life.",
    approach: "Conducted 20 in-depth interviews to define SOG & positioning that honored identity, not just function.",
    results: "1st Runner-up with research-driven positioning that resonated with judges.",
  },
  {
    slug: "vuver-valentine",
    title: "VuVer Valentine Campaign",
    tagline: "2x revenue in cold weather",
    client: "VuVer.vn",
    role: "Creative & Marketing Executive",
    industry: "Fashion / E-commerce",
    year: "2025",
    thumbnail: "/images/projects/vuver-thumb.jpg",
    featured: false,
    metrics: [
      { label: "Revenue", value: "2x vs prior 2-month avg" },
    ],
    challenge: "Drive Valentine's Day sales for sweater brand during extended cold weather.",
    insight: "Extended cold weather = extended sweater relevance. Valentine's = perfect gifting moment.",
    approach: "Extended sweater focus beyond season, produced KV/lookbook + copy across FB/IG/TikTok for Valentine angle.",
    results: "2x revenue compared to prior 2-month average.",
  },
  {
    slug: "aeon-beta-tvc",
    title: "AEON Beta TVC",
    tagline: "End-to-end video production",
    client: "AEON / Red Agency",
    role: "Account Executive",
    industry: "Retail",
    year: "2025",
    thumbnail: "/images/projects/aeon-thumb.jpg",
    featured: false,
    challenge: "Coordinate TVC and TikTok video production for AEON Beta launch.",
    approach: "Built production timelines, managed scripts/materials, supported onsite shoot, compiled recap meeting minutes.",
    results: "Successfully delivered company TVC and TikTok content on time and on brief.",
  },
];

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}
```

- [ ] **Step 2: Commit**

```bash
mkdir -p content
git add content/projects.ts
git commit -m "feat: add project data structure with type definitions"
```

---

## Task 14: Create Hero Section

**Files:**
- Create: `components/home/Hero.tsx`

- [ ] **Step 1: Create Hero component**

Create `components/home/Hero.tsx`:

```typescript
"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export function Hero() {
  return (
    <section className="relative flex min-h-dvh items-center pt-24">
      <Container className="py-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-4xl"
        >
          {/* Greeting */}
          <motion.p
            variants={fadeInUp}
            className="mb-4 font-mono text-sm uppercase tracking-wider text-ink-muted"
          >
            Hello, I'm
          </motion.p>

          {/* Name */}
          <motion.h1
            variants={fadeInUp}
            className="mb-6 font-serif text-5xl font-medium tracking-tight md:text-7xl lg:text-8xl"
          >
            Tien Duong Ngoc
          </motion.h1>

          {/* Positioning */}
          <motion.p
            variants={fadeInUp}
            className="mb-8 max-w-2xl text-xl text-ink-light md:text-2xl"
          >
            Where insight meets intention.{" "}
            <span className="text-ink">
              I craft marketing strategies that connect brands with people
            </span>
            —through research, storytelling, and a belief that good work should mean something.
          </motion.p>

          {/* Philosophy hint */}
          <motion.p
            variants={fadeInUp}
            className="mb-12 font-serif text-lg italic text-ink-muted"
          >
            "Growing with grace, finding beauty in every brief."
          </motion.p>

          {/* CTA */}
          <motion.div variants={fadeInUp} className="flex items-center gap-6">
            <a
              href="#work"
              className="group flex items-center gap-2 font-medium text-ink transition-colors hover:text-accent-cyan"
            >
              View my work
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
            </a>
            <span className="h-px w-12 bg-ink/20" />
            <span className="font-mono text-sm text-ink-muted">
              Account Executive @ Red Agency
            </span>
          </motion.div>
        </motion.div>
      </Container>

      {/* Decorative element */}
      <div className="absolute bottom-12 right-12 hidden lg:block">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="h-32 w-32 rounded-full bg-gradient-to-br from-accent-gold/20 to-accent-cyan/20"
        />
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
mkdir -p components/home
git add components/home/Hero.tsx
git commit -m "feat: add Hero section with positioning and philosophy"
```

---

## Task 15: Create QuickIntro Section

**Files:**
- Create: `components/home/QuickIntro.tsx`

- [ ] **Step 1: Create QuickIntro with stats**

Create `components/home/QuickIntro.tsx`:

```typescript
"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { staggerContainer, fadeInUp } from "@/lib/animations";

const stats = [
  { value: "3", label: "Case Competition Awards" },
  { value: "2x", label: "Revenue Growth (VuVer)" },
  { value: "150+", label: "Orders in 2 Weeks (Pixself)" },
  { value: "20", label: "Consumer Interviews" },
];

export function QuickIntro() {
  return (
    <section className="py-24">
      <Container>
        <ScrollReveal>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left: Philosophy */}
            <div className="max-w-lg">
              <p className="mb-4 font-mono text-sm uppercase tracking-wider text-ink-muted">
                My approach
              </p>
              <h2 className="mb-6 font-serif text-3xl font-medium tracking-tight md:text-4xl">
                Strategy that starts with people
              </h2>
              <p className="text-lg leading-relaxed text-ink-light">
                I believe the best marketing isn't about shouting louder—it's about
                listening deeper. Every project starts with understanding: the consumer,
                the context, the real problem to solve. Then comes the craft of turning
                insight into work that matters.
              </p>
            </div>

            {/* Right: Stats grid */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-2 gap-6"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  variants={fadeInUp}
                  className="rounded-2xl bg-cream-100/50 p-6"
                >
                  <p className="mb-1 font-serif text-4xl font-medium text-ink">
                    {stat.value}
                  </p>
                  <p className="text-sm text-ink-muted">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/home/QuickIntro.tsx
git commit -m "feat: add QuickIntro section with stats grid"
```

---

## Task 16: Create ProjectCard Component

**Files:**
- Create: `components/work/ProjectCard.tsx`

- [ ] **Step 1: Create Z-axis cascade ProjectCard**

Create `components/work/ProjectCard.tsx`:

```typescript
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/projects";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  // Alternate rotation for visual interest
  const rotation = index % 2 === 0 ? -1 : 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotate: rotation * 2 }}
      whileInView={{ opacity: 1, y: 0, rotate: rotation }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: index * 0.1,
      }}
      whileHover={{ y: -8, rotate: 0 }}
      className="group relative"
    >
      <Link href={`/work/${project.slug}`}>
        {/* Card */}
        <div className="relative overflow-hidden rounded-2xl bg-cream-100">
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            {/* Hover content */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <p className="mb-2 text-sm text-cream-50/80">{project.role}</p>
              <div className="flex items-center gap-2 text-cream-50">
                <span className="font-medium">View Case Study</span>
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="p-6">
            <div className="mb-2 flex items-center gap-2">
              <span className="font-mono text-xs uppercase tracking-wider text-ink-muted">
                {project.industry}
              </span>
              {project.awards && (
                <span className="rounded-full bg-accent-gold/20 px-2 py-0.5 font-mono text-xs text-accent-gold">
                  Award
                </span>
              )}
            </div>
            <h3 className="mb-1 font-serif text-xl font-medium">{project.title}</h3>
            <p className="text-sm text-ink-light">{project.tagline}</p>
          </div>
        </div>

        {/* Shadow layer for depth */}
        <div
          className={cn(
            "absolute -bottom-2 -right-2 -z-10 h-full w-full rounded-2xl bg-cream-200/50",
            "transition-transform duration-300 group-hover:-translate-x-1 group-hover:translate-y-1"
          )}
        />
      </Link>
    </motion.div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
mkdir -p components/work
git add components/work/ProjectCard.tsx
git commit -m "feat: add ProjectCard with Z-axis cascade effect"
```

---

## Task 17: Create FeaturedProjects Section

**Files:**
- Create: `components/home/FeaturedProjects.tsx`

- [ ] **Step 1: Create FeaturedProjects grid**

Create `components/home/FeaturedProjects.tsx`:

```typescript
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ProjectCard } from "@/components/work/ProjectCard";
import { getFeaturedProjects } from "@/content/projects";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export function FeaturedProjects() {
  const projects = getFeaturedProjects();

  return (
    <section id="work" className="py-24">
      <Container>
        <ScrollReveal>
          <div className="mb-12 flex items-end justify-between">
            <div>
              <p className="mb-2 font-mono text-sm uppercase tracking-wider text-ink-muted">
                Selected Work
              </p>
              <h2 className="font-serif text-3xl font-medium tracking-tight md:text-4xl">
                Projects I'm proud of
              </h2>
            </div>
            <Button href="/work" variant="ghost" className="hidden md:flex">
              View all work
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </ScrollReveal>

        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>

        <div className="mt-8 flex justify-center md:hidden">
          <Button href="/work" variant="secondary">
            View all work
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/home/FeaturedProjects.tsx
git commit -m "feat: add FeaturedProjects section with grid layout"
```

---

## Task 18: Create Home Page

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Assemble home page**

Replace `app/page.tsx` with:

```typescript
import { Hero } from "@/components/home/Hero";
import { QuickIntro } from "@/components/home/QuickIntro";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { Footer } from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <QuickIntro />
      <FeaturedProjects />
      <Footer />
    </main>
  );
}
```

- [ ] **Step 2: Create placeholder images directory**

Run:
```bash
mkdir -p public/images/projects
```

- [ ] **Step 3: Create placeholder images (will be replaced with real images)**

Run:
```bash
# Create placeholder SVGs for now
for project in pixself social-pioneers bidv kingsport vuver aeon; do
  cat > "public/images/projects/${project}-thumb.jpg" << 'EOF'
(placeholder - replace with actual image)
EOF
done
```

Note: These placeholders will need to be replaced with actual project images

- [ ] **Step 4: Verify home page renders**

Run:
```bash
npm run dev
```

Visit http://localhost:3000 — Hero, QuickIntro, FeaturedProjects, Footer should render (images will be broken until real images added)

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx public/images/
git commit -m "feat: assemble home page with all sections"
```

---

## Task 19: Create Work Page

**Files:**
- Create: `app/work/page.tsx`

- [ ] **Step 1: Create work page with all projects**

Create `app/work/page.tsx`:

```typescript
import { Container } from "@/components/ui/Container";
import { ProjectCard } from "@/components/work/ProjectCard";
import { projects } from "@/content/projects";
import { Footer } from "@/components/layout/Footer";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata = {
  title: "Work | Tien Duong Ngoc",
  description: "Selected marketing projects and case studies.",
};

export default function WorkPage() {
  return (
    <main className="pt-32">
      <Container>
        <ScrollReveal>
          <div className="mb-16 max-w-2xl">
            <p className="mb-2 font-mono text-sm uppercase tracking-wider text-ink-muted">
              Work
            </p>
            <h1 className="mb-4 font-serif text-4xl font-medium tracking-tight md:text-5xl">
              Selected Projects
            </h1>
            <p className="text-lg text-ink-light">
              From case competitions to agency work, each project represents a
              journey of insight, strategy, and craft.
            </p>
          </div>
        </ScrollReveal>

        <div className="mb-24 grid gap-8 md:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </Container>
      <Footer />
    </main>
  );
}
```

- [ ] **Step 2: Commit**

```bash
mkdir -p app/work
git add app/work/page.tsx
git commit -m "feat: add Work page with project grid"
```

---

## Task 20: Create Case Study Page

**Files:**
- Create: `app/work/[slug]/page.tsx`
- Create: `components/work/CaseStudyLayout.tsx`

- [ ] **Step 1: Create CaseStudyLayout component**

Create `components/work/CaseStudyLayout.tsx`:

```typescript
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { Project } from "@/content/projects";
import { fadeInUp, staggerContainer } from "@/lib/animations";

interface CaseStudyLayoutProps {
  project: Project;
  nextProject?: Project;
}

export function CaseStudyLayout({ project, nextProject }: CaseStudyLayoutProps) {
  return (
    <article className="pt-32">
      {/* Hero */}
      <Container className="mb-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="mb-8">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-ink"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Work
            </Link>
          </motion.div>

          <motion.div variants={fadeInUp} className="mb-4 flex flex-wrap gap-2">
            <span className="font-mono text-sm uppercase tracking-wider text-ink-muted">
              {project.industry}
            </span>
            <span className="text-ink-muted">•</span>
            <span className="font-mono text-sm text-ink-muted">{project.year}</span>
            {project.awards?.map((award) => (
              <span
                key={award}
                className="rounded-full bg-accent-gold/20 px-2 py-0.5 font-mono text-xs text-accent-gold"
              >
                {award}
              </span>
            ))}
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="mb-4 font-serif text-4xl font-medium tracking-tight md:text-5xl lg:text-6xl"
          >
            {project.title}
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="mb-8 max-w-2xl text-xl text-ink-light"
          >
            {project.tagline}
          </motion.p>

          {/* Quick facts */}
          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-2 gap-4 rounded-2xl bg-cream-100/50 p-6 md:grid-cols-4"
          >
            <div>
              <p className="mb-1 text-xs uppercase tracking-wider text-ink-muted">
                Client
              </p>
              <p className="font-medium">{project.client}</p>
            </div>
            <div>
              <p className="mb-1 text-xs uppercase tracking-wider text-ink-muted">
                Role
              </p>
              <p className="font-medium">{project.role}</p>
            </div>
            <div>
              <p className="mb-1 text-xs uppercase tracking-wider text-ink-muted">
                Industry
              </p>
              <p className="font-medium">{project.industry}</p>
            </div>
            <div>
              <p className="mb-1 text-xs uppercase tracking-wider text-ink-muted">
                Year
              </p>
              <p className="font-medium">{project.year}</p>
            </div>
          </motion.div>
        </motion.div>
      </Container>

      {/* Hero Image */}
      <div className="relative mb-16 aspect-[21/9] w-full overflow-hidden bg-cream-100">
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content */}
      <Container className="mb-24">
        <div className="mx-auto max-w-3xl space-y-16">
          {/* Metrics */}
          {project.metrics && project.metrics.length > 0 && (
            <ScrollReveal>
              <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                {project.metrics.map((metric) => (
                  <div key={metric.label} className="text-center">
                    <p className="mb-1 font-serif text-3xl font-medium text-ink">
                      {metric.value}
                    </p>
                    <p className="text-sm text-ink-muted">{metric.label}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          )}

          {/* Challenge */}
          {project.challenge && (
            <ScrollReveal>
              <div>
                <h2 className="mb-4 font-mono text-sm uppercase tracking-wider text-ink-muted">
                  The Challenge
                </h2>
                <p className="text-lg leading-relaxed text-ink-light">
                  {project.challenge}
                </p>
              </div>
            </ScrollReveal>
          )}

          {/* Insight */}
          {project.insight && (
            <ScrollReveal>
              <div className="rounded-2xl bg-cream-100/50 p-8">
                <h2 className="mb-4 font-mono text-sm uppercase tracking-wider text-ink-muted">
                  The Insight
                </h2>
                <p className="font-serif text-2xl font-medium leading-relaxed">
                  "{project.insight}"
                </p>
              </div>
            </ScrollReveal>
          )}

          {/* Approach */}
          {project.approach && (
            <ScrollReveal>
              <div>
                <h2 className="mb-4 font-mono text-sm uppercase tracking-wider text-ink-muted">
                  The Approach
                </h2>
                <p className="text-lg leading-relaxed text-ink-light">
                  {project.approach}
                </p>
              </div>
            </ScrollReveal>
          )}

          {/* Results */}
          {project.results && (
            <ScrollReveal>
              <div>
                <h2 className="mb-4 font-mono text-sm uppercase tracking-wider text-ink-muted">
                  The Results
                </h2>
                <p className="text-lg leading-relaxed text-ink-light">
                  {project.results}
                </p>
              </div>
            </ScrollReveal>
          )}
        </div>
      </Container>

      {/* Next Project */}
      {nextProject && (
        <section className="border-t border-ink/5 bg-cream-100/30 py-16">
          <Container>
            <div className="flex items-center justify-between">
              <div>
                <p className="mb-2 font-mono text-sm uppercase tracking-wider text-ink-muted">
                  Next Project
                </p>
                <h3 className="font-serif text-2xl font-medium">
                  {nextProject.title}
                </h3>
              </div>
              <Button href={`/work/${nextProject.slug}`} variant="secondary">
                View Project
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </Container>
        </section>
      )}
    </article>
  );
}
```

- [ ] **Step 2: Create case study page**

Create `app/work/[slug]/page.tsx`:

```typescript
import { notFound } from "next/navigation";
import { CaseStudyLayout } from "@/components/work/CaseStudyLayout";
import { Footer } from "@/components/layout/Footer";
import { getProjectBySlug, projects, getAllProjectSlugs } from "@/content/projects";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: `${project.title} | Tien Duong Ngoc`,
    description: project.tagline,
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  // Find next project
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <main>
      <CaseStudyLayout project={project} nextProject={nextProject} />
      <Footer />
    </main>
  );
}
```

- [ ] **Step 3: Commit**

```bash
mkdir -p app/work/\[slug\]
git add components/work/CaseStudyLayout.tsx app/work/\[slug\]/page.tsx
git commit -m "feat: add case study page with dynamic routing"
```

---

## Task 21: Create About Page

**Files:**
- Create: `app/about/page.tsx`
- Create: `components/about/Philosophy.tsx`
- Create: `components/about/Journey.tsx`
- Create: `components/about/PersonalCorner.tsx`

- [ ] **Step 1: Create Philosophy component**

Create `components/about/Philosophy.tsx`:

```typescript
"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export function Philosophy() {
  return (
    <section className="py-24">
      <Container>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.p
            variants={fadeInUp}
            className="mb-4 font-mono text-sm uppercase tracking-wider text-ink-muted"
          >
            My Philosophy
          </motion.p>

          <motion.h1
            variants={fadeInUp}
            className="mb-8 font-serif text-3xl font-medium leading-relaxed tracking-tight md:text-4xl lg:text-5xl"
          >
            Have faith in what you do.
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-lg leading-relaxed text-ink-light"
          >
            I believe failures always come at the right time. They're not setbacks—they're
            lessons wrapped in disguise. So I continue, learn, stay brave, and believe
            in what I do. I'm on a journey to grow with grace, to do what I want to do,
            to open my heart to find beauty in everything I get to experience, and to
            find fulfillment within at the end of the journey.
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Create Journey component**

Create `components/about/Journey.tsx`:

```typescript
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const experiences = [
  {
    period: "Nov 2025 - Present",
    role: "Account Executive",
    company: "Red Agency JSC",
    description: "Managing client communication for LG, AEON BETA, A25 Hotel. Coordinating production, supporting creative concepts and pitches.",
  },
  {
    period: "Sep - Oct 2025",
    role: "Marketing Intern",
    company: "Red Agency JSC",
    description: "Market research and retail project support for VPP Hồng Hà, AEON Mall.",
  },
  {
    period: "Dec 2024 - Jul 2025",
    role: "Creative & Marketing Executive",
    company: "VuVer.vn",
    description: "Part-time role producing sales content, driving Valentine campaign that achieved 2x revenue.",
  },
  {
    period: "Jan - Dec 2024",
    role: "Marketing Freelancer",
    company: "Self-employed",
    description: "Delivered for clients including Deloitte (via 5S Media), Anpeco, AIESEC.",
  },
];

export function Journey() {
  return (
    <section className="py-24">
      <Container>
        <ScrollReveal>
          <div className="mb-12">
            <p className="mb-2 font-mono text-sm uppercase tracking-wider text-ink-muted">
              Journey
            </p>
            <h2 className="font-serif text-3xl font-medium tracking-tight md:text-4xl">
              Where I've been
            </h2>
          </div>
        </ScrollReveal>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <ScrollReveal key={index}>
              <div className="grid gap-4 border-l-2 border-cream-200 pl-8 md:grid-cols-[200px_1fr]">
                <p className="font-mono text-sm text-ink-muted">{exp.period}</p>
                <div>
                  <h3 className="mb-1 font-medium">{exp.role}</h3>
                  <p className="mb-2 text-accent-cyan">{exp.company}</p>
                  <p className="text-ink-light">{exp.description}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 3: Create PersonalCorner component**

Create `components/about/PersonalCorner.tsx`:

```typescript
import { Coffee, Music, Gamepad2, Cat, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Card, CardContent } from "@/components/ui/Card";

const interests = [
  {
    icon: Coffee,
    title: "Coffee Ritual",
    description: "1 coffee a day keeps the doctor away. Essential fuel for creativity.",
  },
  {
    icon: Music,
    title: "Music & Guitar",
    description: "I can play guitar a little bit (it's getting rusty, but the love remains).",
  },
  {
    icon: Gamepad2,
    title: "Gaming",
    description: "10 years of League of Legends. Makes me tech-savvy and competitive.",
  },
  {
    icon: Cat,
    title: "Cat Person",
    description: "More of a cat person. They understand the need for independence.",
  },
  {
    icon: MapPin,
    title: "Dream Destination",
    description: "Paris awaits. The city of love, art, and endless inspiration.",
  },
];

export function PersonalCorner() {
  return (
    <section className="bg-cream-100/30 py-24">
      <Container>
        <ScrollReveal>
          <div className="mb-12 text-center">
            <p className="mb-2 font-mono text-sm uppercase tracking-wider text-ink-muted">
              Beyond Marketing
            </p>
            <h2 className="font-serif text-3xl font-medium tracking-tight md:text-4xl">
              The human side
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {interests.map((interest, index) => (
            <ScrollReveal key={interest.title}>
              <Card>
                <CardContent className="flex items-start gap-4">
                  <div className="rounded-full bg-accent-cyan/10 p-3">
                    <interest.icon className="h-5 w-5 text-accent-cyan" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-medium">{interest.title}</h3>
                    <p className="text-sm text-ink-light">{interest.description}</p>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 4: Create About page**

Create `app/about/page.tsx`:

```typescript
import { Philosophy } from "@/components/about/Philosophy";
import { Journey } from "@/components/about/Journey";
import { PersonalCorner } from "@/components/about/PersonalCorner";
import { Footer } from "@/components/layout/Footer";

export const metadata = {
  title: "About | Tien Duong Ngoc",
  description: "The story, philosophy, and human side of Tien Duong Ngoc.",
};

export default function AboutPage() {
  return (
    <main className="pt-32">
      <Philosophy />
      <Journey />
      <PersonalCorner />
      <Footer />
    </main>
  );
}
```

- [ ] **Step 5: Commit**

```bash
mkdir -p components/about app/about
git add components/about/ app/about/page.tsx
git commit -m "feat: add About page with philosophy, journey, and personal corner"
```

---

## Task 22: Create Contact Page

**Files:**
- Create: `app/contact/page.tsx`

- [ ] **Step 1: Create Contact page**

Create `app/contact/page.tsx`:

```typescript
"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, ArrowUpRight, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Footer } from "@/components/layout/Footer";

export default function ContactPage() {
  return (
    <main className="pt-32">
      <Container className="py-24">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.p
            variants={fadeInUp}
            className="mb-4 font-mono text-sm uppercase tracking-wider text-ink-muted"
          >
            Get in Touch
          </motion.p>

          <motion.h1
            variants={fadeInUp}
            className="mb-6 font-serif text-4xl font-medium tracking-tight md:text-5xl"
          >
            Let's create something meaningful together
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="mb-12 text-lg text-ink-light"
          >
            Whether you have a project in mind, want to discuss marketing strategy,
            or just want to say hello—I'd love to hear from you.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <Button href="mailto:tiendn.fw@gmail.com" variant="primary" size="lg">
              <Mail className="h-5 w-5" />
              tiendn.fw@gmail.com
            </Button>
            <Button
              href="https://www.linkedin.com/in/tienduongngoc/"
              variant="secondary"
              size="lg"
            >
              <Linkedin className="h-5 w-5" />
              LinkedIn
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </motion.div>

          <motion.div variants={fadeInUp} className="mt-12 flex items-center justify-center gap-2 text-ink-muted">
            <Phone className="h-4 w-4" />
            <span className="font-mono text-sm">(+84) 345 205 918</span>
          </motion.div>

          <motion.p variants={fadeInUp} className="mt-8 text-sm text-ink-muted">
            Based in Hanoi, Vietnam • Available for onsite & remote opportunities
          </motion.p>
        </motion.div>
      </Container>
      <Footer />
    </main>
  );
}
```

- [ ] **Step 2: Commit**

```bash
mkdir -p app/contact
git add app/contact/page.tsx
git commit -m "feat: add Contact page"
```

---

## Task 23: Final Setup and Verification

**Files:**
- Verify all pages work
- Check responsive design
- Test navigation

- [ ] **Step 1: Run development server**

Run:
```bash
npm run dev
```

- [ ] **Step 2: Verify all pages**

Test each route:
- http://localhost:3000 (Home)
- http://localhost:3000/work (Work)
- http://localhost:3000/work/pixself (Case Study)
- http://localhost:3000/about (About)
- http://localhost:3000/contact (Contact)

Expected: All pages render without errors (images will be broken until real images added)

- [ ] **Step 3: Test navigation**

Click through navigation pill — active state should animate between pages

- [ ] **Step 4: Test responsive**

Resize browser to mobile width — layout should adapt

- [ ] **Step 5: Final commit**

```bash
git add .
git commit -m "feat: complete portfolio website structure"
```

---

## Task 24: Add Real Project Images (Content Phase)

**Files:**
- Add images to `public/images/projects/`

- [ ] **Step 1: Collect project images**

For each project, gather:
- Thumbnail image (4:3 aspect ratio, ~1200x900px)
- Additional case study images

Required files:
- `public/images/projects/pixself-thumb.jpg`
- `public/images/projects/social-pioneers-thumb.jpg`
- `public/images/projects/bidv-thumb.jpg`
- `public/images/projects/kingsport-thumb.jpg`
- `public/images/projects/vuver-thumb.jpg`
- `public/images/projects/aeon-thumb.jpg`

- [ ] **Step 2: Optimize images**

Run (if sharp is available):
```bash
# Or use Squoosh, TinyPNG, etc. to compress images
```

- [ ] **Step 3: Commit images**

```bash
git add public/images/
git commit -m "content: add project images"
```

---

## Summary

This plan provides 24 tasks with exact code, commands, and expected outputs. Each task is 2-5 minutes of work with clear verification steps.

**Execution recommendation:** Use superpowers:subagent-driven-development for fresh context per task.

**Content needed from user:**
1. Project images (6 thumbnails minimum)
2. Optional: Professional photo for About page
3. Optional: Additional case study visuals

**Post-implementation:**
1. Replace placeholder images with real images
2. Deploy to Vercel
3. Set up custom domain
