import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

function row(label: string, value: string, isLast = false) {
  const border = isLast ? "" : "border-bottom: 1px solid #EEF0F3;";
  return `
    <tr>
      <td style="padding: 14px 16px; ${border} color: #6B7280; font-size: 14px; font-weight: 500; width: 160px; vertical-align: top;">${label}</td>
      <td style="padding: 14px 16px; ${border} color: #111827; font-size: 14px;">${value}</td>
    </tr>`;
}

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, centerName, phone } = await req.json();

    if (!firstName || !lastName || !email || !centerName || !phone) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

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
      row("Instructor", `${firstName} ${lastName}`),
      row("Email", `<a href="mailto:${email}" style="color: #2563EB; text-decoration: none;">${email}</a>`),
      row("Center", centerName),
      row("Phone", `<a href="tel:${phone}" style="color: #2563EB; text-decoration: none;">${phone}</a>`, true),
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
          <td style="background: #2563EB; padding: 28px 32px; text-align: center;">
            <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: #FFFFFF; letter-spacing: -0.01em;">Presently</h1>
            <p style="margin: 6px 0 0; font-size: 13px; color: rgba(255,255,255,0.8); font-weight: 400;">New Demo Request</p>
          </td>
        </tr>

        <!-- Greeting -->
        <tr>
          <td style="padding: 28px 32px 8px;">
            <p style="margin: 0; font-size: 15px; color: #374151; line-height: 1.5;">Hi team,</p>
            <p style="margin: 8px 0 0; font-size: 15px; color: #374151; line-height: 1.5;">You have a new demo request from <strong>${centerName}</strong>.</p>
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
            <a href="mailto:${email}" style="display: inline-block; background: #2563EB; color: #FFFFFF; font-size: 14px; font-weight: 600; text-decoration: none; padding: 12px 28px; border-radius: 999px;">Reply to this instructor</a>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background: #F9FAFB; padding: 20px 32px; border-top: 1px solid #EEF0F3; text-align: center;">
            <p style="margin: 0; font-size: 12px; color: #9CA3AF; line-height: 1.5;">This email was sent from the presently.com demo request form</p>
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
      subject: `New Demo Request — ${centerName}`,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("demo-request error:", err);
    return NextResponse.json(
      { error: "Failed to send demo request. Please try again." },
      { status: 500 }
    );
  }
}
