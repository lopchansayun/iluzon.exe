import { useLayoutEffect, useRef } from "react";
import { hero } from "../../config";
import GalleryScene from "../WebGL/GalleryScene";
import { gsap } from "../../animations/gsap";
import { revealLines } from "../../animations/scrollAnimations";
import "./Hero.css";

export default function Hero({ galleryEnabled = true }) {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });
      tl.add(revealLines(".hero__line span", { delay: 0 }))
        .fromTo(
          ".hero__foot",
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.9, ease: "expo.out" },
          "-=0.6"
        );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id={hero.id} className="hero" ref={rootRef}>
      <div className="hero__canvas" aria-hidden="true">
        <GalleryScene enabled={galleryEnabled && hero.gallery.enabled} />
      </div>

      <div className="hero__content">
        <h1 className="hero__headline text-hero">
          {hero.lines.map((line) => (
            <span className="hero__line" key={line}>
              <span>{line}</span>
            </span>
          ))}
        </h1>

        <p className="text-body hero__description">
{hero.description}
        </p>
      </div>

      <div className="hero__foot">
        <div className="hero__status">
          <span className="hero__status-dot" />
          <span className="text-meta">{hero.status}</span>
        </div>
        <div className="hero__scroll-cue">
          <span className="text-meta">Scroll</span>
          <span className="hero__scroll-line" />
        </div>
      </div>
    </section>
  );
}
