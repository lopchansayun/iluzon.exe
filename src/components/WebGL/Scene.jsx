import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import AbstractObject from "./AbstractObject";
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

export default function Scene() {
  const [supported, setSupported] = useState(true);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  useEffect(() => {
    setSupported(isWebGLAvailable());
  }, []);

  // The page must still work without WebGL — hero typography carries
  // the moment on its own when the scene can't render.
  if (!supported) return null;

  return (
    <Canvas
      dpr={isMobile ? 1 : [1, 1.6]}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      frameloop={prefersReducedMotion ? "demand" : "always"}
      camera={{ position: [0, 0, 5], fov: 42 }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 2]} intensity={1.1} />
      <directionalLight position={[-3, -2, -2]} intensity={0.3} />
      <Suspense fallback={null}>
        {!isMobile && <AbstractObject />}
      </Suspense>
    </Canvas>
  );
}
