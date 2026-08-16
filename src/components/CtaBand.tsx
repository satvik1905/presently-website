import CtaForm from "./CtaForm";

export default function CtaBand() {
  return (
    <section id="demo">
      <div className="wrap">
        <div className="cta-split">
          <div className="cta-left">
            <span className="stamp">STOP WONDERING WHO&rsquo;S STILL HERE</span>
            <h2>
              Two seconds to check in.{" "}
              <em>Zero reasons to worry.</em>
            </h2>
            <p>
              Get a 20-minute walkthrough on your center&rsquo;s workflow —
              check-in, the live board, parent texts, and reports. No
              commitment.
            </p>
            <ul className="cta-checks">
              <li>Works on the iPad at your front desk</li>
              <li>Set up in an afternoon, not a quarter</li>
              <li>Parents get texts, not another app to install</li>
            </ul>
          </div>
          <div className="cta-right">
            <CtaForm />
          </div>
        </div>
      </div>
    </section>
  );
}
