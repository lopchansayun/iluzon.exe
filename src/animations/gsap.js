import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Shared easing vocabulary so every animation in the site feels
// like it belongs to the same motion system.
export const EASE = {
  out: "expo.out",
  inOut: "power3.inOut",
  soft: "power2.out",
  magnetic: "power3.out",
};

export const DURATION = {
  fast: 0.35,
  medium: 0.7,
  slow: 1.2,
};

export { gsap, ScrollTrigger };
