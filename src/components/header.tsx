"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./icons/logo";
import { LanguageToggle } from "./language-toggle";
import { useLanguage } from "./language-provider";
import { CONTENT } from "@/lib/content";
import { localizeHref } from "@/lib/i18n";

/**
 * Fixed top nav from proto/index.html, with an ettrics-style menu: the brand
 * mark + name on the left, a tools cluster on the right (PT|EN + a two-line
 * button that morphs to an ×). The button opens a full-screen overlay — large
 * left-aligned links with index numbers, a giant number reel on the right that
 * tracks the hovered item, and a ©/version strip at the bottom.
 *
 * The links render in the static HTML (SEO + AT see them); the footer carries
 * the same nav for no-JS humans. Behaviour: Escape + route change close it,
 * body scroll locks while open, focus moves into the menu and back to the
 * button on close.
 */
export function Header() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState(0);
  const { lang } = useLanguage();
  const t = CONTENT[lang];
  const links = t.contact.navLinks;
  const year = new Date().getFullYear();
  const pathname = usePathname();
  const toggleRef = React.useRef<HTMLButtonElement>(null);
  const overlayRef = React.useRef<HTMLDivElement>(null);
  const wasOpen = React.useRef(false);

  // Close on client-side route change — the render-time "previous value"
  // pattern, so navigating via anything (link, brand, back button) dismisses
  // the overlay without a state-setting effect.
  const [menuPath, setMenuPath] = React.useState(pathname);
  if (pathname !== menuPath) {
    setMenuPath(pathname);
    if (open) setOpen(false);
  }

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // While open: lock scroll, Escape closes, focus the first link.
  React.useEffect(() => {
    if (!open) return;
    document.documentElement.classList.add("menu-open");
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    // Move focus into the menu region (not a link — that would dim the list
    // via :focus-within with nothing :focus-visible to highlight).
    const id = window.setTimeout(() => overlayRef.current?.focus(), 80);
    return () => {
      document.documentElement.classList.remove("menu-open");
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(id);
    };
  }, [open]);

  // Return focus to the button when the menu closes (after having been open).
  React.useEffect(() => {
    if (wasOpen.current && !open) toggleRef.current?.focus();
    wasOpen.current = open;
  }, [open]);

  return (
    <header className={`nav${scrolled ? " scrolled" : ""}${open ? " menu-active" : ""}`}>
      <Link className="brand" href={localizeHref("/", lang)} aria-label="Abraão Alves — home">
        <Logo className="mark" />
        <span className="name">Abraão Alves</span>
      </Link>

      <div className="nav-right">
        <div className="nav-tools">
          <LanguageToggle className="nav-lang" />
          <button
            ref={toggleRef}
            type="button"
            className={`menu-toggle${open ? " open" : ""}`}
            aria-label={open ? t.nav.close : t.nav.menu}
            aria-expanded={open}
            aria-controls="primary-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="menu-toggle-box" aria-hidden="true">
              <span className="menu-toggle-line" />
              <span className="menu-toggle-line" />
            </span>
          </button>
        </div>
      </div>

      {/* Full-screen overlay menu (ettrics-style). */}
      <div
        id="primary-menu"
        ref={overlayRef}
        tabIndex={-1}
        className={`menu-overlay${open ? " open" : ""}`}
        aria-hidden={!open}
      >
        <div className="wrap menu-inner">
          <div className="menu-body">
            <nav className="menu-list" aria-label="Primary">
              {links.map(([label, href], i) => (
                <Link
                  key={href}
                  href={localizeHref(href, lang)}
                  className="menu-link"
                  style={{ "--i": i } as React.CSSProperties}
                  tabIndex={open ? 0 : -1}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setOpen(false)}
                >
                  <span className="menu-idx" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="menu-label">{label}</span>
                </Link>
              ))}
            </nav>

            <div
              className="menu-figure"
              aria-hidden="true"
              style={{ "--active": active } as React.CSSProperties}
            >
              <span className="fig-tens">0</span>
              <span className="fig-units">
                <span className="fig-reel">
                  {links.map((_, i) => (
                    <span key={i}>{i + 1}</span>
                  ))}
                </span>
              </span>
            </div>
          </div>

          <div className="menu-foot">
            <span>Abraão Alves ©{year}</span>
            <span>V2.0</span>
          </div>
        </div>
      </div>
    </header>
  );
}
