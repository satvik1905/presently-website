"use client";

import { useState } from "react";

const red = { color: "#DC2626" } as const;

export default function CtaForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    emailUser: "",
    centerName: "",
    phone: "",
  });

  const filled =
    form.firstName.trim() &&
    form.lastName.trim() &&
    form.emailUser.trim() &&
    form.centerName.trim() &&
    form.phone.trim();

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
        <p>Tell us a little about your center and we&rsquo;ll be in touch.</p>
      </div>

      {/* Name row */}
      <div className="cta-field">
        <div className="cta-form-row">
          <div>
            <label className="cta-label">Instructor first name <span style={red}>*</span></label>
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
            <label className="cta-label">Instructor last name <span style={red}>*</span></label>
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

      {/* Email */}
      <div className="cta-field">
        <label className="cta-label">Center email <span style={red}>*</span></label>
        <div style={{ display: "flex", alignItems: "stretch" }}>
          <input
            type="text"
            className="cta-input"
            style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0, borderRight: "none" }}
            placeholder="maya"
            required
            value={form.emailUser}
            onChange={(e) => update("emailUser", e.target.value)}
          />
          <span
            className="cta-input"
            style={{
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              background: "var(--color-bg)",
              color: "var(--color-muted)",
              whiteSpace: "nowrap",
              userSelect: "none",
              display: "flex",
              alignItems: "center",
              width: "auto",
              flexShrink: 0,
            }}
          >
            @ikumon.com
          </span>
        </div>
      </div>

      {/* Center name */}
      <div className="cta-field">
        <label className="cta-label">Center name <span style={red}>*</span></label>
        <input
          type="text"
          placeholder="Kumon Carmel"
          required
          value={form.centerName}
          onChange={(e) => update("centerName", e.target.value)}
          className="cta-input"
        />
      </div>

      {/* Phone */}
      <div className="cta-field">
        <label className="cta-label">Phone number <span style={red}>*</span></label>
        <input
          type="tel"
          placeholder="(555) 123-4567"
          required
          value={form.phone}
          onChange={(e) => update("phone", e.target.value)}
          className="cta-input"
        />
      </div>

      <button type="submit" className="btn btn-primary cta-submit" disabled={!filled}>
        Request a demo
      </button>
      <p className="cta-fine">See it in action. Then try Presently free for 7 days.</p>
    </form>
  );
}
