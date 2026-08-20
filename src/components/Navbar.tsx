interface NavLink {
  label: string;
  href: string;
}

export default function Navbar({ links }: { links?: NavLink[] }) {
  return (
    <header>
      <div className="wrap nav">
        <a className="wordmark" href="/">
          <img src="/logo.png" alt="Presently" width={32} height={32} style={{ borderRadius: "50%" }} />
          Presently
        </a>
        <div className="nav-right">
          {links && links.length > 0 && (
            <nav className="nav-links" aria-label="Main">
              {links.map((link) => (
                <a key={link.href} href={link.href}>
                  {link.label}
                </a>
              ))}
            </nav>
          )}
          <a className="btn btn-primary" href="/partner">
            Get Presently
          </a>
        </div>
      </div>
    </header>
  );
}
