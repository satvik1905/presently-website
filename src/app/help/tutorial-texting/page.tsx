import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to text parents for the first time – Help – Presently",
};

function StepNumber({ n }: { n: number }) {
  return (
    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#2563EB] text-white text-[14px] font-semibold shrink-0">
      {n}
    </span>
  );
}

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 px-5 py-3.5 text-[14px] text-slate-600 leading-relaxed">
      {children}
    </div>
  );
}

export default function HelpTutorialTextingPage() {
  return (
    <>
      {/* Guide title */}
      <h1 className="flex items-center gap-2.5 text-[24px] font-semibold tracking-[-0.02em] text-slate-900 mb-2">
        <svg
          className="w-5 h-5 text-[#2563EB] shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
        How to text parents for the first time
      </h1>
      <p className="flex items-center gap-1.5 text-[14px] text-slate-500 mb-10">
        <svg
          className="w-4 h-4 text-slate-400 shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        Takes about 5 minutes
      </p>

      {/* Step 1 */}
      <div className="mb-14">
        <div className="flex items-center gap-3 mb-3">
          <StepNumber n={1} />
          <h3 className="text-[17px] font-semibold text-slate-900">
            Go to the Students menu
          </h3>
        </div>
        <p className="text-[15px] text-slate-600 mb-6 pl-10">
          Open <strong>Students</strong> from the sidebar. This is where you
          manage all enrolled students and their notification preferences.
        </p>
        <img
          src="/images/help-tutorial-texting/step-1.png"
          alt="Sidebar with Students menu item highlighted"
          className="ml-10 rounded-xl border border-slate-200"
        />
      </div>

      {/* Step 2 */}
      <div className="mb-14">
        <div className="flex items-center gap-3 mb-3">
          <StepNumber n={2} />
          <h3 className="text-[17px] font-semibold text-slate-900">
            Select the desired student(s)
          </h3>
        </div>
        <p className="text-[15px] text-slate-600 mb-6 pl-10">
          Click the checkbox next to each student you want to enable texting for.
          You can select one student or multiple at once.
        </p>
        <img
          src="/images/help-tutorial-texting/step-2.png"
          alt="Student list with checkboxes selected"
          className="ml-10 rounded-xl border border-slate-200"
        />
      </div>

      {/* Step 3 */}
      <div className="mb-14">
        <div className="flex items-center gap-3 mb-3">
          <StepNumber n={3} />
          <h3 className="text-[17px] font-semibold text-slate-900">
            Click &ldquo;Edit student&rdquo;
          </h3>
        </div>
        <p className="text-[15px] text-slate-600 mb-6 pl-10">
          With your student(s) selected, click the{" "}
          <strong>Edit student</strong> button to open their notification
          settings.
        </p>
        <img
          src="/images/help-tutorial-texting/step-3.png"
          alt="Edit student button highlighted at the top of the student list"
          className="ml-10 rounded-xl border border-slate-200"
        />
      </div>

      {/* Step 4 */}
      <div className="mb-14">
        <div className="flex items-center gap-3 mb-3">
          <StepNumber n={4} />
          <h3 className="text-[17px] font-semibold text-slate-900">
            Turn on the &ldquo;Text notifications&rdquo; switch
          </h3>
        </div>
        <p className="text-[15px] text-slate-600 mb-6 pl-10">
          Find the <strong>Text notifications</strong> toggle and switch it on.
          This enables SMS messages for the selected student(s).
        </p>
        <img
          src="/images/help-tutorial-texting/step-4.png"
          alt="Text notifications toggle switched on"
          className="ml-10 rounded-xl border border-slate-200"
        />
      </div>

      {/* Step 5 */}
      <div className="mb-14">
        <div className="flex items-center gap-3 mb-3">
          <StepNumber n={5} />
          <h3 className="text-[17px] font-semibold text-slate-900">
            Select the Guardian(s) to notify
          </h3>
        </div>
        <p className="text-[15px] text-slate-600 mb-6 pl-10">
          Choose which guardian(s) should receive text messages. You can select
          the mother, father, or both. Only guardians with a phone number on
          file will appear as options.
        </p>
        <img
          src="/images/help-tutorial-texting/step-5.png"
          alt="Guardian selection showing mother and father checkboxes"
          className="ml-10 rounded-xl border border-slate-200"
        />
      </div>

      {/* Step 6 */}
      <div className="mb-14">
        <div className="flex items-center gap-3 mb-3">
          <StepNumber n={6} />
          <h3 className="text-[17px] font-semibold text-slate-900">
            Save Contact
          </h3>
        </div>
        <ul className="list-disc pl-16 text-[15px] text-slate-600 space-y-1.5 mb-6">
          <li>
            Ask the parents to save the notification number which is{" "}
            <strong>831-298-8368</strong>.
          </li>
          <li>
            Some cellular providers may ask you to opt in first, so this
            bypasses that process.
          </li>
          <li>
            You can text the number as a contact which then can be saved very
            quickly on a parent&rsquo;s phone. We labeled the contact as{" "}
            &lsquo;Kumon Live!&rsquo;
          </li>
        </ul>
        <img
          src="/images/help-tutorial-texting/step-6.png"
          alt="Step 6 screenshot"
          className="ml-10 rounded-xl border border-slate-200"
        />
      </div>

      {/* Step 7 */}
      <div className="mb-14">
        <div className="flex items-center gap-3 mb-3">
          <StepNumber n={7} />
          <h3 className="text-[17px] font-semibold text-slate-900">
            Check-in with parents
          </h3>
        </div>
        <ul className="list-disc pl-16 text-[15px] text-slate-600 space-y-1.5 mb-6">
          <li>
            After your first-class day with the texting option has been trialed,
            check in with the small sample of parents and get their feedback.
          </li>
          <li>
            They will have received one text at check-in and another text at
            checkout.{" "}
            <span className="text-[#2563EB] font-medium">
              Check that they received both.
            </span>
          </li>
          <li>
            The text sent to parents will show the name, center location, and
            time.
          </li>
          <li>You can also customize this message later.</li>
        </ul>
        <img
          src="/images/help-tutorial-texting/step-7.png"
          alt="Step 7 screenshot"
          className="ml-10 rounded-xl border border-slate-200"
        />
      </div>

      {/* Step 8 */}
      <div className="mb-4">
        <div className="flex items-center gap-3 mb-3">
          <StepNumber n={8} />
          <h3 className="text-[17px] font-semibold text-slate-900">
            Turn on notifications for all parents
          </h3>
        </div>
        <p className="text-[15px] text-slate-600 mb-2 pl-10">
          <span className="text-[#2563EB] font-medium">
            Complete this step once you are ready to deploy center-wide.
          </span>
        </p>
        <p className="text-[15px] text-slate-600 mb-6 pl-10">
          Click <strong>Turn on texting for active students</strong> at the top
          of the Students page. Before doing so, check that all students have a
          guardian with a phone number in their profile. Students with missing
          data will need to be entered manually.
        </p>
        <img
          src="/images/help-tutorial-texting/step-8.png"
          alt="Students page showing the Turn on texting for active students button and an example of incomplete guardian data"
          className="ml-10 rounded-xl border border-slate-200"
        />
      </div>
    </>
  );
}
