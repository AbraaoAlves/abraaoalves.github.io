import type { Metadata } from "next";
import { Roots } from "@/components/sections";
import { CONTENT } from "@/lib/content";
import { isLocale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = CONTENT[lang];
  return {
    title: t.nav.about,
    description: t.roots.p1,
    alternates: {
      canonical: `/${lang}/about`,
      languages: { en: "/en/about", pt: "/pt/about", "x-default": "/en/about" },
    },
  };
}

export default function AboutPage() {
  return (
    <main className="flex flex-1 flex-col">
      <Roots />
    </main>
  );
}
