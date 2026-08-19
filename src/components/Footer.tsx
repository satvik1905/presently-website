export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-main">
        <div className="footer-brand">
          <a className="footer-wordmark" href="/">
            <img
              src="/logo.png"
              alt="Presently"
              width={28}
              height={28}
              style={{ borderRadius: "50%" }}
            />
            Presently
          </a>
          <p className="footer-tagline">
            Know who&rsquo;s here.
            <br />
            Know who&rsquo;s ready.
          </p>
        </div>

        <div className="footer-columns">
          <div className="footer-col">
            <h4 className="footer-col-head">Product</h4>
            <a href="#how">How it works</a>
            <a href="/features">Features</a>
            <a href="#demo">Demo</a>
            <a href="/partner">Pricing</a>
          </div>
          <div className="footer-col">
            <h4 className="footer-col-head">Company</h4>
            <a href="/partner">Partner</a>
            <a href="#demo">Contact</a>
            <a href="#">Privacy</a>
          </div>
        </div>
      </div>

      <div className="footer-bar">
        <div className="wrap footer-bar-inner">
          <span>&copy; 2026 Presently</span>
        </div>
      </div>
    </footer>
  );
}
