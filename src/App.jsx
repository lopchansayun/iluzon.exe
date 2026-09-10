import { useCallback, useEffect, useRef, useState } from "react";
import Header from "./components/Header/Header";
import CustomCursor from "./components/CustomCursor/CustomCursor";
import { CursorProvider } from "./components/CustomCursor/CursorContext";
import SmoothScroll from "./components/SmoothScroll/SmoothScroll";
import PageTransitionCover from "./components/PageTransition/PageTransition";
import Home from "./pages/Home/Home";
import Project from "./pages/Project/Project";
import { openProjectTransition, closeProjectTransition } from "./animations/pageTransitions";
import { gsap } from "./animations/gsap";
import "./App.css";
import { site } from "./config";

export default function App() {
  useEffect(() => {
    document.title = site.title;
  }, []);

  const [activeProject, setActiveProject] = useState(null);
  const [view, setView] = useState("home"); // "home" | "project"

  const homeRef = useRef(null);
  const projectRef = useRef(null);
  const coverRef = useRef(null);
  const isAnimating = useRef(false);

  const handleOpenProject = useCallback((project, rect) => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    setActiveProject(project);
    // Mount the project layer into the flow immediately so it has a
    // real layout to animate into; the timeline still fades it in
    // from invisible once the cover has covered the viewport.
    setView("transitioning");

    gsap.set(projectRef.current, { autoAlpha: 0 });

    requestAnimationFrame(() => {
      openProjectTransition({
        cover: coverRef.current,
        listEl: homeRef.current,
        detailEl: projectRef.current,
        rect,
        onCovered: () => {
          window.scrollTo(0, 0);
          setView("project");
        },
      }).eventCallback("onComplete", () => {
        isAnimating.current = false;
      });
    });
  }, []);

  const handleClose = useCallback(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    closeProjectTransition({
      detailEl: projectRef.current,
      listEl: homeRef.current,
      onDone: () => {
        setView("home");
        setActiveProject(null);
        isAnimating.current = false;
      },
    });
  }, []);

  const handleNavigate = useCallback((project) => {
    setActiveProject(project);
    window.scrollTo(0, 0);
  }, []);

  return (
    <CursorProvider>
      <SmoothScroll>
        <Header onLogoClick={view === "project" ? handleClose : undefined} />
        <CustomCursor />

        <Home ref={homeRef} onOpenProject={handleOpenProject} galleryEnabled={view !== "project"} />

        <div style={{ display: view === "home" ? "none" : "block" }}>
          <Project
            ref={projectRef}
            project={activeProject}
            onClose={handleClose}
            onNavigate={handleNavigate}
          />
        </div>

        <PageTransitionCover ref={coverRef} />
      </SmoothScroll>
    </CursorProvider>
  );
}
