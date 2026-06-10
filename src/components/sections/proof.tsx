"use client";

import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { useLanguage } from "@/components/language-provider";
import { CONTENT } from "@/lib/content";
import { localizeHref } from "@/lib/i18n";

/**
 * Proof band on the home (between Hero and Geo): four real outcome metrics in a
 * hairline-bounded grid. Static by design — the figures ARE the proof, so there
 * is no count-up animation, no cards, no icons. Each cell links into the
 * SmartScout case (or the migrations strip) so a skeptic can verify the claim.
 */
export function Proof() {
  const { lang } = useLanguage();
  const t = CONTENT[lang].proof;

  return (
    <section className="proof" aria-label="Selected outcomes">
      <div className="wrap">
        <div className="proof-grid">
          {t.items.map((it, i) => (
            <Reveal className="proof-cell" key={it.label} delay={i * 0.06}>
              <Link href={localizeHref(it.href, lang)} className="proof-link">
                <span className="fig">{it.figure}</span>
                <span className="lbl">{it.label}</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
