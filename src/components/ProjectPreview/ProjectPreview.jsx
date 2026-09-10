import { useEffect, useRef } from "react";
import { gsap } from "../../animations/gsap";
import { motion } from "../../config";
import { createLerpFollower } from "../../animations/hoverAnimations";
import { useMousePosition } from "../../hooks/useMousePosition";
import "./ProjectPreview.css";
import MediaRenderer from "../MediaRenderer/MediaRenderer";

export default function ProjectPreview({ activeProject }) {
  const wrapperRef = useRef(null);
  const swatchRef = useRef(null);
  const followerRef = useRef(null);
  const position = useMousePosition();

  useEffect(() => {
    const follower = createLerpFollower(wrapperRef.current, {
      ease: motion.mouseFollow.previewEase,
      rotationEase: motion.mouseFollow.rotationEase,
    });
    followerRef.current = follower;

    const tick = () => {
      follower.update(position.current.x, position.current.y);
      follower.tick();
    };

    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      followerRef.current = null;
      gsap.killTweensOf(wrapperRef.current);
      gsap.killTweensOf(swatchRef.current);
    };
  }, [position]);

  useEffect(() => {
    if (!wrapperRef.current) return;

    gsap.killTweensOf(wrapperRef.current);
    gsap.killTweensOf(swatchRef.current);

    if (activeProject) {
      followerRef.current?.setInitial(position.current.x, position.current.y);
      gsap.to(swatchRef.current, {
        backgroundColor: activeProject.color,
        duration: 0.4,
        ease: "power2.out",
      });
      gsap.to(wrapperRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "expo.out",
      });
    } else {
      gsap.to(wrapperRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.25,
        ease: "power2.inOut",
        onComplete: () => {
          if (!activeProject && wrapperRef.current) {
            wrapperRef.current.style.visibility = "hidden";
          }
        },
      });
    }
    if (activeProject) wrapperRef.current.style.visibility = "visible";
  }, [activeProject, position]);

  return (
    <div className="project-preview" ref={wrapperRef} aria-hidden="true">
      <div className="project-preview__swatch" ref={swatchRef}>
        {activeProject?.hoverPreview?.src ? (
          <MediaRenderer media={activeProject.hoverPreview} />
        ) : null}
      </div>
    </div>
  );
}
