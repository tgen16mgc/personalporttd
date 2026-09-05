# Tien Duong Portfolio

Next.js 16 portfolio with Keystatic-managed content.

## Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. Content lives in `content/keystatic/`; the CMS route is `/keystatic` when enabled.

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
