import { Container } from "@/components/ui/Container";

export default function WorkLoading() {
  return (
    <div className="pt-32 pb-24">
      <Container size="wide">
        {/* Header Skeleton */}
        <div className="mb-16 animate-pulse">
          <div className="h-4 w-24 bg-[var(--color-cream-dark)] rounded mb-4" />
          <div className="h-12 w-64 bg-[var(--color-cream-dark)] rounded" />
        </div>

        {/* Project Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse">
              {/* Card wrapper with Double-Bezel */}
              <div className="p-2 rounded-[2rem] bg-white/60 ring-1 ring-black/[0.04]">
                <div className="rounded-[calc(2rem-0.5rem)] overflow-hidden">
                  {/* Image skeleton */}
                  <div className="aspect-video bg-[var(--color-cream-dark)]" />
                  
                  {/* Content skeleton */}
                  <div className="p-6">
                    <div className="flex gap-2 mb-3">
                      <div className="h-6 w-16 bg-[var(--color-cream-dark)] rounded-full" />
                      <div className="h-6 w-12 bg-[var(--color-cream-dark)] rounded-full" />
                    </div>
                    <div className="h-6 w-3/4 bg-[var(--color-cream-dark)] rounded mb-2" />
                    <div className="h-4 w-full bg-[var(--color-cream-dark)] rounded mb-1" />
                    <div className="h-4 w-5/6 bg-[var(--color-cream-dark)] rounded mb-3" />
                    <div className="h-3 w-32 bg-[var(--color-cream-dark)] rounded" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
