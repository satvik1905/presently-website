"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { MotionConfig } from "framer-motion";
import { StepProvider } from "@/lib/step-context";

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
  const [active, setActive] = useState(false);

  const loop = useCallback(() => {
    if (!visibleRef.current) return;

    setActive(true);

    timerRef.current = setTimeout(() => {
      setActive(false);

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
            setActive(false);
          }
        });
      },
      { threshold: 0.1 },
    );

    obs.observe(el);
    return () => {
      obs.disconnect();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [loop]);

  return (
    <MotionConfig reducedMotion="user">
      <StepProvider value={active}>
        <div
          ref={ref}
          className="grid grid-cols-3 gap-7 mt-12 max-[920px]:grid-cols-1"
        >
          {children}
        </div>
      </StepProvider>
    </MotionConfig>
  );
}
