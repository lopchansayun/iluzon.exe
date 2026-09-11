import { useLayoutEffect, useRef, useState } from "react";
import { projects, sections } from "../../config";
import { useCursor } from "../CustomCursor/CursorContext";
import MediaRenderer from "../MediaRenderer/MediaRenderer";
import { animateIn } from "../../animations/scrollAnimations";
import { gsap } from "../../animations/gsap";
import "./ProjectGrid.css";

export default function ProjectGrid({ onOpenProject }) {
  const sectionRef = useRef(null);
  const cursor = useCursor();
  const [hoveredId, setHoveredId] = useState(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      animateIn(".showcase__head");
      gsap.utils.toArray(".showcase-card").forEach((el, i) => {
        animateIn(el, { delay: i * 0.05, y: 32 });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  if (!sections.showcase.enabled) return null;

  // Top four projects, presented as a 2x2 grid of media-led cards.
  const items = projects.slice(0, 4);

  return (
    <section
      id={sections.showcase.id}
      className="showcase"
      ref={sectionRef}
      onPointerLeave={() => setHoveredId(null)}
    >
      <div className="showcase__head">
        <h2 className="text-h2">{sections.showcase.title}</h2>
        <span className="text-meta showcase__count">
          {String(items.length).padStart(2, "0")} {sections.showcase.countLabel}
        </span>
      </div>

      <div className={`showcase-grid${hoveredId ? " showcase-grid--hovering" : ""}`}>
        {items.map((project) => {
          const media = project.media?.src ? project.media : project.hoverPreview;
          const isActive = hoveredId === project.id;

          return (
            <a
              key={project.id}
              href={`#project-${project.id}`}
              className={`showcase-card${isActive ? " showcase-card--active" : ""}`}
              style={{ "--card-swatch": project.color }}
              onMouseEnter={() => {
                setHoveredId(project.id);
                cursor.setView("View");
              }}
              onMouseLeave={() => cursor.setDefault()}
              onClick={(e) => {
                e.preventDefault();
                onOpenProject(project, e.currentTarget.getBoundingClientRect());
              }}
            >
              <div className="showcase-card__media">
                {media?.src ? (
                  <MediaRenderer media={media} className="showcase-card__visual" />
                ) : (
                  <span className="showcase-card__placeholder" aria-hidden="true">
                    {project.number}
                  </span>
                )}
              </div>

              <div className="showcase-card__row">
                <span className="showcase-card__number text-meta">{project.number}</span>
                <h3 className="showcase-card__title">{project.title}</h3>
                <div className="showcase-card__meta">
                  <span className="text-meta">{project.category}</span>
                  <span className="text-meta">{project.year}</span>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
