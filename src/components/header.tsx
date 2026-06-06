"use client";

import * as React from "react";
import Link from "next/link";
import { Monitor, Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import { Logo } from "./icons/logo";
import { useLanguage } from "./language-provider";

const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "Mentorship", href: "/#mentorship" },
  { label: "Lab", href: "/lab" },
];

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
  const { theme, setTheme } = useTheme();
  const { lang, setLang } = useLanguage();

  React.useEffect(() => setMounted(true), []);

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
              onClick={() => setTheme(value)}
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
