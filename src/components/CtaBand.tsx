import CtaForm from "./CtaForm";

export default function CtaBand() {
  return (
    <section id="demo" className="tinted">
      <div className="wrap !px-0">
        <div className="cta-split">
          <div className="cta-left">
            <span className="stamp">STOP WONDERING WHO&rsquo;S STILL HERE</span>
            <h2>
              Two seconds to check in.{" "}
              <em>One glance to know who&rsquo;s here.</em>
            </h2>
            <p>
              See Presently in action and discover how check-in, intelligent
              time management, parent communication, and attendance reporting
              work together in one center workflow. No commitment.
            </p>
            <ul className="cta-checks">
              <li>Web-based — no new hardware required</li>
              <li>Built around the way Kumon centers operate</li>
              <li>Parents receive texts — no parent app required</li>
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
