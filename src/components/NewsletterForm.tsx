"use client";

import { useRef } from "react";
import { IconArrowRight } from "@tabler/icons-react";

export default function NewsletterForm() {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubscribe() {
    const input = inputRef.current;
    if (!input) return;
    if (/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(input.value.trim())) {
      input.value = "";
      input.placeholder = "Subscribed \u2713";
    } else {
      input.focus();
    }
  }

  return (
    <div className="nform">
      <input
        ref={inputRef}
        className="nin"
        placeholder="Enter your work email"
      />
      <button className="nbtn" onClick={handleSubscribe} aria-label="Subscribe">
        <IconArrowRight size={16} />
      </button>
    </div>
  );
}
