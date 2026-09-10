import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * A knotted, low-poly form rendered in a single flat material so it
 * reads as sculptural rather than game-like. Rotation is constant and
 * slow; pointer position adds a gentle, lagged parallax tilt rather
 * than an immediate snap.
 */
export default function AbstractObject() {
  const groupRef = useRef(null);
  const { viewport } = useThree();
  const target = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    const { pointer } = state;
    target.current.x = pointer.y * 0.25;
    target.current.y = pointer.x * 0.35;

    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.12;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        target.current.x,
        1 - Math.pow(0.001, delta)
      );
      groupRef.current.rotation.z = THREE.MathUtils.lerp(
        groupRef.current.rotation.z,
        target.current.y * 0.3,
        1 - Math.pow(0.001, delta)
      );
    }
  });

  const scale = Math.min(viewport.width, viewport.height) * 0.16;

  return (
    <group ref={groupRef} scale={scale}>
      <mesh castShadow={false} receiveShadow={false}>
        <torusKnotGeometry args={[1, 0.32, 220, 32, 2, 3]} />
        <meshStandardMaterial
          color="#e7e4da"
          roughness={0.42}
          metalness={0.15}
          flatShading
        />
      </mesh>
    </group>
  );
}
