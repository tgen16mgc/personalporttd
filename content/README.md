# Content

Keystatic JSON is the source of truth:

- `keystatic/personal.json`: identity, links, navigation, and SEO
- `keystatic/homepage.json`: hero, intro, and brand strip
- `keystatic/about.json`: biography, experience, education, and afterwork
- `keystatic/projects.json`: project metadata, galleries, and story blocks
- `keystatic/projects/items/`: document-field content referenced by project story blocks

Run `npm run dev` and open `/keystatic` to edit locally. Uploaded media is stored under `public/images/` and its public path is written into the JSON automatically.

Production admin access is disabled unless GitHub storage is configured or `KEYSTATIC_ALLOW_LOCAL_MODE=true`; set `KEYSTATIC_DISABLE_ADMIN=true` to disable it everywhere.
