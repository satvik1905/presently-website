import ScrollReveal from "./ScrollReveal";

export default function HowItWorks() {
  return (
    <section className="tinted" id="how">
      <div className="wrap">
        <span className="stamp">ONE AFTERNOON AT YOUR CENTER</span>
        <h2>From the front door to the drive home, without a clipboard.</h2>
        <p className="sec-lede">
          Presently follows the same path your students do. Order matters here —
          each step triggers the next, automatically.
        </p>

        <div className="steps">
          <ScrollReveal className="step">
            <span className="stamp">3:41 PM — ARRIVAL</span>
            <h3>Scan in at the door</h3>
            <p>
              A student holds their QR badge up to the front-desk iPad, or types
              their PIN. Two to three seconds, no line at the desk.
            </p>
            <div className="art">
              <span className="chip">✓ Checked in · Maya R.</span>
            </div>
          </ScrollReveal>
          <ScrollReveal className="step">
            <span className="stamp">3:42 PM — NOTIFIED</span>
            <h3>Parents get a text</h3>
            <p>
              The moment a student checks in or out, their guardians get a
              message. No app to install, no login to forget.
            </p>
            <div className="art">
              <span className="bubble">
                Maya checked in to Sunrise Learning at 3:41 PM.
              </span>
            </div>
          </ScrollReveal>
          <ScrollReveal className="step">
            <span className="stamp">4:12 PM — ON THE BOARD</span>
            <h3>Watch the room, not the door</h3>
            <p>
              The live board shows every student here right now, by room, with a
              running timer. When someone passes their session limit, they
              surface to the top.
            </p>
            <div className="art" style={{ color: "var(--amber)" }}>
              Jonah K. · 31:58 — time to dismiss
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
