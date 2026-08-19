import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import CtaBand from "@/components/CtaBand";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <div className="hero-viewport">
        <Navbar links={[
          { label: "How it works", href: "#how" },
          { label: "Features", href: "/features" },
          { label: "Demo", href: "#demo" },
          { label: "Partner with us", href: "/partner" },
        ]} />
        <Hero />
      </div>
      <main>
        <HowItWorks />
        <Features />
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
