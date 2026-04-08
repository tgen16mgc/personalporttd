import { FilmGrain } from "@/components/layout/FilmGrain";
import { Navigation } from "@/components/layout/Navigation";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ScrollProgress />
      <FilmGrain />
      <Navigation />
      <main className="relative z-10 flex-1">{children}</main>
    </>
  );
}
