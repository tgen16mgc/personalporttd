import { personal } from "@/content/personal";
import { heroContent, quickIntroContent, homeDetails } from "@/content/pages/home";

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
        {homeDetails.seeking && <div data-reveal><dt>Seeking</dt><dd>{homeDetails.seeking}</dd></div>}
        {homeDetails.available && <div data-reveal><dt>Available</dt><dd>{homeDetails.available}</dd></div>}
      </dl>
    </section>
  );
}
