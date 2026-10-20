# Clario portfolio case study

The project remains at `/work/redagencyads` so existing case-study and CMS links keep working. Its display name, cover, Work thumbnail, homepage circle artwork and About AI-practice entry now use Clario. The shared introductory copy also names Clario. All story text remains editable through the existing Keystatic document fields. The original Red Agency origin and the author's role in requirements, ads logic and directing AI coding agents are retained.

## Content sources

- Original portfolio story: `content/keystatic/projects/items/1/story/{1,3,7}/value/body.mdoc` at portfolio commit `d9e6695`.
- Product source inspected at `tgen16mgc/redagencyads`, commit `deb7f3b`: `lib/dashboard-access.ts`, `lib/workspace-navigation.ts`, `docs/funnel-ai-hypotheses.md`, `docs/handoffs/navigation-shell-qa.md`, `app/landing/page.tsx`, the public product-preview components and client-report PDF design.
- Identity source: `redagencyads/public/brand/README.md`, its original outlined SVG masters and `design/clario/identity.png`. The portfolio logo-guideline graphic restates those usage rules; it does not introduce a new mark or palette.

## Visual provenance

Assets live in `public/images/projects/clario/`, encoded as WebP with one image worker.

| Asset | Source and meaning |
| --- | --- |
| `original-tool.webp` | Existing published portfolio screenshot, formerly `items/1/story/4/value/image.png`. Historical interface. |
| `performance.webp` | Product's `output/playwright/mercury/desktop.png`, cropped only to remove unused canvas. Actual UI components with a sample report from the local QA preview; not an authenticated production capture. |
| `overview.webp` | Live public `https://www.clario.id.vn/landing/product-preview`, captured 20 October 2026. Sample data. |
| `competitor.webp` | Live public preview with `?surface=competitor`, captured 20 October 2026. Fictional advertiser, stock creative and sample analysis supplied by the product preview. |
| `landing.webp` | Live `https://www.clario.id.vn/landing`, captured 20 October 2026. |
| `identity.webp` | Existing Clario identity board. |
| `logo-guidelines.webp` | New presentation of the existing clear-space, size, colour and geometry rules, using original vector masters. |
| `report.webp` | Product's `tmp/clario-pdf-redesign/final-en-03.png`. Local 16:9 PDF render with sample data; not a downloaded production export. |
| `cover.webp`, `thumbnail.webp`, `circle.webp` | Case-study compositions using the official outlined mark, established colours and sample product UI. |

The narrative describes current Overview, Performance and Competitor workflows. It does not advertise the release-disabled Intelligence, Publishing or TikTok workspaces, imply that unconfigured connectors are live, claim autonomous optimisation, or attribute campaign lifts to this project. Practical marketing examples are framed as ways to apply the workflow.

## Validation

- Existing portfolio-content, CMS-integration and scene-content tests: 8 passed, one test worker, 256 MB Node heap. Checks include actual Keystatic schema reads, all linked rich-text documents, media existence and homepage circle fallbacks.
- JSON comparison against `d9e6695` verifies that other projects and other About content are unchanged.
- No full local Next build or extra dev server under the machine's memory constraint. Production deployment and visual checks are recorded after publishing.
