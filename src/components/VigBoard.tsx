"use client";

import { useEffect, useRef, useState, useCallback } from "react";

function fmt(s: number) {
  const m = Math.floor(s / 60);
  const r = s % 60;
  return String(m).padStart(2, "0") + ":" + String(r).padStart(2, "0");
}

const SOFIA_START = 1204;
const JONAH_START = 1798;
const JONAH_LIMIT = 1800;

export default function VigBoard() {
  const [sofiaTime, setSofiaTime] = useState(SOFIA_START);
  const [jonahTime, setJonahTime] = useState(JONAH_START);
  const [jonahOver, setJonahOver] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const vigRef = useRef<HTMLDivElement>(null);

  const startTimer = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setSofiaTime(SOFIA_START);
    setJonahTime(JONAH_START);
    setJonahOver(false);
    intervalRef.current = setInterval(() => {
      setSofiaTime((t) => t + 1);
      setJonahTime((t) => {
        const next = t + 1;
        if (next >= JONAH_LIMIT) setJonahOver(true);
        return next;
      });
    }, 1000);
  }, []);

  const stopTimer = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
  }, []);

  // Watch for parent .step toggling "in" class
  useEffect(() => {
    const vig = vigRef.current;
    if (!vig) return;
    const step = vig.closest(".step");
    if (!step) return;

    const obs = new MutationObserver(() => {
      if (step.classList.contains("in")) {
        startTimer();
      } else {
        stopTimer();
      }
    });

    obs.observe(step, { attributes: true, attributeFilter: ["class"] });
    return () => {
      obs.disconnect();
      stopTimer();
    };
  }, [startTimer, stopTimer]);

  return (
    <div ref={vigRef} className="vig vig-board" aria-hidden="true">
      <div className="room-h">
        <span>Main Room</span>
        <span className="n">2</span>
      </div>
      <div className="kid ok">
        <span>
          <span className="name">Sofia L.</span>
          <span className="sub">Math &amp; Reading</span>
        </span>
        <span className="t">{fmt(sofiaTime)}</span>
      </div>
      <div className={`kid ${jonahOver ? "warm" : "ok"}`}>
        <span>
          <span className="name">Jonah K.</span>
          <span className="sub">
            {jonahOver ? "Over limit — time to dismiss" : "Math · 30 min limit"}
          </span>
        </span>
        <span className="t">{fmt(jonahTime)}</span>
      </div>
    </div>
  );
}
