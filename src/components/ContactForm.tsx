"use client";

import { useState } from "react";
import { IconCircleCheck } from "@tabler/icons-react";

export default function ContactForm() {
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit() {
    const name = (
      document.getElementById("f-name") as HTMLInputElement
    ).value.trim();
    const email = (
      document.getElementById("f-email") as HTMLInputElement
    ).value.trim();
    const newErrors: { name?: string; email?: string } = {};

    if (!name) newErrors.name = "Enter your name";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
      newErrors.email = "Enter a valid email";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setSubmitted(true);
    (document.getElementById("f-name") as HTMLInputElement).value = "";
    (document.getElementById("f-email") as HTMLInputElement).value = "";
    (document.getElementById("f-center") as HTMLInputElement).value = "";
    (document.getElementById("f-msg") as HTMLTextAreaElement).value = "";
  }

  function clearError(field: "name" | "email") {
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  return (
    <div className="form-card">
      <div className="form-two">
        <div>
          <input
            className="in"
            id="f-name"
            placeholder="Your name"
            onInput={() => clearError("name")}
          />
          {errors.name && <div className="field-error">{errors.name}</div>}
        </div>
        <div>
          <input
            className="in"
            id="f-email"
            placeholder="you@center.com"
            onInput={() => clearError("email")}
          />
          {errors.email && <div className="field-error">{errors.email}</div>}
        </div>
      </div>
      <input className="in" id="f-center" placeholder="Center name" />
      <textarea
        className="in"
        id="f-msg"
        placeholder="Tell us about your center"
      />
      <button className="btn" onClick={handleSubmit}>
        Request a demo
      </button>
      {submitted && (
        <p className="form-success">
          <IconCircleCheck size={16} />
          Thanks — we&rsquo;ll be in touch shortly.
        </p>
      )}
    </div>
  );
}
