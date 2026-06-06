"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Logo } from "./icons/logo";
import { useLanguage } from "./language-provider";
import { CONTENT } from "@/lib/content";

/**
 * Fixed top nav from proto/index.html: transparent until scrolled (then a
 * blurred slab + hairline), brand mark + name, hover-underlined links, and a
 * tools cluster (EN/PT pill, three-way theme toggle, mobile burger).
 */
export function Header() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const { lang } = useLanguage();
  const nav = CONTENT[lang].nav;
  const navLinks = [
    { label: nav.work, href: "/#work" },
    { label: nav.mentorship, href: "/#mentorship" },
    { label: nav.lab, href: "/lab" },
    { label: nav.about, href: "/about" },
  ];

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

      <button
        type="button"
        className="icon-btn nav-burger"
        aria-label="Menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        {open ? <X /> : <Menu />}
      </button>
    </header>
  );
}
