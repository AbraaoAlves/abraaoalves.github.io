"use client";

import * as React from "react";
import { Globe, Monitor, Sun, Moon, ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";
import { useLanguage } from "./language-provider";

const themeOptions = [
  { value: "system", label: "System", Icon: Monitor },
  { value: "light", label: "Light", Icon: Sun },
  { value: "dark", label: "Dark", Icon: Moon },
] as const;

const langLabels: Record<string, string> = { en: "English", pt: "Português" };

/**
 * Fixed bottom-right controls: language dropdown (Akita-style) + three-way
 * theme toggle with View Transition wipe. Sits outside the header so it
 * persists through all scroll positions.
 */
export function FloatingControls() {
  const [langOpen, setLangOpen] = React.useState(false);
  const { theme, resolvedTheme, setTheme } = useTheme();
  const { lang, setLang } = useLanguage();
  const langRef = React.useRef<HTMLDivElement>(null);

  // Close language dropdown on outside click or Escape
  React.useEffect(() => {
    if (!langOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLangOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [langOpen]);

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
      {/* Language dropdown */}
      <div className="fc-lang" ref={langRef}>
        <button
          type="button"
          className="fc-lang-btn"
          aria-haspopup="listbox"
          aria-expanded={langOpen}
          aria-label="Select language"
          onClick={() => setLangOpen((o) => !o)}
        >
          <Globe aria-hidden="true" />
          <span className="fc-lang-label">{langLabels[lang]}</span>
          <ChevronDown className={`fc-chevron${langOpen ? " open" : ""}`} aria-hidden="true" />
        </button>

        {langOpen && (
          <ul className="fc-lang-menu" role="listbox" aria-label="Language">
            {(["en", "pt"] as const).map((l) => (
              <li key={l} role="option" aria-selected={lang === l}>
                <button
                  type="button"
                  onClick={() => { setLang(l); setLangOpen(false); }}
                >
                  {langLabels[l]}
                  {lang === l && <span className="fc-check" aria-hidden="true">✓</span>}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="fc-divider" aria-hidden="true" />

      {/* Three-way theme toggle */}
      <div className="fc-theme" role="group" aria-label="Theme">
        {themeOptions.map(({ value, label, Icon }) => (
          <button
            key={value}
            type="button"
            className="fc-icon-btn"
            aria-pressed={theme !== undefined && theme === value}
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
