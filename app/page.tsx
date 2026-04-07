import { Hero } from "@/components/home/Hero";
import { QuickIntro } from "@/components/home/QuickIntro";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { Footer } from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <>
      <Hero />
      <QuickIntro />
      <FeaturedProjects />
      <Footer />
    </>
  );
}
