import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
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
  "#ff4444", // Right
  "#44ff44", // Left
  "#000000", // Top
  "#000000", // Bottom
  "#4444ff", // Front
  "#ffff44", // Back
];

function CubeMesh({ onHoverChange, scrollProgress, inHero, inFourthSection }) {
  const meshRef = useRef();
  const mouseX = useRef(0);

  // Load materials for each face
  const materials = faceImages.map((img, i) => {
    if (img) {
      const tex = new THREE.TextureLoader().load(img);
      return new THREE.MeshStandardMaterial({ map: tex });
    }
    // Hide top and bottom faces
    if (i === 2 || i === 3) {
      return new THREE.MeshStandardMaterial({ visible: false });
    }
    return new THREE.MeshStandardMaterial({ color: fallbackColors[i] });
  });

  useEffect(() => {
    const onMouseMove = (e) => {
      mouseX.current = (e.clientX / window.innerWidth) * 2 - 1; // -1 to 1
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  useFrame(() => {
    if (meshRef.current) {
      // Spin on Y during scroll between section 2 & 3
      meshRef.current.rotation.y = scrollProgress * Math.PI * 4;

      // Tilt on X based on mouseX
      meshRef.current.rotation.x = mouseX.current * 0.5;

      // Burst (scale down) in Section 4
      if (inFourthSection) {
        meshRef.current.scale.set(0.01, 0.01, 0.01);
      } else {
        meshRef.current.scale.set(1, 1, 1);
      }
    }
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => onHoverChange(true)}
      onPointerOut={() => onHoverChange(false)}
      material={materials}
    >
      <boxGeometry args={[2, 2, 2]} />
    </mesh>
  );
}

export default function Cube({ onHoverChange, scrollProgress = 0, inHero = true, inFourthSection = false }) {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={1} />
      <directionalLight position={[5, 5, 5]} />
      <CubeMesh
        onHoverChange={onHoverChange}
        scrollProgress={scrollProgress}
        inHero={inHero}
        inFourthSection={inFourthSection}
      />
      <OrbitControls enableZoom={false} enableRotate={false} />
    </Canvas>
  );
}
