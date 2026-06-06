"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  DEFAULT_LOCALE,
  STORAGE_KEY,
  extractLocale,
  swapLocale,
  type Locale,
} from "@/lib/i18n";

export type Lang = Locale;

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  /** False until hydrated on the client (for aria state that must match SSR). */
  mounted: boolean;
};

const LanguageContext = React.createContext<LanguageContextValue | null>(null);

/** No-op store subscription — `mounted` only needs the server/client snapshot split. */
const emptySubscribe = () => () => {};

/**
 * Site language state, now driven by the URL (`/en/*`, `/pt/*`) for SEO — the
 * locale is the first path segment, so server and client always agree (no
 * hydration mismatch). `setLang` navigates to the equivalent path in the other
 * locale and remembers the choice in localStorage for the root redirect. The
 * `useLanguage()` API is unchanged, so consumers keep reading `CONTENT[lang]`.
 */
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const lang = extractLocale(pathname) ?? DEFAULT_LOCALE;

  // False on the server / first paint, true once hydrated — no setState-in-effect.
  const mounted = React.useSyncExternalStore(emptySubscribe, () => true, () => false);

  React.useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = React.useCallback(
    (next: Lang) => {
      if (next === lang) return;
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* ignore */
      }
      router.push(swapLocale(pathname, next));
    },
    [lang, pathname, router]
  );

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
