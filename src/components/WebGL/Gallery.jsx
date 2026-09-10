import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { createGalleryTextures } from "./galleryTextures";
import { hero } from "../../config";

const PANEL_COUNT = 16;
const TURNS = 4; // panels complete four full turns as they rise
const RADIUS = 2.5;
const PANEL_HEIGHT = 1.7;
const PANEL_ARC = (Math.PI * 2) / (PANEL_COUNT / TURNS) * 0.7; // width of each curved panel
const VERTICAL_SPAN = 15; // spacing between panels now exceeds panel height, so they read as separated cards rather than a dense overlapping band

/**
 * An original curved-panel ribbon: sixteen cylindrical image panels
 * arranged in a four-turn helix around a vertical rail, drifting
 * upward on a loop while the whole rail turns slowly. Built from
 * scratch for this project — no external template code or assets.
 */
export default function Gallery({ speed = hero.gallery.speed, scale = hero.gallery.scale, paused = false }) {
  const groupRef = useRef(null);
  const panelRefs = useRef([]);
  const elapsedRef = useRef(0);

  const textures = useMemo(() => createGalleryTextures(hero.gallery.textureCount, [512, 640], hero.gallery.images), []);

  const panels = useMemo(() => {
    return Array.from({ length: PANEL_COUNT }, (_, i) => {
      const angle = i * ((Math.PI * 2 * TURNS) / PANEL_COUNT);
      const baseY = (i / PANEL_COUNT) * VERTICAL_SPAN - VERTICAL_SPAN / 2;
      return { id: i, angle, baseY, texture: textures[i % textures.length] };
    });
  }, [textures]);

  useFrame((_state, delta) => {
    if (paused) return;
    const dt = Math.min(delta, 0.05) * speed;
    elapsedRef.current += dt;

    if (groupRef.current) {
      groupRef.current.rotation.y += dt * hero.gallery.rotationSpeed;
    }

    panelRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const panel = panels[i];
      // Continuous vertical drift, wrapped so the ribbon loops seamlessly.
      let y = panel.baseY + elapsedRef.current * hero.gallery.driftSpeed;
      const span = VERTICAL_SPAN;
      y = ((((y + span / 2) % span) + span) % span) - span / 2;
      mesh.position.y = y;
      // Fade panels near the top/bottom seam so the wrap isn't visible.
      const edge = 1 - Math.min(1, Math.abs(y) / (span / 2 - span * 0.08));
      mesh.material.opacity = THREE.MathUtils.clamp(edge, 0, 1);
    });

    return undefined;
  });

  return (
    <group ref={groupRef} scale={scale}>
      {panels.map((panel, i) => (
        <mesh
          key={panel.id}
          ref={(el) => (panelRefs.current[i] = el)}
          position={[0, panel.baseY, 0]}
          rotation={[0, panel.angle, 0]}
        >
          <cylinderGeometry
            args={[RADIUS, RADIUS, PANEL_HEIGHT, 24, 1, true, 0, PANEL_ARC]}
          />
          <meshBasicMaterial
            map={panel.texture}
            side={THREE.DoubleSide}
            transparent
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}
