GATE: OPEN 50 (rounds used up)

# About-page design audit

Service: personal marketing portfolio for recruiters reviewing graduate and early-career candidates.
Existing brand: white, black, neutral gray; existing Helvetica/Gazzetta roles and CMS content retained. No palette, hero or font replacement is being dealt for this contained repair.
Baseline: `321cd008cb005d7c170793aab56b8b3ff530a3d1`.

## Brief

- Job: understand the candidate and reach relevant case studies.
- Claim: the Marketing experience described in the current CMS copy.
- Proof: the existing research, campaign delivery, product projects and business results.
- Keep: all words, figures, links, section order, photographs, monochrome identity and the authored portrait expansion.

## Section cards, before edits

| Section | Its claim and reader | Proof to keep | Treatment within the existing palette |
|---|---|---|---|
| Hero | Tien introduces himself to a recruiter | Existing studio portrait and bilingual introduction | Keep the name-led hero and one entrance; separate the photograph from the letters and improve header controls |
| Biography | Marketing undergraduate with practical experience | Complete existing biography and resume link | Reduce the long opening sentence to readable lead type; darker paragraphs |
| Work | AI tools built for actual marketing tasks | Clario and Pixself imagery, ownership captions and case links | Align media and text to the same page edges; retain all captions as content |
| Capabilities | What he brings to a marketing team | Each selected project, methods and case link | Quieter, sentence-case controls with legible inactive states; preserve click, keyboard and mouse selection |
| Proof | Research, delivery and business experience | All three figures and explanations | Readable copy with consistent gaps; figures remain labeled and unchanged |
| Career | Agency experience | Portrait and the complete role list | Shared content edges and readable role summaries |
| Credentials | Recognition and education | Award names, GPA and profile facts | Keep every item; normalize spacing and meta type |
| Brands | Existing experience context | The existing brand marks and explanatory line | Keep the marks in their original color and the line readable |
| Outside work | Personal interests beyond the resume | All photos and native disclosure descriptions | One phone column, intact disclosures and better crop/readability |
| Contact | Graduate and early-career availability | Existing dates, contact link and copy | Keep content and primary action; consistent link response |
| Footer | Navigation, resume and social links | Every existing destination | Larger touch targets; preserve the name mark |

## References

- [Oevra, About](https://mobbin.com/sites/sections/f5b6e855-1c7a-4b6c-9a4b-a79738cfeff4): portrait and biography balance. No wording, palette or layout copied.
- [KOBU, About](https://mobbin.com/sites/sections/030f064f-689f-46cd-8b1f-64017a2dfa4c): concise text and link hierarchy. No assets copied.

- [Mother Design, services](https://mobbin.com/sites/sections/83653e9e-1c8a-4dbb-b9e2-103d731e662f): plain, sentence-case capability names. The candidate's project evidence remains the adjacent visual. No copy or assets reused.

## Skill version

The installed `design-taste-frontend` 2.5.1 was compared with upstream `Leonxlnx/taste-skill` main at commit `f6b76575f949707b4e3c37cd86cb44b0b98643e8`. All 1,631 files matched their Git blob hashes. No skill installation or upgrade was needed.

## Baseline measurements

- Source checker, exactly the five live About files: 96 findings (4 errors, 90 warnings, 2 notes). By area: layout 80, shape 4, type 4, internationalization 3, components 3, interaction 1, motion 1.
- Rendered scan: 0 errors, 73 warnings, 5 notes. Contrast contributes 61 findings; some include in-progress entrance/scroll fades and blend-mode header false readings.
- Desktop screenshot: 1440 × 900, full page 11,423 px.
- Phone screenshot: 390 × 844, full page 10,638 px.
- Measured CSS gaps include 18, 34, 38 and 50 px; matching photo-frame radii include 3, 5, 6 and 7 px.
- Visual findings: mobile portrait cuts the face; paragraph and inactive-control contrast is weak; the capability labels overpower their evidence; ordinary content is hidden during repeated scroll reveals; some media and text use different side margins.

## Validation and remaining findings

First repair pass: source checker 96 → 3 findings, all three remaining warnings about native selection controls. Layout 80 → 0, shape 4 → 0, type 4 → 0, internationalization 3 → 0, interaction 1 → 0, motion 1 → 0; components 3 → 3. The source checker found no accessibility findings before or after; rendered accessibility requires its own checks.

The native buttons remain because the project's existing shared `Button` is a magnetic Framer Motion CTA and does not forward `aria-pressed`, `aria-controls`, focus handlers or pointer handlers. Replacing the semantic selectors with it would remove state/accessibility behavior. They retain one page-scoped look per group; no checker suppression added.

Rendered scan, first repair pass: 0 → 0 errors; 73 → 3 warnings. Two warnings catch the hero's brief entrance opacity; the final pass removes opacity from that entrance. One warning is the unboxed, full-width photo archive disclosure having no horizontal padding.

The taste layout checker stopped with `Cannot read properties of undefined (reading 'map')` after its first 1440px result (`container: no .wrap`). Its standalone page structure assumptions do not match the existing Next.js route wrapper. No kit files were edited. Separate Enmera scans, stress checks and screenshots are used for browser evidence.

The first taste gate reported `GATE: FAIL 66 (round 1 of 3)`; the second reported `GATE: FAIL 62 (round 2 of 3)`. Final gate results are pending; no blanket waivers or checker suppression added.

All 29 existing tests passed. The first production build and lint passed. Audit JSON, screenshots and browser profiles are in `/tmp/personalporttd-about-audit`.

### Reproducible checks

```sh
npx @enmera/ai-design-check components/about/AboutIntro.tsx components/about/AboutCapabilities.tsx components/about/AboutMotion.tsx components/about/about-design.css 'app/(main)/about/page.tsx' --json
npx @enmera/ai-design-check scan http://127.0.0.1:3000/about --scope .vucko-about --json
npx @enmera/ai-design-check narrow http://127.0.0.1:3000/about --width 320 --stress
node /Users/tienduonn/.agents/skills/design-taste-frontend/scripts/gate.mjs http://127.0.0.1:3000/about
```

### Final-pass fixes

- Corrected the two source photos stored sideways, without replacing either photograph; their combined byte size decreased slightly.
- Applied the mobile face crop to the moving portrait as well as the static fallback.
- Kept hero copy fully opaque during its entrance.
- Made the header itself an opaque full-width surface; added scroll padding for keyboard/anchor navigation.
- Used Next.js Image's existing responsive optimizer for the personal gallery, with an explicit `sizes` value.
- Deferred mounting the homepage 3D scene on direct About visits; it mounts on Home navigation and stays mounted afterward, preserving existing transitions.
- No CMS words, figures, destinations or section order were changed; no stand-in photographs, invented facts or generated portraits were added.
- Voice card: existing bilingual, first-person CMS voice retained; copy-lint findings are reported separately rather than rewriting the biography to satisfy a new-site template.

## Production measurements after responsive images

The existing production app was rebuilt and restarted for these checks. The desktop run transfers about 1,150 KiB total and 636 KiB of images; the phone run transfers about 1,013 KiB total and 529 KiB of images. Before the responsive-image pass, the same local check measured 1,741/1,636 KiB total and 1,227/1,152 KiB of images. These are local headless measurements, not field Web Vitals.

Both widths report 0 live WebGL contexts, 0 broken requests, 0 images missing dimensions, median blocking time 0 ms, and layout shift 0.001/0.002. The remaining two performance FAIL rows are the same shared JavaScript budget at desktop and phone: 907.6 KiB parsed versus a 900 KiB ceiling (291.5 KiB transferred compressed). The run is therefore **not a performance PASS**. Remaining WARNs: request count, five existing font files, several small raster brand logos larger than their display size, one eagerly loaded hero image as it expands below the fold, and the supplied 850px-wide portrait being enlarged on desktop. A sharper source portrait would improve that large frame; no image was invented.

The final 320px stress run has **0 errors and 0 warnings**; its sole info note is the duplicate header location hidden on phones, while the location remains in the portrait caption. The rendered scan is **0 errors, 1 warning, 7 notes**, down from 0/73/5. The retained warning is the archive disclosure's zero horizontal padding: it is an unboxed row deliberately aligned to the page edges. Notes concern heading wrapping/spacing, the CMS methods separator and arrow links; the client wording remains intact.

Settled screenshots were captured at 1440, 1024, 820, 768 and 390. Early Enmera `shot` captures at tablet widths caught the existing intro overlay, so they are not treated as settled-layout proof; the taste kit's reduced-motion captures were used instead. A real Contact/language-control collision at tablet widths was corrected by reserving the controls' width, then verified in a new 820px capture.

One queued final gate attempt was interrupted before it recorded a round so the preview server could be restarted against the latest build. The completed final gate is recorded below; its result is not replaced with the interrupted attempt.

## Final gate and remaining findings

Final result: `GATE: OPEN 50 (rounds used up)`, after 66 → 62 → 50 open findings over three completed rounds. No waivers were added. The taste skill requires stopping after three rounds, so these findings are preserved rather than declaring compliance.

This is a contained repair of an existing multi-page personal portfolio, not a conversion to the kit's standalone sales-page structure. Many remaining checks assume direct `main > section` children, `.wrap` containers, fixed whole-screen sections, a sales headline and a dealt kit moment. Other findings remain relevant: the supplied small portrait is enlarged, some section type/layout differs from the kit, and global focus CSS is flagged by source inspection. The existing greeting, captions, role evidence and custom portrait moment remain to preserve the supplied words and behavior. The gate's hidden/disclosed-image findings are kept verbatim below; settled screenshots show the visible photographs and the production run reports no broken requests.

The separate layout checker could not complete the five-width run because it throws after the missing-`.wrap` result. The screenshots and Enmera stress/scan results are the available viewport evidence; no claim of a full layout-check PASS is made.

### Open FAILs, unmodified messages

| Check | Widths | Target | Finding |
|---|---|---|---|
| empty-visual | 1440, 390 | div.vucko-photo-grid > details.vucko-photo:nth-of-type(1) > summary > img "image?url=%2Fimages%2Fabout%2Fafterwork%" | the picture image?url=%2Fimages%2Fabout%2Fafterwork%2F2%2Fimage.webp&w=3 never loaded: its frame shows empty (and 3 more like it: "image?url=%2Fimages%2Fab", "image?url=%2Fimages%2Fab", "image?url=%2Fimages%2Fab") |
| flush | 1440 | div.vucko-about.vucko-morph-active > section.vucko-brands > div > img:nth-of-type(10) "img: Hong Ha" | its last line sits 0px above the lower edge of section.vucko-brands, where the ground changes to section#afterwork |
| no-visual | 1440, 390 | section#about-top "Xin chào. Hello. I’m Tien." | pictures, effects and mocks cover 8% of this section; a feature section needs a visual (about 25% or more) |
| no-visual | 1440, 390 | main#main-content > div.vucko-about.vucko-morph-active > figure.vucko-wide-portrait "Tien Duong NgocHanoi, Vietnam" | no picture, effect or mock in this section; a feature section needs a visual |
| no-visual | 1440, 390 | section#about-biography "Marketing undergraduate with a 3.69/4.0 " | no picture, effect or mock in this section; a feature section needs a visual |
| no-visual | 1440, 390 | main#main-content > div.vucko-about.vucko-morph-active > section.vucko-credentials "(Recognition)" | no picture, effect or mock in this section; a feature section needs a visual |
| cta | 1440, 390 | section#about-top | the hero has no button (the nav's does not count) |
| cta | 1440, 390 | main#main-content > div.vucko-about.vucko-morph-active > section.vucko-contact "I'd like to do this in a marketing team" | the last section before the footer ends with no button |
| copy-headline | 1440 | section#about-top > div.vucko-hero-bottom > div > h1 "Xin chào. Hello. I’m Tien." | "Xin chào. Hello. I’m Tien." does not name what is sold (early career marketing portfolio, early, career, marketing, from flags); only the line under it does |
| copy-fact | 1440 | section#about-top > div.vucko-hero-bottom > div > h1 "Xin chào. Hello. I’m Tien." | the first screen holds no number, price, date, place, platform or genre |
| copy-headings | 1440 | h2#about-work-heading "Work" | "Work" names no product, part, place or section (16 headings like it; at most one brand line per page) (and 15 more like it: "Clario: from campaign ev", "(A few things I've worke", "Getting a launch out the", "Running a small business", ...) |
| heading-scale | 1440, 390 | section.vucko-work > div.vucko-project-grid > article:nth-of-type(1) > h3 "Clario: from campaign evidence to a deci" | an h3 at 20px, as large as the smallest h2 (14px) or larger (and 2 more like it: "Less manual order handli", "Listening before plannin") |
| heading-scale | 1440, 390 | h2#about-work-heading "Work" | h2 headings in 3 sizes, 14px ("(What I bring to a marke") to 48px (x3.43) |
| heading-scale | 1440, 390 | section.vucko-proof > div > article:nth-of-type(1) > p.vucko-proof-value "20 interviews" | the figure "20 interviews" is set at 43.2px, larger than the section headings (h2 34.6px); 2 more like it |
| off-grid | 1440 | div.vucko-about.vucko-morph-active > section.vucko-work > div.vucko-work-end > a.vucko-large-link "Explore my work" | left edge at 740px, 8px off a common edge of its section at 732px (5 elements) |
| photo-upscale | 1440, 390 | div.vucko-photo-grid > details.vucko-photo:nth-of-type(4) > summary > img "img: guitar" | image: 662x436 shown at 650x650, blown up 1.49x |
| effect-kind | 1440 | (the page) | a service page (--type) moves with the scroll: scroll libraries or timelines (ScrollTrigger, ScrollSmoother): effects fit tech, gaming and software pages and a product with a technical subject, never a place, shop or service page (house rule) |
| section-tile | 1440 | main#main-content > div.vucko-about.vucko-morph-active > header.vucko-header "TIEN Hanoi, Vietnam EN VI" | the first section is 96px tall (0.11 screens at 1440x900), shorter than the screen: the first screen shows 96px of it and 900px of the next section, its heading "Xin chào. Hello. I’m Tien." on screen |
| section-tile | 1440 | section#about-top "Xin chào. Hello. I’m Tien." | the section is 932px tall (1.04 screens at 1440x900), not one screen or two: the screen one screen on from its top (scroll 900px) shows 32px of it and 96px of a section further down ("TIEN Hanoi, Vietnam EN VI"), its text "Hanoi, Vietnam" on screen |
| section-tile | 1440, 390 | main#main-content > div.vucko-about.vucko-morph-active > figure.vucko-wide-portrait "Tien Duong NgocHanoi, Vietnam" | the section is 795px tall (0.88 screens at 1440x900), shorter than the screen: its tile (the screen from its top) shows 795px of it and 96px of the section above ("TIEN Hanoi, Vietnam EN VI"), its text "Hanoi, Vietnam" on screen |
| section-tile | 1440 | section#about-biography "Marketing undergraduate with a 3.69/4.0 " | the section is 637px tall (0.71 screens at 1440x900), shorter than the screen: its tile (the screen from its top) shows 637px of it and 103px of the next section, its heading "Work" on screen |
| section-tile | 1440 | main#main-content > div.vucko-about.vucko-morph-active > section.vucko-work "Work" | the section is 1171px tall (1.30 screens at 1440x900), not one screen or two: the screen one screen on from its top (scroll 3724px) shows 272px of it and 408px of the next section, its heading "(What I bring to a marketing t" on screen |
| section-tile | 1440 | main#main-content > div.vucko-about.vucko-morph-active > section.vucko-capabilities "(What I bring to a marketing team)" | the section is 700px tall (0.78 screens at 1440x900), shorter than the screen: its tile (the screen from its top) shows 699px of it and 96px of a section further down ("TIEN Hanoi, Vietnam EN VI"), its text "Hanoi, Vietnam" on screen |
| section-tile | 1440 | main#main-content > div.vucko-about.vucko-morph-active > section.vucko-proof "(A few things I've worked on)" | the section is 284px tall (0.32 screens at 1440x900), shorter than the screen: its tile (the screen from its top) shows 284px of it and 436px of the next section, its heading "Where I've worked" on screen |
| section-tile | 1440 | main#main-content > div.vucko-about.vucko-morph-active > section.vucko-career "Where I've worked" | the section is 1164px tall (1.29 screens at 1440x900), not one screen or two: the screen one screen on from its top (scroll 6511px) shows 264px of it and 456px of the next section, its heading "(Recognition)" on screen (and 4 more like it: "(Recognition)", "Selected brands, age", "Outside work", "I'd like to do this ") |
| empty-area | 1440, 390 | main#main-content > div.vucko-about.vucko-morph-active > figure.vucko-wide-portrait | the section shows no content at all: 795px of ground |
| focus-ring | 1440 | .focus\:outline-none:focus | ".focus\:outline-none:focus" in 0q2ucmvigqqdu.css removes the focus outline and sets nothing in its place |
| focus-ring | 1440 | .experience-content:focus | ".experience-content:focus" in 0q2ucmvigqqdu.css removes the focus outline and sets nothing in its place |
| moment-none | 1440 | (the page) | a service page (--type) deals no moment: every kind carries one, two on a long page (moments.md) |
| hero-screen | 1440 | main#main-content > div.vucko-about.vucko-morph-active "TIENHanoi, VietnamENVITIENTien Duong Ngo" | the hero ends at 11108px on a 900px screen, 10208px below the fold: it ends at the fold, 1px either way (SR-1) |
| one-section | 1440 | main#main-content > div.vucko-about.vucko-morph-active "TIENHanoi, VietnamENVITIENTien Duong Ngo" | a &lt;div&gt; sits directly in &lt;main&gt;: every part of &lt;main&gt; is a &lt;section&gt; (SR-4) |
| one-heading | 1440 | section#about-biography > h2 "Marketing undergraduate with a 3.69/4.0 " | the hero holds an h2 (9): its heading is the h1, and an h2 opens the next section (SR-5) |
| container-edges | 1440 | main#main-content > div.vucko-about.vucko-morph-active "TIENHanoi, VietnamENVITIENTien Duong Ngo" | the content of section 1 runs 43px from the left and 57px from the right (read from its outermost blocks: no .wrap): 43 and 57px are not one margin; the margin is 64-120px at 1440px (one container, equal margins, 2px either way) (SR-6) |
| container-edges | 1440 | div.portfolio-experience "Skip to contentTIENHanoi, VietnamENVITIE" | a &lt;div&gt; at the top of the page, outside header.nav, main, footer.closing and nav.actionbar (SR-6) |
| container-edges | 1440 | main#main-content > div.vucko-about.vucko-morph-active > header.vucko-header "TIENHanoi, VietnamENVI" | a child of section 1 beside its .wrap is no valid background layer: not img, picture, video or canvas; position fixed, not absolute; z-index 8, not 0; a hero layer with neither alt nor aria-hidden="true" (SR-6) |
| container-edges | 1440 | section#afterwork > details.vucko-photo-archive > summary > span "+" | 1 text block starts on a left line at x 1373, 1330px from the container's left: text starts on the container's left, or on one split line (x 611, 725, 839) (SR-6) |
| container-edges | 1440 | div#about-capability-preview > div.vucko-service-content > p:nth-of-type(1) "I use surveys and interviews to understa" | 2 text blocks start on a left line at x 809, 766px from the container's left: text starts on the container's left, or on one split line (x 611, 725, 839) (also "Surveys · Interviews · Excel · S") (and 17 more like it: x 778, "Where I've worked", x 756) (SR-6) |
| container-edges | 1440 | section.vucko-capabilities > div.vucko-services-grid > div.vucko-service-list > button:nth-of-type(1) "Customer research" | a box over half the container wide runs 58-745px, not on the container's lines at 43-1383px (SR-6) |
| container-edges | 1440 | section.vucko-capabilities > div.vucko-services-grid > div.vucko-service-list > button:nth-of-type(2) "Working with commercial data" | a box over half the container wide runs 58-745px, not on the container's lines at 43-1383px (and 4 more like it: "Brand and creative work", "Making the work happen", "A few more photos+") (SR-6) |
| row-lines | 1440 | main#main-content > div.vucko-about.vucko-morph-active > section.vucko-proof > div "20 interviewsListening before planningI " | a row of 3 items: its first item starts at 443px, the container's left line at 43px (2px either way) (SR-7) |
| row-lines | 1440 | div.vucko-about.vucko-morph-active > section.vucko-credentials > div:nth-of-type(1) > div.vucko-awards "Semi-finalistMarketing On Air 2025BIDV c" | a row of 2 items: its first item starts at 443px, the container's left line at 43px (2px either way) (SR-7) |
| row-lines | 1440 | main#main-content > div.vucko-about.vucko-morph-active > section.vucko-work > div.vucko-project-grid "Clario: from campaign evidence to a deci" | a row of 2 items: its first item starts at 58px, the container's left line at 43px (2px either way) (and 1 more like it: "net đêm+League with my b") (SR-7) |
| split-pair | 1440 | main#main-content > div.vucko-about.vucko-morph-active > section.vucko-career "Where I've workedRed Agency JSCAccount E" | the two columns of the split start 130px apart at the top: a split's columns are top-aligned, 8px either way (SR-8) |
| flush | 390 | div.vucko-about.vucko-morph-active > section.vucko-career > figure.vucko-career-photo > img "img: Tien Duong Ngoc" | its first line sits 0px under the top edge of section.vucko-career, where the ground changes |
| no-visual | 390 | main#main-content > div.vucko-about.vucko-morph-active > section.vucko-proof "(A few things I've worked on)" | no picture, effect or mock in this section; a feature section needs a visual |
| no-visual | 390 | main#main-content > div.vucko-about.vucko-morph-active > section.vucko-brands "Selected brands, agency partners and emp" | no picture, effect or mock in this section; a feature section needs a visual |
| heading-scale | 390 | div.vucko-about.vucko-morph-active > section.vucko-career > div.vucko-career-copy > h2 "Where I've worked" | h2 headings in 5 sizes, 14px ("(What I bring to a marke") to 36px (x2.57) |
| section-tile | 390 | main#main-content > div.vucko-about.vucko-morph-active > header.vucko-header "TIEN EN VI" | the first section is 129px tall (0.15 screens at 390x844), shorter than the screen: the first screen shows 129px of it and 844px of the next section, its heading "Xin chào. Hello. I’m Tien." on screen |
| section-tile | 390 | main#main-content > div.vucko-about.vucko-morph-active > section.vucko-brands "Selected brands, agency partners and emp" | the section is 408px tall (0.48 screens at 390x844), shorter than the screen: its tile (the screen from its top) shows 408px of it and 335px of the next section, its heading "Outside work" on screen |
| container | 1440, 390 | page | no .wrap |

### Retained taste WARNs

- **flush**: section#afterwork > details.vucko-photo-archive > summary > span "+" — its button sits 27px above the rule on top of section.vucko-contact
- **caption**: div#about-capability-preview > div.vucko-service-content > p:nth-of-type(1) "I use surveys and interviews to understa" — a line of words sits right under a picture, like "I use surveys and interviews to understa": the section's text says it, or the picture speaks for itself
- **cut-text**: section#about-top > div.vucko-wordmark > span.vucko-letter-mask:nth-of-type(4) > span "N" — sits across the edge of a panel behind it
- **no-visual**: main#main-content > div.vucko-about.vucko-morph-active > section.vucko-capabilities "(What I bring to a marketing team)" — pictures, effects and mocks cover 22% of this section; a feature section needs a visual (about 25% or more)
- **cta**: section#afterwork "Outside work" — a section over 1.5 screens long with no link or button in it
- **copy-actions**: (the page) — the main action "Explore projects" does not read word for word the same in the nav or hero and the closing section
- **off-grid**: section#about-biography > h2 "Marketing undergraduate with a 3.69/4.0 " — the section's heading starts at 407px, 349px off the page margin (58px), and no other section starts there
- **col-edge**: div.vucko-about.vucko-morph-active > section.vucko-credentials > div:nth-of-type(1) > div.vucko-awards "Semi-finalist Marketing On Air 2025 BIDV" — the second column starts at 3 places: 443px (section.vucko-credentials), 732px (section.vucko-work), 809px (section.vucko-capabilities)
- **section-gaps**: section#afterwork / main#main-content > div.vucko-about.vucko-morph-active > section.vucko-contact — 253px between these sections, +30% against the median 194px
- **section-gaps**: main#main-content > div.vucko-about.vucko-morph-active > section.vucko-contact / main#main-content > div.vucko-about.vucko-morph-active > footer.vucko-footer — 106px between these sections, -45% against the median 194px
- **copy-length**: section#about-biography > h2 "Marketing undergraduate with a 3.69/4.0 " — a section heading of 23 words on 4 lines at 34.6px: a paragraph set in display type
- **photo-repeat**: div.vucko-project-grid > article:nth-of-type(1) > figure > img "image" — the photograph image is shown 9 times on the page: a picture the visitor has already seen
- **share-meta**: head — the head lacks og:image, theme-color: a shared link shows no picture or title of its own
- **collide**: section#about-top > div.vucko-hero-preview > a.vucko-preview-motion > span "Tien Duong Ngoc Hanoi, Vietnam" — the words "Tien Duong Ngoc Hanoi, Vietnam" run out of their section into the next one (figure.vucko-wide-portrait): the section is shorter than what it holds
- **tap-size**: div.vucko-about.vucko-morph-active > section.vucko-work > div.vucko-work-end > a.vucko-large-link "Explore my work" — a 350x29px tap target: under the 44px a phone needs
- **tap-size**: main#main-content > div.vucko-about.vucko-morph-active > section.vucko-contact > a.vucko-large-link "Let's talk" — a 132x32px tap target: under the 44px a phone needs
- **heading-scale**: section.vucko-work > div.vucko-project-grid > article:nth-of-type(1) > h3 "Clario: from campaign evidence to a deci" — the h3s (20px) are only 1.20x smaller than the h2s (24px): one level a clear step (1.3x or more) below the other
- **photo-set**: div.vucko-photo-grid > details.vucko-photo:nth-of-type(3) > summary > img "image" — 4 photographs in more than one look: lightness from 0.26 to 0.85; saturation from 0.15 to 0.51; the odd one out is image
- **section-tile**: main#main-content > div.vucko-about.vucko-morph-active > section.vucko-proof "(A few things I've worked on)" — the section is 789px tall (0.93 screens at 390x844), shorter than the screen: its tile (the screen from its top) shows 789px of it and only 129px of a section further down's ground ("TIEN EN VI"), none of its content
- **section-tile**: main#main-content > div.vucko-about.vucko-morph-active > section.vucko-contact "I'd like to do this in a marketing team" — the section is 396px tall (0.47 screens at 390x844), shorter than the screen: its tile (the screen from its top) shows 396px of it and only 129px of the section above's ground ("TIEN EN VI"), none of its content
- **empty-area**: section#about-top "Xin chào. Hello. I’m Tien." — 44% of the section is empty: 320px of empty rows between its content, in its 711px of rows (WARN over 35%, FAIL over 50%)

### Final validation summary

- Source check: 0 errors, 3 warnings, 0 notes, on the same five live About files as the baseline. The three native-control warnings and their rationale are listed above.
- Rendered scan: 0 errors, 1 warning, 7 notes. No failing contrast, tiny text, overflow or covered-text finding.
- 320px stress: 0 warnings; one info note about the duplicate header location.
- Production performance: 2 shared parsed-JavaScript budget FAIL rows and 8 WARN rows remain; all image-dimension, total-transfer, blocking-time, layout-shift, WebGL-count and broken-request checks pass.
- Latest lint and production build passed; all 29 existing tests passed.
- No CMS data, copy, figures or destinations changed. No new packages, kit edits, blanket waivers or stand-in assets.
- All Mobbin references were inspected as images and used for principles only; their canonical links are in the References section.
- The existing contact and social destinations remain; no `.example` form or invented contact was added.
