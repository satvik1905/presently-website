import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to import students from KSIS – Help – Presently",
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

export default function HelpTutorialPage() {
  return (
    <>
      {/* Guide title */}
      <div className="flex items-start gap-2.5 mb-2">
        <svg
          className="w-[18px] h-[18px] text-[#2563EB] mt-[3px] shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
          />
        </svg>
        <h2 className="text-[18px] font-semibold tracking-[-0.01em] text-slate-900">
          How to import students from the Kumon system (KSIS)
        </h2>
      </div>
      <p className="flex items-center gap-1.5 text-[14px] text-slate-500 mb-10">
        <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Admin only. If you do not see&nbsp;<strong>Import students</strong>, ask an Admin to do this step.
      </p>

      {/* Step 1 */}
      <div className="mb-14">
        <div className="flex items-center gap-3 mb-3">
          <StepNumber n={1} />
          <h3 className="text-[17px] font-semibold text-slate-900">
            Export Report B and the Student Report from KSIS
          </h3>
        </div>
        <p className="text-[15px] text-slate-600 mb-2 pl-10">
          Do this in the Kumon system (KSIS), not in Presently. Export these two files and save them on your computer. <strong>Do not change anything in the files.</strong>
        </p>
        <ul className="list-disc pl-16 text-[15px] text-slate-600 space-y-1.5 mb-5">
          <li>
            <strong>Report B</strong> as Excel (.xlsx) &mdash; Math, Reading, and EFL (or another third subject)
          </li>
          <li>
            <strong>Student Report</strong> as Excel &mdash; mother/father names, cell phones, and address
          </li>
        </ul>
        <div className="pl-10">
          <Tip>
            Report B alone cannot fill guardian or phone. The Student Report alone cannot fill subjects. Use both.
          </Tip>
        </div>
      </div>

      {/* Step 2 */}
      <div className="mb-14">
        <div className="flex items-center gap-3 mb-3">
          <StepNumber n={2} />
          <h3 className="text-[17px] font-semibold text-slate-900">
            Sign in to Presently
          </h3>
        </div>
        <p className="text-[15px] text-slate-600 mb-6 pl-10">
          Go to{" "}
          <a
            href="https://portal.presently.now"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#2563EB] underline underline-offset-2 hover:text-[#1D4ED8]"
          >
            portal.presently.now
            <svg className="inline-block w-3.5 h-3.5 ml-0.5 -mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>{" "}
          and sign in with your admin credentials. Skip this if you are already signed in.
        </p>
        <img src="/images/help-tutorial/sign-in.png" alt="Presently sign-in screen showing email and password fields" className="ml-10 rounded-xl border border-slate-200" />
      </div>

      {/* Step 3 */}
      <div className="mb-14">
        <div className="flex items-center gap-3 mb-3">
          <StepNumber n={3} />
          <h3 className="text-[17px] font-semibold text-slate-900">
            Click Import students
          </h3>
        </div>
        <p className="text-[15px] text-slate-600 mb-6 pl-10">
          Open <strong>Students</strong> (1). Click <strong>Import students</strong> at the top right (2).
        </p>
        <img src="/images/help-tutorial/import-students.png" alt="Students page with Import students button highlighted at top right" className="ml-10 rounded-xl border border-slate-200" />
      </div>

      {/* Step 4 */}
      <div className="mb-14">
        <div className="flex items-center gap-3 mb-3">
          <StepNumber n={4} />
          <h3 className="text-[17px] font-semibold text-slate-900">
            Drop Report B
          </h3>
        </div>
        <p className="text-[15px] text-slate-600 mb-6 pl-10">
          Drop the Report B file into the dashed box, or click the box and choose the file. Then click <strong>Continue</strong>.
        </p>
        <img src="/images/help-tutorial/drop-report-b.png" alt="Import dialog showing Report B file upload area" className="ml-10 rounded-xl border border-slate-200 mb-5" />
        <div className="pl-10">
          <Tip>
            Maximum 2MB or 500 students per file.
          </Tip>
        </div>
      </div>

      {/* Step 5 */}
      <div className="mb-14">
        <div className="flex items-center gap-3 mb-3">
          <StepNumber n={5} />
          <h3 className="text-[17px] font-semibold text-slate-900">
            Map Report B columns
          </h3>
        </div>
        <p className="text-[15px] text-slate-600 mb-6 pl-10">
          The system matches the columns automatically. Check that Student ID, names, and Subject look right, then click <strong>Continue</strong>.
        </p>
        <img src="/images/help-tutorial/map-report-b.png" alt="Column mapping for Report B with arrows showing file columns matched to system fields" className="ml-10 rounded-xl border border-slate-200" />
      </div>

      {/* Step 6 */}
      <div className="mb-14">
        <div className="flex items-center gap-3 mb-3">
          <StepNumber n={6} />
          <h3 className="text-[17px] font-semibold text-slate-900">
            Drop the Student Report
          </h3>
        </div>
        <p className="text-[15px] text-slate-600 mb-6 pl-10">
          Drop the Student Report file into the dashed box. Then click <strong>Continue</strong>.
        </p>
        <img src="/images/help-tutorial/drop-student-report.png" alt="Import dialog showing Student Report file upload area" className="ml-10 rounded-xl border border-slate-200" />
      </div>

      {/* Step 7 */}
      <div className="mb-14">
        <div className="flex items-center gap-3 mb-3">
          <StepNumber n={7} />
          <h3 className="text-[17px] font-semibold text-slate-900">
            Map Student Report columns
          </h3>
        </div>
        <p className="text-[15px] text-slate-600 mb-6 pl-10">
          The system matches mother, father, phones, and address automatically. Confirm they look right, then click <strong>Continue</strong>.
        </p>
        <img src="/images/help-tutorial/map-student-report.png" alt="Column mapping for Student Report with arrows showing file columns matched to system fields" className="ml-10 rounded-xl border border-slate-200 mb-5" />
        <div className="pl-10">
          <Tip>
            If a column is still on Skip, use the dropdown &mdash; Address, Mother cell phone, and Father cell phone are all listed.
          </Tip>
        </div>
      </div>

      {/* Step 8 */}
      <div className="mb-14">
        <div className="flex items-center gap-3 mb-3">
          <StepNumber n={8} />
          <h3 className="text-[17px] font-semibold text-slate-900">
            Review the list
          </h3>
        </div>
        <p className="text-[15px] text-slate-600 mb-2 pl-10">
          The review page shows everything extracted from both files. Look at the <strong>Action</strong> column, then click <strong>Continue</strong>.
        </p>
        <ul className="list-disc pl-16 text-[15px] text-slate-600 space-y-1.5 mb-6">
          <li><strong>New</strong> &mdash; new Student ID</li>
          <li><strong>Update</strong> &mdash; Student ID already in this center</li>
          <li><strong>Skip</strong> &mdash; left alone (missing name or ID)</li>
        </ul>
        <img src="/images/help-tutorial/review-list.png" alt="Review table showing imported students with Action column" className="ml-10 rounded-xl border border-slate-200" />
      </div>

      {/* Step 9 */}
      <div className="mb-4">
        <div className="flex items-center gap-3 mb-3">
          <StepNumber n={9} />
          <h3 className="text-[17px] font-semibold text-slate-900">
            Confirm and Add
          </h3>
        </div>
        <p className="text-[15px] text-slate-600 mb-6 pl-10">
          The last page shows how many students will be added or updated. Click <strong>Confirm and Add</strong> in the bottom right.
        </p>
        <img src="/images/help-tutorial/confirm-add.png" alt="Confirm and Add dialog showing import summary" className="ml-10 rounded-xl border border-slate-200 mb-5" />
        <div className="pl-10">
          <Tip>
            After it finishes, open a few students and check subject (Math, Reading, EFL), guardian, and address.
          </Tip>
        </div>
      </div>
    </>
  );
}
