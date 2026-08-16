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
        <Navbar />
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
