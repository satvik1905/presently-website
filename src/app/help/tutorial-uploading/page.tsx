import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to upload monthly reports – Help – Presently",
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

export default function HelpTutorialUploadingPage() {
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
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
          />
        </svg>
        How to upload monthly reports
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
            Placeholder step title
          </h3>
        </div>
        <p className="text-[15px] text-slate-600 mb-6 pl-10">
          Placeholder description for step 1.
        </p>
        <img
          src="/images/help-tutorial-uploading/step-1.png"
          alt="Step 1 screenshot"
          className="ml-10 rounded-xl border border-slate-200"
        />
      </div>

      {/* Step 2 */}
      <div className="mb-14">
        <div className="flex items-center gap-3 mb-3">
          <StepNumber n={2} />
          <h3 className="text-[17px] font-semibold text-slate-900">
            Placeholder step title
          </h3>
        </div>
        <p className="text-[15px] text-slate-600 mb-6 pl-10">
          Placeholder description for step 2.
        </p>
        <img
          src="/images/help-tutorial-uploading/step-2.png"
          alt="Step 2 screenshot"
          className="ml-10 rounded-xl border border-slate-200"
        />
      </div>

      {/* Step 3 */}
      <div className="mb-14">
        <div className="flex items-center gap-3 mb-3">
          <StepNumber n={3} />
          <h3 className="text-[17px] font-semibold text-slate-900">
            Placeholder step title
          </h3>
        </div>
        <p className="text-[15px] text-slate-600 mb-6 pl-10">
          Placeholder description for step 3.
        </p>
        <img
          src="/images/help-tutorial-uploading/step-3.png"
          alt="Step 3 screenshot"
          className="ml-10 rounded-xl border border-slate-200"
        />
      </div>

      {/* Step 4 */}
      <div className="mb-14">
        <div className="flex items-center gap-3 mb-3">
          <StepNumber n={4} />
          <h3 className="text-[17px] font-semibold text-slate-900">
            Placeholder step title
          </h3>
        </div>
        <p className="text-[15px] text-slate-600 mb-6 pl-10">
          Placeholder description for step 4.
        </p>
        <img
          src="/images/help-tutorial-uploading/step-4.png"
          alt="Step 4 screenshot"
          className="ml-10 rounded-xl border border-slate-200"
        />
      </div>

      {/* Step 5 */}
      <div className="mb-4">
        <div className="flex items-center gap-3 mb-3">
          <StepNumber n={5} />
          <h3 className="text-[17px] font-semibold text-slate-900">
            Placeholder step title
          </h3>
        </div>
        <p className="text-[15px] text-slate-600 mb-6 pl-10">
          Placeholder description for step 5.
        </p>
        <img
          src="/images/help-tutorial-uploading/step-5.png"
          alt="Step 5 screenshot"
          className="ml-10 rounded-xl border border-slate-200"
        />
      </div>
    </>
  );
}
