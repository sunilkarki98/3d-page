import React, { useEffect, useRef, useState } from "react";
import Curtains from "../ui/Curtains";
import HeroSection from "../sections/HeroSection";
import Navbar from "../Navbar";
import SectionTwo from "../sections/Section2";
import SectionThree from "../sections/Section3";
import SectionFour from "../sections/Section4";
import Cube from "../models/Cube";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroWrapper() {
  const [curtainsDone, setCurtainsDone] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState(1);

  const heroRef = useRef(), sec2Ref = useRef(), sec3Ref = useRef(), sec4Ref = useRef();

  useEffect(() => {
    const triggers = [
      ScrollTrigger.create({ trigger: heroRef.current, start: "top center", end: "bottom center", onEnter: () => setCurrentSection(1), onEnterBack: () => setCurrentSection(1) }),
      ScrollTrigger.create({ trigger: sec2Ref.current, start: "top center", end: "bottom center", onEnter: () => setCurrentSection(2), onEnterBack: () => setCurrentSection(2) }),
      ScrollTrigger.create({ trigger: sec3Ref.current, start: "top center", end: "bottom center", onEnter: () => setCurrentSection(3), onEnterBack: () => setCurrentSection(3) }),
      ScrollTrigger.create({ trigger: sec4Ref.current, start: "top center", end: "bottom center", onEnter: () => setCurrentSection(4), onEnterBack: () => setCurrentSection(4) }),
      ScrollTrigger.create({
        trigger: sec2Ref.current,
        start: "top center",
        endTrigger: sec3Ref.current,
        end: "bottom center",
        scrub: true,
        onUpdate: (self) => setScrollProgress(self.progress),
      }),
    ];
    return () => triggers.forEach(t => t.kill());
  }, []);

  return (
    <div className="relative min-h-screen bg-gray-900 overflow-hidden">
      <Navbar />
      <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
        <Cube
          scrollProgress={scrollProgress}
          inFourthSection={currentSection === 4}
          onHoverChange={setHovered}
        />
      </div>
      <div ref={heroRef}><HeroSection hovered={hovered} /></div>
      <div ref={sec2Ref}><SectionTwo /></div>
      <div ref={sec3Ref}><SectionThree /></div>
      <div ref={sec4Ref}><SectionFour /></div>
      {!curtainsDone && <Curtains onAnimationComplete={() => setCurtainsDone(true)} />}
    </div>
  );
}
