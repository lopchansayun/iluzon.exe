import { gsap, EASE, DURATION } from "./gsap";

/**
 * Orchestrates opening a project: the clicked thumbnail expands to
 * cover the viewport, the list fades behind it, then the detail
 * content is revealed. Returns the timeline so callers can await it.
 *
 * refs: { cover, listEl, detailEl }
 * rect: bounding rect of the clicked thumbnail, to expand from.
 */
export function openProjectTransition({ cover, listEl, detailEl, rect, onCovered }) {
  const tl = gsap.timeline();

  gsap.set(cover, {
    display: "block",
    top: rect.top,
    left: rect.left,
    width: rect.width,
    height: rect.height,
    borderRadius: 2,
  });

  tl.to(listEl, {
    autoAlpha: 0,
    duration: DURATION.fast,
    ease: EASE.soft,
  }, 0)
    .to(cover, {
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
      duration: DURATION.slow,
      ease: EASE.inOut,
      onComplete: () => onCovered?.(),
    }, 0.05)
    .set(listEl, { display: "none" })
    .fromTo(
      detailEl,
      { autoAlpha: 0, y: 24 },
      { autoAlpha: 1, y: 0, duration: DURATION.medium, ease: EASE.out },
      "-=0.15"
    )
    .to(cover, { autoAlpha: 0, duration: DURATION.fast, onComplete: () => gsap.set(cover, { display: "none" }) }, "-=0.3");

  return tl;
}

/** Reverse sequence used when closing a project back to the list. */
export function closeProjectTransition({ detailEl, listEl, onDone }) {
  const tl = gsap.timeline({ onComplete: onDone });

  tl.to(detailEl, {
    autoAlpha: 0,
    y: -16,
    duration: DURATION.fast,
    ease: EASE.soft,
  })
    .set(listEl, { display: "block" })
    .fromTo(
      listEl,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: DURATION.medium, ease: EASE.out }
    );

  return tl;
}
