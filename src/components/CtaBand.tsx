import { IconRocket } from "@tabler/icons-react";
import ScrollButton from "./ScrollButton";

export default function CtaBand() {
  return (
    <section style={{ padding: "88px 0" }}>
      <div className="container-w">
        <div className="band">
          <div>
            <span className="pill">
              <IconRocket size={13} />
              Start now
            </span>
            <h2>See, understand, and trust your busy hour.</h2>
            <p>
              Presently runs the front desk so your staff can run the center. See
              it live at your center — it takes fifteen minutes.
            </p>
            <ScrollButton targetId="contact" className="btn-w">
              Book a demo
            </ScrollButton>
          </div>

          <div className="mock" aria-hidden="true">
            <div className="mh">
              <span className="t">Kumon of Carmel</span>
              <span className="lv">● Live &middot; 3:42 PM</span>
            </div>
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
            <div className="mrow">
              <div>
                <div className="nm">Noah Kim</div>
                <div className="su">Math</div>
              </div>
              <span className="tm">06:18</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
