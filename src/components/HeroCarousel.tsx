"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";

/* ── Helpers ── */

function fmt(s: number) {
  const m = Math.floor(s / 60);
  const r = s % 60;
  return String(m).padStart(2, "0") + ":" + String(r).padStart(2, "0");
}

function formatClock() {
  const d = new Date();
  let h = d.getHours();
  const m = d.getMinutes();
  const ap = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return h + ":" + String(m).padStart(2, "0") + " " + ap;
}

/* ═══════════════════════════════════════════
   Slide 1 — "Here now" student cards
   ═══════════════════════════════════════════ */

const students = [
  { id: "maya", name: "Maya R.", initial: "M", subject: "Math", start: 347, limit: 30, checkin: "12:41 PM" },
  { id: "dev", name: "Dev P.", initial: "D", subject: "Reading", start: 783, limit: 30, checkin: "12:34 PM" },
  { id: "sofia", name: "Sofia L.", initial: "S", subject: "Math & Reading", start: 1239, limit: 60, checkin: "12:17 PM" },
  { id: "jonah", name: "Jonah K.", initial: "J", subject: "Math", start: 1953, limit: 30, checkin: "11:55 AM" },
];

function avatarColors(subject: string) {
  if (subject === "Reading") return { bg: "#DCFCE7", color: "#16A34A" };
  return { bg: "#DBEAFE", color: "#6366F1" };
}

function HereNowSlide() {
  const [elapsed, setElapsed] = useState(() => students.map((s) => s.start));
  const [clock, setClock] = useState("");

  useEffect(() => {
    setClock(formatClock());
    const tid = setInterval(() => {
      setElapsed((prev) => prev.map((t) => t + 1));
    }, 1000);
    const cid = setInterval(() => setClock(formatClock()), 15000);
    return () => {
      clearInterval(tid);
      clearInterval(cid);
    };
  }, []);

  return (
    <div
      className="flex flex-col h-full"
      role="img"
      aria-label="Live dashboard showing students currently checked in"
    >
      <div className="flex items-center justify-between px-[18px] py-3.5 border-b border-[#E7E5DF]">
        <span className="font-semibold text-[14.5px] flex items-center gap-2">
          <motion.span
            className="w-2 h-2 rounded-full bg-[#16A34A]"
            aria-hidden="true"
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(22,163,74,.35)",
                "0 0 0 6px rgba(22,163,74,0)",
                "0 0 0 0 rgba(22,163,74,.35)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          PI Room — 14 students
        </span>
        <span className="text-[13px] text-[#5B6472] tabular-nums">{clock}</span>
      </div>
      <div className="flex flex-col gap-2 p-[14px_16px_16px]">
        {students.map((s, i) => {
          const over = elapsed[i] >= s.limit * 60;
          const av = avatarColors(s.subject);
          return (
            <div
              key={s.id}
              className={`flex items-center gap-3 px-4 py-3 bg-white border rounded-xl ${
                over ? "border-l-[3px] border-l-[#FCA5A5] border-[#E7E5DF]" : "border-[#E7E5DF]"
              }`}
            >
              <span
                className="w-10 h-10 rounded-full grid place-items-center font-bold text-[16px] shrink-0 leading-none"
                style={{ background: av.bg, color: av.color }}
                aria-hidden="true"
              >
                {s.initial}
              </span>
              <div className="flex-1 min-w-0">
                <span className="text-[15px] font-semibold block">{s.name}</span>
                <span className="text-[13px] text-[#5B6472] block mt-px">
                  {s.subject} · {s.checkin}
                </span>
              </div>
              <div className="text-right shrink-0">
                <span
                  className={`text-[15px] tabular-nums font-mono font-medium block ${
                    over ? "text-[#DC2626] font-semibold" : "text-[#5B6472]"
                  }`}
                >
                  {fmt(elapsed[i])}
                </span>
                <span className="text-[12px] text-[#5B6472] block mt-px">
                  {s.limit} m
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Slide 2 — "Time to dismiss" animated demo
   ═══════════════════════════════════════════ */

type DismissPhase = "card" | "table" | "focus" | "slideout" | "confirmed";

const DISMISS_TIMERS = [346, 706, 226];

function DismissSlide({ isActive }: { isActive: boolean }) {
  const [phase, setPhase] = useState<DismissPhase>("card");
  const [timers, setTimers] = useState(DISMISS_TIMERS);
  const [checkoutTime, setCheckoutTime] = useState(formatClock);

  useEffect(() => {
    if (!isActive) {
      setPhase("card");
      setTimers(DISMISS_TIMERS);
      return;
    }
    const ids = [
      setTimeout(() => setPhase("table"), 1500),
      setTimeout(() => setPhase("focus"), 3500),
      setTimeout(() => setPhase("slideout"), 3850),
      setTimeout(() => {
        setCheckoutTime(formatClock());
        setPhase("confirmed");
      }, 4200),
    ];
    return () => ids.forEach(clearTimeout);
  }, [isActive]);

  const tableVisible = phase !== "card";
  useEffect(() => {
    if (!tableVisible) return;
    const id = setInterval(() => {
      setTimers((prev) => prev.map((t) => t + 1));
    }, 1000);
    return () => clearInterval(id);
  }, [tableVisible]);

  const fmtNeg = (s: number) => "-" + fmt(s);
  const count = phase === "confirmed" ? 2 : 3;

  const bellShakeKeyframes = [
    0, -15, 15, -10, 10, 0, 0, 0, -15, 15, -10, 10, 0, 0,
  ];

  return (
    <div className="p-4 h-full flex bg-[#FAFAF7]">
      <div className="relative flex-1 bg-white border border-[#E7E5DF] rounded-xl shadow-[0_1px_3px_rgba(16,24,40,.04)] overflow-hidden">
        {/* Card layer (Beat 1) */}
        <motion.div
          className="absolute inset-0 flex flex-col p-[28px_24px_24px]"
          animate={{
            opacity: phase === "card" ? 1 : 0,
            y: phase === "card" ? 0 : 10,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{
            zIndex: phase === "card" ? 1 : 0,
            pointerEvents: phase === "card" ? "auto" : "none",
          }}
        >
          <div className="flex items-center justify-between w-full">
            <span className="font-bold text-[18px] tracking-[-0.01em]">
              Time to dismiss
            </span>
            {phase === "card" && (
              <motion.span
                aria-hidden="true"
                animate={{ rotate: bellShakeKeyframes }}
                transition={{
                  duration: 1.6,
                  ease: "easeInOut",
                  times: [
                    0, 0.06, 0.12, 0.18, 0.24, 0.3, 0.375, 0.625, 0.68,
                    0.74, 0.8, 0.86, 0.92, 1,
                  ],
                }}
                style={{ display: "flex", transformOrigin: "top center" }}
              >
                <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M10 2a5 5 0 0 0-5 5v3l-1.3 2.6a.75.75 0 0 0 .67 1.08h11.26a.75.75 0 0 0 .67-1.08L15 10V7a5 5 0 0 0-5-5ZM8.5 15a1.5 1.5 0 0 0 3 0"
                    fill="#DC2626"
                  />
                </svg>
              </motion.span>
            )}
          </div>
          <div className="flex flex-col items-center justify-center flex-1 text-center">
            <div className="text-[56px] font-bold text-[#DC2626] tracking-[-0.03em] leading-none mt-4 mb-2 tabular-nums">
              11
            </div>
            <div className="text-[14px] text-[#5B6472] mb-6">
              students over their time limit
            </div>
            {phase === "card" && (
              <motion.span
                className="text-[14px] font-semibold text-[#2563EB]"
                animate={{ opacity: [1, 0.6, 1] }}
                transition={{
                  duration: 1.5,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
              >
                View students →
              </motion.span>
            )}
          </div>
        </motion.div>

        {/* Table layer (Beats 2–5) */}
        <motion.div
          className="absolute inset-0 flex flex-col"
          animate={{
            opacity: tableVisible ? 1 : 0,
          }}
          transition={{ duration: 0.01 }}
          style={{
            zIndex: tableVisible ? 1 : 0,
            pointerEvents: tableVisible ? "auto" : "none",
          }}
        >
          {tableVisible && (
            <>
              <motion.div
                className="flex items-center justify-between px-[18px] py-3.5"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <span className="text-[13px] font-medium text-[#5B6472]">
                  ← Back
                </span>
                <span className="font-semibold text-[14.5px]">Over limit</span>
                <span className="text-[13px] text-[#5B6472] tabular-nums font-mono">
                  {count}/11
                </span>
              </motion.div>
              <motion.div
                className="h-px bg-[#E7E5DF]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: 0.2, ease: "easeOut" }}
              />
              <div className="flex-1 py-1.5">
                {/* Will */}
                <motion.div
                  className="flex items-center gap-3 px-[18px] py-3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.5, ease: "easeOut" }}
                >
                  <div className="flex-1 min-w-0">
                    <span className="text-[14px] font-medium block">
                      Will Thompson
                    </span>
                    <span className="text-[12px] text-[#5B6472] block mt-px">
                      Math &amp; Reading · PI
                    </span>
                  </div>
                  <span className="text-[13px] font-semibold text-[#DC2626] tabular-nums font-mono shrink-0">
                    {fmtNeg(timers[0])}
                  </span>
                  <span className="text-[12px] font-medium px-3 py-[5px] rounded-full border border-[#E7E5DF] bg-white text-[#101828] whitespace-nowrap shrink-0">
                    Check out
                  </span>
                </motion.div>

                {/* Demi or confirmation */}
                <AnimatePresence mode="wait">
                  {phase === "confirmed" ? (
                    <motion.div
                      key="confirmed"
                      className="flex items-center gap-2.5 bg-[#EAF7EF] rounded-lg mx-2.5 px-3.5 py-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      <span className="text-[#16A34A] text-[16px] font-bold shrink-0">
                        ✓
                      </span>
                      <div className="flex flex-col">
                        <span className="text-[14px] font-semibold text-[#16A34A]">
                          Demi Vasquez checked out
                        </span>
                        <span className="text-[12px] text-[#16A34A] opacity-80">
                          Parent notified at {checkoutTime}
                        </span>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="demi"
                      className="flex items-center gap-3 px-[18px] py-3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={
                        phase === "slideout"
                          ? { opacity: 0, x: "100%" }
                          : { opacity: 1, x: 0 }
                      }
                      transition={
                        phase === "slideout"
                          ? { duration: 0.35, ease: "easeOut" }
                          : { duration: 0.3, delay: 0.65, ease: "easeOut" }
                      }
                    >
                      <div className="flex-1 min-w-0">
                        <span className="text-[14px] font-medium block">
                          Demi Vasquez
                        </span>
                        <span className="text-[12px] text-[#5B6472] block mt-px">
                          Math · Main
                        </span>
                      </div>
                      <span className="text-[13px] font-semibold text-[#DC2626] tabular-nums font-mono shrink-0">
                        {fmtNeg(timers[1])}
                      </span>
                      <motion.span
                        className="text-[12px] font-medium px-3 py-[5px] rounded-full border border-[#DC2626] bg-[#FEF2F2] text-[#DC2626] whitespace-nowrap shrink-0"
                        animate={
                          phase === "focus"
                            ? {
                                boxShadow: [
                                  "0 0 0 0 rgba(37,99,235,0.5)",
                                  "0 0 0 4px rgba(37,99,235,0.2)",
                                  "0 0 0 0 rgba(37,99,235,0)",
                                ],
                              }
                            : {}
                        }
                        transition={{ duration: 0.35, ease: "easeOut" }}
                      >
                        Check out
                      </motion.span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Cyrus */}
                <motion.div
                  className="flex items-center gap-3 px-[18px] py-3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.8, ease: "easeOut" }}
                >
                  <div className="flex-1 min-w-0">
                    <span className="text-[14px] font-medium block">
                      Cyrus Rashid
                    </span>
                    <span className="text-[12px] text-[#5B6472] block mt-px">
                      Math &amp; Reading · Main
                    </span>
                  </div>
                  <span className="text-[13px] font-semibold text-[#DC2626] tabular-nums font-mono shrink-0">
                    {fmtNeg(timers[2])}
                  </span>
                  <span className="text-[12px] font-medium px-3 py-[5px] rounded-full border border-[#E7E5DF] bg-white text-[#101828] whitespace-nowrap shrink-0">
                    Check out
                  </span>
                </motion.div>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Slide 3 — Daily attendance chart
   ═══════════════════════════════════════════ */

const chartData = [
  { day: 1, el: 3, gen: 1, main: 4, pi: 2 },
  { day: 2, el: 1, gen: 0, main: 2, pi: 0 },
  { day: 3, el: 0, gen: 0, main: 1, pi: 0 },
  { day: 4, el: 5, gen: 2, main: 6, pi: 3 },
  { day: 5, el: 4, gen: 3, main: 5, pi: 4 },
  { day: 6, el: 3, gen: 2, main: 4, pi: 2 },
  { day: 7, el: 5, gen: 2, main: 6, pi: 3 },
  { day: 8, el: 4, gen: 1, main: 4, pi: 2 },
  { day: 9, el: 1, gen: 0, main: 2, pi: 0 },
  { day: 10, el: 0, gen: 0, main: 1, pi: 0 },
  { day: 11, el: 5, gen: 3, main: 5, pi: 4 },
  { day: 12, el: 4, gen: 2, main: 6, pi: 3 },
  { day: 13, el: 5, gen: 3, main: 5, pi: 4 },
  { day: 14, el: 3, gen: 2, main: 4, pi: 2 },
  { day: 15, el: 4, gen: 1, main: 3, pi: 2 },
  { day: 16, el: 1, gen: 0, main: 2, pi: 1 },
  { day: 17, el: 0, gen: 0, main: 1, pi: 0 },
  { day: 18, el: 5, gen: 2, main: 6, pi: 3 },
  { day: 19, el: 4, gen: 3, main: 5, pi: 4 },
];

const CHART_MAX = 20;
const CHART_H = 200;
const labelDays = [1, 4, 7, 10, 13, 16, 19];

function AttendanceSlide({ isActive }: { isActive: boolean }) {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (isActive) {
      const id = requestAnimationFrame(() => setAnimated(true));
      return () => cancelAnimationFrame(id);
    }
    setAnimated(false);
  }, [isActive]);

  return (
    <div className="flex flex-col h-full pb-1">
      <div className="flex items-center justify-between px-[18px] py-3.5 border-b border-[#E7E5DF]">
        <span className="font-semibold text-[14.5px]">
          Daily attendance per room
        </span>
        <span className="text-[12px] text-[#5B6472] border border-[#E7E5DF] rounded-lg px-2.5 py-[3px] font-medium">
          This month
        </span>
      </div>
      <div className="flex-1 flex pr-[18px] pt-[18px] min-h-0">
        {/* Y-axis */}
        <div className="flex flex-col justify-between pb-[22px] pl-[18px] pr-2.5 items-end">
          {[20, 15, 10, 5, 0].map((v) => (
            <span
              key={v}
              className="text-[11px] text-[#5B6472] tabular-nums leading-none"
            >
              {v}
            </span>
          ))}
        </div>
        {/* Grid + bars */}
        <div className="flex-1 relative min-h-[200px]">
          {/* Horizontal grid lines */}
          <div className="absolute inset-0 bottom-[22px]">
            {[20, 15, 10, 5, 0].map((v) => (
              <div
                key={v}
                className="absolute left-0 right-0 h-px bg-[#E7E5DF] opacity-60"
                style={{ bottom: `${(v / CHART_MAX) * 100}%` }}
              />
            ))}
          </div>
          {/* Bars */}
          <div className="absolute inset-0 bottom-[22px] flex items-end gap-0.5 px-0.5">
            {chartData.map((d, i) => {
              const total = d.el + d.gen + d.main + d.pi;
              const segments = [
                { key: "el", val: d.el, color: "#3B82F6" },
                { key: "gen", val: d.gen, color: "#6B7280" },
                { key: "main", val: d.main, color: "#8B5CF6" },
                { key: "pi", val: d.pi, color: "#F97316" },
              ];
              return (
                <div
                  key={d.day}
                  className="flex-1 flex flex-col items-center relative"
                >
                  <motion.div
                    className="flex flex-col-reverse w-[70%] rounded-t-sm overflow-hidden"
                    style={{
                      height: `${(total / CHART_MAX) * CHART_H}px`,
                      transformOrigin: "bottom",
                    }}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: animated ? 1 : 0 }}
                    transition={{
                      duration: 0.8,
                      delay: i * 0.05,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                  >
                    {segments.map(
                      (seg) =>
                        seg.val > 0 && (
                          <div
                            key={seg.key}
                            className="w-full"
                            style={{
                              height: `${(seg.val / CHART_MAX) * CHART_H}px`,
                              background: seg.color,
                            }}
                          />
                        ),
                    )}
                  </motion.div>
                  {labelDays.includes(d.day) && (
                    <span className="absolute -bottom-5 text-[10px] text-[#5B6472] whitespace-nowrap tabular-nums">
                      {d.day === 1 ? "Aug 1" : String(d.day)}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* Legend */}
      <div className="flex justify-center gap-4 px-[18px] py-[12px_18px_10px]">
        {[
          { label: "EL", color: "#3B82F6" },
          { label: "General", color: "#6B7280" },
          { label: "Main", color: "#8B5CF6" },
          { label: "PI", color: "#F97316" },
        ].map((l) => (
          <span
            key={l.label}
            className="flex items-center gap-[5px] text-[12px] text-[#5B6472]"
          >
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ background: l.color }}
            />
            {l.label}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Carousel wrapper
   ═══════════════════════════════════════════ */

export default function HeroCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % 3);
    }, 6000);
    return () => clearInterval(id);
  }, [isPaused]);

  return (
    <MotionConfig reducedMotion="user">
      <div
        className="relative bg-white border border-[#E7E5DF] rounded-[14px] overflow-hidden"
        style={{
          boxShadow:
            "0 24px 48px -24px rgba(16,24,40,.14), 0 2px 6px rgba(16,24,40,.04)",
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <motion.div
          className="flex w-[300%]"
          animate={{ x: `-${(activeSlide * 100) / 3}%` }}
          transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="w-1/3 shrink-0 min-h-0">
            <HereNowSlide />
          </div>
          <div className="w-1/3 shrink-0 min-h-0">
            <DismissSlide isActive={activeSlide === 1} />
          </div>
          <div className="w-1/3 shrink-0 min-h-0">
            <AttendanceSlide isActive={activeSlide === 2} />
          </div>
        </motion.div>
        <div
          className="flex justify-center gap-2 py-3.5 border-t border-[#E7E5DF]"
          role="tablist"
          aria-label="Slide controls"
        >
          {[0, 1, 2].map((i) => (
            <button
              key={i}
              className={`w-2 h-2 rounded-full border-none p-0 cursor-pointer transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] ${
                activeSlide === i ? "bg-[#2563EB]" : "bg-[#E7E5DF]"
              }`}
              onClick={() => setActiveSlide(i)}
              role="tab"
              aria-selected={activeSlide === i}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </MotionConfig>
  );
}
