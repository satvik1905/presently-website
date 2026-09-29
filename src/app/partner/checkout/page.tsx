import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fetchPlansWithBilling } from "@/lib/stripe-prices";
import type { PlanKey, BillingInterval } from "@/lib/plans";
import CheckoutForm from "./CheckoutForm";

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string; billing?: string }>;
}) {
  const { plan: planParam, billing: billingParam } = await searchParams;
  const billing: BillingInterval =
    billingParam === "annual" ? "annual" : "monthly";

  const allPlans = await fetchPlansWithBilling();
  const planMap = Object.fromEntries(
    allPlans.map(({ monthly, annual, ...meta }) => {
      const tier = billing === "annual" && annual ? annual : monthly;
      return [meta.key, { ...meta, ...tier }];
    })
  );
  // If annual was requested but not available, fall back to monthly
  const effectiveBilling: BillingInterval =
    billing === "annual" &&
    allPlans.find((p) => p.key === (planParam as PlanKey))?.annual
      ? "annual"
      : "monthly";
  const plan =
    planParam && planParam in planMap
      ? planMap[planParam as PlanKey]
      : null;

  if (!plan) {
    return (
      <>
        <Navbar links={[{ label: "How it works", href: "/#how" }, { label: "Demo", href: "/#demo" }]} />
        <main>
          <section className="pt-[100px] pb-6 text-center">
            <div className="wrap">
              <h2 className="font-semibold text-[clamp(26px,3vw,36px)] leading-[1.15] tracking-[-0.02em] mx-auto mb-2">
                No plan selected
              </h2>
              <p className="text-[16px] text-[#5B6472] mx-auto">
                <Link href="/partner">Go back and choose a plan.</Link>
              </p>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  return <CheckoutForm plan={plan} billing={effectiveBilling} />;
}
