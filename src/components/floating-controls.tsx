"use client";

import * as React from "react";
import { Monitor, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useLanguage } from "./language-provider";

const themeOptions = [
  { value: "system", label: "System", Icon: Monitor },
  { value: "light", label: "Light", Icon: Sun },
  { value: "dark", label: "Dark", Icon: Moon },
] as const;

const langs = ["pt", "en"] as const;
const langNames: Record<string, string> = { en: "English", pt: "Português" };

/**
 * Fixed bottom-right controls: a `PT | EN` language toggle (Akita-style — active
 * locale in bold + underline) and a three-way theme toggle with a View
 * Transition wipe. Sits outside the header so it persists through all scroll
 * positions.
 */
export function FloatingControls() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const { lang, setLang, mounted } = useLanguage();

  // Circular clip-path wipe from the bottom-right corner
  const changeTheme = (value: string, ev: React.MouseEvent) => {
    const nextResolved =
      value === "system"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : value;

    const apply = () => {
      document.documentElement.classList.toggle("dark", nextResolved === "dark");
      setTheme(value);
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const startVT = (
      document as Document & {
        startViewTransition?: (cb: () => void) => {
          ready: Promise<void>;
          skipTransition: () => void;
        };
      }
    ).startViewTransition;

    if (!startVT || reduced || nextResolved === resolvedTheme) {
      apply();
      return;
    }

    const x = ev.clientX || window.innerWidth - 56;
    const y = ev.clientY || window.innerHeight - 40;
    const endR = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );
    const vt = startVT.call(document, apply);
    vt.ready
      .then(() => {
        const anim = document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endR}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 620,
            easing: "cubic-bezier(.4,0,.2,1)",
            pseudoElement: "::view-transition-new(root)",
          }
        );
        const guard = setTimeout(() => {
          try { vt.skipTransition(); } catch { /* ignore */ }
        }, 900);
        anim.finished.then(() => clearTimeout(guard)).catch(() => {});
      })
      .catch(() => {});
  };

  return (
    <div className="floating-controls" aria-label="Display controls">
      {/* PT | EN language toggle */}
      <div className="fc-lang" role="group" aria-label="Language">
        {langs.map((l, i) => (
          <React.Fragment key={l}>
            {i > 0 && (
              <span className="fc-lang-sep" aria-hidden="true">|</span>
            )}
            <button
              type="button"
              className={`fc-lang-opt${lang === l ? " active" : ""}`}
              aria-pressed={mounted && lang === l}
              aria-label={langNames[l]}
              onClick={() => setLang(l)}
            >
              {l.toUpperCase()}
            </button>
          </React.Fragment>
        ))}
      </div>

      <div className="fc-divider" aria-hidden="true" />

      {/* Three-way theme toggle */}
      <div className="fc-theme" role="group" aria-label="Theme">
        {themeOptions.map(({ value, label, Icon }) => (
          <button
            key={value}
            type="button"
            className="fc-icon-btn"
            aria-pressed={mounted && theme === value}
            aria-label={`${label} theme`}
            title={`${label} theme`}
            onClick={(e) => changeTheme(value, e)}
          >
            <Icon aria-hidden="true" />
          </button>
        ))}
      </div>
    </div>
  );
}
