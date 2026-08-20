"use client";

import { useState } from "react";

export default function CtaForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    centerName: "",
    students: "1",
    notes: "",
  });

  const filled =
    form.firstName.trim() &&
    form.lastName.trim() &&
    form.email.trim() &&
    form.centerName.trim();

  function update(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <form
      className="cta-form"
      onSubmit={(e) => {
        e.preventDefault();
        if (!filled) return;
      }}
    >
      <div className="cta-form-header">
        <h3>Request a demo</h3>
        <p>We&rsquo;ll reach out within one business day.</p>
      </div>

      <div className="cta-field">
        <div className="cta-form-row">
          <div>
            <label className="cta-label">Instructor&rsquo;s first name <span style={{ color: "#DC2626" }}>*</span></label>
            <input
              type="text"
              placeholder="Maya"
              required
              value={form.firstName}
              onChange={(e) => update("firstName", e.target.value)}
              className="cta-input"
            />
          </div>
          <div>
            <label className="cta-label">Instructor&rsquo;s last name <span style={{ color: "#DC2626" }}>*</span></label>
            <input
              type="text"
              placeholder="Rodriguez"
              required
              value={form.lastName}
              onChange={(e) => update("lastName", e.target.value)}
              className="cta-input"
            />
          </div>
        </div>
      </div>

      <div className="cta-field">
        <label className="cta-label">Work email <span style={{ color: "#DC2626" }}>*</span></label>
        <input
          type="email"
          placeholder="maya@kumoncarmel.com"
          required
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          className="cta-input"
        />
      </div>

      <div className="cta-field">
        <label className="cta-label">Center name <span style={{ color: "#DC2626" }}>*</span></label>
        <input
          type="text"
          placeholder="Kumon Carmel"
          required
          value={form.centerName}
          onChange={(e) => update("centerName", e.target.value)}
          className="cta-input"
        />
      </div>

      <div className="cta-field">
        <label className="cta-label">How many centers do you operate? <span style={{ color: "#DC2626" }}>*</span></label>
        <select
          className="cta-input cta-select"
          value={form.students}
          onChange={(e) => update("students", e.target.value)}
        >
          <option>1</option>
          <option>2+</option>
        </select>
      </div>

      <div className="cta-field">
        <label className="cta-label">Anything specific you&rsquo;d like to see?</label>
        <textarea
          className="cta-input cta-textarea"
          placeholder="e.g. How parent texting works, multi-center setup..."
          value={form.notes}
          onChange={(e) => update("notes", e.target.value)}
        />
      </div>

      <button type="submit" className="btn btn-primary cta-submit" disabled={!filled}>
        Request a demo
      </button>
      <p className="cta-fine">No credit card. No 14-day trial clock.</p>
    </form>
  );
}
