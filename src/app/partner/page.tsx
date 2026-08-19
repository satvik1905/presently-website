"use client";

import { useState, useRef, FormEvent } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PLANS = {
  standard: {
    name: "Standard",
    priceId: "price_1U5tF9CpyCkFlcV6XhvH9EQU",
    price: 34.99,
    description: "Core check-in and attendance",
    features: [
      "iPad check-in and check-out",
      "Live board with session timers",
      "Automatic parent text notifications",
      "Attendance reports and CSV exports",
      "Single center",
    ],
  },
  pro: {
    name: "Pro",
    priceId: "price_1U5tI9CpyCkFlcV6HNNhPzUc",
    price: 39.99,
    description: "Everything you need to run your center",
    features: [
      "Everything in Standard, plus:",
      "Multi-center dashboard",
      "Role-based staff access",
      "Two-way parent texting with inbox",
      "Priority onboarding support",
    ],
  },
} as const;

type PlanKey = keyof typeof PLANS;

interface PromoResult {
  promotionCodeId: string;
  discountName: string;
  amountOff: number | null;
  percentOff: number | null;
  spotsLeft: number | null;
  totalSpots: number | null;
}

export default function PartnerPage() {
  const [selectedPlan, setSelectedPlan] = useState<PlanKey | null>(null);
  const [form, setForm] = useState({
    centerName: "",
    firstName: "",
    lastName: "",
    email: "",
    code: "",
  });
  const [promo, setPromo] = useState<PromoResult | null>(null);
  const [codeError, setCodeError] = useState("");
  const [codeLoading, setCodeLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const formRef = useRef<HTMLDivElement>(null);
  const plansRef = useRef<HTMLDivElement>(null);

  function update(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function discountedPrice(price: number) {
    if (!promo) return null;
    if (promo.amountOff) return Math.max(0, price - promo.amountOff / 100);
    if (promo.percentOff)
      return Math.max(0, price * (1 - promo.percentOff / 100));
    return null;
  }

  function formatDiscount() {
    if (!promo) return "";
    if (promo.amountOff)
      return `$${(promo.amountOff / 100).toFixed(0)} off forever`;
    if (promo.percentOff) return `${promo.percentOff}% off forever`;
    return "";
  }

  async function selectPlan(key: PlanKey) {
    setSelectedPlan(key);
    setSubmitError("");

    // If a promo was applied, re-validate against the new plan
    if (promo && form.code) {
      await validateCode(key);
    }

    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }

  async function validateCode(planOverride?: PlanKey) {
    const plan = planOverride || selectedPlan;
    if (!plan || !form.code.trim()) return;

    setCodeLoading(true);
    setCodeError("");

    try {
      const res = await fetch("/api/validate-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: form.code.trim().toUpperCase(),
          priceId: PLANS[plan].priceId,
        }),
      });
      const data = await res.json();

      if (data.valid) {
        setPromo({
          promotionCodeId: data.promotionCodeId,
          discountName: data.discountName,
          amountOff: data.amountOff,
          percentOff: data.percentOff,
          spotsLeft: data.spotsLeft,
          totalSpots: data.totalSpots,
        });
        setCodeError("");
      } else {
        setPromo(null);
        setCodeError(data.error);
      }
    } catch {
      setPromo(null);
      setCodeError("Something went wrong. Please try again.");
    } finally {
      setCodeLoading(false);
    }
  }

  function removePromo() {
    setPromo(null);
    setCodeError("");
    update("code", "");
  }

  const filled =
    selectedPlan &&
    form.centerName.trim() &&
    form.firstName.trim() &&
    form.lastName.trim() &&
    form.email.trim();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!filled || !selectedPlan) return;

    setSubmitting(true);
    setSubmitError("");

    try {
      const res = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId: PLANS[selectedPlan].priceId,
          promotionCodeId: promo?.promotionCodeId || null,
          customerEmail: form.email.trim(),
          centerName: form.centerName.trim(),
          customerName: `${form.firstName.trim()} ${form.lastName.trim()}`,
        }),
      });
      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        setSubmitError(data.error || "Something went wrong. Please try again.");
        setSubmitting(false);
      }
    } catch {
      setSubmitError("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  const plan = selectedPlan ? PLANS[selectedPlan] : null;
  const finalPrice = plan ? discountedPrice(plan.price) : null;

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="partner-hero">
          <div className="wrap">
            <span className="stamp">PILOT PROGRAM</span>
            <h1>Get in early. Shape what Presently becomes.</h1>
            <p className="lede">
              Join as a pilot center and lock in early pricing forever. You get
              a direct line to our team, and your feedback shapes the product.
              Limited spots available.
            </p>
          </div>
        </section>

        {/* Plan Picker */}
        <section className="partner-plans" ref={plansRef}>
          <div className="wrap">
            <div className="plan-grid">
              {(Object.keys(PLANS) as PlanKey[]).map((key) => {
                const p = PLANS[key];
                const isPro = key === "pro";
                const isSelected = selectedPlan === key;
                const dp =
                  promo && isSelected ? discountedPrice(p.price) : null;

                return (
                  <div
                    key={key}
                    className={`plan-card${isPro ? " plan-card-pro" : ""}${isSelected ? " plan-card-selected" : ""}`}
                  >
                    {isPro && (
                      <span className="plan-badge">Recommended</span>
                    )}

                    <div className="plan-icon">
                      {isPro ? (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 21V8l7-5 7 5v13" />
                          <path d="M13 21v-6h4v6" />
                          <path d="M21 21H1" />
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
                      {dp !== null ? (
                        <>
                          <span className="plan-price-old">
                            ${p.price.toFixed(2)}
                          </span>
                          <span className="plan-price-new">
                            ${dp.toFixed(2)}
                          </span>
                        </>
                      ) : (
                        <span className="plan-price-new">
                          ${p.price.toFixed(2)}
                        </span>
                      )}
                      <span className="plan-price-period">/month</span>
                    </div>

                    <button
                      className={`btn ${isPro ? "btn-primary" : "btn-ghost"} plan-select-btn`}
                      onClick={() => selectPlan(key)}
                    >
                      {isPro ? "Get Pro plan" : "Get Standard"}
                    </button>

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
                );
              })}
            </div>
          </div>
        </section>

        {/* Checkout Form */}
        {selectedPlan && plan && (
          <section className="partner-checkout" ref={formRef}>
            <div className="wrap">
              <div className="checkout-container">
                {/* Summary bar */}
                <div className="checkout-summary">
                  <span>
                    {plan.name}
                    {" \u2014 "}
                    {finalPrice !== null ? (
                      <>
                        <s>${plan.price.toFixed(2)}</s>{" "}
                        <strong>${finalPrice.toFixed(2)}/mo</strong>
                      </>
                    ) : (
                      <strong>${plan.price.toFixed(2)}/mo</strong>
                    )}
                  </span>
                  <button
                    type="button"
                    className="checkout-change"
                    onClick={() =>
                      plansRef.current?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      })
                    }
                  >
                    Change plan
                  </button>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="cta-field">
                    <label className="cta-label">Center name</label>
                    <input
                      type="text"
                      className="cta-input"
                      placeholder="Sunrise Learning Center"
                      required
                      value={form.centerName}
                      onChange={(e) => update("centerName", e.target.value)}
                    />
                  </div>

                  <div className="cta-field">
                    <div className="cta-form-row">
                      <div>
                        <label className="cta-label">First name</label>
                        <input
                          type="text"
                          className="cta-input"
                          placeholder="Maya"
                          required
                          value={form.firstName}
                          onChange={(e) => update("firstName", e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="cta-label">Last name</label>
                        <input
                          type="text"
                          className="cta-input"
                          placeholder="Rodriguez"
                          required
                          value={form.lastName}
                          onChange={(e) => update("lastName", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="cta-field">
                    <label className="cta-label">Work email</label>
                    <input
                      type="email"
                      className="cta-input"
                      placeholder="maya@sunriselearning.com"
                      required
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                    />
                  </div>

                  {/* Promo code */}
                  <div className="cta-field">
                    <label className="cta-label">Pilot code (optional)</label>
                    {promo ? (
                      <div className="promo-applied">
                        <div className="promo-applied-info">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="var(--green)"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          <span>
                            <strong>{form.code.toUpperCase()}</strong>
                            {" \u2014 "}
                            {formatDiscount()}
                          </span>
                        </div>
                        <div className="promo-applied-detail">
                          {plan.name}: ${plan.price.toFixed(2)} &rarr; $
                          {finalPrice?.toFixed(2)}/mo
                        </div>
                        <button
                          type="button"
                          className="promo-remove"
                          onClick={removePromo}
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div className="promo-input-row">
                        <input
                          type="text"
                          className="cta-input"
                          placeholder="e.g. OR1GIN"
                          value={form.code}
                          onChange={(e) => {
                            update("code", e.target.value);
                            if (codeError) setCodeError("");
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              validateCode();
                            }
                          }}
                        />
                        <button
                          type="button"
                          className="btn btn-ghost promo-apply-btn"
                          onClick={() => validateCode()}
                          disabled={!form.code.trim() || codeLoading}
                        >
                          {codeLoading ? <span className="spinner" /> : "Apply"}
                        </button>
                      </div>
                    )}
                    {codeError && <p className="field-error">{codeError}</p>}
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary cta-submit"
                    disabled={!filled || submitting}
                  >
                    {submitting
                      ? "Redirecting to checkout..."
                      : "Continue to payment \u2192"}
                  </button>

                  {submitError && (
                    <p className="field-error" style={{ marginTop: 8 }}>
                      {submitError}
                    </p>
                  )}

                  <p className="cta-fine">
                    You&rsquo;ll be redirected to Stripe to complete payment. No
                    charge until you confirm.
                  </p>
                </form>
              </div>
            </div>
          </section>
        )}

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
