import Link from "next/link";
import { isLocale } from "@/lib/i18n";

// Mirrors the Lab post layout (lab/(posts)/layout.tsx): a prose article wrapper
// with a localized back-link. The back-link returns to the Work section on the
// home page (#work), since cases have no standalone listing page.
const backLabel: Record<string, string> = {
  en: "← Back to work",
  pt: "← Voltar aos trabalhos",
};

export default async function CaseLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : "en";

  return (
    <article className="flex-1 flex flex-col p-4 md:p-8 max-w-3xl mx-auto w-full mb-20 pt-12 prose dark:prose-invert prose-neutral prose-pre:bg-stone-950 dark:prose-pre:bg-stone-900 prose-pre:border prose-pre:border-stone-800">
      <div className="mb-8">
        <Link href={`/${locale}#work`} className="text-sm font-medium text-stone-500 hover:text-stone-900 dark:hover:text-stone-300 no-underline">
          {backLabel[locale]}
        </Link>
      </div>
      {children}
    </article>
  );
}
