"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { createImageMaskShader, createTextMaskShader, createShapeMaskShader, createRippleShader } from "./masks";
import type { ImageMaskShaderOptions, Shader } from "./masks";
import { drawLogo as drawUSMap } from "./drawImages";

const MONO  = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
const INK   = "#26261f";
const PAPER = "#d8dbcf";
const LINE  = "#b7bbac";

type ImageMaskHookOptions = Omit<ImageMaskShaderOptions, "img"> & {
  src?: string;
};

type AsciiCanvasProps = {
  shader: Shader | null;
  fontSize?: number;
  lineHeight?: number;
  color?: string;
  background?: string;
  fps?: number;
  className?: string;
  style?: React.CSSProperties;
};

type FieldProps = {
  label: React.ReactNode;
  children: React.ReactNode;
};

type AsciiMode = "text" | "image" | "wave";

type TabProps = {
  id: AsciiMode;
  label: string;
  setTab: React.Dispatch<React.SetStateAction<AsciiMode>>;
  currentTab: AsciiMode;
};

function useImageMaskShader({ src, source, speed, threshold, feather, phaseJitter }: ImageMaskHookOptions) {
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  useEffect(() => {
    if (!src) return;
    let cancelled = false;
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload  = () => { if (!cancelled) setImg(image); };
    image.onerror = () => console.warn("ASCII mask: image failed to load", src);
    image.src = src;
    return () => { cancelled = true; };
  }, [src]);
  return useMemo(
    () => (img ? createImageMaskShader({ img, source, speed, threshold, feather, phaseJitter }) : null),
    [img, source, speed, threshold, feather, phaseJitter]
  );
}



/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * CANVAS RENDERER
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export function AsciiCanvas({
  shader, fontSize = 12, lineHeight = 1.0,
  color = INK, background = PAPER, fps = 30, className = "", style,
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
    <div ref={wrapRef} className={className} style={{ position: "relative", ...style }}>
      <canvas ref={canvasRef} style={{ display: "block" }} />
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * DEMO
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function Field({ label, children }: FieldProps) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 10 }}>
      <span style={{ letterSpacing: "0.14em", textTransform: "uppercase", opacity: 0.6 }}>{label}</span>
      {children}
    </label>
  );
}
const iStyle = {
  background: "transparent", border: "none", borderBottom: `1px solid ${LINE}`,
  color: INK, fontFamily: MONO, fontSize: 12, padding: "3px 0", outline: "none", width: "100%",
} satisfies React.CSSProperties;

function Tab({ id, label, setTab, currentTab }: TabProps) {
  return (
    <button onClick={() => setTab(id)} style={{
      background: "none", border: "none", cursor: "pointer",
      fontFamily: MONO, fontSize: 11, letterSpacing: "0.16em",
      padding: "4px 0", textTransform: "uppercase",
      color: currentTab === id ? INK : `${INK}77`,
    borderBottom: currentTab === id ? `1px solid ${INK}` : "1px solid transparent",
    }}>{label}</button>
  );
}

export default function AsciiArtDemo() {
  const [mode, setMode] = useState<AsciiMode>("text");

  const [text,   setText]   = useState("ABRAÃO\nALVES");
  const [source, setSource] = useState("typescriptdeveloper ");
  const [speed,    setSpeed]    = useState(7);
  const [fontSize, setFontSize] = useState(12);
  const [jitter,   setJitter]   = useState(1);

  const [waveScale, setWaveScale] = useState(0.14);
  const [waveWarp,  setWaveWarp]  = useState(0.9);
  const [clipUS,    setClipUS]    = useState(false);
  const [waveOrigin, setWaveOrigin] = useState({ x: 0.5, y: 0.5 });

  const textShader = useMemo(
    () => createTextMaskShader({ text, source, speed, phaseJitter: jitter }),
    [text, source, speed, jitter]
  );
  // const mapShader = useMemo(
  //   () => createShapeMaskShader({
  //     drawShape: drawUSMap, source: "unitedstatesamerica ",
  //     speed, threshold: 0.5, feather: 0.7, phaseJitter: jitter,
  //   }),
  //   [speed, jitter]
  // );
  
  const mapShader = useMemo(
    () => createRippleShader({
      drawMask: drawUSMap, 
      source: "developer ",
      speed, 
      threshold: 0.5, 
      feather: 0.7, 
      phaseJitter: jitter,
      origin: waveOrigin, // Use the same origin for the ripple effect
    }),
    [speed, jitter, waveOrigin]
  );
  // const waveShader = useMemo(
  //   () => createWaveShader({
  //     speed: speed * 0.15, scale: waveScale, warp: waveWarp,
  //     drawMask: clipUS ? drawUSMap : null,
  //   }),
  //   [speed, waveScale, waveWarp, clipUS]
  // );
  const waveShader = useMemo(
    () => createRippleShader({
      speed: speed * 0.5, 
      scale: waveScale * 1.5, // Slightly adjust scale for ripples
      warp: waveWarp,         // Keep warp at 0 for perfect circles
      origin: waveOrigin,     // Pass the click coordinates
      drawMask: clipUS ? drawUSMap : null,
    }),
    [speed, waveScale, waveWarp, waveOrigin, clipUS]
  );

  const activeShader = mode === "text" ? textShader : mode === "image" ? mapShader : waveShader;

  return (
    <div style={{
      fontFamily: MONO, color: INK, background: PAPER,
      minHeight: "100vh", padding: 20, boxSizing: "border-box",
      display: "flex", flexDirection: "column", gap: 14,
    }}>
      <header style={{
        display: "flex", justifyContent: "space-between", alignItems: "baseline",
        borderBottom: `1px solid ${LINE}`, paddingBottom: 8,
      }}>
        <span style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase" }}>ascii · canvas</span>
        <div style={{ display: "flex", gap: 16 }}>
          <Tab id="text"  label="Text" setTab={setMode} currentTab={mode} />
          <Tab id="image" label="US Map" setTab={setMode} currentTab={mode} />
          <Tab id="wave"  label="Wave" setTab={setMode} currentTab={mode} />
        </div>
      </header>

      <div 
        style={{ flex: 1, minHeight: mode === "text" ? 300 : 400, border: `1px solid ${LINE}`, display: 'flex', cursor: 'crosshair' }}
        onClick={(e) => {
          // Get the bounding box of the canvas wrapper
          const rect = e.currentTarget.getBoundingClientRect();
          // Calculate the normalized click position (0.0 to 1.0)
          const x = (e.clientX - rect.left) / rect.width;
          const y = (e.clientY - rect.top) / rect.height;
          setWaveOrigin({ x, y });
        }}
      >
        <AsciiCanvas
          shader={activeShader} fontSize={fontSize} color={INK} background={PAPER}
          style={{ flex: 1, minHeight: mode === "text" ? 300 : 400, border: `1px solid ${LINE}` }}
        />

      </div>


      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
        gap: 16, alignItems: "end", borderTop: `1px solid ${LINE}`, paddingTop: 12,
      }}>
        {mode === "text" && <>
          <Field label="mask text (\\n = line)">
            <input style={iStyle} value={text.replace(/\n/g, "\\n")}
              onChange={(e) => setText(e.target.value.replace(/\\n/g, "\n"))} />
          </Field>
          <Field label="fill source">
            <input style={iStyle} value={source} onChange={(e) => setSource(e.target.value)} />
          </Field>
        </>}

        {mode === "wave" && <>
          <Field label={`flow scale · ${waveScale.toFixed(2)}`}>
            <input type="range" min="0.05" max="0.30" step="0.01"
              value={waveScale} onChange={(e) => setWaveScale(+e.target.value)} style={{ accentColor: INK }} />
          </Field>
          <Field label={`turbulence · ${waveWarp.toFixed(1)}`}>
            <input type="range" min="0" max="2" step="0.1"
              value={waveWarp} onChange={(e) => setWaveWarp(+e.target.value)} style={{ accentColor: INK }} />
          </Field>
          <Field label="clip to shape">
            <button onClick={() => setClipUS(!clipUS)} style={{
              ...iStyle, cursor: "pointer", textAlign: "left",
              letterSpacing: "0.12em", textTransform: "uppercase", fontSize: 11,
            }}>{clipUS ? "us map ●" : "off ○"}</button>
          </Field>
        </>}

        <Field label={`speed · ${speed}`}>
          <input type="range" min="0" max="20" step="0.5"
            value={speed} onChange={(e) => setSpeed(+e.target.value)} style={{ accentColor: INK }} />
        </Field>
        <Field label={`density · ${fontSize}px`}>
          <input type="range" min="7" max="22" step="1"
            value={fontSize} onChange={(e) => setFontSize(+e.target.value)} style={{ accentColor: INK }} />
        </Field>
        {mode !== "wave" && (
          <Field label={`jitter · ${jitter.toFixed(2)}`}>
            <input type="range" min="0" max="1" step="0.05"
              value={jitter} onChange={(e) => setJitter(+e.target.value)} style={{ accentColor: INK }} />
          </Field>
        )}
      </div>
    </div>
  );
}

// export {
//   AsciiCanvas, createMaskShader, createTextMaskShader,
//   createShapeMaskShader, createImageMaskShader, useImageMaskShader,
//   createWaveShader, flowValue,
// };
