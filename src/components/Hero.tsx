import {
  IconSparkles,
  IconScan,
  IconUserCheck,
  IconClock,
  IconBellRinging,
} from "@tabler/icons-react";
import ScrollButton from "./ScrollButton";

export default function Hero() {
  return (
    <div className="hero">
      <div className="arcs" aria-hidden="true">
        <div className="arc arc-1" />
        <div className="arc arc-2" />
        <div className="arc arc-3" />
      </div>

      <span className="chip chip-1" aria-hidden="true">
        <IconScan />
      </span>
      <span className="chip chip-2" aria-hidden="true">
        <IconUserCheck />
      </span>
      <span className="chip chip-3" aria-hidden="true">
        <IconClock />
      </span>
      <span className="chip chip-4" aria-hidden="true">
        <IconBellRinging />
      </span>

      <div className="hero-inner">
        <span className="pill">
          <IconSparkles size={13} />
          Check-in for Kumon centers
        </span>
        <h1>
          Check in, see everyone, <span>notify parents.</span>{" "}<em>Automatically.</em>
        </h1>
        <p className="lead">
          Presently gives your center effortless student check-in, a live board
          of who&rsquo;s here, and automatic texts to parents. The busy hour,
          finally calm.
        </p>
        <div className="cta">
          <ScrollButton targetId="contact" className="btn">
            Book a demo
          </ScrollButton>
          <ScrollButton targetId="how" className="btn-o">
            See how it works
          </ScrollButton>
        </div>
      </div>
    </div>
  );
}
