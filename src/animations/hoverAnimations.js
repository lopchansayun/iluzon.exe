import { gsap, EASE } from "./gsap";

/**
 * Attaches a subtle magnetic pull to `el`, biased toward the pointer
 * within its bounds. Returns a cleanup function.
 */
export function magneticHover(el, { strength = 0.35 } = {}) {
  if (!el) return () => {};

  const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: EASE.magnetic });
  const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: EASE.magnetic });

  const handleMove = (e) => {
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    xTo(relX * strength);
    yTo(relY * strength);
  };

  const handleLeave = () => {
    xTo(0);
    yTo(0);
  };

  el.addEventListener("pointermove", handleMove);
  el.addEventListener("pointerleave", handleLeave);

  return () => {
    el.removeEventListener("pointermove", handleMove);
    el.removeEventListener("pointerleave", handleLeave);
  };
}

/**
 * Builds a lerped follower: call `.update(x, y)` every frame (e.g. from
 * a GSAP ticker) and it eases `el`'s transform toward that target.
 * Used by the custom cursor and the cursor-following project preview.
 */
export function createLerpFollower(el, { ease = 0.15, rotationEase = 0.12 } = {}) {
  const current = { x: 0, y: 0 };
  const target = { x: 0, y: 0 };
  let lastX = 0;
  let rotation = 0;
  let initialized = false;

  const setInitial = (x, y) => {
    current.x = x;
    current.y = y;
    target.x = x;
    target.y = y;
    lastX = x;
    initialized = true;
  };

  const update = (x, y) => {
    target.x = x;
    target.y = y;
    if (!initialized) setInitial(x, y);
  };

  const tick = () => {
    const velocity = target.x - lastX;
    lastX = target.x;

    current.x += (target.x - current.x) * ease;
    current.y += (target.y - current.y) * ease;
    rotation += (gsap.utils.clamp(-12, 12, velocity * 0.6) - rotation) * rotationEase;

    if (el) {
      el.style.transform = `translate3d(${current.x}px, ${current.y}px, 0) rotate(${rotation.toFixed(2)}deg)`;
    }
  };

  return { update, tick, setInitial };
}
