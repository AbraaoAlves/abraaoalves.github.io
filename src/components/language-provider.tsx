"use client";

import * as React from "react";

export type Lang = "en" | "pt";

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  /** False until the persisted preference has been read on the client. */
  mounted: boolean;
};

const LanguageContext = React.createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "aa_lang";

/**
 * Site language state (EN / PT), persisted to localStorage and reflected on
 * <html lang>. SSR/first paint default to "en" (matching layout) so there is no
 * hydration mismatch; the stored preference is applied after mount. Content
 * consumption lives in the section components (Phase G).
 */
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = React.useState<Lang>("en");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch {
      stored = null;
    }
    if (stored === "pt" || stored === "en") {
      setLangState(stored);
      document.documentElement.lang = stored;
    }
    setMounted(true);
  }, []);

  const setLang = React.useCallback((next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
    document.documentElement.lang = next;
  }, []);

  const value = React.useMemo(
    () => ({ lang, setLang, mounted }),
    [lang, setLang, mounted]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = React.useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
