"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

/**
 * Scroll-triggered reveal (proto/index.html): content slides up and fades in
 * once when it enters the viewport.
 *
 * Robustness: `.reveal` is visible by default; the hidden start state only
 * applies under `.js-anim` (added pre-paint by an inline script in the layout).
 * So if JS never runs — no-JS, static export, crawlers — content is shown
 * regardless. A stall guard force-shows the element if the transition never
 * advances (throttled/background tab). Honors prefers-reduced-motion via CSS.
 *
 * `delay` is in seconds, applied as a transition-delay to stagger groups.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let guard: ReturnType<typeof setTimeout> | undefined;
    const show = () => {
      el.classList.add("in");
      // If the reveal transition never advances (paused timeline), snap visible
      // so content is never trapped.
      guard = setTimeout(() => {
        if (parseFloat(getComputedStyle(el).opacity) < 0.05) {
          el.classList.add("reveal-force");
        }
      }, 1000);
    };

    if (!("IntersectionObserver" in window)) {
      show();
      return () => guard && clearTimeout(guard);
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            show();
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      if (guard) clearTimeout(guard);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={className ? `reveal ${className}` : "reveal"}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}
