"use client";

import * as React from "react";
import Link from "next/link";
import { Monitor, Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import { Logo } from "./icons/logo";
import { useLanguage } from "./language-provider";
import { CONTENT } from "@/lib/content";

const themeOptions = [
  { value: "system", label: "System theme", Icon: Monitor },
  { value: "light", label: "Light theme", Icon: Sun },
  { value: "dark", label: "Dark theme", Icon: Moon },
] as const;

/**
 * Fixed top nav from proto/index.html: transparent until scrolled (then a
 * blurred slab + hairline), brand mark + name, hover-underlined links, and a
 * tools cluster (EN/PT pill, three-way theme toggle, mobile burger).
 */
export function Header() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const { theme, resolvedTheme, setTheme } = useTheme();
  const { lang, setLang } = useLanguage();
  const nav = CONTENT[lang].nav;
  const navLinks = [
    { label: nav.work, href: "/#work" },
    { label: nav.mentorship, href: "/#mentorship" },
    { label: nav.lab, href: "/lab" },
  ];

  React.useEffect(() => setMounted(true), []);

  // Animated theme change — circular clip-path wipe from the clicked button
  // (View Transitions). Falls back to an instant switch when unsupported, under
  // reduced motion, or when the resolved theme doesn't actually change.
  const changeTheme = (value: string, ev: React.MouseEvent) => {
    const nextResolved =
      value === "system"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : value;

    // Synchronous class flip so the View Transition captures the change; setTheme
    // then persists and reconciles next-themes' own class/state.
    const apply = () => {
      document.documentElement.classList.toggle("dark", nextResolved === "dark");
      setTheme(value);
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const startVT = (
      document as Document & {
        startViewTransition?: (cb: () => void) => {
          ready: Promise<void>;
          skipTransition: () => void;
        };
      }
    ).startViewTransition;

    if (!startVT || reduced || nextResolved === resolvedTheme) {
      apply();
      return;
    }

    const x = ev.clientX || window.innerWidth - 56;
    const y = ev.clientY || 40;
    const endR = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );
    const vt = startVT.call(document, apply);
    vt.ready
      .then(() => {
        const anim = document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endR}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 620,
            easing: "cubic-bezier(.4,0,.2,1)",
            pseudoElement: "::view-transition-new(root)",
          }
        );
        const guard = setTimeout(() => {
          try {
            vt.skipTransition();
          } catch {
            /* ignore */
          }
        }, 900);
        anim.finished.then(() => clearTimeout(guard)).catch(() => {});
      })
      .catch(() => {});
  };

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav${scrolled ? " scrolled" : ""}`}>
      <Link className="brand" href="/" aria-label="Abraão Alves — home">
        <Logo className="mark" />
        <span className="name">Abraão Alves</span>
      </Link>

      <nav
        className={`nav-links${open ? " open" : ""}`}
        onClick={() => setOpen(false)}
        aria-label="Primary"
      >
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="nav-tools">
        <div className="lang-toggle" role="group" aria-label="Language">
          <button type="button" aria-pressed={lang === "en"} onClick={() => setLang("en")}>
            EN
          </button>
          <button type="button" aria-pressed={lang === "pt"} onClick={() => setLang("pt")}>
            PT
          </button>
        </div>

        <div className="theme-toggle" role="group" aria-label="Theme">
          {themeOptions.map(({ value, label, Icon }) => (
            <button
              key={value}
              type="button"
              className="icon-btn"
              aria-pressed={mounted && theme === value}
              aria-label={label}
              title={label}
              onClick={(e) => changeTheme(value, e)}
            >
              <Icon />
            </button>
          ))}
        </div>

        <button
          type="button"
          className="icon-btn nav-burger"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
