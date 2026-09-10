import { forwardRef } from "react";
import { useCursor } from "../CustomCursor/CursorContext";
import "./ProjectItem.css";

const ProjectItem = forwardRef(function ProjectItem(
  { project, isActive, onHoverStart, onHoverEnd, onOpen },
  ref
) {
  const cursor = useCursor();

  return (
    <a
      href={`#project-${project.id}`}
      ref={ref}
      className={`project-item${isActive ? " project-item--active" : ""}`}
      onMouseEnter={() => {
        onHoverStart(project);
        cursor.setView("View");
      }}
      onMouseLeave={() => {
        onHoverEnd();
        cursor.setDefault();
      }}
      onClick={(e) => {
        e.preventDefault();
        onOpen(project, e.currentTarget.getBoundingClientRect());
      }}
    >
      <div className="project-item__row">
        <span className="project-item__number">{project.number}</span>
        <h3 className="project-item__title text-project-title">{project.title}</h3>
        <div className="project-item__meta">
          <span className="text-meta">{project.category}</span>
          <span className="text-meta">{project.year}</span>
        </div>
      </div>
    </a>
  );
});

export default ProjectItem;
