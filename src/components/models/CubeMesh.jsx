import React, { useRef, useEffect, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const faceImages = [
  "/right.jpg",  // Right
  "/left.jpg",   // Left
  null,          // Top (hidden)
  null,          // Bottom (hidden)
  "/front.jpg",  // Front
  "/back.jpg",   // Back
];

const fallbackColors = [
  "#ff4444", "#44ff44", "#000000", "#000000", "#4444ff", "#ffff44"
];

export default function CubeMesh({ onHoverChange, scrollProgress, inFourthSection }) {
  const meshRef = useRef();
  const mouseX = useRef(0);
  const [spinProgress, setSpinProgress] = useState(0);
  const [initialSpinDone, setInitialSpinDone] = useState(false);

  const materials = useMemo(() => {
    return faceImages.map((img, i) => {
      if (img) {
        const tex = new THREE.TextureLoader().load(img);
        tex.colorSpace = THREE.SRGBColorSpace;
        return new THREE.MeshStandardMaterial({ map: tex });
      }
      if (i === 2 || i === 3) {
        return new THREE.MeshStandardMaterial({ visible: false });
      }
      return new THREE.MeshStandardMaterial({ color: fallbackColors[i] });
    });
  }, []);

  useEffect(() => {
    const onMouseMove = (e) => {
      mouseX.current = (e.clientX / window.innerWidth) * 2 - 1;
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  useFrame(() => {
    if (!meshRef.current) return;

    const mesh = meshRef.current;

    // 🔁 One-time spin on mount
    if (!initialSpinDone) {
      const spinSpeed = 0.05;
      if (spinProgress < Math.PI * 2) {
        mesh.rotation.y += spinSpeed;
        setSpinProgress((prev) => prev + spinSpeed);
        return; // Skip rest of updates until spin is done
      } else {
        mesh.rotation.y = 0; // Reset to front-facing
        setInitialSpinDone(true);
      }
    }

    mesh.rotation.y = scrollProgress * Math.PI * 4;

    mesh.rotation.x = mouseX.current * 0.5;

    const target = inFourthSection ? 0.01 : 1;
    mesh.scale.x += (target - mesh.scale.x) * 0.1;
    mesh.scale.y += (target - mesh.scale.y) * 0.1;
    mesh.scale.z += (target - mesh.scale.z) * 0.1;
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => onHoverChange?.(true)}
      onPointerOut={() => onHoverChange?.(false)}
    >
      <boxGeometry attach="geometry" args={[2, 2, 2]} />
      {materials.map((mat, idx) => (
        <primitive attachArray="material" object={mat} key={idx} />
      ))}
    </mesh>
  );
}
