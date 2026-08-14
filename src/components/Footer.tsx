import { IconClockCheck } from "@tabler/icons-react";
import NewsletterForm from "./NewsletterForm";

export default function Footer() {
  return (
    <footer className="footer-wrap">
      <div className="f-grid">
        <div className="f-brand">
          <div className="logo">
            <IconClockCheck size={22} />
            Presently
          </div>
          <p>
            The student check-in system for Kumon centers — fast check-in, a
            live board, and parents who always know.
          </p>
        </div>
        <div className="f-col">
          <h4>Product</h4>
          <a href="#features">Live board</a>
          <a href="#features">Kiosk check-in</a>
          <a href="#features">Parent texts</a>
          <a href="#features">Attendance records</a>
        </div>
        <div className="f-col">
          <h4>Company</h4>
          <a href="#contact">Contact</a>
          <a href="#contact">Book a demo</a>
          <a href="#how">How it works</a>
        </div>
      </div>

      <div className="f-news">
        <div>
          <div className="news-title">Stay in the loop</div>
          <div className="news-sub">
            Product updates and center tips, occasionally.
          </div>
        </div>
        <NewsletterForm />
      </div>

      <div className="f-base">
        <span>&copy; 2026 Presently. All rights reserved.</span>
        <span>Check-in for learning centers</span>
      </div>
    </footer>
  );
}
