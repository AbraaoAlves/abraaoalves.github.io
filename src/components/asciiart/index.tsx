"use client";
import React, { useMemo, useState } from "react";
import { AsciiCanvas } from "./canvas";
import { createTextMaskShader, createRippleShader } from "./masks";
import { drawLogo as drawUSMap } from "./drawImages";

export { AsciiCanvas } from "./canvas";
export type { AsciiCanvasProps } from "./canvas";
export { AsciiArtCanvas } from "./ascii-art-canvas";
export type { AsciiArtCanvasProps } from "./ascii-art-canvas";
export { AsciiTextCanvas } from "./ascii-text-canvas";
export type { AsciiTextCanvasProps } from "./ascii-text-canvas";
export { AsciiImageCanvas, useImageMaskShader } from "./ascii-image-canvas";
export type { AsciiImageCanvasProps, UseImageMaskShaderOptions } from "./ascii-image-canvas";
export type { RippleOrigin } from "./types";

const MONO  = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
const INK   = "#26261f";
const PAPER = "#d8dbcf";
const LINE  = "#b7bbac";

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
