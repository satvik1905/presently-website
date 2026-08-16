import ScrollReveal from "./ScrollReveal";

export default function CtaBand() {
  return (
    <section id="demo">
      <div className="wrap">
        <ScrollReveal className="cta-band">
          <div>
            <span className="stamp">6:00 PM — CLOSING TIME</span>
            <h2>End the day with an empty board.</h2>
            <p>
              See Presently running on real center workflows in a 20-minute
              walkthrough — check-in, the live board, parent texts, and reports.
            </p>
          </div>
          <div className="actions">
            <a className="btn btn-on-blue btn-lg" href="#">
              Book a demo
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
