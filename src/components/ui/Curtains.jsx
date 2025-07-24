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

    // 1. Vertical seam grows from top to bottom
    tl.fromTo(
      seamRef.current,
      { height: 0, opacity: 1 },
      { height: "100vh", duration: 1.5, ease: "power2.out" }
    );

    // 2. Curtains slide out horizontally after seam fully grown
    tl.to(
      leftCurtainRef.current,
      { x: "-100%", duration: 1, ease: "power2.inOut" },
      ">0.1"
    );
    tl.to(
      rightCurtainRef.current,
      { x: "100%", duration: 1, ease: "power2.inOut" },
      "<"
    );
  }, [onAnimationComplete]);

  return (
    <>
      {/* Left Curtain */}
      <div
        ref={leftCurtainRef}
        className="fixed top-0 left-0 w-1/2 h-full bg-red-700 z-50"
        style={{ transformOrigin: "left center" }}
      />
      {/* Right Curtain */}
      <div
        ref={rightCurtainRef}
        className="fixed top-0 right-0 w-1/2 h-full bg-red-700 z-50"
        style={{ transformOrigin: "right center" }}
      />
      {/* Center vertical seam line */}
      <div
        ref={seamRef}
        className="fixed top-0 left-1/2 -translate-x-1/2 w-1 bg-red-300 z-60"
        style={{ height: 0 }}
      />
    </>
  );
};

export default Curtains;
