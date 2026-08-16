export default function Footer() {
  return (
    <footer>
      <div className="wrap foot">
        <a className="wordmark" style={{ fontSize: 17 }} href="#">
          <img src="/logo.png" alt="Presently" width={26} height={26} style={{ borderRadius: "50%" }} />
          Presently
        </a>
        <div className="links">
          <a href="#how">How it works</a>
          <a href="#features">Features</a>
          <a href="#">Privacy</a>
          <a href="#">Contact</a>
        </div>
        <span>&copy; 2026 Presently</span>
      </div>
    </footer>
  );
}
