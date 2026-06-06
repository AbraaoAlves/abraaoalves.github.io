# Plan — Apply the prototype to the current site

Goal: bring `src/` up to the `proto/index.html` design (see `proto/design.md`).
The prototype is a single-file React+Babel demo; we port its **design system,
sections, content, and ASCII instances** into the existing Next.js 16 / Tailwind 4
app — reusing the repo's own `asciiart` engine and `next-themes`/Lenis/Framer
infrastructure rather than copying the prototype's runtime wholesale.

Each phase is an atomic, shippable commit. Verify after each with
`npx tsc --noEmit`, `npx eslint src`, and `npm run build`.

---

## Open decisions (confirm before Phase A)

1. **Palette** — adopt the prototype's exact tokens (dark `#0b0c0d`, light
   `#f6f5f2`, full 14-token scale) **or** keep the current `#121212`/`#faf9f7`
   paper/ink and only layer the *structure* (fg-1/2/3, lines, ghost) on top?
   Recommendation: adopt the full prototype token set — it's what every component
   below references, and it's a richer, warmer system.
2. **Mono font** — prototype uses **JetBrains Mono**; current uses **IBM Plex Mono**.
   Recommendation: switch to JetBrains Mono to match the spec exactly (one line in
   `layout.tsx`).
3. **Bilingual EN/PT** — port the full `CONTENT` map + nav toggle now (Phase G), or
   ship English-only first and add PT later? Recommendation: structure content as a
   `content.ts` map from the start (cheap), wire the toggle in Phase G.
4. **ASCII shimmer** — the prototype's `AsciiArt` adds a per-cell travelling sine
   wave. Reuse the repo's existing `AsciiTextCanvas`/`AsciiArtCanvas` (which already
   have wave/ripple shaders) and tune them to match, rather than porting a second
   engine. Recommendation: reuse existing; only add a `buildUSMap`-style real-geo
   map if `drawUSMap` doesn't already look close enough.

---

## Phase A — Design tokens & global CSS foundation
**Files:** `src/app/globals.css`, `src/app/layout.tsx`

1. Replace the two-variable `:root`/`.dark` block with the full token set from
   design.md §2, keyed on `.dark` (next-themes) instead of `[data-resolved]`.
2. Add the root tokens (§2 derived): `--font-display`, `--font-mono`,
   `--space-scale`, `--ascii-fg`, `--cta`, `--link-underline`.
3. Add the fluid type scale `--t-label … --t-h2` (§3) and layout tokens
   `--maxw / --gut / --sec` (§4) to `@theme` or `:root`.
4. Add `body` base (line-height 1.65, antialiased, `.5s` bg/color transition) and
   `::selection`.
5. Add the **film-grain + vignette** `body::before` overlay (§5).
6. In `layout.tsx`: add `Space_Grotesk` (700) and swap `IBM_Plex_Mono` →
   `JetBrains_Mono` via `next/font/google`; expose `--font-display` /
   `--font-mono` / keep `--font-hanken`.
7. Map Tailwind theme: `--font-display`, mono, and the new color tokens so utilities
   (`text-[--fg-2]` etc.) or component classes can use them.

**Verify:** site still renders, theme toggle flips all tokens, grain visible.

---

## Phase B — Shared primitives (eyebrow, ghost head, buttons, section shell)
**Files:** new `src/components/ui/` (`eyebrow.tsx`, `section-head.tsx`,
`button.tsx`), small CSS in `globals.css` for `.btn*`, `.eyebrow`, `.ghosthead`,
`.wrap`, `.section`.

1. Port `.eyebrow` + `.tick`, `.ghosthead/.ghost/.real`, `.h-display`, `.lead`,
   `.body-lg`, `.muted` (design.md §3, §6).
2. Port `.btn`, `.btn-primary`, `.btn-ghost`, `.btn-row`, focus-visible (§6).
3. Build a `SectionHead` component (eyebrow + ghost + `h2.h-display`) replacing the
   ad-hoc `SectionHeader` in `page.tsx`.
4. Build `.wrap` + `.section` layout helpers (hairline `section + section` border).

**Verify:** render a throwaway page with each primitive; visual parity with proto.

---

## Phase C — Header / Nav rebuild
**Files:** `src/components/header.tsx`, `src/components/theme-switch.tsx`
(reuse/extend), maybe new `lang-toggle.tsx`.

1. Rebuild `Header` as the fixed 64px `.nav` with scrolled blur state
   (`scrollY > 24` → `.scrolled`), brand mark + name, animated-underline links
   (Work / Mentorship / Lab), `.nav-tools` (lang toggle + 3-icon theme toggle +
   burger).
2. Move the theme control into the nav (3 icons: system/sun/moon) — keep the
   existing `theme-switch.tsx` logic, restyle as `.icon-btn`s. Footer keeps its own
   switch or defers to nav (decide).
3. Mobile burger → `.nav-links.open` dropdown.
4. Logo: reuse `src/components/icons/logo.tsx`; ensure `--fg` / `--fg-2` fills.

**Verify:** scroll blur, underline, mobile menu, theme + lang toggles.

---

## Phase D — Hero
**Files:** `src/components/hero.tsx`

1. Restructure to the proto `.hero-grid` (`.92fr | 1.18fr`, collapses ≤1080px with
   ASCII name `order:-1`).
2. Left column: eyebrow, `.lead`, `.hero-meta` (mono dotted meta), `.btn-row`
   (primary "Get in touch" → `#contact`, ghost "See selected work" → `#work`),
   `.scroll-cue` with the sliding rule animation.
3. Right column: ASCII name via existing `AsciiTextCanvas` (or an `AsciiArtCanvas`
   `buildName`-equivalent) tuned to the hero row in design.md §7
   (cols≈116, chars `abraãoalvesdeveloper`, speed 1, kx .14, ky .16, dim .55).
4. Keep the `sr-only` accessible `h1`.

**Verify:** hero matches proto at desktop + ≤1080px.

---

## Phase E — New & rebuilt sections
**Files:** `src/app/page.tsx` (compose), new section components under
`src/components/sections/`.

Build, in order, each as a `Reveal`-wrapped section consuming the content map:

1. **Geo** (new) — `.geo-head` ghosthead + `.geo-map` (ASCII US map via the repo's
   `drawUSMap`; instance tuning §7) + `.map-chrome` caption + `.geo-foot` chips.
2. **Work** (rebuild) — `.work-list` hairline rows (idx / role+org+year+desc /
   bullets) **+ migrations strip** (`.mig-grid`, 5 cells).
3. **Stack** (new) — 4-col `.stack-grid` with square-bullet lists.
4. **Mentorship** (rebuild) — `.ment-grid` (body + `.quote` cards with avatar
   initial). Reuse the real quotes from content.
5. **Roots** (rebuild) — `.roots-grid`: two highlighted paragraphs + `.tl` timeline,
   and the `.beyond` card (chess/music/sea).
6. **Lab** (new) — `.lab-grid` rows (date / title / tag) with hover slide. Link to
   the existing `/lab` route where appropriate.

Wire section order + anchors per design.md §10.

**Verify:** all eight sections render top-to-bottom; hairlines, ghost heads, and
reveal stagger match.

---

## Phase F — Footer / Contact
**Files:** `src/components/footer.tsx`

1. Add the `.foot-hero` CTA block with the **ASCII logo backdrop**
   (`buildLogo`-equivalent via `AsciiArtCanvas art="logo"`, instance §7) + masked,
   `opacity:.55`.
2. Add `.foot-cta` headline + `.btn-row` (email primary + LinkedIn ghost).
3. Expand to 3 `.foot-cols` (Navigate / Connect / Email) from `SOCIALS`.
4. Keep the existing **spotlight hover** (already implemented via
   `group-has-[a:hover]`); extend it to dim the logo backdrop to `.16`.
5. `--footer-bg` distinct slab in both themes; version badge `V2.0`, © 2026.

**Verify:** spotlight dims correctly, logo backdrop fades on hover, both themes.

---

## Phase G — Bilingual content + i18n wiring
**Files:** new `src/lib/content.ts` (port `CONTENT` + `SOCIALS`), lang toggle in
nav, a small client-side language context (or `localStorage.aa_lang` +
`<html lang>`).

1. Port the EN/PT trees verbatim from `proto/s1` (canonical copy).
2. Replace all hard-coded section strings with content-map lookups.
3. Wire the nav EN/PT toggle to switch the active tree + persist + set `lang`.

**Verify:** toggling EN/PT swaps all copy; refresh persists.

---

## Phase H — Motion & polish
1. Confirm `Reveal` (Framer) staggers match the proto's `i*60ms` cadence; honor
   reduced-motion everywhere.
2. (Optional) View-Transition circular theme wipe (design.md §5) — progressive
   enhancement, reduced-motion + no-`startViewTransition` fallback to instant.
3. Responsive pass against design.md §9 (1080 / 960 / 680 breakpoints).
4. Update `opengraph-image.tsx` / metadata if the palette changed.
5. Update `TASKS.md`, `MEMORY.md`, `AGENTS.md` to reflect the new structure.

**Verify:** full `npm run build`, manual QA at the three breakpoints in both themes.

---

## Suggested commit sequence
```
A  feat(theme): port prototype token system, type scale, grain overlay, fonts
B  feat(ui): eyebrow, ghost heading, buttons, section shell primitives
C  feat(nav): fixed 64px nav with scroll blur, brand, lang + theme tools, burger
D  feat(hero): ettrics hero grid — lead, meta, CTAs, scroll cue, ASCII name
E  feat(sections): add Geo, Stack, Lab; rebuild Work (+migrations), Mentorship, Roots
F  feat(footer): CTA block, ASCII logo backdrop, 3 columns, spotlight polish
G  feat(i18n): bilingual EN/PT content map + nav language toggle
H  feat(motion): reveal cadence, optional theme wipe, responsive + docs
```

## Out of scope / follow-ups
- The prototype's tweaks panel (`app.jsx` `TweaksPanel`) is a design-tool overlay —
  **not** ported to production.
- Real `/lab` MDX articles (currently one stub) — separate content effort.
- d3/topojson US-atlas CDN dependency: only needed if we adopt the proto's real-geo
  `buildUSMap`; the repo's existing `drawUSMap` avoids it.
