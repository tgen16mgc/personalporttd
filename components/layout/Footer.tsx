import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Mail, ArrowUpRight } from "lucide-react";
import { personal } from "@/content/personal";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

const socialLinks = [
  {
    name: "Email",
    href: `mailto:${personal.email}`,
    icon: Mail,
  },
  {
    name: "LinkedIn",
    href: personal.linkedin,
    icon: LinkedInIcon,
  },
  {
    name: "Facebook",
    href: personal.facebook,
    icon: FacebookIcon,
  },
];

export function Footer() {
  return (
    <footer className="relative py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-cyan)]/40 to-transparent"
      />
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Left side - CTA (wider) */}
          <div className="md:col-span-7">
            <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl font-light mb-4 text-[var(--color-ink)] leading-tight">
              Let&apos;s create something
              <br />
              <span className="text-[var(--color-ink-light)]">meaningful together.</span>
            </h2>
            <p className="text-[var(--color-ink-light)] text-lg mb-8 max-w-md">
              Always open to interesting conversations and collaborations.
            </p>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/70 ring-1 ring-black/[0.06] text-[var(--color-ink)] font-medium shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:bg-[var(--color-ink)] hover:text-white hover:shadow-[0_8px_24px_rgba(10,10,10,0.12)] transition-all duration-500 active:scale-[0.98]"
            >
              Get in touch
              <span className="w-7 h-7 rounded-full bg-black/[0.06] group-hover:bg-white/20 flex items-center justify-center transition-colors duration-500">
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>
          </div>

          {/* Right side - Links & Social */}
          <div className="md:col-span-5 flex flex-col justify-between md:items-end">
            <div className="flex gap-3 mb-8">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 flex items-center justify-center rounded-full bg-white/70 ring-1 ring-black/[0.06] text-[var(--color-ink-light)] hover:bg-[var(--color-ink)] hover:text-white hover:ring-0 hover:shadow-[0_8px_20px_rgba(0,0,0,0.12)] transition-all duration-500 active:scale-[0.95]"
                  aria-label={link.name}
                >
                  <link.icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            <nav className="flex gap-6 mb-8 text-sm text-[var(--color-ink-light)]">
              <Link href="/work" className="hover:text-[var(--color-ink)] transition-colors">Work</Link>
              <Link href="/about" className="hover:text-[var(--color-ink)] transition-colors">About</Link>
              <Link href="/contact" className="hover:text-[var(--color-ink)] transition-colors">Contact</Link>
              <a
                href={personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--color-ink)] transition-colors"
              >
                View Resume
              </a>
            </nav>

            <div className="text-sm text-[var(--color-ink-muted)] md:text-right">
              <p>&copy; {new Date().getFullYear()} {personal.name}</p>
              <p className="mt-2 italic font-[var(--font-display)] text-base text-[var(--color-ink-light)]">
                &ldquo;{personal.footerQuote}&rdquo;
              </p>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
