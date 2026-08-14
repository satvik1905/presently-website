import { IconClockCheck } from "@tabler/icons-react";
import ScrollButton from "./ScrollButton";

export default function Navbar() {
  return (
    <nav className="site-nav">
      <div className="logo">
        <IconClockCheck size={22} />
        Presently
      </div>
      <div className="navlinks">
        <a href="#features">Features</a>
        <a href="#how">How it works</a>
        <a href="#contact">Contact</a>
      </div>
      <div className="nav-right">
        <ScrollButton targetId="contact" className="btn-o btn-sm">
          Contact
        </ScrollButton>
        <ScrollButton targetId="contact" className="btn btn-sm">
          Book a demo
        </ScrollButton>
      </div>
    </nav>
  );
}
