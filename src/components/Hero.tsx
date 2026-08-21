import { LinkButton } from "./Button";
import HeroCarousel from "./HeroCarousel";

export default function Hero() {
  return (
    <section className="hero">
      <div className="wrap hero-grid !px-0">
        <div>
          <span className="stamp">BUILT FOR THE WAY KUMON CENTERS RUN</span>
          <h1>
            Every student in your center, <em>accounted for.</em>
          </h1>
          <p className="lede">
            Presently connects check-in, live student visibility, intelligent
            time tracking and parent communication in one simple system—so
            your team always knows who&rsquo;s here and who&rsquo;s ready.
          </p>
          <div className="hero-ctas">
            <LinkButton href="/partner" size="lg">Get Powered</LinkButton>
            <LinkButton href="#demo" variant="ghost" size="lg">Request a demo</LinkButton>
          </div>
          <p className="hero-note">
            Web-based. Works on the iPad at your front desk. No new hardware.
          </p>
        </div>

        <HeroCarousel />
      </div>
    </section>
  );
}
