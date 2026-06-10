"use client";

import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { SectionHead } from "@/components/ui/section-head";
import { Eyebrow } from "@/components/ui/eyebrow";
import { useLanguage } from "@/components/language-provider";
import { CONTENT } from "@/lib/content";
import { localizeHref } from "@/lib/i18n";

// Localized label for the case-study link (items carrying a `caseSlug`).
const caseCta: Record<string, string> = { en: "Read the case", pt: "Ler o case" };

/**
 * Work section from proto/index.html: a hairline list of roles (index / role +
 * org + year + bullets) followed by the five-migrations strip. Items with a
 * `caseSlug` get a "Read the case →" link to their /work/<slug> deep-dive.
 */
export function Work() {
  const { lang } = useLanguage();
  const t = CONTENT[lang].work;

  return (
    <section className="section" id="work">
      <div className="wrap">
        <SectionHead eyebrow={t.eyebrow} ghost={t.ghost} title={t.title} />

        <div className="work-list">
          {t.items.map((it, i) => (
            <Reveal className="work-item" key={it.role} delay={i * 0.06}>
              <div className="idx">0{i + 1}</div>
              <div className="role">
                <h3>{it.role}</h3>
                <span className="org">{it.org}</span>
                <p>{it.desc}</p>
                <div className="meta-r">
                  <span className="yr">{it.year}</span>
                </div>
                {it.caseSlug ? (
                  <Link
                    href={localizeHref(`/work/${it.caseSlug}`, lang)}
                    className="case-link"
                  >
                    {caseCta[lang] ?? caseCta.en}{" "}
                    <span aria-hidden="true">→</span>
                  </Link>
                ) : null}
              </div>
              <ul className="bullets">
                {it.bullets.map((b) => (
                  <li key={b}>
                    <span className="mk">›</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <div className="migrations">
          <Reveal className="mlabel">
            <Eyebrow>{t.migLabel}</Eyebrow>
          </Reveal>
          <Reveal className="mig-grid" delay={0.08}>
            {t.migrations.map((m) => (
              <div className="mig" key={m.to}>
                <div className="from">
                  {m.from} <span className="arrow">↓</span>
                </div>
                <div className="to">{m.to}</div>
                <div className="why">{m.why}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
