import React, { useState } from "react";
import Curtains from "../ui/Curtains";
import HeroSection from "../HeroSection";
import Navbar from "../Navbar";

const HeroWrapper = () => {
  const [curtainsDone, setCurtainsDone] = useState(false);
  const [showCurtains, setShowCurtains] = useState(true); // Start with curtains visible

  return (
    <div className="relative min-h-screen bg-gray-900 overflow-hidden flex flex-col">
      {showCurtains && !curtainsDone && (
        <Curtains onAnimationComplete={() => setCurtainsDone(true)} />
      )}

      {curtainsDone && (
        <>
          <Navbar />
          <HeroSection />
        </>
      )}
    </div>
  );
};

export default HeroWrapper;
