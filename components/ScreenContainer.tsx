"use client";
import React, { useEffect, useRef, useState } from "react";

interface ScreenContainerProps {
  width?: number;
  height?: number;
  children: React.ReactNode;
}

export default function ScreenContainer({
  width = 1920,
  height = 1080,
  children,
}: ScreenContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState({ x: 1, y: 1 });

  useEffect(() => {
    const handleResize = () => {
      // Calculate scale to fit the screen
      const currentWidth = window.innerWidth;
      const currentHeight = window.innerHeight;

      const scaleW = currentWidth / width;
      const scaleH = currentHeight / height;

      setScale({ x: scaleW, y: scaleH });
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [width, height]);

  return (
    <div className="fixed inset-0 overflow-hidden bg-black flex items-center justify-center pointer-events-none">
      <div
        ref={containerRef}
        className="pointer-events-auto shadow-2xl"
        style={{
          width: `${width}px`,
          height: `${height}px`,
          transform: `scale(${scale.x}, ${scale.y})`,
          transformOrigin: "center center",
          transition: "transform 0.1s ease-out",
        }}
      >
        {children}
      </div>
    </div>
  );
}
