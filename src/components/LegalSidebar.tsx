"use client";

import { useState, useEffect, useRef } from "react";

interface Section {
  id: string;
  title: string;
  number: number;
}

export default function LegalSidebar({ sections }: { sections: Section[] }) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");
  const clickedRef = useRef(false);

  useEffect(() => {
    const map = new Map<string, IntersectionObserverEntry>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => map.set(entry.target.id, entry));
        if (clickedRef.current) return;
        const first = sections.find((s) => map.get(s.id)?.isIntersecting);
        if (first) setActiveId(first.id);
      },
      { rootMargin: "-96px 0px -60% 0px" },
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;

    setActiveId(id);
    clickedRef.current = true;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    el.scrollIntoView({ behavior: reduced ? "instant" : "smooth" });
    history.replaceState(null, "", `#${id}`);

    setTimeout(
      () => {
        clickedRef.current = false;
      },
      reduced ? 50 : 800,
    );
  }

  return (
    <nav
      aria-label="Table of contents"
      className="sticky top-[88px] max-h-[calc(100vh-88px)] overflow-y-auto"
    >
      <ul className="space-y-0.5">
        {sections.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              onClick={(e) => handleClick(e, s.id)}
              className={`block py-1.5 pl-3 border-l-2 text-[14px] leading-snug transition-colors ${
                activeId === s.id
                  ? "border-[#2563EB] text-[#2563EB] font-medium"
                  : "border-transparent text-slate-700 hover:text-slate-900"
              }`}
            >
              {s.number}. {s.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
