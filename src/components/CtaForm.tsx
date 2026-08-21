"use client";

import { useState } from "react";
import { Button } from "./Button";
import TextField from "./ui/TextField";
import EmailField from "./ui/EmailField";

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
      <div className="flex flex-col w-full items-center justify-center text-center min-h-[280px]">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="mb-4">
          <circle cx="12" cy="12" r="12" fill="#16A34A" />
          <polyline points="7.5 12.5 10.5 15.5 16.5 9.5" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <h3 className="text-[20px] font-semibold mb-1.5">Demo requested!</h3>
        <p className="text-[15px] text-[#5B6472] max-w-[32ch]">
          We&rsquo;ll be in touch within 24 hours to schedule your walkthrough.
        </p>
      </div>
    );
  }

  return (
    <form className="flex flex-col w-full" onSubmit={handleSubmit}>
      <div className="mb-6">
        <h3 className="text-[20px] font-semibold tracking-[-0.01em] mb-1">Request a demo</h3>
        <p className="text-sm text-[#5B6472]">Tell us a little about your center and we&rsquo;ll be in touch.</p>
      </div>

      <div className="mb-4">
        <div className="grid grid-cols-2 gap-3.5 max-md:grid-cols-1">
          <TextField
            label="Instructor first name"
            placeholder="Maya"
            required
            value={form.firstName}
            onChange={(v) => update("firstName", v)}
            className="!mb-0"
          />
          <TextField
            label="Instructor last name"
            placeholder="Rodriguez"
            required
            value={form.lastName}
            onChange={(v) => update("lastName", v)}
            className="!mb-0"
          />
        </div>
      </div>

      <EmailField
        label="Center email"
        username={form.emailUser}
        onUsernameChange={(v) => update("emailUser", v)}
        domain="@ikumon.com"
        required
      />

      <TextField
        label="Center name"
        placeholder="Kumon Carmel"
        required
        value={form.centerName}
        onChange={(v) => update("centerName", v)}
      />

      <TextField
        label="Phone number"
        placeholder="(555) 123-4567"
        type="tel"
        required
        value={form.phone}
        onChange={(v) => update("phone", v)}
      />

      {error && (
        <p className="text-[13.5px] text-[#DC2626] mb-2">{error}</p>
      )}

      <Button type="submit" fullWidth className="mt-1 font-semibold py-3.5" disabled={!filled || submitting}>
        {submitting ? "Sending..." : "Request a demo"}
      </Button>
      <p className="text-center text-[13px] text-[#5B6472] mt-3">See it in action. Then try Presently free for 7 days.</p>
    </form>
  );
}
