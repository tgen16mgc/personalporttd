"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-[var(--color-cream)]">
      <Container>
        <div className="text-center max-w-2xl mx-auto">
          {/* Large 404 */}
          <h1 className="text-[clamp(4rem,15vw,12rem)] font-[var(--font-display)] font-bold text-[var(--color-ink)] leading-none mb-6">
            404
          </h1>
          
          {/* Message */}
          <h2 className="text-2xl md:text-3xl font-[var(--font-display)] font-semibold text-[var(--color-ink)] mb-4">
            This page doesn&apos;t exist
          </h2>
          <p className="text-lg text-[var(--color-ink-light)] mb-10 max-w-md mx-auto">
            Or maybe it&apos;s just shy. Either way, let&apos;s get you back to somewhere that actually exists.
          </p>
          
          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/" variant="primary" size="lg" icon>
              Go home
            </Button>
            <Button href="/work" variant="secondary" size="lg">
              View my work
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
