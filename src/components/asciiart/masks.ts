import { sampleCoverage, hash01, type DrawFn } from "./utils";

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




/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * MASK SHADER  –  fills a shape with a scrolling source string
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
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

/* TEXT MASK */
export function createTextMaskShader({ text = "TEXT", weight = 800, ...rest }: TextMaskShaderOptions = {}) {
  return createMaskShader({
    drawMask: createTextMaskDrawFn({ text, weight }),
    ...rest,
  });
}
/* SHAPE MASK (any synchronous draw fn — robust, no image/CORS) */
export function createShapeMaskShader({ drawShape, ...rest }: ShapeMaskShaderOptions = {}) {
  return createMaskShader({ drawMask: drawShape, ...rest });
}
/* IMAGE MASK (pre-loaded HTMLImageElement; CORS-enabled for remote pixels) */
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

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * RIPPLE SHADER  –  circular waves emanating from a normalized point (cx, cy)
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function flowRippleValue(G: { cols: number; rows: number; }, origin: { x: number; y: number; }, scale: number, col: number, row: number, tt: number, warp: number) {
  const cx = G.cols * origin.x * scale;
  const cy = G.rows * origin.y * scale;

  const x = col * scale;
  const y = row * scale;

  // 2. Calculate distance from the origin (Pythagorean theorem)
  const dx = x - cx;
  const cy_adjusted = y - cy;
  const dist = Math.sqrt(dx * dx + cy_adjusted * cy_adjusted);

  // 3. Optional: Add a slight warp based on angle to make it organic
  const warpedDist = dist + warp * Math.sin(Math.atan2(cy_adjusted, dx) * 4 + tt);

  // 4. The Wave: dist - time makes it move OUTWARD
  const v = Math.sin(warpedDist - tt);
  return v;
}


export function createRippleShader({
  source = " .:-=+*oad#", scale = 0.2, // smaller = larger rings
  speed = 4.0, // speed of outward expansion
  warp = 0.0, // add > 0 for imperfect, wobbly organic circles
  drawMask = null, threshold = 0.5, origin = { x: 0.5, y: 0.5 } // 0..1 normalized coordinates (default: center)
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

      // 1. Calculate the actual grid center based on the normalized origin
      // pass combined time*speed as `tt` to simplify params
      const v = flowRippleValue(G, origin, scale, col, row, t * speed, warp);

      // Normalize sine wave (-1 to 1) to (0 to 1) for the ramp array
      const normalized = Math.max(0, Math.min(1, 0.5 + v / 2));

      const ch = source[Math.min(N - 1, Math.floor(normalized * N))];
      if (ch === " ") return null;

      return { char: ch, alpha: 0.3 + 0.7 * normalized };
    },
  };
}



/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * WAVE SHADER  –  flowing value field → character ramp (the video-2 look)
 *
 * flowValue() is a domain-warped sum of sines: cheap, zero-dependency, and
 * convincingly organic. In a real project, swap it for simplex-noise's
 * noise3D(x, y, t) for richer, less-repetitive flow (≈90% of the look
 * comes from these sines though). An optional drawMask clips the wave to a
 * shape — e.g. a flowing US map.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function flowWaveValue(x: number, y: number, tt: number, warp: number) {
  const wx = x + warp * Math.sin(y * 1.3 + tt * 0.7);
  const wy = y + warp * Math.sin(x * 1.1 - tt * 0.5);
  const v = Math.sin(wx + tt) + Math.sin(wy * 1.4 - tt * 0.8) + Math.sin((wx + wy) * 0.7 + tt * 0.3);
  return Math.max(0, Math.min(1, 0.5 + v / 6));
}


export function createWaveShader({
  ramp = " .:-=+*oad#", // light → dark
  scale = 0.14, // spatial frequency (smaller = larger waves)
  speed = 1.1, // flow speed
  warp = 0.9, // domain-warp turbulence
  drawMask = null, // optional shape to clip the wave to
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
