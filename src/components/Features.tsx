import ScrollReveal from "./ScrollReveal";

export default function Features() {
  return (
    <section id="features">
      <div className="wrap wrap-wide">
        <div className="rounded-3xl px-10 py-11" style={{ background: "linear-gradient(180deg, #EBF1FF 0%, #D4E0FC 40%, #C7D6FA 100%)" }}>
          <span className="stamp">BUILT FOR CENTER DIRECTORS</span>
          <h2 style={{ maxWidth: "none" }}>The moving parts of your center, connected.</h2>
          <p className="sec-lede" style={{ maxWidth: "none" }}>
            Attendance, student time, parent communication and center
            visibility—all working together in one place.
          </p>
          <div className="grid grid-cols-2 gap-6 mt-7 max-[800px]:grid-cols-1">
            <ScrollReveal className="bg-white rounded-2xl p-[28px_26px]">
              <div className="w-[38px] h-[38px] rounded-[10px] bg-[#EEF3FE] text-[#2563EB] flex items-center justify-center mb-4" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <h3 className="text-[19px] font-semibold tracking-[-0.01em] mb-2">Intelligent Time Management</h3>
              <p className="text-[15px] text-[#5B6472]">
                30-minute default per subject, customizable student timers,
                color-coded countdowns and instant Time to Dismiss visibility.
              </p>
            </ScrollReveal>
            <ScrollReveal className="bg-white rounded-2xl p-[28px_26px]">
              <div className="w-[38px] h-[38px] rounded-[10px] bg-[#EEF3FE] text-[#2563EB] flex items-center justify-center mb-4" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <h3 className="text-[19px] font-semibold tracking-[-0.01em] mb-2">Parent Communication</h3>
              <p className="text-[15px] text-[#5B6472]">
                Automated check-in/out alerts, two-way texting and
                broadcasts—all built in.
              </p>
            </ScrollReveal>
            <ScrollReveal className="bg-white rounded-2xl p-[28px_26px]">
              <div className="w-[38px] h-[38px] rounded-[10px] bg-[#EEF3FE] text-[#2563EB] flex items-center justify-center mb-4" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 20V10" /><path d="M12 20V4" /><path d="M6 20v-6" />
                </svg>
              </div>
              <h3 className="text-[19px] font-semibold tracking-[-0.01em] mb-2">Attendance &amp; Insights</h3>
              <p className="text-[15px] text-[#5B6472]">
                Attendance history, absence tracking and reporting that turns
                every session into useful data.
              </p>
            </ScrollReveal>
            <ScrollReveal className="bg-white rounded-2xl p-[28px_26px]">
              <div className="w-[38px] h-[38px] rounded-[10px] bg-[#EEF3FE] text-[#2563EB] flex items-center justify-center mb-4" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <h3 className="text-[19px] font-semibold tracking-[-0.01em] mb-2">Center Management</h3>
              <p className="text-[15px] text-[#5B6472]">
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
