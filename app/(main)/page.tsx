import { personal } from "@/content/personal";
import { heroContent } from "@/content/pages/home";

export default function HomePage() {
  return (
    <section className="home-page page-shell" aria-label="Interactive portfolio">
      <header className="home-profile">
        <p data-reveal>{heroContent.currentRole.label}</p>
        <h1 data-reveal-heading>{personal.name.toUpperCase()}</h1>
      </header>
      <dl className="home-meta" aria-label="Home details">
        <div data-reveal><dt>Base</dt><dd>{personal.location}</dd></div>
        <div data-reveal><dt>Focus</dt><dd>{heroContent.industries.join(" / ")}</dd></div>
        <div data-reveal><dt>Index</dt><dd>Portfolio {new Date().getFullYear()}</dd></div>
      </dl>
    </section>
  );
}
