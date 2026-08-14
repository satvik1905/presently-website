import {
  IconRoute,
  IconScan,
  IconQrcode,
  IconPassword,
  IconHandStop,
  IconLayoutDashboard,
  IconDoor,
  IconAlertCircle,
  IconMessageCircle,
  IconMessage,
  IconClockCheck,
  IconDeviceMobileOff,
} from "@tabler/icons-react";

export default function HowItWorks() {
  return (
    <section
      id="how"
      style={{
        padding: "88px 0",
        background: "var(--soft)",
        borderTop: "1px solid var(--line)",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div className="container-w">
        <div className="sec-center">
          <span className="pill">
            <IconRoute size={13} />
            How it works
          </span>
          <h2>Three steps, start to done</h2>
          <p className="sub">
            Most of it happens without anyone lifting a finger.
          </p>
        </div>

        <div className="path">
          <div className="spine" aria-hidden="true" />

          {/* Step 1 */}
          <div className="prow">
            <div className="ptile">
              <div className="ptile-icon">
                <IconScan />
              </div>
            </div>
            <div className="pnum">01</div>
            <div className="ptxt">
              <h3>Student checks in</h3>
              <p>
                They scan a QR code or enter a 4-digit PIN at the kiosk — it
                takes about three seconds.
              </p>
              <div className="tags">
                <span className="ftag">
                  <IconQrcode size={13} />
                  QR scan
                </span>
                <span className="ftag">
                  <IconPassword size={13} />
                  4-digit PIN
                </span>
                <span className="ftag">
                  <IconHandStop size={13} />
                  Staff fallback
                </span>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="prow prow-rev">
            <div className="ptxt">
              <h3>Staff see the board</h3>
              <p>
                Who&rsquo;s present, in which room, and who&rsquo;s due to leave
                — updated live, flagged clearly.
              </p>
              <div className="tags">
                <span className="ftag">
                  <IconLayoutDashboard size={13} />
                  Live board
                </span>
                <span className="ftag">
                  <IconDoor size={13} />
                  By room
                </span>
                <span className="ftag">
                  <IconAlertCircle size={13} />
                  Over-limit flags
                </span>
              </div>
            </div>
            <div className="pnum">02</div>
            <div className="ptile">
              <div className="ptile-icon">
                <IconLayoutDashboard />
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="prow">
            <div className="ptile">
              <div className="ptile-icon">
                <IconMessageCircle />
              </div>
            </div>
            <div className="pnum">03</div>
            <div className="ptxt">
              <h3>Parents get notified</h3>
              <p>
                An automatic text goes out on arrival and departure. No app for
                parents to install.
              </p>
              <div className="tags">
                <span className="ftag">
                  <IconMessage size={13} />
                  SMS text
                </span>
                <span className="ftag">
                  <IconClockCheck size={13} />
                  In and out
                </span>
                <span className="ftag">
                  <IconDeviceMobileOff size={13} />
                  No app needed
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
