import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to print QR codes – Help – Presently",
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

export default function HelpQrPage() {
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
            d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2z"
          />
        </svg>
        How to print QR codes
      </h1>
      <p className="text-[14px] text-slate-500 mb-10">
        Staff and Admin can do this. Print only <strong>Active</strong> students.
      </p>

      {/* Step 1 */}
      <div className="mb-14">
        <div className="flex items-center gap-3 mb-3">
          <StepNumber n={1} />
          <h3 className="text-[17px] font-semibold text-slate-900">
            Choose a template and buy labels
          </h3>
        </div>
        <p className="text-[15px] text-slate-600 mb-6 pl-10">
          There are two sizes. Buy the sheet that matches the template you will print.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pl-10">
          {/* Product card 1 */}
          <div className="rounded-xl border border-slate-200 overflow-hidden">
            <img src="/images/help-qr/label-3x1.png" alt="Matte white labels — 18 per sheet, 3 inches by 1 inch, 8.5 by 11 inch sheet" className="w-full" />
            <div className="px-5 py-4">
              <p className="text-[15px] font-semibold text-slate-900">
                3&quot; &times; 1&quot; name card{" "}
                <span className="text-[13px] font-medium text-[#2563EB] bg-[#EEF3FE] rounded-full px-2.5 py-0.5">Recommended</span>
              </p>
              <p className="text-[14px] text-slate-600 mt-2.5 leading-relaxed">
                Fits the name tag on a standard Kumon record folder. This is the size we recommend.
              </p>
              <p className="text-[14px] text-slate-600 mt-2.5">
                About $13 for 450 labels, or $23 for 1,800.
              </p>
              <a
                href="https://www.amazon.com/Premium-Label-Supply-Sticker-Address/dp/B0C8XSGSFZ"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[14px] font-semibold text-[#2563EB] hover:text-[#1D4ED8] mt-3"
              >
                Buy these labels
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
          {/* Product card 2 */}
          <div className="rounded-xl border border-slate-200 overflow-hidden">
            <img src="/images/help-qr/label-2x2.png" alt="Square labels — 20 per sheet, 2 inches by 2 inches, 8.5 by 11 inch sheet" className="w-full" />
            <div className="px-5 py-4">
              <p className="text-[15px] font-semibold text-slate-900">
                2&quot; &times; 2&quot; square
              </p>
              <p className="text-[14px] text-slate-600 mt-2.5 leading-relaxed">
                Use this if you want the QR code on the outside of the folder instead of the name tag.
              </p>
              <p className="text-[14px] text-slate-600 mt-2.5">
                About $13 for 500 labels, or $22 for 2,000.
              </p>
              <a
                href="https://www.amazon.com/Premium-Label-Supply-Sticker-Square/dp/B09HP4WC4M"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[14px] font-semibold text-[#2563EB] hover:text-[#1D4ED8] mt-3"
              >
                Buy these labels
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
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
            <svg
              className="inline-block w-3.5 h-3.5 ml-0.5 -mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>{" "}
          and sign in with the credentials emailed to you. Skip this if you are already signed in.
        </p>
        <img src="/images/help-qr/sign-in.png" alt="Presently sign-in screen showing email and password fields" className="ml-10 rounded-xl border border-slate-200" />
      </div>

      {/* Step 3 */}
      <div className="mb-14">
        <div className="flex items-center gap-3 mb-3">
          <StepNumber n={3} />
          <h3 className="text-[17px] font-semibold text-slate-900">
            Select students
          </h3>
        </div>
        <p className="text-[15px] text-slate-600 mb-6 pl-10">
          Open <strong>Students</strong> (1). Tick the names you want printed &mdash; there is a select-all box at the top of the table (2). Then click <strong>Print QR codes</strong> (3).
        </p>
        <img src="/images/help-qr/select-students.png" alt="Student list with checkboxes selected and Print QR codes button highlighted" className="ml-10 rounded-xl border border-slate-200 mb-5" />
        <div className="pl-10">
          <Tip>
            Cannot find a name? Type it in <strong>Search by student name</strong> first, then tick. Leave the status box on <strong>Active</strong>.
          </Tip>
        </div>
      </div>

      {/* Step 4 */}
      <div className="mb-14">
        <div className="flex items-center gap-3 mb-3">
          <StepNumber n={4} />
          <h3 className="text-[17px] font-semibold text-slate-900">
            Select the template and export the PDF
          </h3>
        </div>
        <p className="text-[15px] text-slate-600 mb-2 pl-10">
          Select your preferred template (1). We recommend <strong>Name card 3&quot; &times; 1&quot;</strong> &mdash; it fits the name tag on the standard record folder (18 per letter sheet). Use <strong>2&quot; &times; 2&quot; sheet</strong> only if you want the QR on the outside of the folder.
        </p>
        <p className="text-[15px] text-slate-600 mb-6 pl-10">
          Click <strong>Export file</strong> (2). It saves as a PDF you can send to your printer.
        </p>
        <img src="/images/help-qr/export-pdf.png" alt="Print QR codes dialog with template selection and Export file button" className="ml-10 rounded-xl border border-slate-200 mb-5" />
        <div className="pl-10">
          <Tip>
            If leftover labels appear, use the left and right arrows to move them onto empty sticker spaces. Print the first page only at first, at <strong>100% scale</strong> with headers and footers off, to check you are printing on the correct side of the sheet.
          </Tip>
        </div>
      </div>

      {/* Step 5 */}
      <div className="mb-4">
        <div className="flex items-center gap-3 mb-3">
          <StepNumber n={5} />
          <h3 className="text-[17px] font-semibold text-slate-900">
            Insert the label into the name tag
          </h3>
        </div>
        <p className="text-[15px] text-slate-600 mb-6 pl-10">
          Cut the printed label and slide it into the name-tag sleeve on the student&rsquo;s folder.
        </p>
        <img src="/images/help-qr/insert-label.png" alt="Printed QR label being inserted into a folder name-tag sleeve" className="ml-10 rounded-xl mb-5" />
        <div className="pl-10">
          <Tip>
            The number under the QR is the same 4-digit PIN used on the kiosk keypad.
          </Tip>
        </div>
      </div>
    </>
  );
}
