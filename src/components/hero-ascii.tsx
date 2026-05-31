"use client";

import React, { useEffect, useRef, useState } from "react";

const CHARS = [" ", ".", ":", "-", "=", "+", "*", "#", "%", "@"];

export function HeroAscii({ text = "ABRAÃO ALVES" }: { text?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ascii, setAscii] = useState("");

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const render = () => {
      // Dimensions based on container size and monospaced font aspect ratio
      const charWidth = 7;
      const charHeight = 12;
      
      const charsAcross = Math.floor(container.clientWidth / charWidth);
      const charsDown = Math.floor(container.clientHeight / charHeight);
      
      canvas.width = charsAcross;
      canvas.height = charsDown;

      // Clear canvas
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Animate font weight (Geist Variable Font supports 100 to 900)
      const weight = Math.floor(500 + Math.sin(time * 0.03) * 400);

      // Draw text
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      
      // Calculate font size
      const fontSize = Math.min(canvas.width / (text.length * 0.5), canvas.height * 0.5);
      ctx.font = `${weight} ${fontSize}px var(--font-geist-sans), sans-serif`;
      
      ctx.fillText(text, canvas.width / 2, canvas.height / 2);

      // Read pixels
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      let asciiStr = "";
      for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
          const offset = (y * canvas.width + x) * 4;
          const r = data[offset];
          const g = data[offset + 1];
          const b = data[offset + 2];
          
          // Grayscale luminance (inverted since we draw black on white)
          const luminance = (0.299 * r + 0.587 * g + 0.114 * b);
          const charIndex = Math.floor((luminance / 255) * (CHARS.length - 1));
          const invertedIndex = (CHARS.length - 1) - charIndex;
          
          asciiStr += CHARS[Math.max(0, Math.min(invertedIndex, CHARS.length - 1))];
        }
        asciiStr += "\n";
      }

      setAscii(asciiStr);
      time += 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Handle resize
    const handleResize = () => {
      // Just let the render loop pick up the new container dimensions
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [text]);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-[300px] md:h-[400px] bg-neutral-950 text-neutral-50 dark:bg-neutral-50 dark:text-neutral-950 overflow-hidden flex items-center justify-center rounded-xl font-mono p-4 select-none relative group"
    >
      <canvas ref={canvasRef} className="hidden" />
      <pre 
        className="font-mono m-0 p-0 leading-none text-center transition-colors duration-300"
        style={{
          fontSize: '12px',
          lineHeight: '12px',
          letterSpacing: '0px'
        }}
      >
        {ascii}
      </pre>
      
      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-xs bg-neutral-800 text-neutral-200 dark:bg-neutral-200 dark:text-neutral-800 px-2 py-1 rounded">ASCII Canvas Renderer</span>
      </div>
    </div>
  );
}
