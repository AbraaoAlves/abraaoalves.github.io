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

/** Same-tab subscribers, notified by setLang (the `storage` event is cross-tab only). */
const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  window.addEventListener("storage", callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
}

function readStored(): Lang {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "pt" || stored === "en") return stored;
  } catch {
    /* ignore */
  }
  return "en";
}

/**
 * Site language state (EN / PT), persisted to localStorage and reflected on
 * <html lang>. SSR/first paint default to "en" (matching layout); the stored
 * preference is read via useSyncExternalStore, which swaps in the client value
 * after hydration with no mismatch. Content consumption lives in the section
 * components (Phase G).
 */
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const lang = React.useSyncExternalStore<Lang>(subscribe, readStored, () => "en");
  // True once hydrated on the client; server/first paint report false.
  const mounted = React.useSyncExternalStore(subscribe, () => true, () => false);

  React.useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = React.useCallback((next: Lang) => {
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
    listeners.forEach((l) => l());
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
