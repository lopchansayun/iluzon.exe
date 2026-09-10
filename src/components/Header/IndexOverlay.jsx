import { useEffect, useRef } from "react";
import { gsap } from "../../animations/gsap";
import { useCursor } from "../CustomCursor/CursorContext";
import "./IndexOverlay.css";

const sections = [
  { num: "01", label: "Work", href: "#work" },
  { num: "02", label: "About", href: "#about" },
  { num: "03", label: "Awards", href: "#awards" },
  { num: "04", label: "Contact", href: "#contact" },
];

export default function IndexOverlay({ open, onClose }) {
  const ref = useRef(null);
  const cursor = useCursor();

  useEffect(() => {
    if (!ref.current) return;
    if (open) {
      gsap.to(ref.current, { autoAlpha: 1, duration: 0.5, ease: "power2.out" });
    } else {
      gsap.to(ref.current, { autoAlpha: 0, duration: 0.35, ease: "power2.in" });
    }
  }, [open]);

  const handleClick = (href) => (e) => {
    e.preventDefault();
    onClose();
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      ref={ref}
      className="index-overlay"
      aria-hidden={!open}
      inert={open ? undefined : true}
    >
      <ul className="index-overlay__list">
        {sections.map((s) => (
          <li key={s.num} className="index-overlay__item">
            <a
              href={s.href}
              className="index-overlay__link"
              onClick={handleClick(s.href)}
              onMouseEnter={() => cursor.setRing()}
              onMouseLeave={() => cursor.setDefault()}
              tabIndex={open ? 0 : -1}
            >
              <span className="index-overlay__num">{s.num}</span>
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
