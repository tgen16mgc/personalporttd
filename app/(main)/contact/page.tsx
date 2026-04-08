"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/Button";
import { Footer } from "@/components/layout/Footer";
import { fadeInUp } from "@/lib/animations";
import { Mail, Send, MapPin, Phone, Loader2 } from "lucide-react";
import { personal } from "@/content/personal";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormState({ name: "", email: "", message: "" });
  };

  return (
    <>
      <section className="pt-32 pb-16 min-h-[80vh] relative overflow-hidden">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left - Info */}
            <ScrollReveal>
              <p className="section-kicker mb-4">
                Contact
              </p>
              <h1 className="text-display text-[var(--color-ink)] mb-6">
                Let&apos;s create
                <br />
                <span className="text-[var(--color-ink-light)]">
                  something meaningful
                </span>
              </h1>
              <p className="text-body-lg text-[var(--color-ink-light)] mb-12">
                Whether you have a project in mind, want to collaborate, or 
                just want to say hello, I&apos;d love to hear from you.
              </p>

              <div className="space-y-6">
                <a
                  href={`mailto:${personal.email}`}
                  className="flex items-center gap-4 group active:scale-[0.98] transition-transform cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full bg-[var(--color-cyan)]/10 flex items-center justify-center group-hover:bg-[var(--color-cyan)]/20 transition-colors duration-300">
                    <Mail className="w-5 h-5 text-[var(--color-cyan)]" />
                  </div>
                  <div>
                    <p className="text-tag text-[var(--color-ink-muted)]">Email</p>
                    <p className="text-[var(--color-ink)] group-hover:text-[var(--color-cyan)] transition-colors">
                      {personal.email}
                    </p>
                  </div>
                </a>

                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group active:scale-[0.98] transition-transform cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full bg-[var(--color-cyan)]/10 flex items-center justify-center group-hover:bg-[var(--color-cyan)]/20 transition-colors duration-300">
                    <LinkedInIcon className="w-5 h-5 text-[var(--color-cyan)]" />
                  </div>
                  <div>
                    <p className="text-tag text-[var(--color-ink-muted)]">LinkedIn</p>
                    <p className="text-[var(--color-ink)] group-hover:text-[var(--color-cyan)] transition-colors">
                      {personal.linkedinHandle}
                    </p>
                  </div>
                </a>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[var(--color-gold)]/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-[var(--color-gold)]" />
                  </div>
                  <div>
                    <p className="text-tag text-[var(--color-ink-muted)]">Location</p>
                    <p className="text-[var(--color-ink)]">{personal.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[var(--color-pink)]/10 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-[var(--color-pink)]" />
                  </div>
                  <div>
                    <p className="text-tag text-[var(--color-ink-muted)]">Phone</p>
                    <p className="text-[var(--color-ink)]">{personal.phone}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Right - Form with Double-Bezel */}
            <ScrollReveal>
              <motion.div variants={fadeInUp}>
                {/* Outer Shell */}
                <div className="p-2 rounded-[2rem] bg-black/[0.02] ring-1 ring-black/[0.04]">
                  {/* Inner Core */}
                  <div className="bg-white rounded-[calc(2rem-0.5rem)] p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.75),0_6px_24px_rgba(0,0,0,0.05)]">
                    {isSubmitted ? (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 rounded-full bg-[var(--color-cyan)]/10 flex items-center justify-center mx-auto mb-6">
                          <Send className="w-8 h-8 text-[var(--color-cyan)]" />
                        </div>
                        <h3 className="text-xl font-medium text-[var(--color-ink)] mb-2">
                          Message sent
                        </h3>
                        <p className="text-[var(--color-ink-light)]">
                          Thanks for reaching out. I&apos;ll get back to you soon.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-[var(--color-ink)] mb-2"
                          >
                            Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            required
                            value={formState.name}
                            onChange={(e) =>
                              setFormState({ ...formState, name: e.target.value })
                            }
                            className="input-premium w-full px-4 py-3 rounded-xl border border-[var(--color-cream-dark)] focus:outline-none transition-all bg-white"
                            placeholder="Your name"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-[var(--color-ink)] mb-2"
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            required
                            value={formState.email}
                            onChange={(e) =>
                              setFormState({ ...formState, email: e.target.value })
                            }
                            className="input-premium w-full px-4 py-3 rounded-xl border border-[var(--color-cream-dark)] focus:outline-none transition-all bg-white"
                            placeholder="your@email.com"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="message"
                            className="block text-sm font-medium text-[var(--color-ink)] mb-2"
                          >
                            Message
                          </label>
                          <textarea
                            id="message"
                            required
                            rows={5}
                            value={formState.message}
                            onChange={(e) =>
                              setFormState({ ...formState, message: e.target.value })
                            }
                            className="input-premium w-full px-4 py-3 rounded-xl border border-[var(--color-cream-dark)] focus:outline-none transition-all resize-none bg-white"
                            placeholder="Tell me about your project or just say hello..."
                          />
                        </div>

                        <div className="flex justify-center">
                          <Button 
                            type="submit" 
                            variant="primary" 
                            size="lg" 
                            disabled={isSubmitting}
                            className="w-full"
                          >
                            {isSubmitting ? (
                              <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Sending...
                              </>
                            ) : (
                              <>
                                <Send className="w-4 h-4" />
                                Send message
                              </>
                            )}
                          </Button>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      <Footer />
    </>
  );
}
