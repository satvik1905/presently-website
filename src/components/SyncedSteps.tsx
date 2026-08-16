"use client";

import { useEffect, useRef, useCallback } from "react";

interface SyncedStepsProps {
  children: React.ReactNode;
  playDuration?: number;
  holdDuration?: number;
  resetDuration?: number;
}

export default function SyncedSteps({
  children,
  playDuration = 3000,
  holdDuration = 2000,
  resetDuration = 600,
}: SyncedStepsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const visibleRef = useRef(false);

  const getSteps = useCallback(() => {
    if (!ref.current) return [];
    return Array.from(ref.current.querySelectorAll<HTMLElement>(".step"));
  }, []);

  const loop = useCallback(() => {
    if (!visibleRef.current) return;
    const steps = getSteps();

    // Add "in" to all steps at once
    steps.forEach((s) => s.classList.add("in"));

    timerRef.current = setTimeout(() => {
      // Remove "in" from all steps at once
      steps.forEach((s) => {
        s.classList.remove("in");
        void s.offsetWidth; // force reflow per element
      });

      timerRef.current = setTimeout(() => {
        if (visibleRef.current) loop();
      }, resetDuration);
    }, playDuration + holdDuration);
  }, [playDuration, holdDuration, resetDuration, getSteps]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !visibleRef.current) {
            visibleRef.current = true;
            loop();
          } else if (!e.isIntersecting) {
            visibleRef.current = false;
            if (timerRef.current) clearTimeout(timerRef.current);
            getSteps().forEach((s) => s.classList.remove("in"));
          }
        });
      },
      { threshold: 0.1 }
    );

    obs.observe(el);
    return () => {
      obs.disconnect();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [loop, getSteps]);

  return (
    <div ref={ref} className="steps">
      {children}
    </div>
  );
}
