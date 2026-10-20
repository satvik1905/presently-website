import Stripe from "stripe";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { PLAN_META, type PlanKey } from "@/lib/plans";

const resend = new Resend(process.env.RESEND_API_KEY);

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!);
}

function row(label: string, value: string, isLast = false) {
  const border = isLast ? "" : "border-bottom: 1px solid #EEF0F3;";
  return `
    <tr>
      <td style="padding: 14px 16px; ${border} color: #6B7280; font-size: 14px; font-weight: 500; width: 160px; vertical-align: top;">${label}</td>
      <td style="padding: 14px 16px; ${border} color: #111827; font-size: 14px;">${value}</td>
    </tr>`;
}

function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
}

async function sendSignupEmail(details: {
  customerName: string;
  customerEmail: string;
  centerName: string;
  centerAddress: string;
  planName: string;
  billing: string;
  amountPaid: string;
}) {
  const now = new Date().toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  });

  const rows = [
    row("Customer", details.customerName),
    row(
      "Email",
      `<a href="mailto:${details.customerEmail}" style="color: #2563EB; text-decoration: none;">${details.customerEmail}</a>`
    ),
    row("Center", details.centerName),
    row("Address", details.centerAddress),
    row("Plan", details.planName),
    row("Billing", details.billing),
    row("Amount paid", details.amountPaid, true),
  ].join("");

  const html = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin: 0; padding: 0; background: #F3F4F6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">

<!-- Wrapper -->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: #F3F4F6; padding: 32px 16px;">
  <tr>
    <td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%; background: #FFFFFF; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.06);">

        <!-- Header -->
        <tr>
          <td style="background: #16A34A; padding: 28px 32px; text-align: center;">
            <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: #FFFFFF; letter-spacing: -0.01em;">Presently</h1>
            <p style="margin: 6px 0 0; font-size: 13px; color: rgba(255,255,255,0.8); font-weight: 400;">New Membership Signup</p>
          </td>
        </tr>

        <!-- Greeting -->
        <tr>
          <td style="padding: 28px 32px 8px;">
            <p style="margin: 0; font-size: 15px; color: #374151; line-height: 1.5;">Hi team,</p>
            <p style="margin: 8px 0 0; font-size: 15px; color: #374151; line-height: 1.5;"><strong>${details.centerName}</strong> just signed up for the <strong>${details.planName}</strong> plan.</p>
          </td>
        </tr>

        <!-- Data table -->
        <tr>
          <td style="padding: 16px 32px 24px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #EEF0F3; border-radius: 8px; overflow: hidden;">
              ${rows}
            </table>
          </td>
        </tr>

        <!-- CTA button -->
        <tr>
          <td style="padding: 0 32px 32px; text-align: center;">
            <a href="mailto:${details.customerEmail}" style="display: inline-block; background: #16A34A; color: #FFFFFF; font-size: 14px; font-weight: 600; text-decoration: none; padding: 12px 28px; border-radius: 999px;">Email this customer</a>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background: #F9FAFB; padding: 20px 32px; border-top: 1px solid #EEF0F3; text-align: center;">
            <p style="margin: 0; font-size: 12px; color: #9CA3AF; line-height: 1.5;">This email was triggered by a new Stripe membership signup</p>
            <p style="margin: 4px 0 0; font-size: 11px; color: #D1D5DB;">${now}</p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>

</body>
</html>`;

  await resend.emails.send({
    from: "Presently <onboarding@resend.dev>",
    to: "admin@presently.now",
    subject: `New Signup — ${details.centerName} (${details.planName})`,
    html,
  });
}

export async function POST(req: Request) {
  const stripe = getStripe();
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    // Only process subscription checkouts (not one-time payments)
    if (session.mode !== "subscription") {
      return NextResponse.json({ received: true });
    }

    // Retrieve session with expanded line items for amount details
    const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
      expand: ["line_items.data.price"],
    });

    const metadata = fullSession.metadata || {};
    const customerEmail = fullSession.customer_email || "N/A";
    const customerName = metadata.customerName || "N/A";
    const centerName = metadata.centerName || "N/A";
    const centerAddress = metadata.center_address || "N/A";

    // Plan name from metadata, falling back to Stripe line item description
    const planKey = metadata.plan as PlanKey | undefined;
    const planName = planKey && PLAN_META[planKey]
      ? PLAN_META[planKey].name
      : fullSession.line_items?.data[0]?.description || "N/A";

    // Billing interval
    const billingRaw = metadata.billing;
    const billing = billingRaw === "annual" ? "Annual" : billingRaw === "monthly" ? "Monthly" : "N/A";

    // Amount paid
    const amountTotal = (fullSession.amount_total ?? 0) / 100;
    const currency = fullSession.currency || "usd";
    const amountPaid = formatCurrency(amountTotal, currency);

    try {
      await sendSignupEmail({
        customerName,
        customerEmail,
        centerName,
        centerAddress,
        planName,
        billing,
        amountPaid,
      });
    } catch (err) {
      console.error("Failed to send signup notification email:", err);
      // Return 200 so Stripe doesn't retry — the payment still succeeded
    }
  }

  return NextResponse.json({ received: true });
}
