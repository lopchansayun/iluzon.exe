import { useState } from "react";
import { site } from "../../config";
import { useCursor } from "../CustomCursor/CursorContext";
import IndexOverlay from "./IndexOverlay";
import "./Header.css";

export default function Header({ onLogoClick }) {
  const [indexOpen, setIndexOpen] = useState(false);
  const cursor = useCursor();

  const scrollTo = (target) => {
    if (window.__lenis) {
      window.__lenis.scrollTo(target, { immediate: false });
    } else {
      document.querySelector(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleNavClick = (href) => (e) => {
    e.preventDefault();
    scrollTo(href);
  };

  const handleTopClick = (e) => {
    e.preventDefault();

    if (onLogoClick) {
      onLogoClick();
      return;
    }

    window.history.replaceState(null, "", "#top");
    scrollTo("#top");
  };

  return (
    <>
      <header className="header">
        <a
          href="#top"
          className="header__name"
          onMouseEnter={() => cursor.setRing()}
          onMouseLeave={() => cursor.setDefault()}
          onClick={handleTopClick}
        >
          {site.name}
        </a>

        <nav className="header__nav">
          {site.navigation.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="header__link font-nav"
              onClick={handleNavClick(link.href)}
              onMouseEnter={() => cursor.setRing()}
              onMouseLeave={() => cursor.setDefault()}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="header__index font-nav"
          onClick={() => setIndexOpen((v) => !v)}
          onMouseEnter={() => cursor.setRing()}
          onMouseLeave={() => cursor.setDefault()}
          aria-expanded={indexOpen}
        >
          {indexOpen ? "Close" : "Index"}
        </button>
      </header>

      <IndexOverlay open={indexOpen} onClose={() => setIndexOpen(false)} />
    </>
  );
}
