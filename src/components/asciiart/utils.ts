
export function hash01(n: number) {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

export type DrawFn = (canvas: CanvasRenderingContext2D, cols: number, rows:number) => void; 

/* Rasterise a drawing fn into a cols×rows coverage map (alpha 0..1 per cell). */
export function sampleCoverage(drawFn: DrawFn, cols:number, rows: number) {
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
