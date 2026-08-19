import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
    description: "Everything you need to run your center",
    isPro: true,
    cta: "Get Pro plan",
    features: [
      "Everything in Standard, plus:",
      "Multi-center dashboard",
      "Role-based staff access",
      "Two-way parent texting with inbox",
      "Priority onboarding support",
    ],
  },
] as const;

export default function PartnerPage() {
  return (
    <>
      <Navbar />
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
                  {p.isPro && (
                    <span className="plan-badge">Recommended</span>
                  )}

                  <div className="plan-icon">
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

                  <h3>{p.name}</h3>
                  <p className="plan-desc">{p.description}</p>

                  <div className="plan-price">
                    <span className="plan-price-new">
                      ${p.price.toFixed(2)}
                    </span>
                    <span className="plan-price-period">/month</span>
                  </div>

                  <Link
                    href={`/partner/checkout?plan=${p.key}`}
                    className={`btn ${p.isPro ? "btn-primary" : "btn-ghost"} plan-select-btn`}
                  >
                    {p.cta}
                  </Link>

                  <ul className="plan-features">
                    {p.features.map((f) => (
                      <li key={f}>
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="var(--muted)"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="partner-faq">
          <div className="wrap">
            <h2>Questions</h2>
            <div className="faq-list">
              <div className="faq-item">
                <h3>Can I cancel anytime?</h3>
                <p>
                  Yes. Cancel from your billing portal whenever you want. No
                  contracts, no cancellation fees.
                </p>
              </div>
              <div className="faq-item">
                <h3>What happens after the pilot?</h3>
                <p>
                  Your pilot pricing stays locked. When we launch publicly, new
                  centers will pay more. You keep your rate.
                </p>
              </div>
              <div className="faq-item">
                <h3>Do I need to install anything?</h3>
                <p>
                  No. Presently is web-based and works on the iPad you already
                  have at your front desk. No app downloads, no new hardware.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
