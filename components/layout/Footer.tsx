import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Mail, ArrowUpRight } from "lucide-react";

// Custom LinkedIn icon since lucide doesn't include brand icons
function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

const socialLinks = [
  {
    name: "Email",
    href: "mailto:tiendn.fw@gmail.com",
    icon: Mail,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/tienduongngoc/",
    icon: LinkedInIcon,
  },
];

export function Footer() {
  return (
    <footer className="relative py-24 sm:py-32 border-t border-[var(--color-cream-dark)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-cyan)]/60 to-transparent"
      />
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8">
          {/* Left side - CTA */}
          <div>
            <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl mb-4 text-[var(--color-ink)]">
              Let&apos;s create something
              <br />
              <span className="text-[var(--color-ink-light)]">meaningful together.</span>
            </h2>
            <p className="text-[var(--color-ink-light)] text-lg mb-6">
              Always open to interesting conversations and collaborations.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-[var(--color-ink)] font-medium hover:text-[var(--color-cyan)] transition-colors group"
            >
              Get in touch
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Right side - Links & Social */}
          <div className="flex flex-col justify-between md:items-end">
            <div className="flex gap-4 mb-8">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/70 ring-1 ring-black/[0.06] text-[var(--color-ink-light)] hover:bg-[var(--color-ink)] hover:text-white hover:shadow-[0_8px_20px_rgba(0,0,0,0.12)] transition-all duration-500"
                  aria-label={link.name}
                >
                  <link.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            <div className="text-sm text-[var(--color-ink-muted)]">
              <p>© {new Date().getFullYear()} Tien Duong Ngoc</p>
              <p className="mt-1 italic font-[var(--font-display)]">
                &ldquo;Grow with grace, find beauty in everything.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
