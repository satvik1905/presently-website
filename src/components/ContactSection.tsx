import { IconCalendarEvent, IconMail } from "@tabler/icons-react";
import ContactForm from "./ContactForm";

export default function ContactSection() {
  return (
    <section id="contact" style={{ padding: "20px 0 88px" }}>
      <div className="container-w contact-grid">
        <div>
          <span className="pill">
            <IconCalendarEvent size={13} />
            Get started
          </span>
          <h2>See Presently at your center.</h2>
          <p className="sub">
            Tell us about your center and we&rsquo;ll set up a quick demo — no
            commitment.
          </p>
          <p className="mail-link">
            <IconMail size={16} />
            hello@presently.app
          </p>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
