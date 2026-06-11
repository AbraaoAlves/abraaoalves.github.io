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

/**
 * Three-way theme toggle (System / Light / Dark) with a circular View-Transition
 * wipe from the click point. Lives in the footer (ettrics keeps its theme
 * switch there) — positioning is left to the parent via `className`.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const { mounted } = useLanguage();

  // Circular clip-path wipe from the click point.
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
    <div className={`theme-toggle${className ? ` ${className}` : ""}`} role="group" aria-label="Theme">
      {themeOptions.map(({ value, label, Icon }) => (
        <button
          key={value}
          type="button"
          className="theme-opt"
          aria-pressed={mounted && theme === value}
          aria-label={`${label} theme`}
          title={`${label} theme`}
          onClick={(e) => changeTheme(value, e)}
        >
          <Icon aria-hidden="true" />
        </button>
      ))}
    </div>
  );
}
