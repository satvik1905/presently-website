"use client";

import { useState } from "react";
import { LinkButton } from "@/components/Button";
import type { PlanWithBilling, BillingInterval } from "@/lib/plans";

export default function PlanPicker({ plans }: { plans: PlanWithBilling[] }) {
  const annualAvailable = plans.every((p) => p.annual !== null);
  const [billing, setBilling] = useState<BillingInterval>("monthly");

  return (
    <>
      {/* Billing toggle */}
      {annualAvailable && (
        <div className="flex justify-center mb-6">
          <div className="inline-flex bg-[#F3F4F6] rounded-full p-1">
            <button
              className={`px-5 py-2 rounded-full text-[14px] font-medium transition-colors ${
                billing === "monthly"
                  ? "bg-white shadow-sm text-[#101828]"
                  : "text-[#5B6472] hover:text-[#374151]"
              }`}
              onClick={() => setBilling("monthly")}
            >
              Monthly
            </button>
            <button
              className={`px-5 py-2 rounded-full text-[14px] font-medium transition-colors ${
                billing === "annual"
                  ? "bg-white shadow-sm text-[#101828]"
                  : "text-[#5B6472] hover:text-[#374151]"
              }`}
              onClick={() => setBilling("annual")}
            >
              Annual&ensp;&middot;&ensp;
              <span className="text-[#16A34A]">2 months free</span>
            </button>
          </div>
        </div>
      )}

      {/* Plan cards */}
      <div className="grid grid-cols-2 gap-5 max-w-[800px] mx-auto max-[800px]:grid-cols-1">
        {plans.map((p) => (
          <div
            key={p.key}
            className={`relative bg-white border border-[#E7E5DF] rounded-[14px] p-6 flex flex-col hover:border-[#C9C6BE] transition-colors ${
              p.isPro ? "border-t-2 border-t-[#2563EB]" : ""
            }`}
          >
            <div className="flex items-start justify-between mb-3.5">
              <div className="w-10 h-10 rounded-[10px] bg-[#EEF3FE] flex items-center justify-center">
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
                <span className="text-[12px] font-medium text-[#2563EB] bg-[#EEF3FE] px-2.5 py-[3px] rounded-full tracking-[0.01em]">
                  Recommended
                </span>
              )}
            </div>

            <h3 className="text-[19px] font-semibold tracking-[-0.01em] mb-1">{p.name}</h3>
            <p className="text-[14px] text-[#5B6472] mb-4">{p.description}</p>

            {/* Pricing — fixed height so cards don't shift on toggle */}
            <div className="min-h-[90px] mb-4">
              {billing === "annual" && p.annual ? (
                <>
                  <div className="flex items-baseline gap-2">
                    <s className="text-[18px] text-[#9CA3AF] font-medium tracking-[-0.01em]">
                      ${(p.monthly.price * 12).toFixed(2)}
                    </s>
                    <span className="text-[34px] font-bold tracking-[-0.025em]">
                      ${p.annual.price.toFixed(2)}
                    </span>
                    <span className="text-[15px] text-[#5B6472]">/year</span>
                  </div>
                  <span className="inline-block mt-1.5 text-[12px] font-medium text-[#16A34A] bg-[#ECFDF5] px-2 py-0.5 rounded-full">
                    2 months free
                  </span>
                  <p className="text-[13px] text-[#5B6472] mt-1.5">Billed yearly</p>
                </>
              ) : (
                <>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-[34px] font-bold tracking-[-0.025em]">
                      ${p.monthly.price.toFixed(2)}
                    </span>
                    <span className="text-[15px] text-[#5B6472]">/month</span>
                  </div>
                  <p className="text-[13px] text-[#5B6472] mt-1.5">Billed monthly</p>
                </>
              )}
            </div>

            <LinkButton
              href={
                billing === "monthly"
                  ? `/partner/checkout?plan=${p.key}`
                  : `/partner/checkout?plan=${p.key}&billing=annual`
              }
              variant={p.isPro ? "primary" : "ghost"}
              fullWidth
              className="mb-[18px]"
            >
              {billing === "monthly" ? p.cta : `Get ${p.name} Annual`}
            </LinkButton>

            <ul className="list-none flex flex-col gap-2.5 border-t border-[#E7E5DF] pt-4">
              {p.features.map((f, fi) => (
                <li key={f} className="flex items-center gap-2.5 text-[14.5px]">
                  <svg
                    className="shrink-0"
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

      {/* Footer */}
      {billing === "monthly" ? (
        <p className="text-center text-[14px] text-[#5B6472] mt-5">
          No contracts. Cancel anytime. Special pilot pricing available via promo code.
        </p>
      ) : (
        <p className="text-center text-[14px] text-[#5B6472] mt-5">
          Cancel anytime. Email admin@presently.now for a pro-rated refund of unused months.
        </p>
      )}
    </>
  );
}
