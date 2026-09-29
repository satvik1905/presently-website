import "server-only";
import Stripe from "stripe";
import {
  PLAN_META,
  PLAN_KEYS,
  type PlanKey,
  type BillingInterval,
  type Plan,
  type PlanWithBilling,
} from "./plans";

const PRICE_IDS: Record<PlanKey, { monthly: string; annual?: string }> = {
  standard: {
    monthly: process.env.STRIPE_PRICE_STANDARD_MONTHLY!,
    annual: process.env.STRIPE_PRICE_STANDARD_ANNUAL,
  },
  pro: {
    monthly: process.env.STRIPE_PRICE_PRO_MONTHLY!,
    annual: process.env.STRIPE_PRICE_PRO_ANNUAL,
  },
};

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!);
}

export async function fetchMonthlyPlans(): Promise<Plan[]> {
  const stripe = getStripe();

  return Promise.all(
    PLAN_KEYS.map(async (key) => {
      const priceId = PRICE_IDS[key].monthly;
      const stripePrice = await stripe.prices.retrieve(priceId);
      return {
        ...PLAN_META[key],
        price: (stripePrice.unit_amount ?? 0) / 100,
        priceId,
      };
    })
  );
}

export async function fetchPlansWithBilling(): Promise<PlanWithBilling[]> {
  const stripe = getStripe();

  return Promise.all(
    PLAN_KEYS.map(async (key) => {
      const monthlyId = PRICE_IDS[key].monthly;
      const annualId = PRICE_IDS[key].annual;
      const mp = await stripe.prices.retrieve(monthlyId);
      const annual = annualId
        ? {
            price:
              ((await stripe.prices.retrieve(annualId)).unit_amount ?? 0) / 100,
            priceId: annualId,
          }
        : null;
      return {
        ...PLAN_META[key],
        monthly: { price: (mp.unit_amount ?? 0) / 100, priceId: monthlyId },
        annual,
      };
    })
  );
}

export function getPriceId(
  key: PlanKey,
  billing: BillingInterval
): string | undefined {
  return PRICE_IDS[key][billing];
}
