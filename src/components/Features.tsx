import { IconLayoutGrid } from "@tabler/icons-react";

export default function Features() {
  return (
    <section id="features" style={{ padding: "88px 0" }}>
      <div className="container-w">
        <div className="sec-header">
          <div>
            <span className="pill">
              <IconLayoutGrid size={13} />
              Features
            </span>
            <h2>Everything the front desk needs</h2>
          </div>
          <p className="side">
            Four things, done quietly in the background, designed to keep the
            busy hour calm and every record clean.
          </p>
        </div>

        <div className="cards">
          {/* Live Board */}
          <div className="card">
            <div className="panel">
              <div className="mock">
                <div className="mrow">
                  <div>
                    <div className="nm">
                      Emma Johnson <span className="tag-label">Connect</span>
                    </div>
                    <div className="su">Reading</div>
                  </div>
                  <span className="tm">12:04</span>
                </div>
                <div className="mrow">
                  <div>
                    <div className="nm">Liam Rivera</div>
                    <div className="su">Math</div>
                  </div>
                  <span className="tm tm-warn">24:10</span>
                </div>
                <div className="mrow">
                  <div>
                    <div className="nm">Aisha Patel</div>
                    <div className="su">Math &amp; Reading</div>
                  </div>
                  <span className="tm tm-over">34:57</span>
                </div>
              </div>
            </div>
            <h3>A live board of who&rsquo;s here</h3>
            <p>
              Everyone present, grouped by room, a timer per student, and a
              clear flag on anyone over their limit.
            </p>
          </div>

          {/* Check-in Keypad */}
          <div className="card">
            <div className="panel">
              <div style={{ width: "100%" }}>
                <div className="kpad">
                  <span>1</span>
                  <span>2</span>
                  <span>3</span>
                  <span>4</span>
                  <span>5</span>
                  <span>6</span>
                  <span>7</span>
                  <span>8</span>
                  <span>9</span>
                </div>
              </div>
            </div>
            <h3>Check-in in seconds</h3>
            <p>
              Students scan a QR code or tap a 4-digit PIN at the kiosk. No
              clipboard, no line at the door.
            </p>
          </div>

          {/* Parent Notifications */}
          <div className="card">
            <div className="panel">
              <div>
                <div className="bub">
                  Emma checked in at 3:36 PM.
                  <div className="meta">Presently &middot; Kumon of Carmel</div>
                </div>
                <div className="bub" style={{ marginLeft: 26 }}>
                  Emma checked out at 4:41 PM.
                  <div className="meta">Presently &middot; Kumon of Carmel</div>
                </div>
              </div>
            </div>
            <h3>Parents hear it instantly</h3>
            <p>
              Automatic texts on arrival and departure — fewer &ldquo;is my
              child there?&rdquo; calls to the front desk.
            </p>
          </div>

          {/* Records */}
          <div className="card">
            <div className="panel">
              <div className="mock">
                <div className="logrow">
                  <span>Date</span>
                  <span>In</span>
                  <span>Out</span>
                  <span>Mode</span>
                </div>
                <div className="logrow">
                  <span>Aug 12</span>
                  <span>3:36 PM</span>
                  <span>4:41 PM</span>
                  <span>QR</span>
                </div>
                <div className="logrow">
                  <span>Aug 10</span>
                  <span>3:31 PM</span>
                  <span>4:29 PM</span>
                  <span>PIN</span>
                </div>
                <div className="logrow">
                  <span>Aug 8</span>
                  <span>3:40 PM</span>
                  <span>4:44 PM</span>
                  <span>QR</span>
                </div>
              </div>
            </div>
            <h3>Records you can trust</h3>
            <p>
              Every check-in logged, searchable, and exportable — two years of
              attendance, ready when you need it.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
