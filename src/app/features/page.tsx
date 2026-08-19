"use client";

import { useState, useEffect, useRef } from "react";
import {
  TransformWrapper,
  TransformComponent,
  useControls,
} from "react-zoom-pan-pinch";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CANVAS_W = 2400;
const CANVAS_H = 1600;
const NAV_H = 68;

interface SubFeature {
  title: string;
  desc: string;
  icon: string;
}

interface Cluster {
  id: number;
  title: string;
  desc: string;
  x: number;
  y: number;
  features: SubFeature[];
}

const CLUSTERS: Cluster[] = [
  {
    id: 1,
    title: "Smart Check-in / Out",
    desc: "Fast, accurate check-in with automatic timers and a live dashboard.",
    x: 1200,
    y: 220,
    features: [
      { title: "Student QR Scan", desc: "Students scan their QR badge to check in or out", icon: "grid" },
      { title: "Automatic Timers", desc: "30 min (1 subject) / 60 min (2 subjects), customizable", icon: "clock" },
      { title: "Time to Dismiss", desc: "Color-coded alerts when a student's time is up", icon: "bell" },
      { title: "Manual Checkout", desc: "Forgot to scan? Staff can check out manually", icon: "pointer" },
      { title: "Live Dashboard", desc: "See who's here, by room, in real time", icon: "layout" },
    ],
  },
  {
    id: 2,
    title: "Parent Communication",
    desc: "Keep parents informed automatically. No app required.",
    x: 380,
    y: 520,
    features: [
      { title: "Two-Way Messaging", desc: "Message parents and receive replies via SMS", icon: "message" },
      { title: "Broadcast Messages", desc: "Send to one, many, or all parents instantly", icon: "radio" },
      { title: "Scheduled Broadcasts", desc: "Plan messages to send later", icon: "calendar" },
      { title: "Automatic Alerts", desc: "Parents notified instantly at check-in and check-out", icon: "bell" },
    ],
  },
  {
    id: 3,
    title: "Center Management",
    desc: "Configure your center once, manage it from anywhere.",
    x: 2020,
    y: 520,
    features: [
      { title: "Student Profiles", desc: "Update time limits, subjects, status, room & more", icon: "user" },
      { title: "KSIS Mass Import", desc: "One-time import saves hours of data entry", icon: "download" },
      { title: "Multiple Centers", desc: "Manage one or many centers from one account", icon: "building" },
      { title: "Auto Deactivate", desc: "Students inactive 60 days are auto-deactivated", icon: "zap" },
      { title: "Staff Access Levels", desc: "Role-based permissions for staff and owners", icon: "key" },
    ],
  },
  {
    id: 4,
    title: "Attendance & Reports",
    desc: "Every session logged automatically. Reports that keep themselves.",
    x: 380,
    y: 1080,
    features: [
      { title: "Attendance History", desc: "Detailed records at your fingertips", icon: "list" },
      { title: "Absence Reports", desc: "See who hasn't been in and for how long", icon: "user-x" },
      { title: "Custom Reports", desc: "Filter by date, subject, room, and more", icon: "filter" },
      { title: "Export & Filter", desc: "CSV exports for any report", icon: "file-text" },
    ],
  },
  {
    id: 5,
    title: "Kumon-Specific Tools",
    desc: "Built for how Kumon centers actually run.",
    x: 2020,
    y: 1080,
    features: [
      { title: "Subject-Based Timing", desc: "30 min for 1 subject, 60 min for 2", icon: "clock" },
      { title: "EL / PI / Main Areas", desc: "Organize your center your way", icon: "layout" },
      { title: "Kumon Connect Friendly", desc: "Works for tablet & paper students", icon: "tablet" },
    ],
  },
  {
    id: 6,
    title: "Safety & Security",
    desc: "Protect what matters most.",
    x: 1200,
    y: 1380,
    features: [
      { title: "PII Protection", desc: "Personal info is separate from attendance records", icon: "eye-off" },
      { title: "2-Year Record Retention", desc: "Meet Kumon & legal requirements", icon: "archive" },
      { title: "Encryption", desc: "Industry-standard encryption & data protection", icon: "lock" },
      { title: "Trusted & Reliable", desc: "Built for peace of mind", icon: "heart" },
    ],
  },
];

const CONNECTIONS: [number, number][] = [
  [0, 1],
  [0, 2],
  [1, 3],
  [2, 4],
  [3, 5],
  [4, 5],
];

/* ── Icons ── */

const CLUSTER_ICONS: Record<number, React.ReactNode> = {
  1: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  2: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
  3: (
    <>
      <line x1="4" y1="21" x2="4" y2="14" />
      <line x1="4" y1="10" x2="4" y2="3" />
      <line x1="12" y1="21" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12" y2="3" />
      <line x1="20" y1="21" x2="20" y2="16" />
      <line x1="20" y1="12" x2="20" y2="3" />
      <line x1="1" y1="14" x2="7" y2="14" />
      <line x1="9" y1="8" x2="15" y2="8" />
      <line x1="17" y1="16" x2="23" y2="16" />
    </>
  ),
  4: (
    <>
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" />
    </>
  ),
  5: (
    <>
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </>
  ),
  6: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
};

const SUB_ICONS: Record<string, React.ReactNode> = {
  grid: (
    <>
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </>
  ),
  bell: (
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
  ),
  pointer: (
    <>
      <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
      <path d="M13 13l6 6" />
    </>
  ),
  layout: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="9" y1="21" x2="9" y2="9" />
    </>
  ),
  message: (
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  ),
  radio: (
    <>
      <circle cx="12" cy="12" r="2" />
      <path d="M16.24 7.76a6 6 0 0 1 0 8.49" />
      <path d="M7.76 16.24a6 6 0 0 1 0-8.49" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
      <path d="M4.93 19.07a10 10 0 0 1 0-14.14" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </>
  ),
  user: (
    <>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </>
  ),
  download: (
    <>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </>
  ),
  building: (
    <>
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <path d="M9 22v-4h6v4" />
      <line x1="8" y1="6" x2="8.01" y2="6" />
      <line x1="16" y1="6" x2="16.01" y2="6" />
      <line x1="8" y1="10" x2="8.01" y2="10" />
      <line x1="16" y1="10" x2="16.01" y2="10" />
      <line x1="8" y1="14" x2="8.01" y2="14" />
      <line x1="16" y1="14" x2="16.01" y2="14" />
    </>
  ),
  zap: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />,
  key: (
    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
  ),
  list: (
    <>
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </>
  ),
  "user-x": (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="8.5" cy="7" r="4" />
      <line x1="18" y1="8" x2="23" y2="13" />
      <line x1="23" y1="8" x2="18" y2="13" />
    </>
  ),
  filter: <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />,
  "file-text": (
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </>
  ),
  tablet: (
    <>
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </>
  ),
  "eye-off": (
    <>
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </>
  ),
  archive: (
    <>
      <polyline points="21 8 21 21 3 21 3 8" />
      <rect x="1" y="3" width="22" height="5" />
      <line x1="10" y1="12" x2="14" y2="12" />
    </>
  ),
  lock: (
    <>
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </>
  ),
  heart: (
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  ),
};

/* ── Canvas internals (needs useControls context) ── */

function CanvasContent({
  active,
  setActive,
  entrance,
  nodeRefs,
}: {
  active: number | null;
  setActive: (id: number | null) => void;
  entrance: "hidden" | "entering" | "done";
  nodeRefs: React.MutableRefObject<Record<number, HTMLDivElement | null>>;
}) {
  const { zoomToElement, resetTransform } = useControls();

  function handleNodeClick(id: number) {
    if (active === id) {
      setActive(null);
      resetTransform(700, "easeOut");
    } else {
      setActive(id);
      const el = nodeRefs.current[id];
      if (el) {
        zoomToElement(el, 1, 700, "easeOut");
      }
    }
  }

  function handleBack() {
    setActive(null);
    resetTransform(700, "easeOut");
  }

  // Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && active !== null) {
        handleBack();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  return (
    <>
      {/* Back button */}
      <button
        className={`btn btn-ghost feat-back${active !== null ? " feat-back-visible" : ""}`}
        onClick={handleBack}
      >
        &larr; Back to overview
      </button>

      {/* Clickable background to dismiss */}
      <div
        className="feat-canvas-bg"
        onClick={() => active !== null && handleBack()}
      />

      {/* Connector lines */}
      <svg
        className="feat-lines"
        viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
        fill="none"
      >
        {CONNECTIONS.map(([a, b]) => (
          <line
            key={`${a}-${b}`}
            x1={CLUSTERS[a].x}
            y1={CLUSTERS[a].y}
            x2={CLUSTERS[b].x}
            y2={CLUSTERS[b].y}
            stroke="var(--line)"
            strokeWidth="1"
            strokeDasharray="6 8"
          />
        ))}
      </svg>

      {/* Center wordmark */}
      <div className={`feat-center${active !== null ? " feat-center-hidden" : ""}`}>
        <span className="feat-center-mark">PRESENTLY</span>
        <span className="feat-center-tag">
          Know who&rsquo;s here. Know who&rsquo;s ready.
        </span>
      </div>

      {/* Cluster groups */}
      {CLUSTERS.map((cluster) => (
        <div
          key={cluster.id}
          className="feat-cluster"
          style={{ left: cluster.x, top: cluster.y }}
          ref={(el) => { nodeRefs.current[cluster.id] = el; }}
        >
          <button
            className={`feat-node${active === cluster.id ? " feat-node-active" : ""}${entrance !== "hidden" ? " feat-node-visible" : " feat-node-enter"}`}
            style={
              entrance === "entering"
                ? { transitionDelay: `${(cluster.id - 1) * 80}ms` }
                : undefined
            }
            onClick={(e) => {
              e.stopPropagation();
              handleNodeClick(cluster.id);
            }}
            aria-label={`View ${cluster.title} features`}
          >
            <span className="feat-badge">{cluster.id}</span>
            <div className="feat-ico">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--blue)"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {CLUSTER_ICONS[cluster.id]}
              </svg>
            </div>
            <span className="feat-node-title">{cluster.title}</span>
          </button>

          <div
            className={`feat-detail${active === cluster.id ? " feat-detail-show" : ""}`}
          >
            <p className="feat-detail-desc">{cluster.desc}</p>
            <div className="feat-sub-grid">
              {cluster.features.map((f, i) => (
                <div className="feat-sub-card" key={i}>
                  <div className="feat-sub-ico">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--blue)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {SUB_ICONS[f.icon]}
                    </svg>
                  </div>
                  <div>
                    <h4>{f.title}</h4>
                    <p>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

/* ── Page Component ── */

export default function FeaturesPage() {
  const [active, setActive] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState<number | null>(null);
  const [entrance, setEntrance] = useState<"hidden" | "entering" | "done">(
    "hidden"
  );
  const [initialScale, setInitialScale] = useState(0.4);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  useEffect(() => {
    const vh = window.innerHeight - NAV_H;
    const vw = window.innerWidth;
    setInitialScale(Math.min(vw / CANVAS_W, vh / CANVAS_H) * 0.85);
    const t1 = setTimeout(() => setEntrance("entering"), 200);
    const t2 = setTimeout(() => setEntrance("done"), 1000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <>
      <Navbar
        links={[
          { label: "Home", href: "/" },
          { label: "Partner", href: "/partner" },
        ]}
      />

      {/* ── Desktop Canvas ── */}
      <div className="feat-vp">
        <TransformWrapper
          initialScale={initialScale}
          minScale={0.3}
          maxScale={1.2}
          centerOnInit
          panning={{ disabled: true }}
          pinch={{ disabled: true }}
          wheel={{ disabled: true }}
          doubleClick={{ disabled: true }}
          zoomAnimation={{ animationTime: 700, animationType: "easeOut" }}
          limitToBounds={false}
        >
          <TransformComponent
            wrapperStyle={{
              width: "100%",
              height: "100%",
            }}
            contentStyle={{
              width: CANVAS_W,
              height: CANVAS_H,
            }}
          >
            <CanvasContent
              active={active}
              setActive={setActive}
              entrance={entrance}
              nodeRefs={nodeRefs}
            />
          </TransformComponent>
        </TransformWrapper>
      </div>

      {/* ── Mobile Accordion ── */}
      <div className="feat-mobile">
        <main>
          <section className="partner-hero">
            <div className="wrap">
              <h2>Everything Presently does</h2>
            </div>
          </section>
          <div className="wrap">
            <div className="fmobile-list">
              {CLUSTERS.map((cluster, i) => (
                <div className="fmobile-item" key={i}>
                  <button
                    className="fmobile-trigger"
                    onClick={() =>
                      setMobileOpen(mobileOpen === i ? null : i)
                    }
                    aria-expanded={mobileOpen === i}
                  >
                    <div className="fmobile-left">
                      <span className="feat-badge feat-badge-sm">
                        {cluster.id}
                      </span>
                      <span>{cluster.title}</span>
                    </div>
                    <svg
                      className={`faq-icon${mobileOpen === i ? " faq-icon-open" : ""}`}
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </button>
                  <div
                    className={`fmobile-body${mobileOpen === i ? " fmobile-body-open" : ""}`}
                  >
                    <div className="fmobile-inner">
                      <p className="fmobile-desc">{cluster.desc}</p>
                      {cluster.features.map((f, fi) => (
                        <div className="fmobile-sub" key={fi}>
                          <div className="feat-sub-ico">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="var(--blue)"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              {SUB_ICONS[f.icon]}
                            </svg>
                          </div>
                          <div>
                            <h4>{f.title}</h4>
                            <p>{f.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
