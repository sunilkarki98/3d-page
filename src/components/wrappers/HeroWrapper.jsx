import React, { useState } from "react";
import Curtains from "../ui/Curtains";
import HeroSection from "../HeroSection";
import Navbar from "../Navbar";

const HeroWrapper = () => {
  const [curtainsDone, setCurtainsDone] = useState(false);

  return (
    <div className="relative min-h-screen bg-gray-900 overflow-hidden flex flex-col">
      {/* These stay mounted from the beginning */}
      <Navbar />
      <HeroSection />

      {/* Curtains cover them and reveal on animation */}
      {!curtainsDone && (
        <Curtains onAnimationComplete={() => setCurtainsDone(true)} />
      )}
    </div>
  );
};

export default HeroWrapper;
