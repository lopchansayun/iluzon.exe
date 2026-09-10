import { useEffect, useRef } from "react";

/**
 * Tracks pointer position in a ref so consumers (GSAP tickers, etc.)
 * can read the latest value every frame without triggering React re-renders.
 */
export function useMousePosition() {
  const position = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      position.current.x = e.clientX;
      position.current.y = e.clientY;
    };
    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  return position;
}
