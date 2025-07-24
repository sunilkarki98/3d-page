import React, { useState, useEffect } from "react";
import Cube from "../ui/Cube";

const heroBackgrounds = [
  "/bg1.jpg",
  "/bg2.jpg",
  "/bg3.jpg",
];

export default function HeroSection() {
  const [hovered, setHovered] = useState(false);
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    if (!hovered) return;

    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % heroBackgrounds.length);
    }, 1500);

    return () => clearInterval(interval);
  }, [hovered]);

  const backgroundImage = hovered
    ? `url(${heroBackgrounds[bgIndex]})`
    : "url('/default-bg.jpg')";

  return (
    <section
      className="relative w-full h-screen overflow-hidden"
      style={{
        backgroundImage,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background-image 0.5s ease-in-out",
      }}
    >
     
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <h1 className="text-white text-5xl font-bold">Hero Section</h1>
      </div>
    </section>
  );
}
