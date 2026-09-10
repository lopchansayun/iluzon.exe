import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "../../animations/gsap";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { motion } from "../../config";

export default function SmoothScroll({ children }) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: motion.scroll.lenisDuration,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      touchMultiplier: 1.4,
    });
    lenis.on("scroll", ScrollTrigger.update);
    window.__lenis = lenis;

    const raf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(raf);
      if (window.__lenis === lenis) delete window.__lenis;
    };
  }, [prefersReducedMotion]);

  return children;
}
