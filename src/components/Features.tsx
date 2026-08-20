import ScrollReveal from "./ScrollReveal";

export default function Features() {
  return (
    <section id="features">
      <div className="wrap wrap-wide">
        <div className="feats-container">
          <span className="stamp">BUILT FOR CENTER DIRECTORS</span>
          <h2 style={{ maxWidth: "none" }}>The moving parts of your center, connected.</h2>
          <p className="sec-lede" style={{ maxWidth: "none" }}>
            Attendance, student time, parent communication and center
            visibility—all working together in one place.
          </p>
          <div className="feats">
            <ScrollReveal className="feat">
              <div className="ico" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <h3>Intelligent Time Management</h3>
              <p>
                30-minute default per subject, customizable student timers,
                color-coded countdowns and instant Time to Dismiss visibility.
              </p>
            </ScrollReveal>
            <ScrollReveal className="feat">
              <div className="ico" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <h3>Parent Communication</h3>
              <p>
                Automated check-in/out alerts, two-way texting and
                broadcasts—all built in.
              </p>
            </ScrollReveal>
            <ScrollReveal className="feat">
              <div className="ico" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 20V10" /><path d="M12 20V4" /><path d="M6 20v-6" />
                </svg>
              </div>
              <h3>Attendance &amp; Insights</h3>
              <p>
                Attendance history, absence tracking and reporting that turns
                every session into useful data.
              </p>
            </ScrollReveal>
            <ScrollReveal className="feat">
              <div className="ico" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <h3>Center Management</h3>
              <p>
                Student profiles, staff access and customizable center
                settings—all managed from one place.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
