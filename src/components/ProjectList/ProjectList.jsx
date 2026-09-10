import { useLayoutEffect, useRef, useState } from "react";
import { projects } from "../../config";
import { sections } from "../../config";
import ProjectItem from "../ProjectItem/ProjectItem";
import ProjectPreview from "../ProjectPreview/ProjectPreview";
import { animateIn } from "../../animations/scrollAnimations";
import { gsap } from "../../animations/gsap";
import "./ProjectList.css";

export default function ProjectList({ onOpenProject }) {
  const [hovered, setHovered] = useState(null);
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      animateIn(".work__head");
      gsap.utils.toArray(".project-item").forEach((el, i) => {
        animateIn(el, { delay: i * 0.03, y: 24 });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  if (!sections.featuredWork.enabled) return null;

  return (
    <section id={sections.featuredWork.id} className="work" ref={sectionRef} onPointerLeave={() => setHovered(null)}>
      <div className="work__head">
        <h2 className="text-h2">{sections.featuredWork.title}</h2>
        <span className="text-meta work__count">
          {String(projects.length).padStart(2, "0")} {sections.featuredWork.countLabel}
        </span>
      </div>

      <div className={`project-list${hovered ? " project-list--hovering" : ""}`}>
        {projects.map((project) => (
          <ProjectItem
            key={project.id}
            project={project}
            isActive={hovered?.id === project.id}
            onHoverStart={setHovered}
            onHoverEnd={() => setHovered(null)}
            onOpen={onOpenProject}
          />
        ))}
      </div>

      <ProjectPreview activeProject={hovered} />
    </section>
  );
}
