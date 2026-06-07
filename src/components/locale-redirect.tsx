"use client";

// The only links here are the no-JS <noscript> fallback, where raw anchors are
// the correct choice (Next's <Link> needs JS to navigate).
/* eslint-disable @next/next/no-html-link-for-pages */

import * as React from "react";
import { useRouter } from "next/navigation";
import { pickInitialLocale } from "@/lib/i18n";

/**
 * Root `/` is locale-less in this static export; there is no server to redirect
 * by `Accept-Language`, so we pick the locale in the browser (a remembered
 * choice first, then `navigator.language`). The global `BootSplash` covers the
 * cold-load window before hydration, so this component only warms and forwards
 * to the localized URL. The `<noscript>` fallback keeps both locales reachable
 * without JS / for crawlers.
 */
export function LocaleRedirect() {
  const router = useRouter();
  const redirectStartedRef = React.useRef(false);

  React.useEffect(() => {
    if (redirectStartedRef.current) return;
    redirectStartedRef.current = true;

    const target = `/${pickInitialLocale()}`;
    router.prefetch(target);
    router.replace(target);
  }, [router]);

  return (
    <noscript>
      <a href="/en">English</a> · <a href="/pt">Português</a>
    </noscript>
  );
}
