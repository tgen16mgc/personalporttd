# Tien Duong Portfolio

Next.js 16 portfolio with Keystatic-managed content.

## Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. Content lives in `content/keystatic/`; the CMS route is `/keystatic` when enabled.

The CMS loads in a client-only chunk with a loading message. In local mode, successfully validated, SHA-addressed content blobs are cached privately by the browser; changed files receive new URLs, while the content tree stays uncached. The Projects singleton currently loads every project's images together, so its first visit can still be heavy. Splitting projects into a collection would require a separate content/schema migration.

Portfolio raster images use WebP at quality 85 with original dimensions, transparency, and animation timing preserved. SVGs and the PNG favicon stay in their original formats. Keep future CMS uploads optimized as well; the editor downloads the original uploaded files, not Next.js image derivatives.

The Keystatic core patch limits content/image downloads to four at a time and retries transient network errors and HTTP 408/429/500/502/503/504 responses up to three attempts. Missing files and permission errors still surface immediately. Unavailable browser storage falls back to fetching content instead of blocking the editor. `npm install` reapplies this patch through `postinstall`; retain it when upgrading Keystatic.

## Checks

```bash
npm run lint
npm test
npm run build
```

## Contact form

Set `CONTACT_SMTP_HOST`, `CONTACT_SMTP_PORT`, `CONTACT_SMTP_SECURE`, `CONTACT_SMTP_USER`, `CONTACT_SMTP_PASS`, `CONTACT_EMAIL_FROM`, and `CONTACT_EMAIL_TO` in `.env.local`.

## Portfolio experience

GSAP drives the loader, curved route transitions, text entrances, and looping work gallery. Three.js renders the scroll/drag camera, linked signs, project display, and sticker impacts. Reduced-motion preferences disable the continuous animation.

Keystatic still manages the original content. Home uses the profile and industry fields; About includes the biography, homepage facts, experience, and afterwork entries, with editable English and Vietnamese intro text. Work previews link to the complete case studies. The contact form and CMS security remain intact.

The visual reference and signal-pole model are from [Hiroto Sato](https://www.hirotos.com/). Local environment and font assets are in `public/models/` and `public/fonts/`. Helvetica Neue LT Pro and Gazzetta are Adobe-served fonts; their original copyright and license references are recorded in `public/fonts/NOTICE.txt`.

The Hanoi treatment in `components/experience/hanoi-pole.ts` follows the supplied street-sign photographs: alternating red/white pole paint, blue enamel sign backgrounds with inset white borders, and a dark traffic-light housing. Original sign copy, text animation, project slideshow, lens materials, reflective metal, and lighting effects are retained. The base GLB and its attribution are unchanged.

CMS scene controls:

- **Homepage → Hero Content → 3D sticker set**: add, remove, or reorder text/image stickers. Optional transparent PNG/WebP artwork replaces the text badge. Width and height control the cursor preview in pixels and scale the placed decal proportionally; existing stickers default to 100 × 50. Failed image uploads are skipped at runtime.
- **Projects → project → Homepage circle preview**: upload independent circle artwork for a featured project. Empty fields fall back to the project's hero image, then thumbnail.
- Sign text and moving arrows are clipped to an inset area inside the rectangular border. The original Helvetica/Gazzetta font setup is restored.

The About page follows the saved [Vucko reference supplied through Mobbin](https://mobbin.com/sites/vucko-32534577-e033-48ef-afc7-a38812cd1975/daf85ae0-9ffa-4f5b-9640-c0817984a4f2/sections): oversized wordmark hero, horizontal navigation, media blocks, offset biography, interactive capability titles, and wordmark footer. The original Helvetica/Gazzetta fonts are restored. All copy and media use the existing CMS schema, including EN/VI intro, capability selection, evidence, career history, credentials, brands, and personal-photo archive. Page styles are scoped in `components/about/about-design.css`.
