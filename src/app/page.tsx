import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import CtaBand from "@/components/CtaBand";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <div className="relative overflow-hidden before:content-[''] before:absolute before:rounded-full before:pointer-events-none before:w-[700px] before:h-[700px] before:-top-[180px] before:-left-[120px] before:bg-[radial-gradient(circle,rgba(37,99,235,0.08)_0%,rgba(37,99,235,0.02)_50%,transparent_70%)] after:content-[''] after:absolute after:rounded-full after:pointer-events-none after:w-[600px] after:h-[600px] after:-bottom-[60px] after:-right-[80px] after:bg-[radial-gradient(circle,rgba(96,165,250,0.1)_0%,rgba(147,197,253,0.04)_45%,transparent_70%)]">
        <Navbar
          variant="home"
          links={[
            { label: "How it works", href: "#how" },
            { label: "See it in action", href: "/see-it-in-action" },
            { label: "Demo", href: "#demo" },
          ]}
        />
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
