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
    form.email.trim();

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
          customerEmail: form.email.trim(),
          centerName: form.centerName.trim(),
          customerName: `${form.firstName.trim()} ${form.lastName.trim()}`,
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
      </main>
      <Footer />
    </>
  );
}
