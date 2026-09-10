import { forwardRef } from "react";
import { ArrowLeft } from "lucide-react";
import { projects } from "../../data/projects";
import { useCursor } from "../../components/CustomCursor/CursorContext";
import "./Project.css";
import MediaRenderer from "../../components/MediaRenderer/MediaRenderer";

const Project = forwardRef(function Project({ project, onClose, onNavigate }, ref) {
  const cursor = useCursor();

  if (!project) return <div ref={ref} className="project-page" />;

  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const next = projects[(currentIndex + 1) % projects.length];

  return (
    <div ref={ref} className="project-page">
      <button
        type="button"
        className="project-page__back"
        onClick={onClose}
        onMouseEnter={() => cursor.setRing()}
        onMouseLeave={() => cursor.setDefault()}
      >
        <ArrowLeft size={14} strokeWidth={1.5} />
        Back to work
      </button>

      <div className="project-page__head">
        <span className="text-meta">
          {project.number} — {project.year}
        </span>
        <h1 className="text-h1 project-page__title">{project.title}</h1>

        <div className="project-page__meta-row">
          <div className="project-page__meta-item">
            <span className="text-meta">Category</span>
            <span className="text-small">{project.category}</span>
          </div>
          <div className="project-page__meta-item">
            <span className="text-meta">Role</span>
            <span className="text-small">{project.role}</span>
          </div>
          <div className="project-page__meta-item">
            <span className="text-meta">Year</span>
            <span className="text-small">{project.year}</span>
          </div>
        </div>
      </div>

      <div
        className="project-page__hero-visual"
        style={{ backgroundColor: project.color }}
      >
        <MediaRenderer media={project.media} />
      </div>

      <div className="project-page__body">
        <p className="text-body" style={{ maxWidth: "56ch", fontSize: "1.1rem" }}>
          {project.description}
        </p>

        <ul className="project-page__stack">
          <li className="text-meta">Built with</li>
          {project.stack.map((s) => (
            <li key={s} className="text-small">
              {s}
            </li>
          ))}
        </ul>
      </div>

      <div className="project-page__nav">
        <button
          type="button"
          className="project-page__nav-link"
          onClick={onClose}
          onMouseEnter={() => cursor.setRing()}
          onMouseLeave={() => cursor.setDefault()}
        >
          <span className="text-meta">Index</span>
          <span className="text-small">All work</span>
        </button>
        <button
          type="button"
          className="project-page__nav-link project-page__nav-link--next"
          onClick={() => onNavigate(next)}
          onMouseEnter={() => cursor.setView("Next")}
          onMouseLeave={() => cursor.setDefault()}
        >
          <span className="text-meta">Next project</span>
          <span className="text-small">{next.title}</span>
        </button>
      </div>
    </div>
  );
});

export default Project;
