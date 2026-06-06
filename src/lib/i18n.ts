/**
 * URL-based i18n for the static export (GitHub Pages). Both locales are
 * prefixed: content lives under `/en/*` and `/pt/*`; the root `/` is a
 * client-side redirect (see `app/page.tsx`). There is no server, so locale is
 * derived from the URL path and the first-visit default is picked in the
 * browser (localStorage choice first, then `navigator.language`).
 */

export const LOCALES = ["en", "pt"] as const;
export type Locale = (typeof LOCALES)[number];

/** Locale used when a path carries no prefix (e.g. the root redirect, /asciiart). */
export const DEFAULT_LOCALE: Locale = "en";

/** localStorage key for the remembered language choice (shared with the provider). */
export const STORAGE_KEY = "aa_lang";

export function isLocale(value: string | undefined | null): value is Locale {
  return value === "en" || value === "pt";
}

/** The locale prefix of a pathname, or null when the path is locale-agnostic. */
export function extractLocale(pathname: string | null | undefined): Locale | null {
  if (!pathname) return null;
  const seg = pathname.split("/")[1];
  return isLocale(seg) ? seg : null;
}

/**
 * The equivalent path in `next`, preserving the sub-path. `usePathname()` never
 * includes the hash/query, so this only touches the locale prefix.
 *   /en/about → (pt) → /pt/about    /en → (pt) → /pt    / → (pt) → /pt
 */
export function swapLocale(pathname: string | null | undefined, next: Locale): string {
  const current = extractLocale(pathname);
  const path = pathname && pathname !== "/" ? pathname : "";
  const rest = current ? path.replace(`/${current}`, "") : path;
  return `/${next}${rest}`;
}

/**
 * Prefix an internal route with the active locale. Left untouched: external
 * URLs, `mailto:`/`tel:`, in-page anchors (`#…`), and already-localized paths.
 *   "/" → /en    "/#work" → /en#work    "/lab" → /en/lab    "#contact" → #contact
 */
export function localizeHref(href: string, lang: Locale): string {
  if (/^(https?:|mailto:|tel:|#|\/\/)/.test(href)) return href;
  if (!href.startsWith("/")) return href;
  if (extractLocale(href)) return href;
  if (href === "/") return `/${lang}`;
  if (href.startsWith("/#")) return `/${lang}${href.slice(1)}`;
  return `/${lang}${href}`;
}

/**
 * First-visit language for the root redirect: a remembered choice wins,
 * otherwise the browser language (pt* → pt), else the default. Client-only.
 */
export function pickInitialLocale(): Locale {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (isLocale(saved)) return saved;
  } catch {
    /* ignore */
  }
  try {
    if (navigator.language?.toLowerCase().startsWith("pt")) return "pt";
  } catch {
    /* ignore */
  }
  return DEFAULT_LOCALE;
}
