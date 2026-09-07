import SyncedSteps from "./SyncedSteps";
import VigScan from "./VigScan";
import VigPhone from "./VigPhone";
import VigBoard from "./VigBoard";

export default function HowItWorks() {
  return (
    <section className="tinted" id="how">
      <div className="wrap !px-0">
        <span className="stamp">ONE AFTERNOON AT YOUR CENTER</span>
        <h2>
          From scan-in to the last dismissal, without a clipboard.
        </h2>
        <p className="sec-lede">
          Presently follows the same path your students do. Each step triggers
          the next, so no one at your front desk has to remember anything.
        </p>

        <SyncedSteps>
          {/* Step 1 — Scan in */}
          <div className="bg-white border border-[#E7E5DF] rounded-2xl p-[18px_18px_22px]">
            <VigScan />
            <h3 className="text-[20px] font-semibold tracking-[-0.01em] mt-3.5 mb-2">
              Scan in at the door
            </h3>
            <p className="text-[15px] text-[#5B6472]">
              A student holds their QR badge up to the front-desk iPad, or types
              their PIN. Two to three seconds, no line at the desk.
            </p>
          </div>

          {/* Step 2 — Parent text */}
          <div className="bg-white border border-[#E7E5DF] rounded-2xl p-[18px_18px_22px]">
            <VigPhone />
            <h3 className="text-[20px] font-semibold tracking-[-0.01em] mt-3.5 mb-2">
              Parents get a text
            </h3>
            <p className="text-[15px] text-[#5B6472]">
              The moment a student checks in or out, their guardians get a
              message. No app to install, no login to forget.
            </p>
          </div>

          {/* Step 3 — Live board */}
          <div className="bg-white border border-[#E7E5DF] rounded-2xl p-[18px_18px_22px]">
            <VigBoard />
            <h3 className="text-[20px] font-semibold tracking-[-0.01em] mt-3.5 mb-2">
              One glance, every room
            </h3>
            <p className="text-[15px] text-[#5B6472]">
              The live board shows every student here right now, by room, with a
              running timer. When someone passes their session limit, they
              surface to the top.
            </p>
          </div>
        </SyncedSteps>
      </div>
    </section>
  );
}
