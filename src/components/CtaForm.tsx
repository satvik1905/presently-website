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
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const filled =
    form.firstName.trim() &&
    form.lastName.trim() &&
    form.emailUser.trim() &&
    form.centerName.trim() &&
    form.phone.trim();

  function update(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!filled) return;

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          email: `${form.emailUser.trim()}@ikumon.com`,
          centerName: form.centerName.trim(),
          phone: form.phone.trim(),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong.");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="cta-form" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", minHeight: 280 }}>
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" style={{ marginBottom: 16 }}>
          <circle cx="12" cy="12" r="12" fill="#16A34A" />
          <polyline points="7.5 12.5 10.5 15.5 16.5 9.5" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 6 }}>Demo requested!</h3>
        <p style={{ fontSize: 15, color: "var(--color-muted)", maxWidth: "32ch" }}>
          We&rsquo;ll be in touch within 24 hours to schedule your walkthrough.
        </p>
      </div>
    );
  }

  return (
    <form className="cta-form" onSubmit={handleSubmit}>
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

      {error && (
        <p style={{ fontSize: 13.5, color: "#DC2626", marginBottom: 8 }}>{error}</p>
      )}

      <button type="submit" className="btn btn-primary cta-submit" disabled={!filled || submitting}>
        {submitting ? "Sending..." : "Request a demo"}
      </button>
      <p className="cta-fine">See it in action. Then try Presently free for 7 days.</p>
    </form>
  );
}
