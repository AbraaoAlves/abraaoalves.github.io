"use client";

import * as React from "react";
import { useLanguage } from "./language-provider";

const langs = ["pt", "en"] as const;
const langNames: Record<string, string> = { en: "English", pt: "Português" };

/**
 * `PT | EN` language toggle (Akita-style — active locale in bold + underline).
 * Lives in the header, to the left of the menu button. Positioning is left to
 * the parent via `className`.
 */
export function LanguageToggle({ className = "" }: { className?: string }) {
  const { lang, setLang, mounted } = useLanguage();

  return (
    <div
      className={`lang-toggle${className ? ` ${className}` : ""}`}
      role="group"
      aria-label="Language"
    >
      {langs.map((l, i) => (
        <React.Fragment key={l}>
          {i > 0 && (
            <span className="lang-sep" aria-hidden="true">
              |
            </span>
          )}
          <button
            type="button"
            className={`lang-opt${lang === l ? " active" : ""}`}
            aria-pressed={mounted && lang === l}
            aria-label={langNames[l]}
            onClick={() => setLang(l)}
          >
            {l.toUpperCase()}
          </button>
        </React.Fragment>
      ))}
    </div>
  );
}
