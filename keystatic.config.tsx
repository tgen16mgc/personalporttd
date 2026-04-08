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

const useGithubStorage = !!process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG;

export default config({
  storage: useGithubStorage
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
        portraitImage: fields.text({
          label: "Portrait Image Path",
          description: "Path relative to public/, e.g. /tien.jpg",
        }),
        aboutImage: fields.text({
          label: "About Page Image Path",
          description: "Path relative to public/, e.g. /tien-about.jpg",
        }),
        seo: fields.object({
          title: fields.text({ label: "SEO Title" }),
          description: fields.text({ label: "SEO Description", multiline: true }),
          shortDescription: fields.text({ label: "OG Short Description" }),
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
            logo: fields.text({
              label: "Logo Path",
              description: "SVG in public/images/brands/, e.g. /images/brands/aeon.svg",
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
            image: fields.text({
              label: "Image Path",
              description: "e.g. /afterwork/lol.jpg",
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
            thumbnail: fields.text({
              label: "Thumbnail Path",
              description: "e.g. /images/projects/my-project-thumb.svg",
            }),
            featured: fields.checkbox({
              label: "Featured on Homepage",
              defaultValue: false,
            }),
            color: fields.text({
              label: "Accent Color (hex)",
              description: "e.g. #06B6D4",
            }),
            challenge: fields.text({
              label: "The Challenge",
              multiline: true,
            }),
            insight: fields.text({
              label: "The Insight",
              multiline: true,
            }),
            approach: fields.text({
              label: "The Approach",
              multiline: true,
            }),
            execution: fields.array(
              fields.text({ label: "Step" }),
              {
                label: "Execution Steps",
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
