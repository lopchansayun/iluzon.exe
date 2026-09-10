import { gsap, ScrollTrigger, EASE, DURATION } from "./gsap";

/**
 * Fades and lifts an element into place as it enters the viewport.
 * One consistent entrance used across sections rather than a
 * different reveal per component.
 */
export function animateIn(target, { delay = 0, y = 32, once = true } = {}) {
  return gsap.fromTo(
    target,
    { autoAlpha: 0, y },
    {
      autoAlpha: 1,
      y: 0,
      duration: DURATION.slow,
      delay,
      ease: EASE.out,
      scrollTrigger: {
        trigger: target,
        start: "top 85%",
        once,
      },
    }
  );
}

/** Reverses animateIn — used sparingly, e.g. for page-leave states. */
export function animateOut(target, { y = -24 } = {}) {
  return gsap.to(target, {
    autoAlpha: 0,
    y,
    duration: DURATION.fast,
    ease: EASE.soft,
  });
}

/**
 * Subtle vertical parallax tied to scroll position. `strength` in px.
 */
export function parallax(target, { strength = 60 } = {}) {
  return gsap.fromTo(
    target,
    { y: -strength / 2 },
    {
      y: strength / 2,
      ease: "none",
      scrollTrigger: {
        trigger: target,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    }
  );
}

/** Staggered line-by-line reveal, used once for the hero headline. */
export function revealLines(targets, { delay = 0 } = {}) {
  return gsap.fromTo(
    targets,
    { yPercent: 110 },
    {
      yPercent: 0,
      duration: DURATION.slow,
      delay,
      stagger: 0.08,
      ease: EASE.out,
    }
  );
}
