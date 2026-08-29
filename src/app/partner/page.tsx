import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Faq from "@/components/Faq";
import { LinkButton } from "@/components/Button";

const PLANS = [
  {
    key: "standard",
    name: "Standard",
    price: 34.99,
    description: "Core check-in and attendance",
    isPro: false,
    cta: "Get Standard",
    features: [
      "iPad check-in and check-out",
      "Live board with session timers",
      "Automatic parent text notifications",
      "Attendance reports and CSV exports",
      "Single center",
    ],
  },
  {
    key: "pro",
    name: "Pro",
    price: 39.99,
    description: "Everything in Standard + two-way parent texting",
    isPro: true,
    cta: "Get Pro plan",
    features: [
      "Everything in Standard, plus:",
      "Two-way parent texting with inbox",
      "Broadcast messages to all parents",
      "Scheduled announcements",
      "Advanced attendance analytics",
    ],
  },
] as const;

export default function PartnerPage() {
  return (
    <>
      <Navbar links={[{ label: "How it works", href: "/#how" }, { label: "Demo", href: "/#demo" }]} />
      <main>
        {/* Hero */}
        <section className="partner-hero">
          <div className="wrap">
            <h2>Choose your plan</h2>
            <p className="sub">
              Start with Standard or unlock everything with Pro.
            </p>
          </div>
        </section>

        {/* Plan Picker */}
        <section className="partner-plans">
          <div className="wrap">
            <div className="plan-grid">
              {PLANS.map((p) => (
                <div
                  key={p.key}
                  className={`plan-card${p.isPro ? " plan-card-pro" : ""}`}
                >
                  <div className="flex items-start justify-between mb-3.5">
                    <div className="plan-icon" style={{ marginBottom: 0 }}>
                      {p.isPro ? (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      ) : (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="3" width="18" height="18" rx="2" />
                          <path d="M9 12l2 2 4-4" />
                        </svg>
                      )}
                    </div>
                    {p.isPro && (
                      <span className="plan-badge" style={{ position: "static" }}>Recommended</span>
                    )}
                  </div>

                  <h3>{p.name}</h3>
                  <p className="plan-desc">{p.description}</p>

                  <div className="plan-price">
                    <span className="plan-price-new">
                      ${p.price.toFixed(2)}
                    </span>
                    <span className="plan-price-period">/month</span>
                  </div>

                  <LinkButton
                    href={`/partner/checkout?plan=${p.key}`}
                    variant={p.isPro ? "primary" : "ghost"}
                    fullWidth
                    className="mb-[18px]"
                  >
                    {p.cta}
                  </LinkButton>

                  <ul className="plan-features">
                    {p.features.map((f, fi) => (
                      <li key={f}>
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke={p.isPro ? "#2563EB" : "var(--muted)"}
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {p.isPro && fi === 1 ? <strong>{f}</strong> : f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="plan-footnote">
              No contracts. Cancel anytime. Special pilot pricing available via promo code.
            </p>
          </div>
        </section>

        <Faq />
      </main>
      <Footer />
    </>
  );
}
