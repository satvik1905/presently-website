import Stripe from "stripe";
import { NextResponse } from "next/server";
import { PLAN_KEYS, type PlanKey, type BillingInterval } from "@/lib/plans";
import { getPriceId } from "@/lib/stripe-prices";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!);
}

const VALID_BILLING: BillingInterval[] = ["monthly", "annual"];

export async function POST(req: Request) {
  try {
    const {
      plan,
      billing,
      promotionCodeId,
      customerEmail,
      centerName,
      customerName,
      center_address,
      center_street,
      center_city,
      center_state,
      center_zip,
    } = await req.json();

    if (
      !plan ||
      !billing ||
      !customerEmail ||
      !centerName ||
      !customerName
    ) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    if (!PLAN_KEYS.includes(plan as PlanKey)) {
      return NextResponse.json(
        { error: "Invalid plan." },
        { status: 400 }
      );
    }

    if (!VALID_BILLING.includes(billing as BillingInterval)) {
      return NextResponse.json(
        { error: "Invalid billing interval." },
        { status: 400 }
      );
    }

    if (billing === "annual" && promotionCodeId) {
      return NextResponse.json(
        { error: "Promo codes cannot be applied to annual plans." },
        { status: 400 }
      );
    }

    const priceId = getPriceId(plan as PlanKey, billing as BillingInterval);

    if (!priceId) {
      return NextResponse.json(
        { error: "This billing interval is not available for the selected plan." },
        { status: 400 }
      );
    }

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      ...(promotionCodeId
        ? { discounts: [{ promotion_code: promotionCodeId }] }
        : { allow_promotion_codes: true }),
      customer_email: customerEmail,
      metadata: { centerName, customerName, center_address, center_street, center_city, center_state, center_zip },
      subscription_data: {
        metadata: { centerName, customerName, center_address, center_street, center_city, center_state, center_zip },
      },
      success_url: `${baseUrl}/partner/welcome?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/partner`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message =
      err instanceof Stripe.errors.StripeError
        ? err.message
        : "Failed to create checkout session. Please try again.";
    const promoInvalid =
      err instanceof Stripe.errors.StripeError &&
      /coupon|promot|discount|does not apply/i.test(err.message);
    console.error("create-checkout error:", err);
    return NextResponse.json(
      { error: message, promoInvalid },
      { status: 500 }
    );
  }
}
