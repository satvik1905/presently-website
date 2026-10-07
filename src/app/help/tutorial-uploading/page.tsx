import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Monthly Uploading – Help – Presently",
};

export default function HelpTutorialUploadingPage() {
  return (
    <>
      {/* Page title */}
      <h1 className="text-[28px] font-semibold tracking-[-0.02em] text-slate-900 mb-3">
        Monthly Uploading
      </h1>
      <p className="text-[16px] text-slate-600 mb-14">
        What happens monthly after the Initial Reports (Report B and Student
        Profiles) have been submitted?
      </p>

      {/* Background */}
      <div className="mb-14">
        <h2 className="text-[20px] font-semibold text-slate-900 mb-4">
          Background
        </h2>
        <ul className="list-disc pl-6 text-[15px] text-slate-600 space-y-3">
          <li>
            When first setting up the Presently Portal you were asked to upload
            Report B and Student Profile. This is a{" "}
            <strong>one time</strong> upload.
          </li>
          <li>
            Once this step has taken place, it is now a case of keeping the list
            of students current.
          </li>
          <li>
            To do that we just want the new enrollments added. Old students will
            automatically become inactivated after 60 days.
          </li>
          <li>
            The easiest way to add new students is via the{" "}
            <strong>e-enrollment</strong> form.
          </li>
        </ul>
      </div>

      {/* The eEnrollment document */}
      <div className="mb-14">
        <h2 className="text-[20px] font-semibold text-slate-900 mb-4">
          The eEnrollment document
        </h2>
        <ul className="list-disc pl-6 text-[15px] text-slate-600 space-y-3 mb-6">
          <li>The form downloads in PDF format.</li>
          <li>Simply upload this document into Presently.</li>
          <li>This is the form filled by the parents themselves.</li>
        </ul>
        <img
          src="/images/help-tutorial-uploading/eenrollment-document.png"
          alt="Example of the eEnrollment PDF document"
          className="rounded-xl border border-slate-200"
        />
      </div>

      {/* Locating the eEnrollment form */}
      <div className="mb-14">
        <h2 className="text-[20px] font-semibold text-slate-900 mb-4">
          Locating the eEnrollment form
        </h2>
        <p className="text-[15px] text-slate-600 mb-3">
          You can find the e-enrollment form by following these steps:
        </p>
        <ol className="list-decimal pl-6 text-[15px] text-slate-600 space-y-2 mb-6">
          <li>
            Log in to <strong>iKumon.com</strong>
          </li>
          <li>
            In the far right column, click{" "}
            <strong>eEnrollment</strong>{" "}
            <span className="text-red-500 font-semibold">(1)</span>
          </li>
          <li>
            Under <strong>View Notice to parents</strong>{" "}
            <span className="text-red-500 font-semibold">(2)</span>
          </li>
          <li>Click the arrow with the envelope</li>
          <li>
            Download the file for each new enrollee{" "}
            <span className="text-red-500 font-semibold">(3)</span>
          </li>
        </ol>
        <img
          src="/images/help-tutorial-uploading/locating-eenrollment-1.png"
          alt="iKumon interface showing how to locate the eEnrollment form"
          className="rounded-xl border border-slate-200 mb-5"
        />
        <img
          src="/images/help-tutorial-uploading/locating-eenrollment-2.png"
          alt="iKumon interface showing the eEnrollment download step"
          className="rounded-xl border border-slate-200"
        />
      </div>

      {/* Document drop into Presently */}
      <div className="mb-4">
        <h2 className="text-[20px] font-semibold text-slate-900 mb-4">
          Document drop into Presently
        </h2>
        <p className="text-[15px] text-slate-600 mb-6">
          Once you have downloaded the eEnrollment PDF for each new student,
          upload it directly into Presently. The system will automatically
          extract the student&rsquo;s information from the form.
        </p>
        <img
          src="/images/help-tutorial-uploading/document-drop.png"
          alt="Presently interface showing the document upload area"
          className="rounded-xl border border-slate-200"
        />
      </div>
    </>
  );
}
