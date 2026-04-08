# Content Files

All editable content lives here. Change these files, save, and your site updates automatically.

## File Map

```
content/
  personal.ts          ← Your identity: name, email, phone, socials, SEO
  projects.ts          ← All case studies (work page + case study pages)
  pages/
    home.ts            ← Hero, quick intro, brand strip, gravity tags
    about.ts           ← Experience, recognition, education, philosophy, afterwork
```

---

## Quick Reference

### Update personal info (email, phone, LinkedIn, etc.)

Edit **`personal.ts`** — changes propagate to every page automatically.

### Update your current role / status

Edit **`pages/home.ts`** → `heroContent.currentRole` and `quickIntroContent.facts[0]`.

### Update resume link

Edit **`personal.ts`** → `resumeUrl`.

---

## Adding a New Project

Open **`projects.ts`** and add a new entry to the `projects` array:

```typescript
{
  slug: "my-new-project",           // URL-safe, used in /work/my-new-project
  title: "My New Project",
  tagline: "One-line hook for the card and hero",
  client: "Client Name",
  brand: "Brand Name",              // optional
  industry: "Industry Category",    // used for filter pills on /work
  role: "Your Role",
  year: "2025",
  thumbnail: "/images/projects/my-new-project-thumb.svg",
  featured: true,                   // true = shows on homepage
  color: "#06B6D4",                 // accent color for the case study page

  // Case study sections (all optional — leave out any you don't need)
  challenge: "What was the problem?",
  insight: "What did you discover?",
  approach: "How did you tackle it?",
  execution: [
    "Step 1: ...",
    "Step 2: ...",
  ],
  results: [
    { metric: "Metric Name", value: "Result" },
  ],
  awards: ["Award name"],           // optional
  credits: [                        // optional
    { role: "Role", name: "Person" },
  ],
  images: ["/images/projects/my-new-project-1.jpg"],  // optional gallery
}
```

**Tips:**
- The `slug` must be unique and URL-safe (lowercase, hyphens, no spaces)
- Set `featured: true` for projects you want on the homepage
- The `industry` value creates automatic filter pills — use consistent names
- `color` is a hex code used as the accent throughout the case study page

---

## Adding / Updating Images

All images go in the **`public/`** folder. The path you write in content files
is relative to `public/`. For example:

| Content field | File location | Value to use |
|---|---|---|
| Project thumbnail | `public/images/projects/foo-thumb.svg` | `"/images/projects/foo-thumb.svg"` |
| Brand logo | `public/images/brands/foo.svg` | `"/images/brands/foo.svg"` |
| Afterwork photo | `public/afterwork/lol.jpg` | `"/afterwork/lol.jpg"` |
| Portrait photo | `public/tien.jpg` | `"/tien.jpg"` |
| About page photo | `public/tien-about.jpg` | `"/tien-about.jpg"` |

**Image guidelines:**
- **Project thumbnails:** SVG preferred, or 1200×675px (16:9) JPG/PNG
- **Brand logos:** SVG preferred for crisp rendering at any size
- **Afterwork photos:** JPG, any aspect ratio (cards adapt)
- **Portrait photos:** JPG, 3:4 aspect ratio recommended

To add a new image: drop the file into the right `public/` subfolder,
then reference its path in the content file.

---

## Adding a New Brand (Worked With)

Edit **`pages/home.ts`** → `brands` array:

```typescript
{ name: "New Brand", logo: "/images/brands/new-brand.svg" },
```

Then add the SVG file to `public/images/brands/`.

---

## Adding an Afterwork Hobby

Edit **`pages/about.ts`** → `afterwork` array:

```typescript
{
  id: "unique-id",
  title: "Hobby Name",
  subtitle: "Optional subtitle or null",
  description: "What this hobby means to you.",
  takeaway: "The life lesson",
  image: "/afterwork/hobby.jpg",
  emoji: "🎯",
  bgGradient: "from-blue-50 to-cyan-100",  // Tailwind gradient stops
  size: "small",                             // "small" or "large"
}
```

---

## Adding Experience / Recognition

Edit **`pages/about.ts`**:

- `experience` array for work history
- `recognition` array for awards/competitions
- `education` object for school info

---

## After Editing

- **Dev mode** (`npm run dev`): changes appear instantly via hot reload
- **Production**: push to GitHub → Vercel rebuilds automatically
- All content is git-tracked, so you can always revert any change
