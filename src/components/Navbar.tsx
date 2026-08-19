export default function Navbar() {
  return (
    <header>
      <div className="wrap nav">
        <a className="wordmark" href="#">
          <img src="/logo.png" alt="Presently" width={32} height={32} style={{ borderRadius: "50%" }} />
          Presently
        </a>
        <div className="nav-right">
          <nav className="nav-links" aria-label="Main">
            <a href="#how">How it works</a>
            <a href="#features">Features</a>
            <a href="#demo">Demo</a>
            <a href="/partner">Partner with us</a>
          </nav>
          <a className="btn btn-primary" href="#demo">
            Contact Us
          </a>
        </div>
      </div>
    </header>
  );
}
