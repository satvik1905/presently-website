import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Privacy Policy — Presently",
  description:
    "How Presently LLC collects, uses, and protects information processed on behalf of learning centers.",
};

const sections = [
  { id: "who-we-are", title: "Who we are and our role", number: 1 },
  { id: "text-messages", title: "Text messages", number: 2 },
  { id: "information-we-process", title: "Information we process", number: 3 },
  { id: "check-in-kiosk", title: "The check-in kiosk", number: 4 },
  { id: "how-we-use", title: "How we use information", number: 5 },
  { id: "service-providers", title: "Service providers", number: 6 },
  { id: "our-access", title: "Our access to center data", number: 7 },
  { id: "cookies", title: "Cookies and analytics", number: 8 },
  { id: "retention", title: "Retention", number: 9 },
  { id: "security", title: "Security", number: 10 },
  { id: "california", title: "California residents", number: 11 },
  { id: "changes", title: "Changes to this policy", number: 12 },
  { id: "contact", title: "Contact", number: 13 },
];

const p = "text-[17px] leading-[1.7] text-slate-700 mb-4";
const h2 =
  "text-[24px] font-semibold text-slate-900 tracking-[-0.01em] mb-4 scroll-mt-24";
const link = "text-[#2563EB] underline underline-offset-2 hover:text-[#1D4ED8]";
const ul =
  "text-[17px] leading-[1.7] text-slate-700 mb-4 ml-6 list-disc space-y-1";
const sec = "mt-14";

export default function PrivacyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      effectiveDate="September 6, 2026"
      lastUpdated="September 6, 2026"
      sections={sections}
      crossLink={{ href: "/terms", label: "Terms of Service" }}
    >
      {/* ── 1. Who we are and our role ── */}
      <section>
        <h2 id="who-we-are" className={h2}>
          1. Who we are and our role
        </h2>
        <p className={p}>
          Presently LLC (&ldquo;Presently,&rdquo; &ldquo;we,&rdquo;
          &ldquo;us,&rdquo; or &ldquo;our&rdquo;) provides student check-in
          software to learning centers.
        </p>
        <p className={p}>
          The learning center collects and controls the student and guardian
          information; Presently processes it on the center&rsquo;s
          instructions. Presently is a data processor — each center is the data
          controller responsible for the information it provides to us.
        </p>
        <p className={p}>
          Guardians&rsquo; requests to access, correct, or delete a
          child&rsquo;s information should be directed to their center. The
          center then instructs us to carry out the request.
        </p>
      </section>

      {/* ── 2. Text messages ── */}
      <section className={sec}>
        <h2 id="text-messages" className={h2}>
          2. Text messages
        </h2>
        <ul className={ul}>
          <li>
            End users opt in by texting START to{" "}
            <strong className="text-slate-900">+1 (831) 298-8368</strong>.
          </li>
          <li>
            Message frequency: messages are sent only when a student checks in
            or checks out — typically up to 2 messages per student on each day
            the student attends. Attendance days are set by each center.
            Guardians with more than one enrolled student receive more.
          </li>
          <li>Message and data rates may apply.</li>
          <li>Reply STOP to opt out, HELP for help.</li>
          <li>
            Presently LLC does not sell, rent, or share mobile numbers with
            third parties or affiliates for marketing purposes.
          </li>
          <li>
            Guardians may reply to messages; replies are stored and shown to
            center staff.
          </li>
        </ul>
      </section>

      {/* ── 3. Information we process ── */}
      <section className={sec}>
        <h2 id="information-we-process" className={h2}>
          3. Information we process
        </h2>
        <p className={p}>
          The categories below describe the information learning centers provide
          to Presently or that the service generates during use.
        </p>

        <p className={`${p} font-semibold text-slate-900`}>Student</p>
        <p className={p}>
          First name, last name, known-as name, date of birth, the
          center&rsquo;s own student ID, student email, subject, assigned room,
          time limit, active status, Kumon Connect flag, enrollment date.
        </p>

        <p className={`${p} font-semibold text-slate-900`}>Guardian</p>
        <p className={p}>
          Name, mobile number, email, home phone, notification preference, and
          which guardian receives messages.
        </p>

        <p className={`${p} font-semibold text-slate-900`}>Staff account</p>
        <p className={p}>
          Name, sign-in email, phone used for sign-in and security codes, role,
          center.
        </p>

        <p className={`${p} font-semibold text-slate-900`}>Attendance</p>
        <p className={p}>
          Check-in and check-out times, room, time-limit and added-time actions,
          who performed each action and whether by scan or manually.
        </p>

        <p className={`${p} font-semibold text-slate-900`}>Messages</p>
        <p className={p}>
          Content of replies from guardians and messages sent by staff.
        </p>

        <p className={`${p} font-semibold text-slate-900`}>Imports</p>
        <p className={p}>
          Files uploaded by the center, including Kumon Report B exports.
        </p>

        <p className={`${p} font-semibold text-slate-900`}>Website</p>
        <p className={p}>
          Information submitted on the partner signup and demo request forms.
        </p>
      </section>

      {/* ── 4. The check-in kiosk ── */}
      <section className={sec}>
        <h2 id="check-in-kiosk" className={h2}>
          4. The check-in kiosk
        </h2>
        <p className={p}>
          The kiosk uses the device camera solely to read a student&rsquo;s
          barcode or QR code. No images are captured, stored, or transmitted.
        </p>
        <p className={p}>
          The kiosk screen shows a short list of recent check-ins so staff can
          confirm a scan registered. This list may be visible to others nearby
          in the center.
        </p>
      </section>

      {/* ── 5. How we use information ── */}
      <section className={sec}>
        <h2 id="how-we-use" className={h2}>
          5. How we use information
        </h2>
        <p className={p}>We use the information described above to:</p>
        <ul className={ul}>
          <li>Operate check-in and check-out.</li>
          <li>Send notifications the center has enabled.</li>
          <li>Generate attendance records and reports.</li>
          <li>Provide support to centers and their staff.</li>
          <li>Process billing and manage subscriptions.</li>
          <li>Maintain the security of the service.</li>
        </ul>
      </section>

      {/* ── 6. Service providers ── */}
      <section className={sec}>
        <h2 id="service-providers" className={h2}>
          6. Service providers
        </h2>
        <p className={p}>
          We use the following third-party providers to deliver the service.
          Using these providers to operate Presently is not sharing information
          for marketing purposes.
        </p>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-[15px] leading-[1.6] text-slate-700 border border-slate-200 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-slate-50 text-left text-[13px] font-semibold text-slate-900 uppercase tracking-[0.04em]">
                <th className="px-4 py-3 border-b border-slate-200">
                  Provider
                </th>
                <th className="px-4 py-3 border-b border-slate-200">Purpose</th>
                <th className="px-4 py-3 border-b border-slate-200">
                  Information involved
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-200">
                <td className="px-4 py-3 font-medium text-slate-900">Twilio</td>
                <td className="px-4 py-3">Text message delivery</td>
                <td className="px-4 py-3">
                  Mobile numbers and message content
                </td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="px-4 py-3 font-medium text-slate-900">Stripe</td>
                <td className="px-4 py-3">Subscription payments</td>
                <td className="px-4 py-3">
                  Center billing contact and payment details
                </td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="px-4 py-3 font-medium text-slate-900">Vercel</td>
                <td className="px-4 py-3">Hosting</td>
                <td className="px-4 py-3">
                  Application traffic and request metadata
                </td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="px-4 py-3 font-medium text-slate-900">
                  Supabase
                </td>
                <td className="px-4 py-3">Database</td>
                <td className="px-4 py-3">
                  All center, student, guardian, attendance, and message data
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-slate-900">
                  Google Workspace
                </td>
                <td className="px-4 py-3">Email</td>
                <td className="px-4 py-3">
                  Email addresses and message content
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className={p}>
          Payment card details are handled entirely by Stripe. Presently LLC
          does not receive or store card numbers.
        </p>
      </section>

      {/* ── 7. Our access to center data ── */}
      <section className={sec}>
        <h2 id="our-access" className={h2}>
          7. Our access to center data
        </h2>
        <p className={p}>
          Presently LLC personnel may access a center&rsquo;s data to provide
          support and maintain the service.
        </p>
      </section>

      {/* ── 8. Cookies and analytics ── */}
      <section className={sec}>
        <h2 id="cookies" className={h2}>
          8. Cookies and analytics
        </h2>
        <p className={p}>
          We use cookies only where they are necessary to run the service. When
          center staff sign in to Presently, we set a session cookie so you stay
          signed in. We do not use advertising or tracking cookies, and we do
          not allow third parties to track you across other sites.
        </p>
      </section>

      {/* ── 9. Retention ── */}
      <section className={sec}>
        <h2 id="retention" className={h2}>
          9. Retention
        </h2>
        <p className={p}>
          Attendance records are retained for 7 years. A student record is
          retained for 7 years after the student becomes inactive.
        </p>
        <p className={p}>
          If a center&rsquo;s subscription ends, the center may export its data
          for 30 days, after which we delete it, except where we are required to
          retain records for longer.
        </p>
      </section>

      {/* ── 10. Security ── */}
      <section className={sec}>
        <h2 id="security" className={h2}>
          10. Security
        </h2>
        <p className={p}>
          We protect center data with role-based access controls, one-time
          security codes where the center requires them, and encryption of data
          in transit.
        </p>
      </section>

      {/* ── 11. California residents ── */}
      <section className={sec}>
        <h2 id="california" className={h2}>
          11. California residents
        </h2>
        <p className={p}>
          If we become aware of a breach of unencrypted personal information, we
          will notify affected individuals consistent with California law.
        </p>
        <p className={p}>
          Requests relating to a student&rsquo;s information should be directed
          to the learning center that controls that data. The center will
          instruct Presently to carry out any required action.
        </p>
      </section>

      {/* ── 12. Changes to this policy ── */}
      <section className={sec}>
        <h2 id="changes" className={h2}>
          12. Changes to this policy
        </h2>
        <p className={p}>
          We may update this Privacy Policy from time to time. When we make
          material changes, we will notify active center operators by email and
          update the &ldquo;Last updated&rdquo; date at the top of this page.
          Continued use of the service after a change constitutes acceptance of
          the revised policy.
        </p>
      </section>

      {/* ── 13. Contact ── */}
      <section className={sec}>
        <h2 id="contact" className={h2}>
          13. Contact
        </h2>
        <p className={p}>
          Presently LLC
          <br />
          3850 Rio Rd Apt 21
          <br />
          Carmel, CA 93923
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
