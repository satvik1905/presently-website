import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Strip from "@/components/Strip";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import CtaBand from "@/components/CtaBand";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Strip />
      <Features />
      <HowItWorks />
      <CtaBand />
      <ContactSection />
      <Footer />
    </>
  );
}
