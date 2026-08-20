import HeroCarousel from "./HeroCarousel";

export default function Hero() {
  return (
    <section className="hero">
      <div className="wrap hero-grid">
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
            <a className="btn btn-primary btn-lg" href="/partner">
              Get Powered
            </a>
            <a className="btn btn-ghost btn-lg" href="#demo">
              Request a demo
            </a>
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
