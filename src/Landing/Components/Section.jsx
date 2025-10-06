import { useMotionValue, useTransform, motion, useSpring } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

export default function Section({ children }) {
  const innerRef = useRef(null);
  const [size, setSize] = useState({ width: 9999, height: 9999 });
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    if (innerRef.current) {
      const { offsetWidth, offsetHeight } = innerRef.current;
      setSize({ width: offsetWidth + 4, height: offsetHeight + 20 });
    }
  }, [children, screenWidth]);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(
    useTransform(y, [-0.5, 0.5], ["17.5deg", "-17.5deg"]),
    { stiffness: 100, damping: 15 }
  );
  const rotateY = useSpring(
    useTransform(x, [-0.5, 0.5], ["-17.5deg", "17.5deg"]),
    { stiffness: 100, damping: 15 }
  );
  const handleMouseMove = (e) => {
    const rect = innerRef.current.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    const mX = e.clientX - rect.left;
    const mY = e.clientY - rect.top;

    const xPect = mX / w - 0.5;
    const yPect = mY / h - 0.5;

    x.set(xPect);
    y.set(yPect);
  };
  const handleReset = () => {
    x.set(0);
    y.set(0);
  };
  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        height: `${size.height}px`,
      }}
      onMouseLeave={handleReset}
      onMouseMove={handleMouseMove}
      className='rounded-xl border-2 group border-primary hover:border-dark bg-transparent transition-all cursor-default'
    >
      <div
        ref={innerRef}
        style={{
          transformStyle: "preserve-3d",
          transform: "translateZ(80px)",
        }}
        className='bg-gradient-to-r from-dark to-panel group-hover:bg-opacity-30 bg-opacity-20 p-4 m-2 rounded-lg absolute'
      >
        {children}
      </div>
    </motion.div>
  );
}
