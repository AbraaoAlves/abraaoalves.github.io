"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A live proof artifact for the SmartScout case: 100,000 deterministic points
 * plotted to a single <canvas> every frame, with a real FPS meter and
 * drag-to-pan / scroll-to-zoom. No ASCII motif (that's the brand, not the work)
 * and no color — ink at low alpha on the page surface, so dense clusters build
 * up like a heatmap. The render loop only runs while the canvas is in view, and
 * collapses to a single static paint under prefers-reduced-motion.
 */
const POINT_COUNT = 100_000;
const CLUSTERS = 14;

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Deterministic, city-like clustered points in normalized [0,1]² world space.
function buildPoints(): Float32Array {
  const rnd = mulberry32(0x5ea5c0);
  const cx: number[] = [];
  const cy: number[] = [];
  const cr: number[] = [];
  for (let i = 0; i < CLUSTERS; i++) {
    cx.push(0.08 + rnd() * 0.84);
    cy.push(0.12 + rnd() * 0.76);
    cr.push(0.025 + rnd() * 0.11);
  }
  const pts = new Float32Array(POINT_COUNT * 2);
  for (let i = 0; i < POINT_COUNT; i++) {
    const c = (rnd() * CLUSTERS) | 0;
    // Cheap gaussian via the sum of three uniforms (central-limit).
    const gx = (rnd() + rnd() + rnd() - 1.5) / 1.5;
    const gy = (rnd() + rnd() + rnd() - 1.5) / 1.5;
    pts[i * 2] = cx[c] + gx * cr[c];
    pts[i * 2 + 1] = cy[c] + gy * cr[c];
  }
  return pts;
}

export function PointFieldDemo() {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fps, setFps] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    if (!canvas || !stage) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    setReduced(prefersReduced);

    const points = buildPoints();
    let scale = 1;
    let offX = 0;
    let offY = 0;
    let w = 1;
    let h = 1;
    let dpr = 1;
    let img = ctx.createImageData(1, 1);

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = stage!.getBoundingClientRect();
      w = Math.max(1, Math.floor(rect.width * dpr));
      h = Math.max(1, Math.floor(rect.height * dpr));
      canvas!.width = w;
      canvas!.height = h;
      img = ctx!.createImageData(w, h);
    }

    function inkRGB(): [number, number, number] {
      const m = getComputedStyle(canvas!).color.match(/\d+/g);
      return m ? [+m[0], +m[1], +m[2]] : [231, 233, 233];
    }

    function draw() {
      const data = img.data;
      data.fill(0);
      const [r, g, b] = inkRGB();
      const base = Math.min(w, h);
      const s = base * scale;
      const cxp = w / 2 + offX * dpr;
      const cyp = h / 2 + offY * dpr;
      for (let i = 0; i < POINT_COUNT; i++) {
        const sx = (((points[i * 2] - 0.5) * s + cxp) | 0);
        const sy = (((points[i * 2 + 1] - 0.5) * s + cyp) | 0);
        if (sx < 0 || sy < 0 || sx >= w || sy >= h) continue;
        const idx = (sy * w + sx) * 4;
        data[idx] = r;
        data[idx + 1] = g;
        data[idx + 2] = b;
        data[idx + 3] = data[idx + 3] + 26;
      }
      ctx!.putImageData(img, 0, 0);
    }

    let raf = 0;
    let running = false;
    let last = 0;
    let acc = 0;
    let frames = 0;
    function loop(now: number) {
      if (last) {
        acc += now - last;
        frames++;
        if (acc >= 500) {
          setFps(Math.round((frames * 1000) / acc));
          acc = 0;
          frames = 0;
        }
      }
      last = now;
      draw();
      raf = requestAnimationFrame(loop);
    }
    function start() {
      if (running) return;
      running = true;
      if (prefersReduced) {
        draw();
        return;
      }
      last = 0;
      raf = requestAnimationFrame(loop);
    }
    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    resize();

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) start();
          else stop();
        }
      },
      { threshold: 0.05 },
    );
    io.observe(stage);

    let dragging = false;
    let lx = 0;
    let ly = 0;
    const onDown = (e: PointerEvent) => {
      dragging = true;
      lx = e.clientX;
      ly = e.clientY;
      canvas.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      offX += e.clientX - lx;
      offY += e.clientY - ly;
      lx = e.clientX;
      ly = e.clientY;
      if (!running || prefersReduced) draw();
    };
    const onUp = (e: PointerEvent) => {
      dragging = false;
      try {
        canvas.releasePointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
    };
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      scale = Math.min(40, Math.max(0.4, scale * (e.deltaY < 0 ? 1.12 : 0.89)));
      if (!running || prefersReduced) draw();
    };
    canvas.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    canvas.addEventListener("wheel", onWheel, { passive: false });

    const onResize = () => {
      resize();
      if (prefersReduced) draw();
    };
    window.addEventListener("resize", onResize);

    // Repaint on theme switch when the loop isn't running.
    const themeObs = new MutationObserver(() => {
      if (!running || prefersReduced) draw();
    });
    themeObs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      io.disconnect();
      themeObs.disconnect();
      stop();
      canvas.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <figure className="point-demo not-prose">
      <div className="point-demo-stage" ref={stageRef}>
        <canvas
          ref={canvasRef}
          className="point-demo-canvas"
          aria-label="Live demo: 100,000 points rendered on a single canvas. Drag to pan, scroll to zoom."
        />
      </div>
      <figcaption className="point-demo-cap">
        <span>100,000 points · single canvas</span>
        <span>
          {reduced
            ? "static · drag to explore"
            : `${fps || 60} fps · drag to explore`}
        </span>
      </figcaption>
    </figure>
  );
}
