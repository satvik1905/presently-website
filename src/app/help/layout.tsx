"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const guides = [
  { href: "/help/qr", label: "How to print QR codes" },
  { href: "/help/tutorial", label: "How to import students from the Kumon system (KSIS)" },
];

export default function HelpLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <Navbar variant="home" />
      <main className="bg-white min-h-screen">
        <div className="mx-auto max-w-[1120px] px-6 py-16 md:py-20">
          <div className="lg:flex lg:gap-0">
            {/* Sidebar */}
            <nav className="mb-8 lg:mb-0 lg:w-[240px] lg:shrink-0 lg:sticky lg:top-[88px] lg:self-start">
              <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-slate-400 mb-3">
                Guides
              </p>
              <ul className="space-y-1">
                {guides.map((g) => (
                  <li key={g.href}>
                    <Link
                      href={g.href}
                      className={`block rounded-lg px-3 py-2.5 text-[13.5px] leading-snug transition-colors ${
                        pathname === g.href
                          ? "bg-[#2563EB] text-white font-medium"
                          : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      {g.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Divider */}
            <div className="hidden lg:block lg:w-px lg:bg-slate-200 lg:mx-8 lg:shrink-0" />

            {/* Content */}
            <article className="min-w-0 flex-1 max-w-[740px]">
              {children}
            </article>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
