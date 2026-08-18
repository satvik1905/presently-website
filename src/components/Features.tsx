import ScrollReveal from "./ScrollReveal";

export default function Features() {
  return (
    <section id="features">
      <div className="wrap wrap-wide">
        <div className="feats-container">
        <span className="stamp">BUILT FOR CENTER DIRECTORS</span>
        <h2>The boring parts of running a center, handled.</h2>
        <p className="sec-lede">
          Attendance is a safety record, a staffing signal, and a parent-trust
          issue all at once. Presently treats it that way.
        </p>
        <div className="feats">
          <ScrollReveal className="feat">
            <div className="ico" aria-hidden="true">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>
            </div>
            <h3>Session time limits</h3>
            <p>
              Set a limit per student: 30 minutes for one subject, 60 for two.
              Over-limit students are flagged in amber, and staff can add time in
              one tap.
            </p>
          </ScrollReveal>
          <ScrollReveal className="feat">
            <div className="ico" aria-hidden="true">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <h3>Two-way parent texting</h3>
            <p>
              Automatic check-in and check-out texts, plus a real inbox when a
              parent replies. Broadcasts for snow days and schedule changes.
            </p>
          </ScrollReveal>
          <ScrollReveal className="feat">
            <div className="ico" aria-hidden="true">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
              </svg>
            </div>
            <h3>Records that keep themselves</h3>
            <p>
              Every session is logged the moment it happens. Attendance reports,
              session averages, and exports. Two years of history, always
              current.
            </p>
          </ScrollReveal>
          <ScrollReveal className="feat">
            <div className="ico" aria-hidden="true">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 21V8l7-5 7 5v13" />
                <path d="M13 21v-6h4v6" />
                <path d="M21 21H1" />
              </svg>
            </div>
            <h3>Multi-center from day one</h3>
            <p>
              Run one location or twelve. Owners see across their centers;
              directors and staff see exactly their own. Role-based access built
              in.
            </p>
          </ScrollReveal>
        </div>
        </div>
      </div>
    </section>
  );
}
