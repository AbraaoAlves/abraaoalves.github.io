"use client";

// The only links here are the no-JS <noscript> fallback, where raw anchors are
// the correct choice (Next's <Link> needs JS to navigate).
/* eslint-disable @next/next/no-html-link-for-pages */

import * as React from "react";
import { useRouter } from "next/navigation";
import { pickInitialLocale } from "@/lib/i18n";

/**
 * Root `/` is locale-less in this static export; there is no server to redirect
 * by `Accept-Language`, so we pick the locale in the browser — a remembered
 * choice first, then `navigator.language` — and replace the URL. The `<noscript>`
 * fallback keeps both locales reachable without JS / for crawlers.
 */
export function LocaleRedirect() {
  const router = useRouter();

  React.useEffect(() => {
    router.replace(`/${pickInitialLocale()}`);
  }, [router]);

  return (
    <main className="flex flex-1 items-center justify-center p-8">
      <p className="text-sm" style={{ color: "var(--fg-3)", fontFamily: "var(--font-mono)" }}>
        Redirecting…{" "}
        <noscript>
          <a href="/en">English</a> · <a href="/pt">Português</a>
        </noscript>
      </p>
    </main>
  );
}
