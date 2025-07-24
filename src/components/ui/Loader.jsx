import React, { useEffect, useState } from "react";

const Loader = ({ onComplete }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      setCount(current);
      if (current === 100) {
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    }, 20);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 text-white z-50">
      <span className="text-6xl font-bold">{count}%</span>
    </div>
  );
};

export default Loader;
