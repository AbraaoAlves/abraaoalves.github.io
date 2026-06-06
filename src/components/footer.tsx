"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { AsciiArtCanvas } from "./asciiart";
import { Reveal } from "./reveal";
import { Eyebrow } from "./ui/eyebrow";
import { Button } from "./ui/button";

const EMAIL = "abraao.teodosio@gmail.com";

// Internal navigation (cross-route safe so the footer works on /lab too).
const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/#work" },
  { label: "Mentorship", href: "/#mentorship" },
  { label: "Lab", href: "/lab" },
];

// External profiles. Real URLs (proto SOCIALS carried placeholders).
const SOCIALS = [
  { label: "LinkedIn", href: "https://linkedin.com/in/abraaoalves" },
  { label: "GitHub", href: "https://github.com/abraaoalves" },
  { label: "Stack Overflow", href: "https://stackoverflow.com/users/815478" },
  { label: "X", href: "https://x.com/abraao4lves" },
  { label: "CodePen", href: "https://codepen.io/AbraaoAlves" },
];

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
  const isDark = resolvedTheme === "dark";

  return (
    <footer className="footer" id="contact">
      <div className="wrap">
        <Reveal className="foot-hero">
          <div className="foot-logo-bg" aria-hidden="true">
            <AsciiArtCanvas
              art="logo"
              ripple
              source="abraãoalves△"
              speed={3}
              scale={0.18}
              threshold={0.5}
              fontSize={12}
              color={isDark ? LOGO_DARK : LOGO_LIGHT}
              background={isDark ? FOOTER_BG_DARK : FOOTER_BG_LIGHT}
              className="aspect-square w-full"
              style={{ minHeight: 0 }}
            />
          </div>

          <div className="foot-hero-text">
            <Eyebrow>Contact</Eyebrow>
            <p className="foot-cta">Let’s build something that lasts.</p>
            <div className="btn-row">
              <Button href={`mailto:${EMAIL}`} variant="primary" arrow>
                Get in touch
              </Button>
              <Button
                href="https://linkedin.com/in/abraaoalves"
                variant="ghost"
                newTab
              >
                LinkedIn
              </Button>
            </div>
          </div>
        </Reveal>

        <div className="foot-cols">
          <Reveal className="foot-col">
            <h5>Navigate</h5>
            <ul>
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="foot-col" delay={0.06}>
            <h5>Connect</h5>
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
            <h5>Email</h5>
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
