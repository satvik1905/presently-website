"use client";

import { useState, FormEvent, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PLANS = {
  standard: {
    name: "Standard",
    priceId: "price_1U5tF9CpyCkFlcV6XhvH9EQU",
    price: 34.99,
  },
  pro: {
    name: "Pro",
    priceId: "price_1U5tI9CpyCkFlcV6HNNhPzUc",
    price: 39.99,
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

export default function CheckoutPage() {
  return (
    <Suspense>
      <CheckoutForm />
    </Suspense>
  );
}

function CheckoutForm() {
  const searchParams = useSearchParams();
  const planParam = searchParams.get("plan") as PlanKey | null;
  const planKey = planParam && planParam in PLANS ? planParam : null;
  const plan = planKey ? PLANS[planKey] : null;

  const [form, setForm] = useState({
    centerName: "",
    location: "",
    firstName: "",
    lastName: "",
    emailUser: "",
    code: "",
  });
  const [promo, setPromo] = useState<PromoResult | null>(null);
  const [codeError, setCodeError] = useState("");
  const [codeLoading, setCodeLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [showRemoveModal, setShowRemoveModal] = useState(false);

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

  async function validateCode() {
    if (!planKey || !form.code.trim()) return;

    setCodeLoading(true);
    setCodeError("");

    try {
      const res = await fetch("/api/validate-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: form.code.trim().toUpperCase(),
          priceId: PLANS[planKey].priceId,
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
    planKey &&
    form.centerName.trim() &&
    form.firstName.trim() &&
    form.lastName.trim() &&
    form.emailUser.trim();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!filled || !planKey) return;

    setSubmitting(true);
    setSubmitError("");

    try {
      const res = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId: PLANS[planKey].priceId,
          promotionCodeId: promo?.promotionCodeId || null,
          customerEmail: `${form.emailUser.trim()}@ikumon.com`,
          centerName: form.centerName.trim(),
          customerName: `${form.firstName.trim()} ${form.lastName.trim()}`,
          location: form.location.trim(),
        }),
      });
      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        const msg: string =
          data.error || "Something went wrong. Please try again.";
        // If the error is coupon/promo related, strip the invalid code
        if (promo && data.promoInvalid) {
          removePromo();
          setCodeError(
            "This code doesn't apply to the selected plan."
          );
        }
        setSubmitError(msg);
        setSubmitting(false);
      }
    } catch {
      setSubmitError("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  if (!plan || !planKey) {
    return (
      <>
        <Navbar links={[{ label: "Home", href: "/" }, { label: "Plans", href: "/partner" }]} />
        <main>
          <section className="partner-hero">
            <div className="wrap">
              <h2>No plan selected</h2>
              <p className="sub">
                <Link href="/partner">Go back and choose a plan.</Link>
              </p>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  const finalPrice = discountedPrice(plan.price);

  return (
    <>
      <Navbar links={[{ label: "Home", href: "/" }, { label: "Plans", href: "/partner" }]} />
      <main>
        <section className="partner-checkout-page">
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
                <Link href="/partner" className="checkout-change">
                  Change plan
                </Link>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="cta-field">
                  <label className="cta-label">Center name <span style={{ color: "#DC2626" }}>*</span></label>
                  <input
                    type="text"
                    className="cta-input"
                    placeholder="Kumon Carmel"
                    required
                    value={form.centerName}
                    onChange={(e) => update("centerName", e.target.value)}
                  />
                </div>

                <div className="cta-field">
                  <div className="cta-form-row">
                    <div>
                      <label className="cta-label">First name <span style={{ color: "#DC2626" }}>*</span></label>
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
                      <label className="cta-label">Last name <span style={{ color: "#DC2626" }}>*</span></label>
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
                  <label className="cta-label">Location <span style={{ color: "#DC2626" }}>*</span></label>
                  <input
                    type="text"
                    className="cta-input"
                    placeholder="Carmel, California"
                    required
                    value={form.location}
                    onChange={(e) => update("location", e.target.value)}
                  />
                </div>

                <div className="cta-field">
                  <label className="cta-label">Work email</label>
                  <div style={{ display: "flex", alignItems: "stretch" }}>
                    <input
                      type="text"
                      className="cta-input"
                      style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0, borderRight: "none" }}
                      placeholder="maya"
                      required
                      value={form.emailUser}
                      onChange={(e) => update("emailUser", e.target.value)}
                    />
                    <span
                      className="cta-input"
                      style={{
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                        background: "var(--color-bg)",
                        color: "var(--color-muted)",
                        whiteSpace: "nowrap",
                        userSelect: "none",
                        display: "flex",
                        alignItems: "center",
                        width: "auto",
                        flexShrink: 0,
                      }}
                    >
                      @ikumon.com
                    </span>
                  </div>
                </div>

                {/* Promo code */}
                <div className="cta-field">
                  <label className="cta-label">Pilot code (optional)</label>
                  {promo ? (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        background: "#F3F4F6",
                        border: "1px solid var(--color-line)",
                        borderRadius: "var(--radius-sm, 8px)",
                        padding: "12px 16px",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="12" fill="#16A34A" />
                          <polyline points="7.5 12.5 10.5 15.5 16.5 9.5" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span style={{ fontSize: 14 }}>
                          <strong>{promo.discountName || form.code.toUpperCase()}</strong> applied
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowRemoveModal(true)}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          padding: 4,
                          display: "flex",
                          color: "#DC2626",
                        }}
                        aria-label="Remove coupon"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                          <path d="M10 11v6" />
                          <path d="M14 11v6" />
                          <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <div className="promo-input-row">
                      <input
                        type="text"
                        className="cta-input"
                        placeholder="e.g. KUMON25"
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

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    borderTop: "1px solid var(--color-line)",
                    paddingTop: 16,
                    marginTop: 8,
                    marginBottom: 16,
                    fontSize: 15,
                  }}
                >
                  <span style={{ color: "var(--color-muted)", fontSize: 18, fontWeight: 600 }}>Due today</span>
                  <span style={{ fontWeight: 700, fontSize: 22 }}>
                    ${(finalPrice ?? plan.price).toFixed(2)}/mo
                  </span>
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
      </main>
      <Footer />

      {/* Remove coupon confirmation modal */}
      {showRemoveModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.4)",
          }}
          onClick={() => setShowRemoveModal(false)}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 14,
              padding: "28px 28px 20px",
              maxWidth: 360,
              width: "90%",
              boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 8 }}>
              Remove coupon?
            </h3>
            <p style={{ fontSize: 14, color: "var(--color-muted)", marginBottom: 20 }}>
              This will remove <strong>{promo?.discountName || form.code.toUpperCase()}</strong> and
              your price will return to ${plan?.price.toFixed(2)}/mo.
            </p>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => setShowRemoveModal(false)}
              >
                Keep coupon
              </button>
              <button
                type="button"
                className="btn btn-primary"
                style={{ background: "#DC2626", borderColor: "#DC2626" }}
                onClick={() => {
                  removePromo();
                  setShowRemoveModal(false);
                }}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
