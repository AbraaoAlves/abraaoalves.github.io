"use client";

import { Reveal } from "@/components/reveal";
import { SectionHead } from "@/components/ui/section-head";
import { useLanguage } from "@/components/language-provider";
import { CONTENT } from "@/lib/content";

/** Stack/toolkit section from proto/index.html: four hairline-headed columns. */
export function Stack() {
  const { lang } = useLanguage();
  const t = CONTENT[lang].stack;

  return (
    <section className="section" id="stack">
      <div className="wrap">
        <SectionHead eyebrow={t.eyebrow} ghost={t.ghost} title={t.title} />

        <div className="stack-grid">
          {t.cols.map((col, i) => (
            <Reveal className="stack-col" key={col.h} delay={i * 0.06}>
              <h4>{col.h}</h4>
              <ul>
                {col.items.map((it) => (
                  <li key={it}>
                    <span className="d" aria-hidden="true" />
                    <b>{it}</b>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
