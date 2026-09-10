import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <span className="text-meta">© {new Date().getFullYear()} iluzon.exe</span>
      <span className="text-meta">Based in Nepal</span>
    </footer>
  );
}
