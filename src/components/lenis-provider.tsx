"use client";

import { useEffect } from "react";
import "lenis/dist/lenis.css";

/**
 * Ettrics-style smooth scrolling via Lenis. The Lenis engine (~7KB gzip) is a
 * progressive enhancement, so it is loaded *dynamically* after first paint
 * (`import("lenis")`) — it stays out of the initial bundle and never blocks the
 * loading page from appearing. Fully disabled under prefers-reduced-motion
 * (native scrolling is kept). The stylesheet is tiny and kept eager.
 */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let lenis: { raf: (time: number) => void; destroy: () => void } | undefined;
    let cancelled = false;

    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
      const loop = (time: number) => {
        lenis!.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}
