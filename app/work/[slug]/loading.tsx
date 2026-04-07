import { Container } from "@/components/ui/Container";

export default function CaseStudyLoading() {
  return (
    <div className="pt-32 pb-24">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Header Skeleton */}
          <div className="mb-16 animate-pulse">
            <div className="flex gap-2 mb-4">
              <div className="h-6 w-20 bg-[var(--color-cream-dark)] rounded-full" />
              <div className="h-6 w-16 bg-[var(--color-cream-dark)] rounded-full" />
            </div>
            <div className="h-16 w-full bg-[var(--color-cream-dark)] rounded mb-4" />
            <div className="h-6 w-3/4 bg-[var(--color-cream-dark)] rounded mb-8" />
            <div className="flex flex-wrap gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i}>
                  <div className="h-3 w-16 bg-[var(--color-cream-dark)] rounded mb-1" />
                  <div className="h-5 w-24 bg-[var(--color-cream-dark)] rounded" />
                </div>
              ))}
            </div>
          </div>

          {/* Content Skeleton */}
          <div className="space-y-12 animate-pulse">
            {[1, 2, 3].map((section) => (
              <div key={section}>
                <div className="h-8 w-48 bg-[var(--color-cream-dark)] rounded mb-4" />
                <div className="space-y-3">
                  <div className="h-4 w-full bg-[var(--color-cream-dark)] rounded" />
                  <div className="h-4 w-full bg-[var(--color-cream-dark)] rounded" />
                  <div className="h-4 w-5/6 bg-[var(--color-cream-dark)] rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
