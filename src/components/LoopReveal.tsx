"use client";

import { useEffect, useRef, useCallback } from "react";

interface LoopRevealProps {
  children: React.ReactNode;
  className?: string;
  /** How long the animation sequence runs before holding (ms) */
  playDuration?: number;
  /** How long to hold the finished state before resetting (ms) */
  holdDuration?: number;
  /** How long to stay in the reset state before replaying (ms) */
  resetDuration?: number;
}

export default function LoopReveal({
  children,
  className,
  playDuration = 3000,
  holdDuration = 2000,
  resetDuration = 600,
}: LoopRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const visibleRef = useRef(false);

  const loop = useCallback(() => {
    const el = ref.current;
    if (!el || !visibleRef.current) return;

    // Play: add "in" class
    el.classList.add("in");

    timerRef.current = setTimeout(() => {
      // After play + hold, remove "in" to reset
      el.classList.remove("in");
      // Force reflow so animations re-trigger on next add
      void el.offsetWidth;

      timerRef.current = setTimeout(() => {
        if (visibleRef.current) loop();
      }, resetDuration);
    }, playDuration + holdDuration);
  }, [playDuration, holdDuration, resetDuration]);

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
            el.classList.remove("in");
          }
        });
      },
      { threshold: 0.15 }
    );

    obs.observe(el);
    return () => {
      obs.disconnect();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [loop]);

  return (
    <div ref={ref} className={className ?? ""}>
      {children}
    </div>
  );
}
