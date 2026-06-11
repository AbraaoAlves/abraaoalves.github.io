"use client";

import * as React from "react";
import { useLanguage } from "./language-provider";

const langs = ["pt", "en"] as const;
const langNames: Record<string, string> = { en: "English", pt: "Português" };

/**
 * Fixed bottom-right `PT | EN` language toggle (Akita-style — active locale in
 * bold + underline). The theme toggle now lives in the footer (ettrics-style),
 * so this widget only carries language.
 */
export function FloatingControls() {
  const { lang, setLang, mounted } = useLanguage();

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
    </div>
  );
}
