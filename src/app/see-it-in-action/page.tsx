import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import ScreenshotCarousel, {
  type Slide,
} from "@/components/ScreenshotCarousel";
import { LinkButton } from "@/components/Button";

export const metadata: Metadata = {
  title: "See it in action — Presently",
  description:
    "Walk through the portal the way you\u2019d use it on a real afternoon — from importing your roster to watching the floor fill up.",
};

const ROSTER_SLIDES: Slide[] = [
  {
    src: "/images/see-it-in-action/1.png",
    alt: "Students table with Import students and Add student buttons, search, subject and status filters",
    caption:
      "\u201cStudents\u201d table \u2014 \u201cImport students\u201d and \u201cAdd student\u201d",
  },
  {
    src: "/images/see-it-in-action/2.png",
    alt: "Import students wizard, Upload step: Drop your file here, or click to browse",
    caption:
      "Step 1 \u201cUpload\u201d \u2014 \u201cDrop your file here, or click to browse\u201d",
  },
  {
    src: "/images/see-it-in-action/3.png",
    alt: "Import students wizard, Map columns step: File column mapped to Presently fields",
    caption: "Step 2 \u201cMap columns\u201d \u2014 File column \u2192 Maps to",
  },
  // TODO: slides 4 and 5 (Review & fix, Confirm) pending.
  // Swap dots for the wizard's own numbered stepper once all four wizard screens are in.
];

const CHECKIN_SLIDES: Slide[] = [
  {
    src: "/images/see-it-in-action/4.png",
    alt: "Kiosk screen: Scan or enter a student\u2019s code, 4-digit code auto-submits on entry, with Recent check-ins sidebar",
    caption:
      "\u201cScan or enter a student\u2019s code\u201d \u2014 4-digit code \u00b7 auto-submits on entry",
  },
  {
    // TODO: replace with full-frame screenshot (same kiosk crop as slide 1).
    // Confirm step 3 wording matches what this slide actually shows.
    alt: "Checked in: green banner and new row in Recent check-ins",
    caption: "Checked in \u2014 green banner + Recent check-ins",
    placeholder:
      "Slide pending \u2014 checked in, green banner + Recent check-ins",
  },
];

// SIGN-OFF NEEDED: "Kumon of Carmel" visible in 6.png, "Kumon Connect" badges in 7.png.
const LIVEBOARD_SLIDES: Slide[] = [
  {
    src: "/images/see-it-in-action/6.png",
    alt: "Live board: Students here 80, rooms PI, EL, Main, General with per-student timers, Time to dismiss 11",
    caption: "Live board \u2014 Students here, room columns, Time to dismiss",
  },
  {
    src: "/images/see-it-in-action/7.png",
    alt: "Rooms page filtered to Over limit: 11 over limit across all rooms, with Check out button per student",
    caption: "\u201cRooms\u201d \u2014 \u201cOver limit\u201d filter \u2014 11 over limit across all rooms",
  },
];

const STEPS = [
  {
    eyebrow: "Roster",
    heading: "Get your roster in",
    framing:
      "Before your first session, add every student who walks through your door.",
    steps: [
      "On the Students page, click Import students.",
      "Drop in your center\u2019s Report B export as-is, or a CSV.",
      "Presently matches your file\u2019s columns to its fields. Check them and continue.",
      // TODO: Add step 4 once the Review & fix screenshot lands.
    ],
    screenshot: "Student roster — portal screenshot",
  },
  {
    eyebrow: "Check-in",
    heading: "Students scan in",
    framing:
      "When a student arrives, check-in takes two seconds and parents know instantly.",
    steps: [
      "A student scans their barcode at the kiosk, or types their 4-digit code.",
      "The code auto-submits on entry. No staff involved.",
      // TODO: confirm step 3 wording matches slide 3 once that screenshot exists.
      "They\u2019re checked in with a time and a room, and appear in Recent check-ins.",
    ],
    screenshot: "Check-in screen — portal screenshot",
  },
  {
    eyebrow: "Live board",
    heading: "Watch the floor",
    framing:
      "One screen shows every student in the building, grouped by room, with running timers.",
    steps: [
      "Every room gets its own column, and one count at the top tells you how many students are in the building.",
      "Each student\u2019s timer runs against their limit. Go past it and they turn red, with the count of who\u2019s over on the room header.",
      "Time to dismiss totals them across the center. Open Rooms, filter to Over limit, and you have the whole list.",
    ],
    screenshot: "Live board — portal screenshot",
  },
  // TODO: Section 4 (Checkout) and Section 5 (Reports) — add back once screenshots are available.
] as const;

export default function SeeItInActionPage() {
  return (
    <>
      <Navbar
        links={[
          { label: "How it works", href: "/#how" },
          { label: "See it in action", href: "/see-it-in-action" },
          { label: "Demo", href: "/#demo" },
        ]}
      />

      <main>
        {/* Hero */}
        <section className="pt-[100px] pb-[64px]">
          <div className="max-w-[1120px] mx-auto px-6">
            <h1 className="font-semibold text-[clamp(28px,3.2vw,40px)] tracking-[-0.02em] leading-[1.15] max-w-[22ch]">
              A real afternoon at your center
            </h1>
            <p className="text-[var(--muted)] text-[17px] mt-4 max-w-[52ch]">
              Walk through the portal the way you&rsquo;d use it on a real
              afternoon — from importing your roster to watching the floor
              fill up.
            </p>
            {/* SIGN-OFF NEEDED: "Kumon of Carmel" visible in this screenshot. */}
            <div className="mt-10 w-full rounded-[var(--radius-lg)] border border-[var(--line)] bg-[var(--bg)] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/see-it-in-action/6.png"
                alt="Live board: Students here 80, rooms PI, EL, Main, General with per-student timers, Time to dismiss 11"
                className="w-full h-auto block"
              />
            </div>
          </div>
        </section>

        {/* Step sections */}
        {STEPS.map((step, i) => (
          <section
            key={step.eyebrow}
            className={`py-[72px] ${i % 2 === 0 ? "bg-white" : "bg-[var(--bg)]"}`}
          >
            <div className="max-w-[1120px] mx-auto px-6">
              <ScrollReveal>
                {/* Eyebrow */}
                <span className="text-[12.5px] font-medium tracking-[0.06em] text-[var(--muted)] inline-flex items-center gap-[10px] before:content-[''] before:w-[22px] before:h-px before:bg-[var(--line)]">
                  {`${String(i + 1).padStart(2, "0")} — ${step.eyebrow}`}
                </span>

                {/* Heading + framing */}
                <h2 className="font-semibold text-[clamp(24px,2.8vw,34px)] tracking-[-0.02em] leading-[1.2] mt-4">
                  {step.heading}
                </h2>
                <p className="text-[var(--muted)] text-[17px] mt-3 max-w-[56ch]">
                  {step.framing}
                </p>

                {/* Numbered steps */}
                <ol className="mt-8 flex flex-col gap-5 list-none">
                  {step.steps.map((text, si) => (
                    <li key={si} className="flex gap-4 items-start">
                      <span className="shrink-0 w-[28px] h-[28px] rounded-full bg-[var(--blue-tint)] text-[var(--blue)] text-[13px] font-semibold flex items-center justify-center">
                        {si + 1}
                      </span>
                      <span className="text-[var(--muted)] text-[15.5px] leading-[1.55] pt-[3px]">
                        {text}
                      </span>
                    </li>
                  ))}
                </ol>

                {/* Screenshot carousel */}
                <ScreenshotCarousel
                  slides={[ROSTER_SLIDES, CHECKIN_SLIDES, LIVEBOARD_SLIDES][i]}
                  label={["Roster setup screenshots", "Check-in kiosk screenshots", "Live board screenshots"][i]}
                />
              </ScrollReveal>
            </div>
          </section>
        ))}

        {/* CTA band */}
        <section className="py-[88px] bg-[var(--bg)]">
          <div className="max-w-[1120px] mx-auto px-6 flex flex-col items-center">
            <h2 className="font-semibold text-[clamp(28px,3.2vw,40px)] tracking-[-0.02em] leading-[1.15]">
              See it with your own roster
            </h2>
            <p className="text-[var(--muted)] text-[17px] mt-4" style={{ textAlign: "center" }}>
              We&rsquo;ll walk you through the portal and answer whatever
              your center needs.
            </p>
            <div className="mt-8">
              <LinkButton href="/#demo" size="lg">
                Book a demo
              </LinkButton>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
