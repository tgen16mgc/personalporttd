# Content

Keystatic JSON is the source of truth:

- `keystatic/personal.json`: identity, links, navigation, and SEO
- `keystatic/homepage.json`: hero, intro, and brand strip
- `keystatic/about.json`: biography, experience, education, and afterwork
- `keystatic/contact.json`: contact heading and form introduction
- `keystatic/projects.json`: project metadata, galleries, and story blocks
- `keystatic/projects/items/`: document-field content referenced by project story blocks

Run `npm run dev` and open `/keystatic` to edit locally. Uploaded media is stored under `public/images/` and its public path is written into the JSON automatically.

Production admin access is disabled unless GitHub storage is configured or `KEYSTATIC_ALLOW_LOCAL_MODE=true`; set `KEYSTATIC_DISABLE_ADMIN=true` to disable it everywhere.

## Where edits appear

- Homepage → Home Details controls Seeking and Available independently of the About facts list. Reordering or clearing Quick Facts cannot break Home.
- Homepage → Portfolio Positioning and Headline (muted part) appear on Home; the biography, quick facts, tools, and brand strip appear on About. Greeting/typewriter fields are retained for the legacy hero, not the current 3D home.
- Personal Info controls identity, social links, primary navigation, footer, and site metadata.
- Projects controls the Work archive and case studies. Featured projects supply images for the home scene. Story labels preview their actual content; rich text is read through Keystatic so paragraphs, emphasis, and links survive saves.
- Contact Page controls the contact heading, form jump label, and form introduction. Email, location, status, and resume still come from Personal Info.

## Publishing

Local saves update the files used by `next dev`; refresh the public page to check the result. The production site is built from the repository, not fetched live from GitHub: save to the deployment branch (or merge the CMS branch), then wait for a successful deployment. Configure the hosting provider to rebuild on commits to that branch. Local production mode also requires a rebuild/restart after content edits and is not suitable for a read-only serverless filesystem.

Reorder projects and Story blocks inside Keystatic, not by editing JSON indexes alone: the editor moves the associated `.mdoc` files and media. Keep each project slug unique and URL-safe. This project retains the existing document field format to avoid a destructive content migration.
