import { LinkButton } from "./Button";

interface NavLink {
  label: string;
  href: string;
}

interface NavbarProps {
  links?: NavLink[];
  variant?: "home" | "default";
}

export default function Navbar({ links, variant = "default" }: NavbarProps) {
  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-[12px] border-b ${
        variant === "home"
          ? "bg-[rgba(250,250,247,0.8)] border-[#E7E5DF]"
          : "bg-white border-[#E7E5DF]"
      }`}
    >
      <div className="max-w-[1120px] mx-auto flex items-center justify-between h-[68px]">
        <a
          className="font-bold text-[21px] tracking-[-0.02em] flex items-center gap-[9px]"
          href="/"
        >
          <img
            src="/logo.png"
            alt="Presently"
            width={32}
            height={32}
            className="rounded-full"
          />
          Presently
        </a>
        <div className="flex items-center gap-8">
          {links && links.length > 0 && (
            <nav
              className="flex gap-7 text-base font-medium text-[#374151] max-md:hidden"
              aria-label="Main"
            >
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="hover:text-[#101828] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          )}
          <LinkButton href="/partner">Get Powered</LinkButton>
        </div>
      </div>
    </header>
  );
}
