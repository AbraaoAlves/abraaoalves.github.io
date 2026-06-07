"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Cold-load splash for slow connections. Client components are still
 * server-rendered into the static HTML, so this paints on the first byte —
 * before React hydrates and before the ~190KB JS baseline finishes downloading.
 * Once React mounts on a localized route it fades out, handing off to the real
 * content. On `/`, it stays visible until the client redirect reaches `/en` or
 * `/pt`, avoiding a flash of the empty redirect shell.
 *
 * Self-contained: the CSS is inlined and uses hardcoded palette hexes (not the
 * globals.css tokens) so it renders correctly even if that stylesheet hasn't
 * loaded yet. Theme follows next-themes' pre-paint `.dark` class, with a
 * prefers-color-scheme fallback. The logo is a monochrome (currentColor)
 * version of the site mark. Under `<noscript>` the splash is hidden so no-JS
 * visitors and crawlers see the real content beneath it.
 */
const BOOT_CSS = `
#boot-splash{position:fixed;inset:0;z-index:9999;display:flex;align-items:center;
  justify-content:center;background:#f6f5f2;color:#1d2022;
  transition:opacity .45s ease;will-change:opacity}
@media (prefers-color-scheme:dark){#boot-splash{background:#0b0c0d;color:#e7e9e9}}
:root.dark #boot-splash{background:#0b0c0d;color:#e7e9e9}
:root:not(.dark) #boot-splash{background:#f6f5f2;color:#1d2022}
#boot-splash.is-hidden{opacity:0;pointer-events:none;visibility:hidden}
#boot-splash .bs-inner{display:flex;flex-direction:column;align-items:center;gap:18px}
#boot-splash svg{width:84px;height:84px;display:block}
#boot-splash .bs-text{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;
  font-size:13px;letter-spacing:.2em;text-transform:uppercase;opacity:.8;
  animation:bs-pulse 1.4s ease-in-out infinite}
@keyframes bs-pulse{0%,100%{opacity:.35}50%{opacity:.85}}
@media (prefers-reduced-motion:reduce){#boot-splash .bs-text{animation:none}}
`;

export function BootSplash() {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (pathname === "/") {
      el.classList.remove("is-hidden");
      return;
    }

    const frame = requestAnimationFrame(() => {
      el.classList.add("is-hidden");
    });

    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: BOOT_CSS }} />
      <noscript>
        <style dangerouslySetInnerHTML={{ __html: "#boot-splash{display:none!important}" }} />
      </noscript>
      <div id="boot-splash" ref={ref} aria-hidden="true">
        <div className="bs-inner">
          {/* Monochrome site mark (two-tone via opacity), inherits color. */}
          <svg viewBox="344 -44 680 680" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Abraão Alves">
            <path fill="currentColor" fillRule="evenodd"
              d="M374,565 L684.4,27.3 L995,565 Z M684.4,207.3 L477.9,565 L891.1,565 Z" />
            <path fill="currentColor" opacity="0.55" d="M995.8,562.4L837.4,471.8L685.2,210.1L684.8,27.7l311,534.7Z" />
            <path fill="currentColor" opacity="0.55" d="M550,565.7l103.1,0.8L738.2,420.3L686.6,330.9L550,565.7Z" />
            <path fill="currentColor" opacity="0.55" d="M999.6,562.5l-108.1,1.3l-55,-93.2l163.1,91.9Z" />
          </svg>
          <span className="bs-text">loading…</span>
        </div>
      </div>
    </>
  );
}
