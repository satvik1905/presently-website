"use client";

import { useState } from "react";

const ITEMS = [
  {
    q: "Can I cancel anytime?",
    a: "Yes. Cancel from your billing portal whenever you want. No contracts, no cancellation fees.",
  },
  {
    q: "What happens after the pilot?",
    a: "Your pilot pricing stays locked. When we launch publicly, new centers will pay more. You keep your rate.",
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
    <section className="partner-faq">
      <div className="wrap">
        <h2>Questions</h2>
        <div className="faq-list">
          {ITEMS.map((item, i) => (
            <div key={i} className="faq-item">
              <button
                className="faq-trigger"
                onClick={() => toggle(i)}
                aria-expanded={open === i}
              >
                <span>{item.q}</span>
                <svg
                  className={`faq-icon${open === i ? " faq-icon-open" : ""}`}
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
                className={`faq-answer${open === i ? " faq-answer-open" : ""}`}
              >
                <p>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
