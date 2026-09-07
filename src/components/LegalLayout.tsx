import Navbar from "./Navbar";
import Footer from "./Footer";
import LegalSidebar from "./LegalSidebar";

interface Section {
  id: string;
  title: string;
  number: number;
}

interface LegalLayoutProps {
  title: string;
  effectiveDate: string;
  lastUpdated: string;
  sections: Section[];
  crossLink: { href: string; label: string };
  children: React.ReactNode;
}

export default function LegalLayout({
  title,
  effectiveDate,
  lastUpdated,
  sections,
  crossLink,
  children,
}: LegalLayoutProps) {
  return (
    <>
      <div className="print:hidden">
        <Navbar variant="home" />
      </div>
      <main className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-[68ch] lg:max-w-[calc(240px+2.5rem+68ch)]">
          {/* Header — full width, above both columns */}
          <header className="mb-12">
            <h1 className="text-[32px] font-semibold tracking-[-0.02em] text-slate-900 leading-[1.15]">
              {title}
            </h1>
            <p className="mt-3 text-[15px] text-slate-500">
              Effective {effectiveDate}
            </p>
            <p className="text-[15px] text-slate-500">
              Last updated {lastUpdated}
            </p>
          </header>

          {/* Mobile / tablet TOC — below lg */}
          <nav
            aria-label="Table of contents"
            className="mb-14 lg:hidden print:hidden"
          >
            <p className="text-[13px] font-medium uppercase tracking-[0.06em] text-slate-400 mb-3">
              Contents
            </p>
            <ol className="space-y-1.5">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="text-[15px] text-slate-700 hover:text-slate-900"
                  >
                    {s.number}. {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {/* Two-column area */}
          <div className="lg:flex lg:gap-10">
            {/* Desktop sidebar — lg and up */}
            <div className="hidden lg:block lg:w-[240px] lg:shrink-0 print:hidden">
              <LegalSidebar sections={sections} />
            </div>

            {/* Content */}
            <article className="min-w-0 max-w-[68ch] print:text-black">
              {children}

              <div className="mt-16 pt-8 border-t border-slate-200">
                <p className="text-[15px] text-slate-500">
                  See also:{" "}
                  <a
                    href={crossLink.href}
                    className="text-[#2563EB] underline underline-offset-2 hover:text-[#1D4ED8]"
                  >
                    {crossLink.label}
                  </a>
                </p>
              </div>
            </article>
          </div>
        </div>
      </main>
      <div className="print:hidden">
        <Footer />
      </div>
    </>
  );
}
