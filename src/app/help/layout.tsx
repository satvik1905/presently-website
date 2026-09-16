import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function HelpLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar variant="home" />
      <main className="bg-white min-h-screen">
        <div className="mx-auto max-w-[800px] px-6 py-16 md:py-20">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
