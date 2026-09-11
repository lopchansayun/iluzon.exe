import { useState } from "react";
import LiquidGlass from "liquid-glass-react";
import { site } from "../../config";
import { useCursor } from "../CustomCursor/CursorContext";
import { useTheme } from "../../context/ThemeContext";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import IndexOverlay from "./IndexOverlay";
import "./Header.css";

export default function Header({ onLogoClick }) {
  const [indexOpen, setIndexOpen] = useState(false);
  const cursor = useCursor();
  const { isDark } = useTheme();

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
      {/* Semantic landmark only — the glass pill positions itself via
          `position: fixed` + `left: 50%`, pinned to the exact viewport
          center regardless of where this element sits in the DOM. */}
      <header className="header">
        <LiquidGlass
          className="header__glass"
          style={{ position: "fixed", top: "var(--header-glass-top)", left: "50%" }}
          cornerRadius={26}
          padding="0.55rem 1.35rem"
          displacementScale={40}
          blurAmount={0.14}
          saturation={150}
          aberrationIntensity={1}
          elasticity={0.1}
          mode="standard"
          overLight={!isDark}
        >
          <div className="header__inner">
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

            <div className="header__controls">
              <ThemeToggle />

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
            </div>
          </div>
        </LiquidGlass>
      </header>

      <IndexOverlay open={indexOpen} onClose={() => setIndexOpen(false)} />
    </>
  );
}
