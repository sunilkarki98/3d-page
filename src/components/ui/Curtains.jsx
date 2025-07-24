import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

const Curtains = ({ onAnimationComplete }) => {
  const leftCurtainRef = useRef(null);
  const rightCurtainRef = useRef(null);
  const seamRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: onAnimationComplete,
    });

    // 1. Seam grows from top to bottom
    tl.fromTo(
      seamRef.current,
      { height: 0, opacity: 1 },
      { height: "100vh", duration: 1.5, ease: "power2.out" }
    );

    // 2. Seam fades out BEFORE curtain slides
    tl.to(seamRef.current, { opacity: 0, duration: 0.5 }, "+=0.1");

    // 3. Curtains lift slightly to mimic stage lift
    tl.to(
      [leftCurtainRef.current, rightCurtainRef.current],
      { y: "-10px", duration: 0.4, ease: "power1.out" },
      "-=0.2"
    );

    // 4. Curtains slide off screen
    tl.to(
      leftCurtainRef.current,
      {
        x: "-110%",
        y: 0,
        duration: 2,
        ease: "power2.inOut",
      },
      "+=0"
    );

    tl.to(
      rightCurtainRef.current,
      {
        x: "110%",
        y: 0,
        duration: 2,
        ease: "power2.inOut",
      },
      "<" // start together
    );
  }, [onAnimationComplete]);

  return (
    <>
      {/* Left Curtain */}
      <div
        ref={leftCurtainRef}
        className="fixed top-0 left-0 w-1/2 h-full bg-gradient-to-r from-red-800 to-red-700 z-[100]"
        style={{ transformOrigin: "left center", willChange: "transform" }}
      />
      {/* Right Curtain */}
      <div
        ref={rightCurtainRef}
        className="fixed top-0 right-0 w-1/2 h-full bg-gradient-to-l from-red-800 to-red-700 z-[100]"
        style={{ transformOrigin: "right center", willChange: "transform" }}
      />
      {/* Seam */}
      <div
        ref={seamRef}
        className="fixed top-0 left-1/2 -translate-x-1/2 w-1 bg-red-300 z-[101]"
        style={{ height: 0 }}
      />
    </>
  );
};

export default Curtains;
