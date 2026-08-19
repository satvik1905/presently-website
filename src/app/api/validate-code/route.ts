import Stripe from "stripe";
import { NextResponse } from "next/server";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!);
}

export async function POST(req: Request) {
  try {
    const { code, priceId } = await req.json();

    if (!code || !priceId) {
      return NextResponse.json(
        { valid: false, error: "Code and plan are required." },
        { status: 400 }
      );
    }

    const stripe = getStripe();
    const promoCodes = await stripe.promotionCodes.list({
      code,
      active: true,
      expand: ["data.promotion.coupon"],
    });

    if (promoCodes.data.length === 0) {
      return NextResponse.json({
        valid: false,
        error: "That code isn't recognized. Check the spelling and try again.",
      });
    }

    const promoCode = promoCodes.data[0];

    if (
      promoCode.max_redemptions &&
      promoCode.times_redeemed >= promoCode.max_redemptions
    ) {
      return NextResponse.json({
        valid: false,
        error: "All spots for this code have been claimed.",
        maxedOut: true,
      });
    }

    // Get the coupon from the promotion object
    const coupon =
      typeof promoCode.promotion.coupon === "string"
        ? await stripe.coupons.retrieve(promoCode.promotion.coupon)
        : promoCode.promotion.coupon;

    if (!coupon) {
      return NextResponse.json({
        valid: false,
        error: "Something went wrong. Please try again.",
      });
    }

    // Validate by attempting a real checkout session with this promo code.
    // This is the only reliable way to check all of Stripe's restriction
    // rules (product restrictions, currency, first-time-transaction, etc).
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    try {
      const testSession = await stripe.checkout.sessions.create({
        mode: "subscription",
        line_items: [{ price: priceId, quantity: 1 }],
        discounts: [{ promotion_code: promoCode.id }],
        customer_email: "validation-test@presently.internal",
        success_url: `${baseUrl}/partner`,
        cancel_url: `${baseUrl}/partner`,
      });

      // It worked — expire the test session immediately
      await stripe.checkout.sessions.expire(testSession.id);
    } catch (err) {
      // Stripe rejected the promo + plan combination
      const msg =
        err instanceof Stripe.errors.StripeError
          ? err.message
          : "This code doesn't apply to the selected plan.";

      return NextResponse.json({
        valid: false,
        error: /coupon|promot|discount|does not apply/i.test(msg)
          ? "This code doesn't apply to the selected plan."
          : msg,
      });
    }

    const spotsLeft = promoCode.max_redemptions
      ? promoCode.max_redemptions - promoCode.times_redeemed
      : null;

    return NextResponse.json({
      valid: true,
      promotionCodeId: promoCode.id,
      discountName: coupon.name || code,
      amountOff: coupon.amount_off,
      percentOff: coupon.percent_off,
      spotsLeft,
      totalSpots: promoCode.max_redemptions,
    });
  } catch {
    return NextResponse.json(
      { valid: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
