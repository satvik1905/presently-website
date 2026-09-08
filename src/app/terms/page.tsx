import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Terms of Service — Presently",
  description:
    "The terms governing use of the Presently student check-in system for learning centers.",
};

const sections = [
  { id: "agreement", title: "Agreement and who it binds", number: 1 },
  { id: "not-affiliated", title: "Not affiliated with Kumon", number: 2 },
  { id: "text-messages", title: "Text message program", number: 3 },
  { id: "center-responsibilities", title: "The center\u2019s responsibilities", number: 4 },
  { id: "accounts", title: "Accounts and roles", number: 5 },
  { id: "billing", title: "Subscriptions and billing", number: 6 },
  { id: "pilot", title: "Pilot features", number: 7 },
  { id: "your-data", title: "Your data", number: 8 },
  { id: "acceptable-use", title: "Acceptable use", number: 9 },
  { id: "intellectual-property", title: "Our intellectual property in the software", number: 10 },
  { id: "disclaimers", title: "Disclaimer of warranties", number: 11 },
  { id: "liability", title: "Limitation of liability", number: 12 },
  { id: "governing-law", title: "Governing law", number: 13 },
  { id: "changes", title: "Changes to these terms", number: 14 },
  { id: "contact", title: "Contact", number: 15 },
];

const p = "text-[17px] leading-[1.7] text-slate-700 mb-4";
const h2 =
  "text-[24px] font-semibold text-slate-900 tracking-[-0.01em] mb-4 scroll-mt-24";
const link =
  "text-[#2563EB] underline underline-offset-2 hover:text-[#1D4ED8]";
const ul =
  "text-[17px] leading-[1.7] text-slate-700 mb-4 ml-6 list-disc space-y-1";
const sec = "mt-14";

export default function TermsPage() {
  return (
    <LegalLayout
      title="Terms of Service"
      effectiveDate="September 6, 2026"
      lastUpdated="September 6, 2026"
      sections={sections}
      crossLink={{ href: "/privacy", label: "Privacy Policy" }}
    >
      {/* ── 1. Agreement and who it binds ── */}
      <section>
        <h2 id="agreement" className={h2}>
          1. Agreement and who it binds
        </h2>
        <p className={p}>
          These terms are between Presently LLC and the account holder who
          subscribes to the service. The account holder is responsible for all
          centers, staff, and activity under its account, whether the account
          covers a single center with several staff or several centers under
          one operator. The person accepting these terms confirms they are
          authorised to do so.
        </p>
      </section>

      {/* ── 2. Not affiliated with Kumon ── */}
      <section className={sec}>
        <h2 id="not-affiliated" className={h2}>
          2. Not affiliated with Kumon
        </h2>
        <p className={p}>
          Presently is an independent product of Presently LLC. It is not
          affiliated with, endorsed by, or sponsored by Kumon. Kumon and
          related marks belong to their owner and are used here only to
          describe compatibility.
        </p>
      </section>

      {/* ── 3. Text message program ── */}
      <section className={sec}>
        <h2 id="text-messages" className={h2}>
          3. Text message program
        </h2>
        <ul className={ul}>
          <li>
            Program description: check-in and check-out notifications to
            guardians the center has enabled.
          </li>
          <li>
            End users opt in by texting START to{" "}
            <strong className="text-slate-900">+1 (831) 298-8368</strong>.
          </li>
          <li>

            Message frequency: messages are sent only when a student checks
            in or checks out — typically up to 2 messages per student on
            each day the student attends. Attendance days are set by each
            center. Guardians with more than one enrolled student receive
            more.
          </li>
          <li>Message and data rates may apply.</li>
          <li>Reply STOP to opt out, HELP for help.</li>
          <li>
            Mobile carriers are not liable for delayed or undelivered messages.
          </li>
        </ul>
      </section>

      {/* ── 4. The center's responsibilities ── */}
      <section className={sec}>
        <h2 id="center-responsibilities" className={h2}>
          4. The center&rsquo;s responsibilities
        </h2>
        <p className={p}>
          The center represents that it has authority to provide the student and
          guardian information it enters into the Service, and that it has
          obtained the consent required to send text notifications to the
          numbers it supplies.
        </p>
        <p className={p}>
          The center indemnifies Presently LLC against any claims, losses, or
          costs arising from messages sent to numbers the center provided.
        </p>
      </section>

      {/* ── 5. Accounts and roles ── */}
      <section className={sec}>
        <h2 id="accounts" className={h2}>
          5. Accounts and roles
        </h2>
        <p className={p}>
          Presently supports three roles: owner, center administrator, and
          staff. The center is responsible for deciding who it grants access to
          and for all activity that occurs under its accounts.
        </p>
      </section>

      {/* ── 6. Subscriptions and billing ── */}
      <section className={sec}>
        <h2 id="billing" className={h2}>
          6. Subscriptions and billing
        </h2>
        <p className={p}>
          Two plans are available: Presently Standard at $34.99/month and
          Presently Pro at $39.99/month. Subscriptions are billed monthly
          through Stripe and renew automatically until cancelled.
        </p>
        <p className={p}>
          If a payment fails we may suspend access until it is resolved.
        </p>
        <p className={p}>
          Cancellation takes effect at the end of the current billing period.
          The center retains access to the Service until that date.
        </p>
        <p className={p}>
          Refunds: subscriptions can be cancelled at any time, effective at
          the end of the current period. If you are not satisfied, contact
          us — we handle refund requests case by case and will generally
          refund the most recent month&rsquo;s charge.
        </p>
        <p className={p}>
          Promotional codes: discounts applied through a promotional code
          remain in effect for as long as the subscription continues without
          interruption. A discount does not survive cancellation, and is not
          reinstated on re-subscription.
        </p>
      </section>

      {/* ── 7. Pilot features ── */}
      <section className={sec}>
        <h2 id="pilot" className={h2}>
          7. Pilot features
        </h2>
        <p className={p}>
          Some features within the Service are marked as upcoming and are not
          yet active. Features may change or be withdrawn at any time. No
          service level or uptime commitment is made for features during a
          pilot period.
        </p>
      </section>

      {/* ── 8. Your data ── */}
      <section className={sec}>
        <h2 id="your-data" className={h2}>
          8. Your data
        </h2>
        <p className={p}>
          The center owns its data. Presently LLC has a limited licence to
          process it solely to provide the Service. Our handling of that data
          is described in our{" "}
          <a href="/privacy" className={link}>
            Privacy Policy
          </a>
          .
        </p>
        <p className={p}>
          On termination, the center may export its data for 30 days, after
          which we delete it, except where we are required to retain records
          for longer.
        </p>
      </section>

      {/* ── 9. Acceptable use ── */}
      <section className={sec}>
        <h2 id="acceptable-use" className={h2}>
          9. Acceptable use
        </h2>
        <p className={p}>You agree not to:</p>
        <ul className={ul}>
          <li>
            Use the Service for any purpose other than managing student
            attendance at your learning center.
          </li>
          <li>
            Attempt to gain unauthorized access to any part of the Service or
            its underlying infrastructure.
          </li>
          <li>
            Upload student or guardian data that you are not authorized to
            process.
          </li>
          <li>
            Interfere with or disrupt the Service, including by transmitting
            malicious code or generating excessive automated requests.
          </li>
          <li>
            Resell, sublicense, or redistribute access to the Service without
            our written permission.
          </li>
        </ul>
      </section>

      {/* ── 10. Our intellectual property in the software ── */}
      <section className={sec}>
        <h2 id="intellectual-property" className={h2}>
          10. Our intellectual property in the software
        </h2>
        <p className={p}>
          The Service, including its design, code, and documentation, is owned
          by Presently LLC and protected by copyright and other intellectual
          property laws. Your subscription grants a limited, non-exclusive,
          non-transferable right to use the Service for your center&rsquo;s
          internal operations. Nothing in these Terms transfers ownership of
          the software to you.
        </p>
      </section>

      {/* ── 11. Disclaimer of warranties ── */}
      <section className={sec}>
        <h2 id="disclaimers" className={h2}>
          11. Disclaimer of warranties
        </h2>
        <p className={p}>
          The Service is provided &ldquo;as is&rdquo; and &ldquo;as
          available.&rdquo; To the fullest extent permitted by law, we disclaim
          all warranties, express or implied, including warranties of
          merchantability, fitness for a particular purpose, and
          non-infringement.
        </p>
        <p className={p}>
          Presently is a check-in and notification tool. It does not replace
          supervision of students, and center operators remain responsible for
          the safety and well-being of everyone on their premises.
        </p>
      </section>

      {/* ── 12. Limitation of liability ── */}
      <section className={sec}>
        <h2 id="liability" className={h2}>
          12. Limitation of liability
        </h2>
        <p className={p}>
          To the maximum extent permitted by law, Presently LLC&rsquo;s total
          liability for any claim arising out of or related to the Service is
          limited to the fees the center paid in the 12 months preceding the
          claim. We are not liable for indirect, incidental, special,
          consequential, or punitive damages, including loss of data, revenue,
          or business opportunity.
        </p>
      </section>

      {/* ── 13. Governing law ── */}
      <section className={sec}>
        <h2 id="governing-law" className={h2}>
          13. Governing law
        </h2>
        <p className={p}>
          These Terms are governed by and construed in accordance with the laws
          of the State of California, without regard to its conflict-of-law
          provisions.
        </p>
      </section>

      {/* ── 14. Changes to these terms ── */}
      <section className={sec}>
        <h2 id="changes" className={h2}>
          14. Changes to these terms
        </h2>
        <p className={p}>
          We may revise these Terms from time to time. When we make material
          changes, we will notify active subscribers by email at least 30 days
          before the changes take effect and update the &ldquo;Last
          updated&rdquo; date at the top of this page. Continued use of the
          Service after the effective date constitutes acceptance of the
          revised Terms.
        </p>
      </section>

      {/* ── 15. Contact ── */}
      <section className={sec}>
        <h2 id="contact" className={h2}>
          15. Contact
        </h2>
        <p className={p}>
          Presently LLC
        </p>
        <p className={p}>
          Email:{" "}
          <a href="mailto:admin@presently.now" className={link}>
            admin@presently.now
          </a>
          <br />
          Phone: (408) 409-4093
        </p>
      </section>
    </LegalLayout>
  );
}
