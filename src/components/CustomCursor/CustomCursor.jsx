import { useEffect, useRef } from "react";
import { gsap } from "../../animations/gsap";
import { useMousePosition } from "../../hooks/useMousePosition";
import { useIsTouchDevice } from "../../hooks/useMediaQuery";
import { useCursor } from "./CursorContext";
import "./CustomCursor.css";

export default function CustomCursor() {
  const isTouch = useIsTouchDevice();
  const position = useMousePosition();
  const { variant, label } = useCursor();
  const cursorRef = useRef(null);

  useEffect(() => {
    if (isTouch) return;
    document.documentElement.classList.add("has-custom-cursor");

    const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.28, ease: "power3.out" });
    const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.28, ease: "power3.out" });

    let raf;
    const tick = () => {
      xTo(position.current.x);
      yTo(position.current.y);
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [isTouch, position]);

  if (isTouch) return null;

  const classNames = ["cursor"];
  if (variant === "ring") classNames.push("cursor--ring");
  if (variant === "view") classNames.push("cursor--ring", "cursor--view");

  return (
    <div ref={cursorRef} className={classNames.join(" ")} aria-hidden="true">
      {variant === "view" && <span className="cursor__label">{label}</span>}
    </div>
  );
}
