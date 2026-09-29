export type PlanKey = "standard" | "pro";
export type BillingInterval = "monthly" | "annual";

export interface PlanMeta {
  key: PlanKey;
  name: string;
  description: string;
  isPro: boolean;
  cta: string;
  features: readonly string[];
}

export interface Plan extends PlanMeta {
  price: number;
  priceId: string;
}

export interface PlanWithBilling extends PlanMeta {
  monthly: { price: number; priceId: string };
  annual: { price: number; priceId: string } | null;
}

export const PLAN_META: Record<PlanKey, PlanMeta> = {
  standard: {
    key: "standard",
    name: "Standard",
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
  pro: {
    key: "pro",
    name: "Pro",
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
};

export const PLAN_KEYS: PlanKey[] = ["standard", "pro"];
