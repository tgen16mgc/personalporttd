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
