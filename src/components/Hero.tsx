import HeroCarousel from "./HeroCarousel";

export default function Hero() {
  return (
    <section className="hero">
      <div className="wrap hero-grid">
        <div>
          <span className="stamp">CHECK-IN FOR LEARNING CENTERS</span>
          <h1>
            Every student in your center, <em>accounted for.</em>
          </h1>
          <p className="lede">
            Presently replaces the paper sign-in sheet with a two-second
            check-in, a live board of who&rsquo;s here right now, and an
            automatic text to every parent.
          </p>
          <div className="hero-ctas">
            <a className="btn btn-primary btn-lg" href="#demo">
              Request a demo
            </a>
            <a className="btn btn-ghost btn-lg" href="#how">
              See how it works
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
