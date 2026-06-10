"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { AsciiArtCanvas } from "./asciiart";
import { Reveal } from "./reveal";
import { Eyebrow } from "./ui/eyebrow";
import { Button } from "./ui/button";
import { useLanguage } from "./language-provider";
import { CONTENT, SOCIALS } from "@/lib/content";
import { localizeHref } from "@/lib/i18n";

const EMAIL = "abraao.teodosio@gmail.com";

// The footer is a distinct slab (--footer-bg); the ASCII logo backdrop must use
// that bg to stay invisible, with ink one step off full contrast per theme.
const FOOTER_BG_LIGHT = "#e8e5dc";
const FOOTER_BG_DARK = "#15171a";
const LOGO_LIGHT = "#1d2022";
const LOGO_DARK = "#e7e9e9";

/**
 * Contact / footer from proto/index.html: a CTA block over an ASCII logo
 * backdrop, three link columns (Navigate / Connect / Email), a version strip,
 * and the ettrics spotlight — hovering any link dims everything else.
 */
export function Footer() {
  const year = new Date().getFullYear();
  const { resolvedTheme } = useTheme();
  const { lang } = useLanguage();
  const t = CONTENT[lang].contact;
  const isDark = resolvedTheme === "dark";

  return (
    <footer className="footer" id="contact">
      <div className="wrap">
        <Reveal className="foot-hero">
          <div className="foot-logo-bg" aria-hidden="true">
            <AsciiArtCanvas
              art="logo"
              ripple
              source="abraão alves△"
              speed={1.3}
              scale={0.18}
              threshold={0.5}
              fontSize={10}
              color={isDark ? LOGO_DARK : LOGO_LIGHT}
              background={isDark ? FOOTER_BG_DARK : FOOTER_BG_LIGHT}
              className="aspect-square w-full"
              style={{ minHeight: 0 }}
            />
          </div>

          <div className="foot-hero-text">
            <Eyebrow>{t.eyebrow}</Eyebrow>
            <p className="foot-cta">{t.cta}</p>
            {/* Dual-intent: let recruiters and project leads self-identify so
                the email lands pre-triaged (distinct mailto subjects). */}
            <div className="btn-row">
              <Button
                href={`mailto:${EMAIL}?subject=${encodeURIComponent(t.hireSubject)}`}
                variant="primary"
                arrow
              >
                {t.hireLabel}
              </Button>
              <Button
                href={`mailto:${EMAIL}?subject=${encodeURIComponent(t.projectSubject)}`}
                variant="ghost"
                arrow
              >
                {t.projectLabel}
              </Button>
            </div>
          </div>
        </Reveal>

        <div className="foot-cols">
          <Reveal className="foot-col">
            <h5>{t.navH}</h5>
            <ul>
              {t.navLinks.map(([label, href]) => (
                <li key={href}>
                  <Link href={localizeHref(href, lang)}>{label}</Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="foot-col" delay={0.06}>
            <h5>{t.connectH}</h5>
            <ul>
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer">
                    {s.label} <span className="ext">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="foot-col" delay={0.12}>
            <h5>{t.emailH}</h5>
            <ul>
              <li>
                <a href={`mailto:${EMAIL}`}>
                  {EMAIL} <span className="ext">↗</span>
                </a>
              </li>
            </ul>
          </Reveal>
        </div>

        <div className="foot-bottom">
          <span className="c">© {year} Abraão Alves</span>
          <span className="v">V2.0</span>
        </div>
      </div>
    </footer>
  );
}
