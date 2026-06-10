import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LOCALES, isLocale } from "@/lib/i18n";
import { CONTENT } from "@/lib/content";
import { JsonLd } from "@/components/json-ld";
import { personLd } from "@/lib/structured-data";

/** Build a static page per locale: /en/* and /pt/*. */
export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const meta = CONTENT[lang].meta;
  return {
    title: { default: meta.title, template: "%s | Abraão Alves" },
    description: meta.description,
    alternates: {
      canonical: `/${lang}`,
      languages: { en: "/en", pt: "/pt", "x-default": "/en" },
    },
    openGraph: {
      locale: lang === "pt" ? "pt_BR" : "en_US",
      title: meta.title,
      description: meta.description,
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return (
    <>
      <JsonLd data={personLd} />
      {children}
    </>
  );
}
