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
      <Navbar links={[{ label: "How it works", href: "/#how" }, { label: "See it in action", href: "/see-it-in-action" }, { label: "Demo", href: "/#demo" }]} />
      <main>
        {/* Hero */}
        <section className="pt-[100px] pb-6 text-center">
          <div className="wrap">
            <h2 className="font-semibold text-[clamp(26px,3vw,36px)] leading-[1.15] tracking-[-0.02em] mx-auto mb-2 !max-w-none">
              Choose your plan
            </h2>
            <p className="text-[16px] text-[#5B6472] mx-auto">
              Start with Standard or unlock everything with Pro.
            </p>
          </div>
        </section>

        {/* Plan Picker */}
        <section className="!pt-4 !pb-0">
          <div className="wrap">
            <div className="grid grid-cols-2 gap-5 max-w-[800px] mx-auto max-[800px]:grid-cols-1">
              {PLANS.map((p) => (
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

                  <div className="flex items-baseline gap-1.5 mb-4">
                    <span className="text-[34px] font-bold tracking-[-0.025em]">
                      ${p.price.toFixed(2)}
                    </span>
                    <span className="text-[15px] text-[#5B6472]">/month</span>
                  </div>

                  <LinkButton
                    href={`/partner/checkout?plan=${p.key}`}
                    variant={p.isPro ? "primary" : "ghost"}
                    fullWidth
                    className="mb-[18px]"
                  >
                    {p.cta}
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
            <p className="text-center text-[14px] text-[#5B6472] mt-5">
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
