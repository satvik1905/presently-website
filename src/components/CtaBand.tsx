import CtaForm from "./CtaForm";

export default function CtaBand() {
  return (
    <section id="demo" className="tinted">
      <div className="wrap !px-0">
        <div className="grid grid-cols-2 items-center max-[800px]:grid-cols-1">
          <div className="flex flex-col justify-center py-14 pr-12 max-[800px]:p-0 max-[800px]:pb-8">
            <span className="stamp">STOP WONDERING WHO&rsquo;S STILL HERE</span>
            <h2 className="max-w-[20ch]">
              Two seconds to check in.{" "}
              <em className="not-italic text-[#2563EB]">
                One glance to know who&rsquo;s here.
              </em>
            </h2>
            <p className="text-[#5B6472] text-[16px] max-w-[44ch] mb-7">
              See Presently in action and discover how check-in, intelligent
              time management, parent communication, and attendance reporting
              work together in one center workflow. No commitment.
            </p>
            <ul className="flex flex-col gap-3 list-none">
              {[
                "Web-based — no new hardware required",
                "Built around the way Kumon centers operate",
                "Parents receive texts — no parent app required",
              ].map((text) => (
                <li key={text} className="flex items-center gap-2.5 text-[15px] text-[#101828]">
                  <span className="w-5 h-5 rounded-[6px] bg-[#EAF7EF] text-[#16A34A] text-[12px] font-bold flex items-center justify-center shrink-0">
                    ✓
                  </span>
                  {text}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-[#F9FAFB] p-[36px_32px] rounded-2xl border border-[#E7E5DF]" style={{ boxShadow: "0 16px 40px -20px rgba(16,24,40,.1)" }}>
            <CtaForm />
          </div>
        </div>
      </div>
    </section>
  );
}
