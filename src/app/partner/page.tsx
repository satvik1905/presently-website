import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Faq from "@/components/Faq";
import { fetchPlansWithBilling } from "@/lib/stripe-prices";
import PlanPicker from "./PlanPicker";

export default async function PartnerPage() {
  const plans = await fetchPlansWithBilling();

  return (
    <>
      <Navbar links={[{ label: "How it works", href: "/#how" }, { label: "See it in action", href: "/see-it-in-action" }, { label: "Demo", href: "/#demo" }]} />
      <main>
        {/* Hero */}
        <section className="!pt-[100px] !pb-[40px] text-center">
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
            <PlanPicker plans={plans} />
          </div>
        </section>

        <Faq />
      </main>
      <Footer />
    </>
  );
}
