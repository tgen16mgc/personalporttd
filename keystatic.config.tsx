import { config, fields, singleton } from "@keystatic/core";

const roleField = () =>
  fields.object({
    label: fields.text({ label: "Label" }),
    company: fields.text({ label: "Company" }),
  });

const resultField = () =>
  fields.object({
    metric: fields.text({ label: "Metric" }),
    value: fields.text({ label: "Value" }),
  });

const creditField = () =>
  fields.object({
    role: fields.text({ label: "Role" }),
    name: fields.text({ label: "Name" }),
  });

export default config({
  storage: process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG
    ? { kind: "github", repo: "tgen16mgc/personalporttd" }
    : { kind: "local" },
  singletons: {
    personal: singleton({
      label: "Personal Info",
      path: "content/keystatic/personal",
      format: { data: "json" },
      schema: {
        name: fields.text({ label: "Full Name" }),
        shortName: fields.text({ label: "Short Name" }),
        email: fields.text({ label: "Email" }),
        phone: fields.text({ label: "Phone" }),
        location: fields.text({ label: "Location" }),
        linkedin: fields.text({ label: "LinkedIn URL" }),
        linkedinHandle: fields.text({ label: "LinkedIn Handle (display)" }),
        facebook: fields.text({ label: "Facebook URL" }),
        resumeUrl: fields.text({ label: "Resume URL" }),
        status: fields.text({ label: "Status (e.g. Open to opportunities)" }),
        portraitImage: fields.image({
          label: "Portrait Image",
          directory: "public/images/personal",
          publicPath: "/images/personal/",
        }),
        aboutImage: fields.image({
          label: "About Page Image",
          directory: "public/images/personal",
          publicPath: "/images/personal/",
        }),
        seo: fields.object({
          title: fields.text({ label: "SEO Title" }),
          description: fields.text({ label: "SEO Description", multiline: true }),
          shortDescription: fields.text({ label: "OG Short Description" }),
          favicon: fields.image({
            label: "Favicon / Site Icon",
            directory: "public/images/personal",
            publicPath: "/images/personal/",
            description:
              "Square PNG/SVG recommended. Leave empty to use app/favicon.ico.",
          }),
          keywords: fields.array(fields.text({ label: "Keyword" }), {
            label: "SEO Keywords",
            itemLabel: (props) => props.value,
          }),
        }),
        navigation: fields.array(
          fields.object({
            href: fields.text({ label: "Path" }),
            label: fields.text({ label: "Label" }),
          }),
          {
            label: "Navigation Items",
            itemLabel: (props) => props.fields.label.value,
          }
        ),
        footerQuote: fields.text({ label: "Footer Quote" }),
      },
    }),

    homepage: singleton({
      label: "Homepage",
      path: "content/keystatic/homepage",
      format: { data: "json" },
      schema: {
        heroContent: fields.object({
          greeting: fields.text({ label: "Greeting" }),
          tagline: fields.text({ label: "Tagline", multiline: true }),
          currentRole: roleField(),
          previousRole: roleField(),
          education: fields.text({ label: "Education Line" }),
          industries: fields.array(fields.text({ label: "Industry" }), {
            label: "Industry Tags",
            itemLabel: (props) => props.value,
          }),
          tools: fields.array(fields.text({ label: "Tool" }), {
            label: "Tool Tags",
            itemLabel: (props) => props.value,
          }),
          gravityTags: fields.array(
            fields.object({
              label: fields.text({ label: "Label" }),
              color: fields.text({
                label: "Color (hex)",
                description: "e.g. #06B6D4",
              }),
            }),
            {
              label: "Gravity Tags (floating badges on portrait)",
              itemLabel: (props) => props.fields.label.value,
            }
          ),
        }),
        quickIntroContent: fields.object({
          kicker: fields.text({ label: "Kicker" }),
          headline: fields.text({ label: "Headline" }),
          headlineSub: fields.text({ label: "Headline (muted part)" }),
          body: fields.text({ label: "Body", multiline: true }),
          facts: fields.array(
            fields.object({
              label: fields.text({ label: "Label" }),
              primary: fields.text({ label: "Primary Text" }),
              secondary: fields.text({ label: "Secondary Text" }),
            }),
            {
              label: "Quick Facts (4 columns)",
              itemLabel: (props) => props.fields.label.value,
            }
          ),
        }),
        brands: fields.array(
          fields.object({
            name: fields.text({ label: "Brand Name" }),
            logo: fields.image({
              label: "Logo",
              directory: "public/images/homepage",
              publicPath: "/images/homepage/",
            }),
          }),
          {
            label: "Brand Strip (Worked With)",
            itemLabel: (props) => props.fields.name.value,
          }
        ),
      },
    }),

    about: singleton({
      label: "About Page",
      path: "content/keystatic/about",
      format: { data: "json" },
      schema: {
        aboutHero: fields.object({
          hookLine: fields.text({ label: "Hook Line" }),
          hookSub: fields.text({ label: "Hook Subtext", multiline: true }),
        }),
        experience: fields.array(
          fields.object({
            company: fields.text({ label: "Company" }),
            location: fields.text({ label: "Location" }),
            role: fields.text({ label: "Role" }),
            period: fields.text({ label: "Period" }),
          }),
          {
            label: "Experience",
            itemLabel: (props) =>
              `${props.fields.company.value} — ${props.fields.role.value}`,
          }
        ),
        recognition: fields.array(
          fields.object({
            title: fields.text({ label: "Title" }),
            event: fields.text({ label: "Event" }),
            note: fields.text({ label: "Note (optional)" }),
          }),
          {
            label: "Recognition / Awards",
            itemLabel: (props) =>
              `${props.fields.title.value} — ${props.fields.event.value}`,
          }
        ),
        education: fields.object({
          school: fields.text({ label: "School" }),
          location: fields.text({ label: "Location" }),
          degree: fields.text({ label: "Degree" }),
          graduation: fields.text({ label: "Graduation Year" }),
          gpa: fields.text({ label: "GPA" }),
        }),
        personalBits: fields.array(
          fields.object({
            text: fields.text({
              label: "Text (HTML allowed)",
              multiline: true,
            }),
            linkText: fields.text({ label: "Link Text (optional)" }),
            linkHref: fields.text({ label: "Link Href (optional)" }),
            suffix: fields.text({ label: "Suffix (optional)" }),
          }),
          {
            label: "Personal Bits",
            itemLabel: (props) => props.fields.text.value.slice(0, 50),
          }
        ),
        philosophy: fields.object({
          approach: fields.object({
            headline: fields.text({ label: "Headline" }),
            subheadline: fields.text({ label: "Subheadline" }),
            paragraphs: fields.array(
              fields.text({ label: "Paragraph", multiline: true }),
              {
                label: "Approach Paragraphs (HTML allowed)",
                itemLabel: (props) => props.value.slice(0, 60),
              }
            ),
          }),
          reflections: fields.array(
            fields.object({
              kicker: fields.text({ label: "Kicker" }),
              title: fields.text({ label: "Title" }),
              paragraphs: fields.array(
                fields.text({ label: "Paragraph", multiline: true }),
                {
                  label: "Paragraphs (HTML allowed)",
                  itemLabel: (props) => props.value.slice(0, 60),
                }
              ),
            }),
            {
              label: "Reflections (2-column section)",
              itemLabel: (props) => props.fields.title.value,
            }
          ),
          quote: fields.text({ label: "Philosophy Quote", multiline: true }),
          mission: fields.text({
            label: "Mission Statement (HTML allowed)",
            multiline: true,
          }),
        }),
        afterwork: fields.array(
          fields.object({
            id: fields.text({ label: "ID (unique, lowercase)" }),
            title: fields.text({ label: "Title" }),
            subtitle: fields.text({ label: "Subtitle (leave empty for none)" }),
            description: fields.text({ label: "Description", multiline: true }),
            takeaway: fields.text({ label: "Takeaway" }),
            image: fields.image({
              label: "Image",
              directory: "public/images/about",
              publicPath: "/images/about/",
            }),
            emoji: fields.text({ label: "Emoji" }),
            bgGradient: fields.text({
              label: "Background Gradient (Tailwind)",
              description: "e.g. from-violet-50 to-indigo-100",
            }),
            size: fields.select({
              label: "Card Size",
              options: [
                { label: "Large (2 columns)", value: "large" },
                { label: "Small (1 column)", value: "small" },
              ],
              defaultValue: "small",
            }),
          }),
          {
            label: "Afterwork Hobbies",
            itemLabel: (props) => `${props.fields.emoji.value} ${props.fields.title.value}`,
          }
        ),
        aboutCta: fields.object({
          kicker: fields.text({ label: "Kicker" }),
          headline: fields.text({ label: "Headline" }),
          body: fields.text({ label: "Body", multiline: true }),
        }),
      },
    }),

    projects: singleton({
      label: "Projects",
      path: "content/keystatic/projects",
      format: { data: "json" },
      schema: {
        items: fields.array(
          fields.object({
            slug: fields.text({
              label: "Slug",
              description: "URL-safe identifier, e.g. my-project-name",
            }),
            title: fields.text({ label: "Title" }),
            tagline: fields.text({ label: "Tagline", multiline: true }),
            client: fields.text({ label: "Client" }),
            brand: fields.text({ label: "Brand (optional)" }),
            industry: fields.text({
              label: "Industry",
              description: "Used for filter pills on /work page",
            }),
            role: fields.text({ label: "Your Role" }),
            year: fields.text({ label: "Year" }),
            thumbnail: fields.image({
              label: "Thumbnail (square, for /work grid)",
              directory: "public/images/projects",
              publicPath: "/images/projects/",
            }),
            heroImage: fields.image({
              label: "Hero Image (landscape, for project detail page)",
              directory: "public/images/projects",
              publicPath: "/images/projects/",
            }),
            gallery: fields.array(
              fields.object({
                type: fields.select({
                  label: "Type",
                  options: [
                    { label: "Image", value: "image" },
                    { label: "Video embed (YouTube/Vimeo/TikTok)", value: "video" },
                    { label: "Video file (upload)", value: "videoFile" },
                  ],
                  defaultValue: "image",
                }),
                image: fields.image({
                  label: "Image",
                  directory: "public/images/projects",
                  publicPath: "/images/projects/",
                }),
                videoUrl: fields.text({
                  label: "Video URL",
                  description: "YouTube, Vimeo, or TikTok link",
                }),
                videoFile: fields.file({
                  label: "Video File",
                  directory: "public/videos/projects",
                  publicPath: "/videos/projects/",
                  description: "MP4 recommended. Keep under 50MB for git.",
                }),
                size: fields.select({
                  label: "Size",
                  options: [
                    { label: "Full width", value: "full" },
                    { label: "Half width (pairs with next item)", value: "half" },
                  ],
                  defaultValue: "full",
                }),
                caption: fields.text({ label: "Caption (optional)" }),
              }),
              {
                label: "Gallery (images & videos)",
                itemLabel: (props) => {
                  const t = props.fields.type.value;
                  const s = props.fields.size.value === "half" ? " · half" : "";
                  const label = t === "image" ? "Image" : t === "video" ? "Video embed" : "Video file";
                  return `${label}${s}`;
                },
              }
            ),
            featured: fields.checkbox({
              label: "Featured on Homepage",
              defaultValue: false,
            }),
            color: fields.text({
              label: "Accent Color (hex)",
              description: "e.g. #06B6D4",
            }),
            story: fields.array(
              fields.conditional(
                fields.select({
                  label: "Block type",
                  options: [
                    { label: "Text paragraph", value: "text" },
                    { label: "Section heading", value: "heading" },
                    { label: "Image (inline break)", value: "image" },
                    { label: "Pull quote", value: "quote" },
                    { label: "Steps / numbered list", value: "steps" },
                  ],
                  defaultValue: "text",
                }),
                {
                  text: fields.object({
                    body: fields.text({ label: "Paragraph", multiline: true }),
                  }),
                  heading: fields.object({
                    body: fields.text({ label: "Heading text" }),
                  }),
                  image: fields.object({
                    image: fields.image({
                      label: "Image",
                      directory: "public/images/projects",
                      publicPath: "/images/projects/",
                    }),
                    caption: fields.text({ label: "Caption (optional)" }),
                    size: fields.select({
                      label: "Width",
                      options: [
                        { label: "Content width (narrow)", value: "content" },
                        { label: "Wide (break out)", value: "wide" },
                        { label: "Full bleed", value: "full" },
                      ],
                      defaultValue: "wide",
                    }),
                  }),
                  quote: fields.object({
                    body: fields.text({ label: "Quote text", multiline: true }),
                  }),
                  steps: fields.object({
                    heading: fields.text({ label: "Steps heading (optional)" }),
                    items: fields.array(
                      fields.text({ label: "Step" }),
                      {
                        label: "Steps",
                        itemLabel: (props) => props.value.slice(0, 60),
                      }
                    ),
                  }),
                }
              ),
              {
                label: "Story (editorial blocks -- images between text)",
                itemLabel: (props) => {
                  const d = props.discriminant;
                  const v = props.value as unknown as Record<string, { value: string }>;
                  if (d === "heading") return `H: ${v.body?.value?.slice(0, 50) || "heading"}`;
                  if (d === "image") return `IMG: ${v.caption?.value || "image"}`;
                  if (d === "quote") return `Q: ${v.body?.value?.slice(0, 40) || "quote"}`;
                  if (d === "steps") return `Steps: ${v.heading?.value || "numbered list"}`;
                  return v.body?.value?.slice(0, 50) || "text";
                },
              }
            ),
            challenge: fields.text({
              label: "The Challenge (legacy -- use Story blocks instead)",
              multiline: true,
            }),
            insight: fields.text({
              label: "The Insight (legacy -- use Story blocks instead)",
              multiline: true,
            }),
            approach: fields.text({
              label: "The Approach (legacy -- use Story blocks instead)",
              multiline: true,
            }),
            execution: fields.array(
              fields.text({ label: "Step" }),
              {
                label: "Execution Steps (legacy)",
                itemLabel: (props) => props.value.slice(0, 60),
              }
            ),
            results: fields.array(resultField(), {
              label: "Results",
              itemLabel: (props) =>
                `${props.fields.metric.value}: ${props.fields.value.value}`,
            }),
            awards: fields.array(fields.text({ label: "Award" }), {
              label: "Awards",
              itemLabel: (props) => props.value,
            }),
            credits: fields.array(creditField(), {
              label: "Credits",
              itemLabel: (props) =>
                `${props.fields.role.value}: ${props.fields.name.value}`,
            }),
          }),
          {
            label: "All Projects (drag to reorder)",
            itemLabel: (props) =>
              `${props.fields.featured.value ? "★ " : ""}${props.fields.title.value}`,
          }
        ),
      },
    }),
  },
});
