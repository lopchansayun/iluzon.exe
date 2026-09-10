import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Gallery from "./Gallery";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useIsMobile } from "../../hooks/useMediaQuery";

function isWebGLAvailable() {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

export default function GalleryScene({ enabled = true }) {
  const [supported, setSupported] = useState(true);
  const [tabHidden, setTabHidden] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  useEffect(() => {
    setSupported(isWebGLAvailable());

    const handleVisibility = () => setTabHidden(document.hidden);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  if (!enabled || !supported) return null;

  const handleContextLost = (e) => {
    e.preventDefault();
  };

  const handleCreated = ({ gl }) => {
    gl.domElement.addEventListener("webglcontextlost", handleContextLost, false);
  };

  return (
    <Canvas
      dpr={isMobile ? [1, 1.5] : [1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      frameloop={prefersReducedMotion || tabHidden ? "demand" : "always"}
      camera={{ position: [0, 0.6, 7.8], fov: 32 }}
      onCreated={handleCreated}
    >
      <ambientLight intensity={0.8} />
      <Suspense fallback={null}>
        <Gallery
          speed={isMobile ? 0.6 : 1}
          scale={isMobile ? 0.8 : 1}
          paused={prefersReducedMotion || tabHidden}
        />
      </Suspense>
    </Canvas>
  );
}
