import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useCursor } from "../CustomCursor/CursorContext";
import "./ThemeToggle.css";

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();
  const cursor = useCursor();

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      onMouseEnter={() => cursor.setRing()}
      onMouseLeave={() => cursor.setDefault()}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={!isDark}
    >
      <Sun className="theme-toggle__icon theme-toggle__icon--sun" size={15} strokeWidth={1.5} aria-hidden="true" />
      <Moon className="theme-toggle__icon theme-toggle__icon--moon" size={15} strokeWidth={1.5} aria-hidden="true" />
    </button>
  );
}
