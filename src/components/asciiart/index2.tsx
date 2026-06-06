"use client";

import { useCallback, useState, useEffect, useRef, useMemo } from "react";
import type { CSSProperties, MouseEventHandler, MouseEvent } from "react";

// --- Types ---
export type RippleOrigin = { x: number; y: number };

export type AsciiCanvasBaseProps = {
  fontSize?: number;
  lineHeight?: number;
  color?: string;
  background?: string;
  fps?: number;
  className?: string;
  style?: CSSProperties;
};

export type InteractiveRippleProps = {
  ripple?: boolean;
  clickable?: boolean;
  origin?: RippleOrigin;
  onOriginChange?: (origin: RippleOrigin) => void;
};

// --- Utils ---
export function hash01(n: number) {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

export type DrawFn = (canvas: CanvasRenderingContext2D, cols: number, rows: number) => void;

/** Rasterise a drawing fn into a cols×rows coverage map (alpha 0..1 per cell). */
export function sampleCoverage(drawFn: DrawFn, cols: number, rows: number) {
  const cov = new Float32Array(cols * rows);
  const oc = document.createElement("canvas");
  oc.width = cols; oc.height = rows;

  try {
    const o = oc.getContext("2d", { willReadFrequently: true });
    if (!o) throw Error('2D CONTEXT: could not be created in canvas:');
    o.clearRect(0, 0, cols, rows);
    drawFn(o, cols, rows);
    const d = o.getImageData(0, 0, cols, rows).data;
    for (let i = 0; i < cov.length; i++) cov[i] = d[i * 4 + 3] / 255;
  } catch (e) {
    console.warn("ASCII mask: could not read pixels", e);
  }
  return cov;
}

// --- Shader Logic ---
export type ShaderCell = { char: string; alpha: number };

export type Shader = {
  setup: (param: { cols: number; rows: number }) => void;
  cell: (col: number, row: number, t: number) => ShaderCell | null;
};

export type MaskShaderOptions = {
  drawMask?: DrawFn;
  source?: string;
  speed?: number;
  threshold?: number;
  feather?: number;
  phaseJitter?: number;
};

export type TextMaskShaderOptions = Omit<MaskShaderOptions, "drawMask"> & {
  text?: string;
  weight?: number;
};

export type ShapeMaskShaderOptions = Omit<MaskShaderOptions, "drawMask"> & {
  drawShape?: DrawFn;
};

export type ImageMaskShaderOptions = Omit<MaskShaderOptions, "drawMask"> & {
  img?: HTMLImageElement;
};

export type RippleShaderOptions = {
  source?: string;
  scale?: number;
  speed?: number;
  warp?: number;
  drawMask?: DrawFn | null;
  threshold?: number;
  feather?: number;
  phaseJitter?: number;
  origin?: { x: number; y: number };
};

export type WaveShaderOptions = {
  ramp?: string;
  scale?: number;
  speed?: number;
  warp?: number;
  drawMask?: DrawFn | null;
  threshold?: number;
};

function createMaskShader({
  drawMask, source = "hello ", speed = 7, threshold = 0.34, feather = 0.6, phaseJitter = 1,
}: MaskShaderOptions = {}): Shader {
  let cov = new Float32Array(0);
  let phases = new Int32Array(0);
  let G = { cols: 0, rows: 0 };
  const src = source || " ";
  const L = src.length;

  return {
    setup({ cols, rows }) {
      G = { cols, rows };
      cov = sampleCoverage(drawMask as DrawFn, cols, rows);
      phases = new Int32Array(cols);
      for (let c = 0; c < cols; c++)
        phases[c] = Math.floor(hash01(c + 1) * L * phaseJitter);
    },
    cell(col, row, t) {
      const c = cov[row * G.cols + col];
      if (!c || c < threshold) return null;
      const idx = (((row + phases[col] - Math.floor(t * speed)) % L) + L) % L;
      const ch = src[idx];
      if (ch === " ") return null;
      return { char: ch, alpha: Math.min(1, Math.pow(c, feather)) };
    },
  };
}

export function createTextMaskDrawFn({ text = "TEXT", weight = 800 }: Pick<TextMaskShaderOptions, "text" | "weight"> = {}): DrawFn {
  return (ctx, cols, rows) => {
    const lines = text.split("\n");
    const probe = 100;
    ctx.font = `${weight} ${probe}px ui-sans-serif, system-ui, sans-serif`;
    let maxW = 1;
    for (const l of lines) maxW = Math.max(maxW, ctx.measureText(l).width || 1);
    const lineGap = 1.04;
    const fs = Math.max(1, probe * Math.min(
      (cols * 0.92) / maxW,
      (rows * 0.82) / (lines.length * probe * lineGap)
    ));
    ctx.font = `${weight} ${fs}px ui-sans-serif, system-ui, sans-serif`;
    ctx.fillStyle = "#000"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
    const lh = fs * lineGap;
    let y = rows / 2 - (lines.length * lh) / 2 + lh / 2;
    for (const l of lines) { ctx.fillText(l, cols / 2, y); y += lh; }
  };
}

export function createTextMaskShader({ text = "TEXT", weight = 800, ...rest }: TextMaskShaderOptions = {}) {
  return createMaskShader({
    drawMask: createTextMaskDrawFn({ text, weight }),
    ...rest,
  });
}

export function createShapeMaskShader({ drawShape, ...rest }: ShapeMaskShaderOptions = {}) {
  return createMaskShader({ drawMask: drawShape, ...rest });
}

export function createImageMaskShader({ img, ...rest }: ImageMaskShaderOptions = {}) {
  return createMaskShader({
    drawMask(ctx: CanvasRenderingContext2D, cols: number, rows: number) {
      const nw = img!.naturalWidth || 1, nh = img!.naturalHeight || 1;
      const scale = Math.min(cols / nw, rows / nh);
      ctx.drawImage(img!, (cols - nw * scale) / 2, (rows - nh * scale) / 2, nw * scale, nh * scale);
    },
    ...rest,
  });
}

function flowRippleValue(G: { cols: number; rows: number; }, origin: { x: number; y: number; }, scale: number, col: number, row: number, tt: number, warp: number) {
  const cx = G.cols * origin.x * scale;
  const cy = G.rows * origin.y * scale;
  const x = col * scale;
  const y = row * scale;
  const dx = x - cx;
  const cy_adjusted = y - cy;
  const dist = Math.sqrt(dx * dx + cy_adjusted * cy_adjusted);
  const warpedDist = dist + warp * Math.sin(Math.atan2(cy_adjusted, dx) * 4 + tt);
  const v = Math.sin(warpedDist - tt);
  return v;
}

export function createRippleShader({
  source = " .:-=+*oad#", scale = 0.2,
  speed = 4.0,
  warp = 0.0,
  drawMask = null, threshold = 0.5, origin = { x: 0.5, y: 0.5 }
}: RippleShaderOptions = {}): Shader {
  let cov: Float32Array<ArrayBuffer> | null = null;
  let G = { cols: 0, rows: 0 };
  const N = source.length;

  return {
    setup({ cols, rows }) {
      G = { cols, rows };
      cov = drawMask ? sampleCoverage(drawMask, cols, rows) : null;
    },
    cell(col, row, t) {
      if (cov && cov[row * G.cols + col] < threshold) return null;
      const v = flowRippleValue(G, origin, scale, col, row, t * speed, warp);
      const normalized = Math.max(0, Math.min(1, 0.5 + v / 2));
      const ch = source[Math.min(N - 1, Math.floor(normalized * N))];
      if (ch === " ") return null;
      return { char: ch, alpha: 0.3 + 0.7 * normalized };
    },
  };
}

function flowWaveValue(x: number, y: number, tt: number, warp: number) {
  const wx = x + warp * Math.sin(y * 1.3 + tt * 0.7);
  const wy = y + warp * Math.sin(x * 1.1 - tt * 0.5);
  const v = Math.sin(wx + tt) + Math.sin(wy * 1.4 - tt * 0.8) + Math.sin((wx + wy) * 0.7 + tt * 0.3);
  return Math.max(0, Math.min(1, 0.5 + v / 6));
}

export function createWaveShader({
  ramp = " .:-=+*oad#",
  scale = 0.14,
  speed = 1.1,
  warp = 0.9,
  drawMask = null,
  threshold = 0.5,
}: WaveShaderOptions = {}): Shader {
  let cov: Float32Array<ArrayBuffer> | null = null;
  let G = { cols: 0, rows: 0 };
  const N = ramp.length;
  return {
    setup({ cols, rows }) {
      G = { cols, rows };
      cov = drawMask ? sampleCoverage(drawMask, cols, rows) : null;
    },
    cell(col, row, t) {
      if (cov && cov[row * G.cols + col] < threshold) return null;
      const v = flowWaveValue(col * scale, row * scale, t * speed, warp);
      const ch = ramp[Math.min(N - 1, Math.floor(v * N))];
      if (ch === " ") return null;
      return { char: ch, alpha: 0.3 + 0.7 * v };
    },
  };
}

// --- Hook ---
const clamp01 = (value: number) => Math.max(0, Math.min(1, value));

export function useRippleOrigin({
  clickable = false,
  defaultOrigin = { x: 0.5, y: 0.5 },
  origin,
  onOriginChange,
}: {
  clickable?: boolean;
  defaultOrigin?: RippleOrigin;
  origin?: RippleOrigin;
  onOriginChange?: (origin: RippleOrigin) => void;
}) {
  const [internalOrigin, setInternalOrigin] = useState(defaultOrigin);
  const resolvedOrigin = origin ?? internalOrigin;

  const handleClick = useCallback((event: MouseEvent<HTMLDivElement>) => {
    if (!clickable) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const nextOrigin = {
      x: rect.width ? clamp01((event.clientX - rect.left) / rect.width) : 0.5,
      y: rect.height ? clamp01((event.clientY - rect.top) / rect.height) : 0.5,
    };

    setInternalOrigin(nextOrigin);
    onOriginChange?.(nextOrigin);
  }, [clickable, onOriginChange]);

  return {
    origin: resolvedOrigin,
    handleClick,
    cursor: clickable ? "crosshair" : undefined,
  };
}

// --- Drawing Helpers ---
const US_POLY = [
  [10, 46], [10, 20], [150, 16], [300, 14], [440, 14], [560, 16],
  [650, 22], [710, 34], [748, 54], [802, 54],
  [892, 62], [956, 84], [980, 110], [982, 142],
  [968, 182], [948, 212], [926, 252], [896, 296],
  [860, 336], [826, 378], [792, 420],
  [768, 452], [778, 488], [784, 524], [780, 560],
  [764, 584], [746, 596], [730, 580], [725, 546], [720, 510], [710, 476],
  [686, 456], [648, 452], [610, 458], [582, 450], [556, 460], [520, 452], [488, 470],
  [456, 510], [452, 548], [418, 512], [378, 494],
  [330, 470], [268, 440], [198, 420], [150, 408],
  [120, 400], [100, 360], [54, 300], [20, 236], [10, 180], [10, 96],
];

export function drawUSMap(ctx: CanvasRenderingContext2D, cols: number, rows: number) {
  const NW = 1000, NH = 600, CELL = 0.6;
  const sc = Math.min((cols * CELL) / NW, rows / NH);
  const drawW = (NW * sc) / CELL, drawH = NH * sc;
  ctx.save();
  ctx.translate((cols - drawW) / 2, (rows - drawH) / 2);
  ctx.scale(drawW / NW, drawH / NH);
  ctx.fillStyle = "#000";
  ctx.beginPath();
  ctx.moveTo(US_POLY[0][0], US_POLY[0][1]);
  for (let i = 1; i < US_POLY.length; i++) ctx.lineTo(US_POLY[i][0], US_POLY[i][1]);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

const LOGO_OUTER = [[374, 565], [684.4, 27.3], [995, 565]];
const LOGO_INNER = [[684.4, 207.3], [477.9, 565], [891.1, 565]];
const LOGO_DARK_1 = [[995.8, 562.4], [837.4, 471.8], [685.2, 210.1], [684.8, 27.7]];
const LOGO_DARK_2 = [[550, 565.7], [653.1, 566.5], [738.2, 420.3], [686.6, 330.9]];
const LOGO_DARK_3 = [[999.6, 562.5], [891.5, 563.8], [836.5, 470.6]];

export function drawLogo(ctx: CanvasRenderingContext2D, cols: number, rows: number) {
  const NW = 680, NH = 680, CELL = 0.6;
  const sc = Math.min((cols * CELL) / NW, rows / NH);
  const drawW = (NW * sc) / CELL, drawH = NH * sc;
  ctx.save();
  ctx.translate((cols - drawW) / 2, (rows - drawH) / 2);
  ctx.scale(drawW / NW, drawH / NH);
  ctx.translate(-344, 44);

  ctx.fillStyle = "#5B9BD5";
  ctx.beginPath();
  ctx.moveTo(LOGO_OUTER[0][0], LOGO_OUTER[0][1]);
  for (let i = 1; i < LOGO_OUTER.length; i++)
    ctx.lineTo(LOGO_OUTER[i][0], LOGO_OUTER[i][1]);
  ctx.closePath();
  ctx.moveTo(LOGO_INNER[0][0], LOGO_INNER[0][1]);
  for (let i = 1; i < LOGO_INNER.length; i++)
    ctx.lineTo(LOGO_INNER[i][0], LOGO_INNER[i][1]);
  ctx.closePath();
  ctx.fill("evenodd");

  ctx.fillStyle = "#1F4E79";
  ctx.beginPath();
  ctx.moveTo(LOGO_DARK_1[0][0], LOGO_DARK_1[0][1]);
  for (let i = 1; i < LOGO_DARK_1.length; i++)
    ctx.lineTo(LOGO_DARK_1[i][0], LOGO_DARK_1[i][1]);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(LOGO_DARK_2[0][0], LOGO_DARK_2[0][1]);
  for (let i = 1; i < LOGO_DARK_2.length; i++)
    ctx.lineTo(LOGO_DARK_2[i][0], LOGO_DARK_2[i][1]);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(LOGO_DARK_3[0][0], LOGO_DARK_3[0][1]);
  for (let i = 1; i < LOGO_DARK_3.length; i++)
    ctx.lineTo(LOGO_DARK_3[i][0], LOGO_DARK_3[i][1]);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

// --- Core AsciiCanvas Component ---
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

// --- Main Components ---

export type UseImageMaskShaderOptions = Omit<ImageMaskShaderOptions, "img"> & {
  src?: string;
  crossOrigin?: "" | "anonymous" | "use-credentials";
  ripple?: boolean;
  origin?: RippleOrigin;
  scale?: number;
  warp?: number;
};

export type AsciiImageCanvasProps = AsciiCanvasBaseProps & InteractiveRippleProps & UseImageMaskShaderOptions;

function createImageDrawMask(img: HTMLImageElement): DrawFn {
  return (ctx, cols, rows) => {
    const nw = img.naturalWidth || 1, nh = img.naturalHeight || 1;
    const scale = Math.min(cols / nw, rows / nh);
    ctx.drawImage(img, (cols - nw * scale) / 2, (rows - nh * scale) / 2, nw * scale, nh * scale);
  };
}

export function useImageMaskShader({
  src,
  crossOrigin = "anonymous",
  ripple = false,
  origin = { x: 0.5, y: 0.5 },
  source,
  speed,
  threshold,
  feather,
  phaseJitter,
  scale,
  warp,
}: UseImageMaskShaderOptions): Shader | null {
  const cacheKey = src ? `${crossOrigin}:${src}` : null;
  const [loadedImage, setLoadedImage] = useState<{ cacheKey: string; img: HTMLImageElement } | null>(null);
  const img = loadedImage?.cacheKey === cacheKey ? loadedImage.img : null;

  useEffect(() => {
    if (!src) return;

    let cancelled = false;
    const image = new Image();
    image.crossOrigin = crossOrigin;
    image.onload = () => { if (!cancelled) setLoadedImage({ cacheKey: `${crossOrigin}:${src}`, img: image }); };
    image.onerror = () => console.warn("ASCII mask: image failed to load", src);
    image.src = src;
    return () => { cancelled = true; };
  }, [crossOrigin, src]);

  return useMemo(() => {
    if (!img) return null;

    if (ripple) {
      return createRippleShader({
        drawMask: createImageDrawMask(img),
        source,
        speed,
        threshold,
        scale,
        warp,
        origin,
      });
    }

    return createImageMaskShader({ img, source, speed, threshold, feather, phaseJitter });
  }, [feather, img, origin, phaseJitter, ripple, scale, source, speed, threshold, warp]);
}

/**
 * AsciiImageCanvas component renders an image as ASCII art.
 * 
 * @example
 * ```tsx
 * <AsciiImageCanvas 
 *   src="/path/to/image.jpg" 
 *   ripple={true} 
 *   clickable={true} 
 *   source="ascii " 
 * />
 * ```
 */
export function AsciiImageCanvas({
  clickable = false,
  origin,
  onOriginChange,
  ripple = false,
  src,
  crossOrigin,
  source,
  speed,
  threshold,
  feather,
  phaseJitter,
  scale,
  warp,
  fontSize = 12,
  lineHeight,
  color,
  background,
  fps,
  className,
  style,
}: AsciiImageCanvasProps) {
  const selectedOrigin = useRippleOrigin({ clickable, origin, onOriginChange });
  const shader = useImageMaskShader({
    src,
    crossOrigin,
    ripple,
    origin: selectedOrigin.origin,
    source,
    speed,
    threshold,
    feather,
    phaseJitter,
    scale,
    warp,
  });

  return (
    <AsciiCanvas
      shader={shader}
      fontSize={fontSize}
      lineHeight={lineHeight}
      color={color}
      background={background}
      fps={fps}
      className={className}
      style={{ minHeight: 320, ...style, cursor: selectedOrigin.cursor ?? style?.cursor }}
      onClick={selectedOrigin.handleClick}
    />
  );
}

export type AsciiTextCanvasProps = AsciiCanvasBaseProps & InteractiveRippleProps & {
  text?: string;
  source?: string;
  speed?: number;
  threshold?: number;
  feather?: number;
  phaseJitter?: number;
  weight?: number;
  scale?: number;
  warp?: number;
};

/**
 * AsciiTextCanvas component renders text as ASCII art.
 * 
 * @example
 * ```tsx
 * <AsciiTextCanvas 
 *   text="HELLO" 
 *   source="typescript " 
 *   ripple={true} 
 * />
 * ```
 */
export function AsciiTextCanvas({
  text = "TEXT",
  ripple = false,
  clickable = false,
  origin,
  onOriginChange,
  source = "typescriptdeveloper ",
  speed = 7,
  threshold = 0.34,
  feather = 0.6,
  phaseJitter = 1,
  weight = 800,
  scale = 0.2,
  warp = 0,
  fontSize = 12,
  lineHeight,
  color,
  background,
  fps,
  className,
  style,
}: AsciiTextCanvasProps) {
  const selectedOrigin = useRippleOrigin({ clickable, origin, onOriginChange });
  const drawMask = useMemo(() => createTextMaskDrawFn({ text, weight }), [text, weight]);

  const shader = useMemo(
    () => ripple
      ? createRippleShader({ drawMask, source, speed, threshold, scale, warp, origin: selectedOrigin.origin })
      : createTextMaskShader({ text, source, speed, threshold, feather, phaseJitter, weight }),
    [drawMask, feather, phaseJitter, ripple, scale, selectedOrigin.origin, source, speed, text, threshold, warp, weight]
  );

  return (
    <AsciiCanvas
      shader={shader}
      fontSize={fontSize}
      lineHeight={lineHeight}
      color={color}
      background={background}
      fps={fps}
      className={className}
      style={{ minHeight: 300, ...style, cursor: selectedOrigin.cursor ?? style?.cursor }}
      onClick={selectedOrigin.handleClick}
    />
  );
}

export type AsciiArtCanvasProps = AsciiCanvasBaseProps & InteractiveRippleProps & {
  art?: "USmap" | "logo";
  source?: string;
  speed?: number;
  threshold?: number;
  feather?: number;
  phaseJitter?: number;
  scale?: number;
  warp?: number;
};

/**
 * AsciiArtCanvas component renders pre-defined vector art (logo or US map) as ASCII art.
 * 
 * @example
 * ```tsx
 * <AsciiArtCanvas 
 *   art="logo" 
 *   ripple={true} 
 *   source="developer " 
 * />
 * ```
 */
export function AsciiArtCanvas({
  art = "logo",
  ripple = true,
  clickable = false,
  origin,
  onOriginChange,
  source = "developer ",
  speed = 7,
  threshold = 0.5,
  feather = 0.7,
  phaseJitter = 1,
  scale = 0.2,
  warp = 0,
  fontSize = 12,
  lineHeight,
  color,
  background,
  fps,
  className,
  style,
}: AsciiArtCanvasProps) {
  const selectedOrigin = useRippleOrigin({ clickable, origin, onOriginChange });
  const drawMask = art === "USmap" ? drawUSMap : drawLogo;

  const shader = useMemo(
    () => ripple
      ? createRippleShader({ drawMask, source, speed, threshold, scale, warp, origin: selectedOrigin.origin })
      : createShapeMaskShader({ drawShape: drawMask, source, speed, threshold, feather, phaseJitter }),
    [drawMask, feather, phaseJitter, ripple, scale, selectedOrigin.origin, source, speed, threshold, warp]
  );

  return (
    <AsciiCanvas
      shader={shader}
      fontSize={fontSize}
      lineHeight={lineHeight}
      color={color}
      background={background}
      fps={fps}
      className={className}
      style={{ minHeight: 320, ...style, cursor: selectedOrigin.cursor ?? style?.cursor }}
      onClick={selectedOrigin.handleClick}
    />
  );
}
