"use client";

import { useEffect, useRef, useState } from "react";

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

const initialTimers = [
  { id: "maya", start: 312 },
  { id: "dev", start: 748 },
  { id: "jonah", start: 1918 },
  { id: "sofia", start: 1204 },
  { id: "arjun", start: 522 },
  { id: "ella", start: 96 },
];

export default function LiveBoard() {
  const [timers, setTimers] = useState(() =>
    initialTimers.map((t) => ({ ...t, s: t.start }))
  );
  const [clock, setClock] = useState(formatClock);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const clockRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimers((prev) => prev.map((t) => ({ ...t, s: t.s + 1 })));
    }, 1000);
    clockRef.current = setInterval(() => {
      setClock(formatClock());
    }, 15000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (clockRef.current) clearInterval(clockRef.current);
    };
  }, []);

  const t = (id: string) => fmt(timers.find((x) => x.id === id)!.s);

  return (
    <div
      className="board"
      role="img"
      aria-label="Live dashboard showing students currently checked in, with session timers"
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
        <span style={{ fontSize: "12.5px", fontVariantNumeric: "tabular-nums" }}>
          1 over limit
        </span>
      </div>
    </div>
  );
}
