import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { personal } from "@/content/personal";
import { createMailtoHref, getSafeExternalHref } from "@/lib/security.mjs";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = { title: `Contact | ${personal.name}` };

export default function ContactPage() {
  const email = createMailtoHref(personal.email);
  const linkedin = getSafeExternalHref(personal.linkedin);
  const resume = getSafeExternalHref(personal.resumeUrl);
  return <>
    <section className="contact-page page-shell" aria-label="Contact">
      <Link href="/" className="back-button" aria-label="Back to home" data-cursor="Home"><ChevronLeft size={21} /></Link>
      <div className="contact-content"><header className="center-intro"><p className="eyebrow" data-reveal>Contact</p><h1 data-reveal-heading>Get in touch.</h1></header>
        <div className="contact-links" aria-label="Contact links" data-reveal>{email && <a href={email}>{personal.email}<ArrowUpRight /></a>}{linkedin && <a href={linkedin} target="_blank" rel="noopener noreferrer">LinkedIn<ArrowUpRight /></a>}</div>
      </div>
      <a href="#contact-form" className="contact-form-jump">Send a message <ArrowUpRight size={14} /></a>
    </section>
    <section id="contact-form" className="contact-form-section"><div><h2>Want to start a new project?</h2><p>Or just say hello.</p><p>{personal.status}<br />{personal.location}</p>{resume && <a href={resume} target="_blank" rel="noopener noreferrer" className="text-link">Resume <ArrowUpRight size={16} /></a>}</div><ContactForm /></section>
    <Footer />
  </>;
}
