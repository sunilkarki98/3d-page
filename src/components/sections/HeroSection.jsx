import React, { useEffect, useState } from "react";

const heroBackgrounds = ["/bg1.jpg", "/bg2.jpg", "/bg3.jpg"];

export default function HeroSection({ hovered }) {
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    if (!hovered) return;
    const interval = setInterval(() =>
      setBgIndex((prev) => (prev + 1) % heroBackgrounds.length), 1500);
    return () => clearInterval(interval);
  }, [hovered]);

  const bg = hovered ? `url(${heroBackgrounds[bgIndex]})` : "url('/default-bg.jpg')";

  return (
    <section
      className="relative w-full h-screen overflow-hidden"
      style={{
        backgroundImage: bg,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background-image 0.5s ease-in-out",
      }}
    >
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <h1 className="text-white text-5xl font-bold">Hero Section</h1>
      </div>
    </section>
  );
}
