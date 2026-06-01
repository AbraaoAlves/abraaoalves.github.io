"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties, MouseEventHandler } from "react";
import type { Shader } from "./masks";

const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
const INK = "#26261f";
const PAPER = "#d8dbcf";

export type AsciiCanvasProps = {
  shader: Shader | null;
  fontSize?: number;
  lineHeight?: number;
  color?: string;
  background?: string;
  fps?: number;
  className?: string;
  style?: CSSProperties;
  onClick?: MouseEventHandler<HTMLDivElement>;
};

export function AsciiCanvas({
  shader, fontSize = 12, lineHeight = 1.0,
  color = INK, background = PAPER, fps = 30, className = "", style, onClick,
}: AsciiCanvasProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current, canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = typeof matchMedia === "function" &&
      matchMedia("(prefers-reduced-motion: reduce)").matches;

    let grid = { cols: 0, rows: 0, cellW: 0, cellH: 0, cssW: 0, cssH: 0 };
    let raf = 0, visible = true, lastDraw = 0;
    const start = performance.now(), frameMs = 1000 / fps;

    const cellWidth = () => { ctx.font = `${fontSize}px ${MONO}`; return ctx.measureText("M").width || fontSize * 0.6; };

    const build = () => {
      const dpr = window.devicePixelRatio || 1;
      const cssW = wrap.clientWidth, cssH = wrap.clientHeight;
      if (cssW < 2 || cssH < 2) return;
      const cellW = cellWidth(), cellH = fontSize * lineHeight;
      const cols = Math.max(1, Math.floor(cssW / cellW));
      const rows = Math.max(1, Math.floor(cssH / cellH));
      canvas.width = Math.round(cssW * dpr); canvas.height = Math.round(cssH * dpr);
      canvas.style.width = cssW + "px"; canvas.style.height = cssH + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      grid = { cols, rows, cellW, cellH, cssW, cssH };
      if (shader) shader.setup({ cols, rows });
      draw(performance.now());
    };

    const draw = (now: number) => {
      const { cols, rows, cellW, cellH, cssW, cssH } = grid;
      if (!cols || !rows) return;
      const t = reduce ? 0 : (now - start) / 1000;
      ctx.fillStyle = background; ctx.fillRect(0, 0, cssW, cssH);
      if (!shader) return;
      ctx.font = `${fontSize}px ${MONO}`;
      ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.fillStyle = color;
      const hw = cellW / 2, hh = cellH / 2;
      for (let row = 0; row < rows; row++) {
        const y = row * cellH + hh;
        for (let col = 0; col < cols; col++) {
          const out = shader.cell(col, row, t);
          if (!out) continue;
          ctx.globalAlpha = out.alpha;
          ctx.fillText(out.char, col * cellW + hw, y);
        }
      }
      ctx.globalAlpha = 1;
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible) return;
      if (now - lastDraw < frameMs) return;
      lastDraw = now; draw(now);
    };

    build();
    if (!reduce) raf = requestAnimationFrame(loop);
    const ro = new ResizeObserver(() => build()); ro.observe(wrap);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0 }); io.observe(wrap);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); };
  }, [shader, fontSize, lineHeight, color, background, fps]);

  return (
    <div ref={wrapRef} className={className} style={{ position: "relative", ...style }} onClick={onClick}>
      <canvas ref={canvasRef} style={{ display: "block" }} />
    </div>
  );
}
