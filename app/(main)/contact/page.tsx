import { ContactForm } from "@/components/contact/ContactForm";
import { Container } from "@/components/ui/Container";
import { personal } from "@/content/personal";

function ArrowGlyph({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 97 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="currentColor"
        d="M57.2 1.4 54.4 2C57.9 20.8 66.9 29.7 76.2 34H1.3v3.7h75.3c-9.7 4.2-20.2 13.2-23.2 31.9l3.8.6C61.7 41.5 84.8 38 92.5 37.7c1.7.1 2.7 0 2.8 0l-.1-3.8h-3.9c-8.6-.5-29.1-4.6-34.1-32.5Z"
      />
    </svg>
  );
}

function LinkedInMark({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13Zm1.78 13.02H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0h.01Z" />
    </svg>
  );
}

const usefulLinks = [
  {
    label: "LinkedIn",
    href: personal.linkedin,
    icon: LinkedInMark,
  },
  {
    label: "Resume",
    href: personal.resumeUrl,
    icon: ArrowGlyph,
  },
];

function ContactFootnote() {
  return (
    <footer className="contact-footnote border-t border-[var(--color-ink)]/10 py-6">
      <Container size="wide">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 text-sm text-[var(--color-ink-muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {personal.name}
          </p>
          <p className="font-[var(--font-display)] text-base italic text-[var(--color-ink-light)]">
            &ldquo;{personal.footerQuote}&rdquo;
          </p>
        </div>
      </Container>
    </footer>
  );
}

export default function ContactPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden pt-28 pb-16 sm:pt-32 lg:flex lg:min-h-[100dvh] lg:items-center lg:pb-24">
        <Container size="wide">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-[0.82fr_1fr] lg:items-start lg:gap-16">
            <div>
              <p className="contact-reveal contact-delay-1 mb-5 text-sm font-medium text-[var(--color-ink-muted)]">
                Contact
              </p>

              <h1 className="contact-title max-w-3xl font-[var(--font-display)] text-5xl font-light leading-[0.96] tracking-normal text-[var(--color-ink)] sm:text-6xl lg:text-7xl xl:text-8xl">
                <span className="contact-title-line">
                  <span className="contact-title-text">Want to</span>
                </span>
                <span className="contact-title-line">
                  <span className="contact-title-text">start a new</span>
                </span>
                <span className="contact-title-line">
                  <span className="contact-title-text">project?</span>
                </span>
              </h1>

              <p className="contact-reveal contact-delay-4 mt-7 max-w-md text-base leading-relaxed text-[var(--color-ink-light)] sm:text-lg">
                Or just say hello.
              </p>

              <a
                href={`mailto:${personal.email}?subject=A%20request%20for%20you`}
                className="contact-email contact-reveal contact-delay-5 group mt-9 block w-fit cursor-pointer overflow-hidden font-[var(--font-display)] text-3xl font-light leading-tight tracking-normal text-[var(--color-cyan)] transition-colors duration-200 hover:text-[var(--color-ink)] sm:text-4xl"
              >
                {personal.email}
                <span
                  aria-hidden="true"
                  className="mt-3 block h-px origin-left bg-current transition-transform duration-200 group-hover:scale-x-90"
                />
              </a>

              <div className="mt-8 flex flex-wrap gap-3">
                {usefulLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-link group inline-flex min-h-11 cursor-pointer items-center gap-3 rounded-sm border border-[var(--color-ink)]/15 bg-white/55 px-4 py-2.5 text-sm font-medium text-[var(--color-ink)] transition-colors duration-200 hover:bg-[var(--color-ink)] hover:text-white active:-translate-y-[1px]"
                  >
                    <link.icon className="h-4 w-4" />
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
      <ContactFootnote />
    </>
  );
}
