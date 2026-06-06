import type { Metadata } from "next";
import { LocaleRedirect } from "@/components/locale-redirect";

// The root carries no content of its own — it forwards to /en or /pt — so keep
// it out of the index; crawlers reach the localized URLs via the sitemap.
export const metadata: Metadata = {
  robots: { index: false, follow: true },
  alternates: {
    languages: { en: "/en", pt: "/pt", "x-default": "/en" },
  },
};

export default function RootRedirectPage() {
  return <LocaleRedirect />;
}
