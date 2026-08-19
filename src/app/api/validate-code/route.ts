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

    // Check if coupon is restricted to specific products
    if (coupon.applies_to && coupon.applies_to.products.length > 0) {
      const price = await stripe.prices.retrieve(priceId);
      const productId =
        typeof price.product === "string" ? price.product : price.product.id;

      if (!coupon.applies_to.products.includes(productId)) {
        return NextResponse.json({
          valid: false,
          error: "This code is only valid for the Standard plan.",
        });
      }
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
