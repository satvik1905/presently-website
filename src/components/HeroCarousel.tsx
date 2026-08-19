"use client";

import { useState, useEffect } from "react";

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
   Slide 1 — "Here now" live board
   ═══════════════════════════════════════════ */

const boardTimers = [
  { id: "maya", start: 312 },
  { id: "dev", start: 748 },
  { id: "jonah", start: 1918 },
  { id: "sofia", start: 1204 },
  { id: "arjun", start: 522 },
  { id: "ella", start: 96 },
];

function HereNowSlide() {
  const [timers, setTimers] = useState(() =>
    boardTimers.map((t) => ({ ...t, s: t.start }))
  );
  const [clock, setClock] = useState(formatClock);

  useEffect(() => {
    const tid = setInterval(() => {
      setTimers((prev) => prev.map((t) => ({ ...t, s: t.s + 1 })));
    }, 1000);
    const cid = setInterval(() => setClock(formatClock()), 15000);
    return () => {
      clearInterval(tid);
      clearInterval(cid);
    };
  }, []);

  const t = (id: string) => fmt(timers.find((x) => x.id === id)!.s);

  return (
    <div
      className="board carousel-board"
      role="img"
      aria-label="Live dashboard showing students currently checked in"
    >
      <div className="board-top">
        <span className="title">
          <span className="live-pip" aria-hidden="true" />
          Here now
        </span>
        <span className="board-count">14 students</span>
        <span className="clock">{clock}</span>
      </div>
      <div className="rooms">
        <div className="room">
          <div className="room-h">
            <span>EL Room</span>
            <span className="n">7</span>
          </div>
          <div className="kid ok">
            <span>
              <span className="name">Maya R.</span>
              <span className="sub">Math</span>
            </span>
            <span className="t">{t("maya")}</span>
          </div>
          <div className="kid ok">
            <span>
              <span className="name">Dev P.</span>
              <span className="sub">Reading</span>
            </span>
            <span className="t">{t("dev")}</span>
          </div>
          <div className="kid warm">
            <span>
              <span className="name">Jonah K.</span>
              <span className="sub">Over limit · 30 min</span>
            </span>
            <span className="t">{t("jonah")}</span>
          </div>
        </div>
        <div className="room">
          <div className="room-h">
            <span>Main Room</span>
            <span className="n">7</span>
          </div>
          <div className="kid ok">
            <span>
              <span className="name">Sofia L.</span>
              <span className="sub">Math &amp; Reading</span>
            </span>
            <span className="t">{t("sofia")}</span>
          </div>
          <div className="kid ok">
            <span>
              <span className="name">Arjun M.</span>
              <span className="sub">Math</span>
            </span>
            <span className="t">{t("arjun")}</span>
          </div>
          <div className="kid ok">
            <span>
              <span className="name">Ella T.</span>
              <span className="sub">Reading</span>
            </span>
            <span className="t">{t("ella")}</span>
          </div>
        </div>
      </div>
      <div className="board-foot">
        <span className="msg">
          <span className="ic" aria-hidden="true">
            ✓
          </span>
          Maya&rsquo;s mom was texted at check-in
        </span>
        <span
          style={{ fontSize: "12.5px", fontVariantNumeric: "tabular-nums" }}
        >
          1 over limit
        </span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Slide 2 — "Time to dismiss" animated demo
   ═══════════════════════════════════════════ */

type DismissPhase = "card" | "table" | "focus" | "slideout" | "confirmed";

const DISMISS_TIMERS = [346, 706, 226]; // Will, Demi, Cyrus

function DismissSlide({ isActive }: { isActive: boolean }) {
  const [phase, setPhase] = useState<DismissPhase>("card");
  const [timers, setTimers] = useState(DISMISS_TIMERS);
  const [checkoutTime, setCheckoutTime] = useState(formatClock);

  // Phase sequencer — auto-plays when slide becomes active
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

  // Tick elapsed timers while table is visible
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

  return (
    <div className="dismiss-slide">
      <div className="dismiss-inner" data-phase={phase}>
        {/* ── Card layer (Beat 1) ── */}
        <div className="dismiss-layer dismiss-card-layer">
          <div className="dismiss-card-head">
            <span className="dismiss-card-title">Time to dismiss</span>
            <span className="dismiss-bell" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
                <path
                  d="M10 2a5 5 0 0 0-5 5v3l-1.3 2.6a.75.75 0 0 0 .67 1.08h11.26a.75.75 0 0 0 .67-1.08L15 10V7a5 5 0 0 0-5-5ZM8.5 15a1.5 1.5 0 0 0 3 0"
                  fill="#DC2626"
                />
              </svg>
            </span>
          </div>
          <div className="dismiss-card-body">
            <div className="dismiss-stat">11</div>
            <div className="dismiss-stat-label">
              students over their time limit
            </div>
            <span className="dismiss-view-link">View students →</span>
          </div>
        </div>

        {/* ── Table layer (Beats 2–5) ── */}
        <div className="dismiss-layer dismiss-table-layer">
          <div className="dismiss-table-head">
            <span className="dismiss-back-label">← Back</span>
            <span className="dismiss-table-title">Over limit</span>
            <span className="dismiss-table-count">{count}/11</span>
          </div>
          <div className="dismiss-table-divider" />
          <div className="dismiss-table-body">
            {/* Will */}
            <div className="dismiss-row">
              <div className="dismiss-row-info">
                <span className="dismiss-row-name">Will Thompson</span>
                <span className="dismiss-row-sub">
                  Math &amp; Reading · PI
                </span>
              </div>
              <span className="dismiss-row-time">{fmtNeg(timers[0])}</span>
              <span className="dismiss-checkout-btn">Check out</span>
            </div>

            {/* Demi or confirmation */}
            {phase === "confirmed" ? (
              <div className="dismiss-confirmed">
                <span
                  className="dismiss-confirmed-icon"
                  aria-hidden="true"
                >
                  ✓
                </span>
                <div className="dismiss-confirmed-text">
                  <span className="dismiss-confirmed-name">
                    Demi Vasquez checked out
                  </span>
                  <span className="dismiss-confirmed-sub">
                    Parent notified at {checkoutTime}
                  </span>
                </div>
              </div>
            ) : (
              <div className="dismiss-row dismiss-row-urgent">
                <div className="dismiss-row-info">
                  <span className="dismiss-row-name">Demi Vasquez</span>
                  <span className="dismiss-row-sub">Math · Main</span>
                </div>
                <span className="dismiss-row-time">{fmtNeg(timers[1])}</span>
                <span className="dismiss-checkout-btn dismiss-checkout-urgent">
                  Check out
                </span>
              </div>
            )}

            {/* Cyrus */}
            <div className="dismiss-row">
              <div className="dismiss-row-info">
                <span className="dismiss-row-name">Cyrus Rashid</span>
                <span className="dismiss-row-sub">
                  Math &amp; Reading · Main
                </span>
              </div>
              <span className="dismiss-row-time">{fmtNeg(timers[2])}</span>
              <span className="dismiss-checkout-btn">Check out</span>
            </div>
          </div>
        </div>
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
const CHART_H = 200; // px height of the chart area
const labelDays = [1, 4, 7, 10, 13, 16, 19];

function AttendanceSlide({ isActive }: { isActive: boolean }) {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (isActive) {
      // Small delay so the slide is visible before bars animate
      const id = requestAnimationFrame(() => setAnimated(true));
      return () => cancelAnimationFrame(id);
    }
    setAnimated(false);
  }, [isActive]);

  return (
    <div className="chart-slide">
      <div className="chart-head">
        <span className="chart-title">Daily attendance per room</span>
        <span className="chart-period">This month</span>
      </div>
      <div className="chart-body">
        {/* Y-axis */}
        <div className="chart-y">
          {[20, 15, 10, 5, 0].map((v) => (
            <span key={v} className="chart-y-label">
              {v}
            </span>
          ))}
        </div>
        {/* Grid + bars */}
        <div className="chart-area">
          {/* Horizontal grid lines */}
          <div className="chart-gridlines">
            {[20, 15, 10, 5, 0].map((v) => (
              <div
                key={v}
                className="chart-gridline"
                style={{ bottom: `${(v / CHART_MAX) * 100}%` }}
              />
            ))}
          </div>
          {/* Bars */}
          <div className="chart-bars">
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
                  className={`chart-bar-group${animated ? " chart-bar-animated" : ""}`}
                  style={
                    {
                      "--bar-delay": `${i * 50}ms`,
                      "--bar-total": `${(total / CHART_MAX) * CHART_H}px`,
                    } as React.CSSProperties
                  }
                >
                  <div className="chart-bar-stack">
                    {segments.map(
                      (seg) =>
                        seg.val > 0 && (
                          <div
                            key={seg.key}
                            className="chart-bar-segment"
                            style={{
                              height: `${(seg.val / CHART_MAX) * CHART_H}px`,
                              background: seg.color,
                            }}
                          />
                        )
                    )}
                  </div>
                  {labelDays.includes(d.day) && (
                    <span className="chart-x-label">
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
      <div className="chart-legend">
        {[
          { label: "EL", color: "#3B82F6" },
          { label: "General", color: "#6B7280" },
          { label: "Main", color: "#8B5CF6" },
          { label: "PI", color: "#F97316" },
        ].map((l) => (
          <span key={l.label} className="chart-legend-item">
            <span
              className="chart-legend-dot"
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

  // Auto-advance
  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % 3);
    }, 6000);
    return () => clearInterval(id);
  }, [isPaused]);

  return (
    <div
      className="carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="carousel-track"
        style={{
          transform: `translateX(-${(activeSlide * 100) / 3}%)`,
        }}
      >
        <div className="carousel-slide">
          <HereNowSlide />
        </div>
        <div className="carousel-slide">
          <DismissSlide isActive={activeSlide === 1} />
        </div>
        <div className="carousel-slide">
          <AttendanceSlide isActive={activeSlide === 2} />
        </div>
      </div>
      <div className="carousel-dots" role="tablist" aria-label="Slide controls">
        {[0, 1, 2].map((i) => (
          <button
            key={i}
            className={`carousel-dot${activeSlide === i ? " active" : ""}`}
            onClick={() => setActiveSlide(i)}
            role="tab"
            aria-selected={activeSlide === i}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
