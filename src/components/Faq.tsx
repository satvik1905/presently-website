"use client";

import { useState } from "react";

const ITEMS = [
  {
    q: "Can I cancel anytime?",
    a: "Yes. Cancel anytime — no contracts, no cancellation fees. Just email admin@presently.now and we'll take care of it.",
  },
  {
    q: "What happens after the pilot?",
    a: "Pilot centers receive special pricing via promo code during the pilot period. After the pilot ends, centers default to regular pricing. No surprises — we'll let you know before anything changes.",
  },
  {
    q: "Do I need to install anything?",
    a: "No. Presently is web-based and works on the iPad you already have at your front desk. No app downloads, no new hardware.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  function toggle(i: number) {
    setOpen(open === i ? null : i);
  }

  return (
    <section className="py-14 pb-16">
      <div className="wrap">
        <div className="max-w-[800px] mx-auto">
          <h2 className="font-semibold text-[24px] tracking-[-0.01em] mb-8">
            Questions
          </h2>
          {ITEMS.map((item, i) => (
            <div
              key={i}
              className="border-t border-[#E7E5DF] last:border-b last:border-[#E7E5DF]"
            >
              <button
                className="w-full flex items-center justify-between gap-4 py-5 bg-transparent border-none cursor-pointer text-left font-[inherit] text-[17px] font-semibold tracking-[-0.01em] text-[#101828] focus-visible:outline-2 focus-visible:outline-[#2563EB] focus-visible:outline-offset-2 focus-visible:rounded"
                onClick={() => toggle(i)}
                aria-expanded={open === i}
              >
                <span>{item.q}</span>
                <svg
                  className={`shrink-0 text-[#5B6472] transition-transform duration-200 ${open === i ? "rotate-45" : ""}`}
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </button>
              <div
                className={`grid transition-[grid-template-rows] duration-[250ms] ease-out ${
                  open === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <p
                  className={`overflow-hidden text-[15px] text-[#5B6472] m-0 ${
                    open === i ? "pb-5" : "pb-0"
                  }`}
                >
                  {item.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
