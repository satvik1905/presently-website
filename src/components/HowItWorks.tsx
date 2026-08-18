import SyncedSteps from "./SyncedSteps";
import VigBoard from "./VigBoard";

export default function HowItWorks() {
  return (
    <section className="tinted" id="how">
      <div className="wrap">
        <span className="stamp">ONE AFTERNOON AT YOUR CENTER</span>
        <h2>
          From scan-in to the last dismissal, without a clipboard.
        </h2>
        <p className="sec-lede">
          Presently follows the same path your students do. Each step triggers
          the next — no one at your front desk has to remember anything.
        </p>

        <SyncedSteps>
          {/* Step 1 — Scan in */}
          <div className="step">
            <div className="vig vig-scan" aria-hidden="true">
              <span className="chip chip-pop">✓ Checked in · Maya R.</span>
              <div className="ipad">
                <div className="ipad-cam" />
                <div className="ipad-screen">
                  <span className="iphone-label">Scan to check in</span>
                  <span className="screen-check">✓</span>
                  <div className="scan-line" />
                  <div className="screen-flash" />
                </div>
              </div>
              <div className="qr">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 21 21"
                  fill="#101828"
                  aria-hidden="true"
                >
                  {/* Top-left finder */}
                  <rect x="0" y="0" width="7" height="7" rx="0.8" />
                  <rect x="1" y="1" width="5" height="5" rx="0.4" fill="#fff" />
                  <rect x="2" y="2" width="3" height="3" rx="0.3" />
                  {/* Top-right finder */}
                  <rect x="14" y="0" width="7" height="7" rx="0.8" />
                  <rect x="15" y="1" width="5" height="5" rx="0.4" fill="#fff" />
                  <rect x="16" y="2" width="3" height="3" rx="0.3" />
                  {/* Bottom-left finder */}
                  <rect x="0" y="14" width="7" height="7" rx="0.8" />
                  <rect x="1" y="15" width="5" height="5" rx="0.4" fill="#fff" />
                  <rect x="2" y="16" width="3" height="3" rx="0.3" />
                  {/* Data modules */}
                  <rect x="8" y="0" width="1" height="1" />
                  <rect x="10" y="0" width="1" height="1" />
                  <rect x="12" y="0" width="1" height="1" />
                  <rect x="8" y="2" width="1" height="1" />
                  <rect x="10" y="2" width="1" height="1" />
                  <rect x="8" y="4" width="1" height="1" />
                  <rect x="11" y="4" width="1" height="1" />
                  <rect x="12" y="5" width="1" height="1" />
                  <rect x="8" y="6" width="1" height="1" />
                  <rect x="10" y="6" width="1" height="1" />
                  <rect x="0" y="8" width="1" height="1" />
                  <rect x="2" y="8" width="1" height="1" />
                  <rect x="4" y="8" width="1" height="1" />
                  <rect x="6" y="8" width="1" height="1" />
                  <rect x="8" y="8" width="1" height="1" />
                  <rect x="10" y="8" width="1" height="1" />
                  <rect x="14" y="8" width="1" height="1" />
                  <rect x="16" y="8" width="1" height="1" />
                  <rect x="18" y="8" width="1" height="1" />
                  <rect x="20" y="8" width="1" height="1" />
                  <rect x="1" y="10" width="1" height="1" />
                  <rect x="3" y="10" width="1" height="1" />
                  <rect x="5" y="10" width="1" height="1" />
                  <rect x="9" y="10" width="1" height="1" />
                  <rect x="11" y="10" width="1" height="1" />
                  <rect x="15" y="10" width="1" height="1" />
                  <rect x="17" y="10" width="1" height="1" />
                  <rect x="19" y="10" width="1" height="1" />
                  <rect x="0" y="12" width="1" height="1" />
                  <rect x="2" y="12" width="1" height="1" />
                  <rect x="6" y="12" width="1" height="1" />
                  <rect x="8" y="12" width="1" height="1" />
                  <rect x="10" y="12" width="1" height="1" />
                  <rect x="12" y="12" width="1" height="1" />
                  <rect x="14" y="12" width="1" height="1" />
                  <rect x="18" y="12" width="1" height="1" />
                  <rect x="20" y="12" width="1" height="1" />
                  <rect x="8" y="14" width="1" height="1" />
                  <rect x="10" y="14" width="1" height="1" />
                  <rect x="12" y="14" width="1" height="1" />
                  <rect x="14" y="14" width="1" height="1" />
                  <rect x="16" y="14" width="1" height="1" />
                  <rect x="20" y="14" width="1" height="1" />
                  <rect x="9" y="16" width="1" height="1" />
                  <rect x="11" y="16" width="1" height="1" />
                  <rect x="15" y="16" width="1" height="1" />
                  <rect x="17" y="16" width="1" height="1" />
                  <rect x="19" y="16" width="1" height="1" />
                  <rect x="8" y="18" width="1" height="1" />
                  <rect x="10" y="18" width="1" height="1" />
                  <rect x="14" y="18" width="1" height="1" />
                  <rect x="18" y="18" width="1" height="1" />
                  <rect x="20" y="18" width="1" height="1" />
                  <rect x="9" y="20" width="1" height="1" />
                  <rect x="11" y="20" width="1" height="1" />
                  <rect x="15" y="20" width="1" height="1" />
                  <rect x="17" y="20" width="1" height="1" />
                  <rect x="19" y="20" width="1" height="1" />
                </svg>
              </div>
            </div>
            <h3>Scan in at the door</h3>
            <p>
              A student holds their QR badge up to the front-desk iPad, or types
              their PIN. Two to three seconds, no line at the desk.
            </p>
          </div>

          {/* Step 2 — Parent text */}
          <div className="step">
            <div className="vig vig-phone" aria-hidden="true">
              <div className="iphone">
                <div className="dynamic-island" />
                <div className="iphone-screen iphone-screen-sms">
                  <span className="sms-header">Messages</span>
                  <div className="thread">
                    <span className="when">TODAY · 3:41 PM</span>
                    <div className="typing">
                      <span className="dot" />
                      <span className="dot" />
                      <span className="dot" />
                    </div>
                    <span className="bubble sms-bubble">
                      Maya checked in to Kumon Carmel Center at 3:41 PM.
                    </span>
                    <span className="delivered">Delivered</span>
                  </div>
                </div>
              </div>
            </div>
            <h3>Parents get a text</h3>
            <p>
              The moment a student checks in or out, their guardians get a
              message. No app to install, no login to forget.
            </p>
          </div>

          {/* Step 3 — Live board */}
          <div className="step">
            <VigBoard />
            <h3>One glance, every room</h3>
            <p>
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
