"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useStepActive } from "@/lib/step-context";

const springTight = [0.34, 1.2, 0.64, 1] as const;

function fmt(s: number) {
  const m = Math.floor(s / 60);
  const r = s % 60;
  return String(m).padStart(2, "0") + ":" + String(r).padStart(2, "0");
}

const SOFIA_START = 1204;
const JONAH_START = 1798;
const JONAH_LIMIT = 1800;

export default function VigBoard() {
  const active = useStepActive();
  const v = active ? "visible" : "hidden";
  const [sofiaTime, setSofiaTime] = useState(SOFIA_START);
  const [jonahTime, setJonahTime] = useState(JONAH_START);
  const [jonahOver, setJonahOver] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

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

  useEffect(() => {
    if (active) {
      startTimer();
    } else {
      stopTimer();
    }
    return stopTimer;
  }, [active, startTimer, stopTimer]);

  return (
    <div
      className="relative h-[196px] overflow-hidden rounded-2xl border border-[#DCE5F5] mb-[22px] pt-3.5 px-3"
      style={{
        background:
          "linear-gradient(135deg, #EEF3FE 0%, #E0EAFF 50%, #D6E2FF 100%)",
      }}
      aria-hidden="true"
    >
      {/* Room header */}
      <motion.div
        className="flex justify-between items-baseline text-[12px] tracking-[0.08em] uppercase text-[#5B6472] font-medium mb-2 px-0.5"
        initial="hidden"
        animate={v}
        variants={{
          hidden: { opacity: 0, y: 6 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{
          y: { duration: 0.45, delay: 0.1, ease: "easeOut" },
          opacity: { duration: 0.4, delay: 0.1, ease: "easeOut" },
        }}
      >
        <span>Main Room</span>
        <span className="tracking-normal tabular-nums">2</span>
      </motion.div>

      {/* Sofia card */}
      <motion.div
        className="flex justify-between items-center p-[9px_10px] rounded-lg bg-white border border-[#E7E5DF] text-[14px]"
        initial="hidden"
        animate={v}
        variants={{
          hidden: { opacity: 0, x: -14 },
          visible: { opacity: 1, x: 0 },
        }}
        transition={{
          x: {
            duration: 0.55,
            delay: 0.35,
            ease: springTight,
          },
          opacity: { duration: 0.4, delay: 0.35, ease: "easeOut" },
        }}
      >
        <span>
          <span className="font-medium block">Sofia L.</span>
          <span className="text-[12px] text-[#5B6472] block">
            Math &amp; Reading
          </span>
        </span>
        <span className="text-[13px] text-[#5B6472] tabular-nums">
          {fmt(sofiaTime)}
        </span>
      </motion.div>

      {/* Jonah card */}
      <motion.div
        className={`flex justify-between items-center p-[9px_10px] rounded-lg border text-[14px] mt-1.5 transition-colors duration-500 ${
          jonahOver
            ? "bg-[#FDF3E3] border-[#F1D9AC]"
            : "bg-white border-[#E7E5DF]"
        }`}
        initial="hidden"
        animate={v}
        variants={{
          hidden: { opacity: 0, x: -14 },
          visible: { opacity: 1, x: 0 },
        }}
        transition={{
          x: {
            duration: 0.55,
            delay: 0.55,
            ease: springTight,
          },
          opacity: { duration: 0.4, delay: 0.55, ease: "easeOut" },
        }}
      >
        <span>
          <span className="font-medium block">Jonah K.</span>
          <span
            className={`text-[12px] block ${jonahOver ? "text-[#B45309]" : "text-[#5B6472]"}`}
          >
            {jonahOver ? "Over limit - time to dismiss" : "Math · 30 min limit"}
          </span>
        </span>
        <span
          className={`text-[13px] tabular-nums ${jonahOver ? "text-[#B45309] font-medium" : "text-[#5B6472]"}`}
        >
          {fmt(jonahTime)}
        </span>
      </motion.div>
    </div>
  );
}
