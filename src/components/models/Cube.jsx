import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import CubeMesh from "./CubeMesh"; // relative import

export default function Cube({ onHoverChange, scrollProgress = 0, inFourthSection = false }) {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={1} />
      <directionalLight position={[5, 5, 5]} />
      <CubeMesh
        onHoverChange={onHoverChange}
        scrollProgress={scrollProgress}
        inFourthSection={inFourthSection}
      />
      <OrbitControls enableZoom={false} enableRotate={false} />
    </Canvas>
  );
}
