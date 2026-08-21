"use client";

import {
  useState,
  useEffect,
  useCallback,
  Fragment,
  type ComponentType,
} from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  IconScan,
  IconBellRinging,
  IconClock,
  IconAlertCircle,
  IconPencil,
  IconMessages,
  IconMessageCircle,
  IconSpeakerphone,
  IconCalendarEvent,
  IconBuilding,
  IconUser,
  IconBolt,
  IconBuilding as IconBuildings,
  IconPower,
  IconChartBar,
  IconListCheck,
  IconReport,
  IconFilter,
  IconSchool,
  IconClock as IconTimer,
  IconLayoutDashboard,
  IconDeviceTablet,
  IconShieldCheck,
  IconLock,
  IconShieldLock,
  IconArchive,
  IconBook,
} from "@tabler/icons-react";

/* ── Data ── */

const HUB = { cx: 2000, cy: 1500, left: 1775, top: 1275, w: 450 };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TablerIcon = ComponentType<any>;

interface Sub {
  icon: TablerIcon;
  title: string;
  desc: string;
  cx: number;
  cy: number;
  left: number;
  top: number;
  w: number;
}

interface Module {
  num: number;
  title: string;
  icon: TablerIcon;
  cx: number;
  cy: number;
  left: number;
  top: number;
  w: number;
  border: string;
  badge: string;
  titleColor: string;
  shadow: string;
  subBg: string;
  subBorder: string;
  features: string[];
  subs: Sub[];
}

const MODULES: Module[] = [
  {
    num: 1,
    title: "SMART CHECK-IN / OUT",
    icon: IconScan,
    cx: 2000,
    cy: 850,
    left: 1825,
    top: 675,
    w: 350,
    border: "#60A5FA",
    badge: "#60A5FA",
    titleColor: "#1E3A8A",
    shadow: "0 15px 40px rgba(96,165,250,0.2)",
    subBg: "#60A5FA",
    subBorder: "#3B82F6",
    features: [
      "Student QR Scan In/Out",
      "Automatic Timers (30 / 60 min)",
      "Time to Dismiss alerts",
      "Live Dashboard",
    ],
    subs: [
      {
        icon: IconBellRinging,
        title: "Automatic Parent Alerts",
        desc: "Instant arrival/leave notifications",
        cx: 1620,
        cy: 680,
        left: 1530,
        top: 590,
        w: 180,
      },
      {
        icon: IconClock,
        title: "Automatic Timers",
        desc: "30 min (1 subj) / 60 min (2 subj)",
        cx: 2380,
        cy: 680,
        left: 2290,
        top: 590,
        w: 180,
      },
      {
        icon: IconAlertCircle,
        title: "Time to Dismiss",
        desc: "Color-coded alerts when up",
        cx: 2520,
        cy: 860,
        left: 2435,
        top: 775,
        w: 170,
      },
      {
        icon: IconPencil,
        title: "Manual Checkout",
        desc: "Forgot to scan backup",
        cx: 2360,
        cy: 1020,
        left: 2275,
        top: 935,
        w: 170,
      },
    ],
  },
  {
    num: 2,
    title: "PARENT COMMUNICATION",
    icon: IconMessages,
    cx: 1350,
    cy: 1200,
    left: 1175,
    top: 1025,
    w: 350,
    border: "#3B82F6",
    badge: "#3B82F6",
    titleColor: "#1E3A8A",
    shadow: "0 15px 40px rgba(59,130,246,0.18)",
    subBg: "#3B82F6",
    subBorder: "#2563EB",
    features: [
      "Two-Way Messaging",
      "Broadcast Messages",
      "Scheduled Broadcasts",
      "Quick Parent Responses",
    ],
    subs: [
      {
        icon: IconMessageCircle,
        title: "Two-Way Messaging",
        desc: "Direct parent-instructor chat",
        cx: 1000,
        cy: 1020,
        left: 915,
        top: 935,
        w: 170,
      },
      {
        icon: IconSpeakerphone,
        title: "Broadcast Messages",
        desc: "Send to one, many, or all",
        cx: 940,
        cy: 1200,
        left: 855,
        top: 1115,
        w: 170,
      },
      {
        icon: IconCalendarEvent,
        title: "Scheduled Broadcasts",
        desc: "Plan announcements ahead",
        cx: 1000,
        cy: 1380,
        left: 915,
        top: 1295,
        w: 170,
      },
    ],
  },
  {
    num: 3,
    title: "CENTER MANAGEMENT",
    icon: IconBuilding,
    cx: 2650,
    cy: 1200,
    left: 2475,
    top: 1025,
    w: 350,
    border: "#2563EB",
    badge: "#2563EB",
    titleColor: "#1E3A8A",
    shadow: "0 15px 40px rgba(37,99,235,0.16)",
    subBg: "#2563EB",
    subBorder: "#1D4ED8",
    features: [
      "Student Profiles",
      "KSIS Mass Import",
      "Multiple Centers Support",
      "Staff Access Levels",
    ],
    subs: [
      {
        icon: IconUser,
        title: "Student Profiles",
        desc: "Time limits, subjects, rooms",
        cx: 3020,
        cy: 1020,
        left: 2935,
        top: 935,
        w: 170,
      },
      {
        icon: IconBolt,
        title: "KSIS Mass Import",
        desc: "1-time roster sync",
        cx: 3080,
        cy: 1180,
        left: 2995,
        top: 1095,
        w: 170,
      },
      {
        icon: IconBuildings,
        title: "Multiple Centers",
        desc: "Manage from 1 account",
        cx: 3040,
        cy: 1340,
        left: 2955,
        top: 1255,
        w: 170,
      },
      {
        icon: IconPower,
        title: "Auto Deactivate",
        desc: "Inactive 60 days pruned",
        cx: 2950,
        cy: 1480,
        left: 2865,
        top: 1395,
        w: 170,
      },
    ],
  },
  {
    num: 4,
    title: "ATTENDANCE & REPORTS",
    icon: IconChartBar,
    cx: 1350,
    cy: 1850,
    left: 1175,
    top: 1675,
    w: 350,
    border: "#1D4ED8",
    badge: "#1D4ED8",
    titleColor: "#1E3A8A",
    shadow: "0 15px 40px rgba(29,78,216,0.16)",
    subBg: "#1D4ED8",
    subBorder: "#1E40AF",
    features: [
      "Attendance History",
      "Absence Tracking",
      "Custom Reports",
      "Export & Filter Data",
    ],
    subs: [
      {
        icon: IconListCheck,
        title: "Attendance History",
        desc: "Detailed fingertip records",
        cx: 980,
        cy: 1700,
        left: 895,
        top: 1615,
        w: 170,
      },
      {
        icon: IconReport,
        title: "Absence Reports",
        desc: "Track missing days",
        cx: 940,
        cy: 1880,
        left: 855,
        top: 1795,
        w: 170,
      },
      {
        icon: IconFilter,
        title: "Custom Reports",
        desc: "Filter date, room, subject",
        cx: 980,
        cy: 2060,
        left: 895,
        top: 1975,
        w: 170,
      },
    ],
  },
  {
    num: 5,
    title: "KUMON-SPECIFIC TOOLS",
    icon: IconSchool,
    cx: 2000,
    cy: 2150,
    left: 1825,
    top: 1975,
    w: 350,
    border: "#1E40AF",
    badge: "#1E40AF",
    titleColor: "#1E3A8A",
    shadow: "0 15px 40px rgba(30,64,175,0.16)",
    subBg: "#1E40AF",
    subBorder: "#1E3A8A",
    features: [
      "Subject-Based Timing",
      "EL / PI / MAIN Areas",
      "Kumon Connect Friendly",
      "Tablet & Paper Support",
    ],
    subs: [
      {
        icon: IconTimer,
        title: "Subject Timing",
        desc: "30 min (1) / 60 min (2)",
        cx: 1720,
        cy: 2420,
        left: 1635,
        top: 2335,
        w: 170,
      },
      {
        icon: IconLayoutDashboard,
        title: "EL / PI / MAIN",
        desc: "Organize your center zones",
        cx: 2000,
        cy: 2480,
        left: 1915,
        top: 2395,
        w: 170,
      },
      {
        icon: IconDeviceTablet,
        title: "Kumon Connect",
        desc: "Tablet & paper friendly",
        cx: 2280,
        cy: 2420,
        left: 2195,
        top: 2335,
        w: 170,
      },
    ],
  },
  {
    num: 6,
    title: "SAFETY & SECURITY",
    icon: IconShieldCheck,
    cx: 2650,
    cy: 1850,
    left: 2475,
    top: 1675,
    w: 350,
    border: "#1E3A8A",
    badge: "#1E3A8A",
    titleColor: "#1E3A8A",
    shadow: "0 15px 40px rgba(30,58,138,0.16)",
    subBg: "#1E3A8A",
    subBorder: "#172554",
    features: [
      "Secure & Compliant",
      "PII Protection",
      "7-Year Record Retention",
      "Trusted & Reliable",
    ],
    subs: [
      {
        icon: IconLock,
        title: "Secure & Compliant",
        desc: "Industry-standard encryption",
        cx: 3020,
        cy: 1700,
        left: 2935,
        top: 1615,
        w: 170,
      },
      {
        icon: IconShieldLock,
        title: "PII Protection",
        desc: "Personal info separated",
        cx: 3060,
        cy: 1860,
        left: 2975,
        top: 1775,
        w: 170,
      },
      {
        icon: IconArchive,
        title: "7-Year Retention",
        desc: "Meets Kumon legal standards",
        cx: 3020,
        cy: 2020,
        left: 2935,
        top: 1935,
        w: 170,
      },
    ],
  },
];

const PATH = [
  { x: 2000, y: 1400, scale: 0.45, label: "OVERVIEW (0 / 6)" },
  { x: 2000, y: 850, scale: 1.15, label: "1. SMART CHECK-IN / OUT" },
  { x: 1350, y: 1200, scale: 1.15, label: "2. PARENT COMMUNICATION" },
  { x: 2650, y: 1200, scale: 1.15, label: "3. CENTER MANAGEMENT" },
  { x: 1350, y: 1850, scale: 1.15, label: "4. ATTENDANCE & REPORTS" },
  { x: 2000, y: 2150, scale: 1.15, label: "5. KUMON-SPECIFIC TOOLS" },
  { x: 2650, y: 1850, scale: 1.15, label: "6. SAFETY & SECURITY" },
];

// Compute all connector lines from data
const CONNECTORS: [number, number, number, number][] = [
  ...MODULES.map(
    (m) => [HUB.cx, HUB.cy, m.cx, m.cy] as [number, number, number, number],
  ),
  ...MODULES.flatMap((m) =>
    m.subs.map(
      (s) => [m.cx, m.cy, s.cx, s.cy] as [number, number, number, number],
    ),
  ),
];

/* ── Component ── */

export default function FeaturesPage() {
  const [zoom, setZoom] = useState({ x: 2000, y: 1400, scale: 0.42 });
  const [step, setStep] = useState(0);
  const [vp, setVp] = useState({ w: 1440, h: 832 });
  const [ready, setReady] = useState(false);
  const [mobileOpen, setMobileOpen] = useState<number | null>(null);

  useEffect(() => {
    const update = () =>
      setVp({ w: window.innerWidth, h: window.innerHeight - 68 });
    update();
    setReady(true);
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const zoomTo = useCallback(
    (x: number, y: number, scale: number, s?: number) => {
      setZoom({ x, y, scale });
      if (s !== undefined) setStep(s);
    },
    [],
  );

  const nextStep = useCallback(() => {
    const next = (step + 1) % PATH.length;
    const t = PATH[next];
    zoomTo(t.x, t.y, t.scale, next);
  }, [step, zoomTo]);

  const prevStep = useCallback(() => {
    const prev = (step - 1 + PATH.length) % PATH.length;
    const t = PATH[prev];
    zoomTo(t.x, t.y, t.scale, prev);
  }, [step, zoomTo]);

  const resetOverview = useCallback(() => {
    const t = PATH[0];
    zoomTo(t.x, t.y, t.scale, 0);
  }, [zoomTo]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        nextStep();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevStep();
      } else if (e.key === "Escape") {
        resetOverview();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [nextStep, prevStep, resetOverview]);

  const tx = vp.w / 2 - zoom.x * zoom.scale;
  const ty = vp.h / 2 - zoom.y * zoom.scale;
  const worldTransform = `translate3d(${tx}px, ${ty}px, 0) scale(${zoom.scale})`;

  return (
    <>
      <Navbar
        links={[
          { label: "Home", href: "/" },
          { label: "Partner", href: "/partner" },
        ]}
      />

      {/* ── Desktop Prezi Canvas ── */}
      <div className="prezi-viewport">
        <div
          className="prezi-world"
          style={{
            transform: ready ? worldTransform : undefined,
            opacity: ready ? 1 : 0,
          }}
        >
          {/* SVG Connectors */}
          <svg className="prezi-connectors" fill="none">
            {CONNECTORS.map(([x1, y1, x2, y2], i) => (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                className="prezi-line"
              />
            ))}
          </svg>

          {/* Center Hub */}
          <div
            className="prezi-node"
            style={{
              left: HUB.left,
              top: HUB.top,
              width: HUB.w,
              height: HUB.w,
              borderWidth: 4,
              borderStyle: "solid",
              borderColor: "#2563EB",
              boxShadow: "0 20px 50px rgba(37,99,235,0.18)",
              zIndex: 10,
            }}
            onClick={() => zoomTo(2000, 1500, 1.1, 0)}
          >
            <div className="prezi-hub-icon">
              <IconBook size={36} stroke={1.5} color="#2563EB" />
            </div>
            <h2 className="prezi-hub-title">PRESENTLY</h2>
            <span className="prezi-hub-sub">FOR KUMON CENTERS</span>
            <p className="prezi-hub-desc">
              Know who&rsquo;s here.
              <br />
              Know who&rsquo;s ready.
            </p>
            <span className="prezi-hub-hint">Click to focus center</span>
          </div>

          {/* Modules + Sub-nodes */}
          {MODULES.map((m) => (
            <Fragment key={m.num}>
              <div
                className="prezi-node"
                style={{
                  left: m.left,
                  top: m.top,
                  width: m.w,
                  height: m.w,
                  borderWidth: 4,
                  borderStyle: "solid",
                  borderColor: m.border,
                  boxShadow: m.shadow,
                  zIndex: 10,
                }}
                onClick={() => zoomTo(m.cx, m.cy, 1.15, m.num)}
              >
                <span className="prezi-badge" style={{ background: m.badge }}>
                  {m.num}
                </span>
                <m.icon size={30} stroke={1.5} color={m.border} />
                <h3 style={{ color: m.titleColor }}>{m.title}</h3>
                <ul className="prezi-node-list">
                  {m.features.map((f) => (
                    <li key={f}>&bull; {f}</li>
                  ))}
                </ul>
              </div>

              {m.subs.map((s, si) => (
                <div
                  key={si}
                  className="prezi-sub"
                  style={{
                    left: s.left,
                    top: s.top,
                    width: s.w,
                    height: s.w,
                    background: m.subBg,
                    borderWidth: 2,
                    borderStyle: "solid",
                    borderColor: m.subBorder,
                    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                    zIndex: 20,
                  }}
                  onClick={() => zoomTo(s.cx, s.cy, 2.0, m.num)}
                >
                  <s.icon size={20} stroke={1.5} color="#fff" />
                  <h4>{s.title}</h4>
                  <p>{s.desc}</p>
                </div>
              ))}
            </Fragment>
          ))}
        </div>

        {/* Step Tracker HUD */}
        <div className="prezi-hud">
          <button
            className="w-9 h-9 grid place-items-center rounded-full border-none bg-transparent cursor-pointer text-[#475569] transition-[background,color] duration-150 hover:bg-[#f1f5f9] hover:text-[#0f172a]"
            onClick={prevStep}
            aria-label="Previous step"
          >
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <span className="prezi-hud-label">{PATH[step].label}</span>

          <button
            className="w-9 h-9 grid place-items-center rounded-full border-none bg-transparent cursor-pointer text-[#475569] transition-[background,color] duration-150 hover:bg-[#f1f5f9] hover:text-[#0f172a]"
            onClick={nextStep}
            aria-label="Next step"
          >
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          <div className="prezi-hud-divider" />

          <button className="text-xs font-bold text-[#475569] bg-transparent border-none cursor-pointer py-1 px-2 transition-colors duration-150 whitespace-nowrap hover:text-blue" onClick={resetOverview}>
            Reset Overview
          </button>
        </div>
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
              {MODULES.map((m, i) => (
                <div className="fmobile-item" key={i}>
                  <button
                    className="w-full flex items-center justify-between gap-4 py-5 bg-transparent border-none cursor-pointer font-[inherit] text-[17px] font-semibold text-ink text-left focus-visible:outline-2 focus-visible:outline-blue focus-visible:outline-offset-2 focus-visible:rounded"
                    onClick={() => setMobileOpen(mobileOpen === i ? null : i)}
                    aria-expanded={mobileOpen === i}
                  >
                    <div className="fmobile-left">
                      <span
                        className="prezi-badge prezi-badge-sm"
                        style={{ background: m.badge }}
                      >
                        {m.num}
                      </span>
                      <span>{m.title}</span>
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
                      {m.subs.map((s, si) => (
                        <div className="fmobile-sub" key={si}>
                          <s.icon
                            size={20}
                            stroke={1.5}
                            color={m.badge}
                            style={{ flexShrink: 0 }}
                          />
                          <div>
                            <h4>{s.title}</h4>
                            <p>{s.desc}</p>
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
