import { personal } from "@/content/personal";
import { heroContent, quickIntroContent } from "@/content/pages/home";

export default function HomePage() {
  return (
    <section className="home-page page-shell" aria-label="Interactive portfolio">
      <header className="home-profile">
        <p data-reveal>{heroContent.positioning}</p>
        <h1 data-reveal-heading>{personal.name.toUpperCase()}</h1>
        <p className="home-summary" data-reveal>{quickIntroContent.headlineSub}</p>
      </header>
      <dl className="home-meta" aria-label="Home details">
        <div data-reveal><dt>Base</dt><dd>{personal.location}</dd></div>
        <div data-reveal><dt>Seeking</dt><dd>Graduate programs / Marketing roles</dd></div>
        <div data-reveal><dt>Available</dt><dd>{quickIntroContent.facts[2].primary}</dd></div>
      </dl>
    </section>
  );
}
