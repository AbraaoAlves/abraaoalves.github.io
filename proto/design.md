# Design Spec — Abraão Alves site (extracted from `proto/index.html`)

This document is the single source of truth for the visual system in the
prototype. The prototype ships as a self-extracting bundle: the real design
lives in a JSON-encoded `__bundler/template` (the HTML + full CSS) plus five
gzipped `text/babel` scripts (the React/JSX). Everything below is decoded from
those.

Source map of the bundle:
- **template** → the `<style>` design system (tokens, components, responsive).
- **s1 / content.jsx** → bilingual EN/PT copy (`window.CONTENT`, `window.SOCIALS`).
- **s2 / ascii.jsx** → the animated ASCII canvas engine (wave shimmer).
- **s3 / sections.jsx** → all page sections (Nav, Hero, Geo, Work, Stack, Mentorship, Roots, Lab, Footer).
- **s4 / app.jsx** → root shell: theme + language state, View-Transition theme wipe, tweaks panel.

---

## 1. Design language

Monochrome, "ettrics-grade" editorial portfolio. Warm-ink dark default, warm
paper light. No color except an *optional* accent (off by default — `accent: mono`).
Texture comes from: a fixed film-grain + vignette overlay, giant ghost headings
behind section titles, mono eyebrows with a tick, and animated ASCII art canvases
(name, US map, logo).

The current production site already adopted this spirit (warm paper/ink,
Hanken Grotesk + mono, Lenis). The prototype is the **full build-out**: a real
type scale, themed CSS variables, eight sections (vs. the current three), an
animated ASCII engine, bilingual content, and a richer nav/footer.

---

## 2. Theme tokens

Themes are switched by `html[data-resolved="dark"|"light"]` (set before paint by
an inline script reading `localStorage.aa_theme`). In the current Next.js app the
equivalent switch is the `.dark` class from `next-themes` — these tokens should be
ported to CSS variables driven by that class.

### Dark (default)
| Token | Value | Use |
|---|---|---|
| `--bg` | `#0b0c0d` | page background |
| `--bg-1` | `#111315` | raised surface |
| `--bg-2` | `#16191b` | card |
| `--line` | `rgba(255,255,255,0.12)` | hairline borders |
| `--line-2` | `rgba(255,255,255,0.20)` | stronger borders |
| `--fg` | `#f6f7f7` | primary text |
| `--fg-1` | `#d2d5d6` | secondary text (AA) |
| `--fg-2` | `#abafb1` | muted / meta (AA) |
| `--fg-3` | `#888d8f` | faint (AA-small) |
| `--accent` | `#6ea8e6` | optional interactive accent |
| `--ghost` | `rgba(255,255,255,0.05)` | giant ghost headings |
| `--ascii-fg-default` | `#e7e9e9` | ASCII art ink |
| `--footer-bg` | `#15171a` | lifted footer slab |
| `--footer-line` | `rgba(255,255,255,0.13)` | footer border |
| `--shadow` | `0 1px 0 rgba(255,255,255,.04) inset, 0 24px 60px -30px rgba(0,0,0,.8)` | card shadow |

### Light
| Token | Value |
|---|---|
| `--bg` | `#f6f5f2` |
| `--bg-1` | `#ecebe6` |
| `--bg-2` | `#fbfaf8` |
| `--line` | `rgba(20,22,24,0.13)` |
| `--line-2` | `rgba(20,22,24,0.22)` |
| `--fg` | `#141618` |
| `--fg-1` | `#383c3e` |
| `--fg-2` | `#565a5c` |
| `--fg-3` | `#6c7072` |
| `--accent` | `#2f6fb0` |
| `--ghost` | `rgba(20,22,24,0.06)` |
| `--ascii-fg-default` | `#1d2022` |
| `--footer-bg` | `#e8e5dc` |
| `--footer-line` | `rgba(20,22,24,0.12)` |
| `--shadow` | `0 1px 0 rgba(255,255,255,.6) inset, 0 24px 50px -34px rgba(20,22,24,.35)` |

> Note: prototype dark `--bg` is `#0b0c0d` (near-black), warmer than the current
> site's `#121212`. Light `--bg` is `#f6f5f2` vs current `#faf9f7`. Decide whether
> to adopt the prototype values exactly or keep the current paper/ink — see plan §A.

### Derived / tweakable root tokens
```
--font-display: 'Space Grotesk', sans-serif;
--font-body:    'Hanken Grotesk', system-ui, sans-serif;
--font-mono:    'JetBrains Mono', ui-monospace, monospace;
--space-scale:  1;                      /* density: compact .8 / regular 1 / comfy 1.25 */
--ascii-fg:     var(--ascii-fg-default);
--cta:          var(--fg);              /* CTA fill; accent tweak can override */
--link-underline: var(--fg);
```

---

## 3. Typography

Three families:
- **Display** — `Space Grotesk` 700 (headings, ghost text, stat numbers, names, brand).
- **Body** — `Hanken Grotesk` 400/500/600 (paragraphs, leads).
- **Mono** — `JetBrains Mono` 400/500 (eyebrows, meta, labels, buttons, chips, years).

> The current site uses **IBM Plex Mono** as its mono. Prototype uses **JetBrains
> Mono**. Also offers Archivo as an alternate display font (tweak only).

### Fluid type scale (`clamp`)
| Token | Value | Role |
|---|---|---|
| `--t-label` | `clamp(12px, .86vw, 13px)` | mono eyebrows / meta |
| `--t-small` | `clamp(14px, 1vw, 15.5px)` | dense list text |
| `--t-body` | `clamp(16px, 1.05vw, 17.5px)` | body copy |
| `--t-lead` | `clamp(20px, 2.1vw, 28px)` | hero / section lead |
| `--t-h3` | `clamp(23px, 2.7vw, 32px)` | sub-headings |
| `--t-h2` | `clamp(42px, 7vw, 94px)` | section titles |

Body base: `font-size: var(--t-body)`, `line-height: 1.65`, antialiased,
`text-rendering: optimizeLegibility`. `body` transitions `background`/`color` over
`.5s ease` on theme change.

Key text classes:
- `.h-display` — display font, 700, `letter-spacing: -0.02em`, `line-height: 1`.
- `.lead` — `--t-lead`, `line-height: 1.45`, weight 500, `max-width: 24ch`, `text-wrap: pretty`.
- `.body-lg` — `--t-body`, color `--fg-1`, `line-height: 1.62`.
- `.eyebrow` — mono, `--t-label`, `letter-spacing: .24em`, uppercase, `--fg-2`,
  inline-flex with a `.tick` (26×1px `--line-2` rule) before the text.
- `.muted` — `--fg-2`.

`::selection { background: var(--fg); color: var(--bg); }`

---

## 4. Layout system

```
--maxw: 1240px;
--gut:  clamp(20px, 5vw, 80px);
--sec:  calc(clamp(110px, 15vh, 200px) * var(--space-scale));   /* vertical section padding */
```

- `.wrap` — `max-width: var(--maxw); margin: 0 auto; padding: 0 var(--gut)`.
- `.section` — `padding: var(--sec) 0; position: relative; z-index: 2`.
- `.section + .section` — `border-top: 1px solid var(--line)` (hairline between sections).
- All `box-sizing: border-box`; `scroll-behavior: smooth` (auto under reduced-motion).

> Current site uses `max-w-6xl`/`max-w-4xl` Tailwind containers. The prototype is
> wider (1240px) with large fluid gutters and **much** larger vertical rhythm.

---

## 5. Texture & global effects

**Film grain + vignette** (`body::before`): fixed, full-viewport, `z-index: 1`,
`pointer-events: none`. A base64 SVG fractal-noise tile, `opacity: .035`,
`mix-blend-mode: overlay`. This is the signature grain over the whole page.

**Theme change wipe** — circular reveal via the View Transitions API, animating
`clip-path: circle()` from the clicked toggle's coordinates. 620ms
`cubic-bezier(.4,0,.2,1)`. `::view-transition-old/new(root)` set to `animation:none`
so only the clip animates; reduced-motion disables it; a 900ms safety timeout calls
`skipTransition()` if the WAAPI clock stalls.

---

## 6. Components

### Eyebrow / ghost heading
- `.eyebrow` (see §3) + `.eyebrow .tick`.
- `.ghosthead` wraps a section head. `.ghost` is an absolutely-positioned giant
  display word (`clamp(86px,17vw,240px)`, weight 700, `line-height:.8`,
  `letter-spacing:-.03em`, color `--ghost`) sitting behind `.real` (z-index 1).
  Positioned `left:-.06em; top:-.42em`, `white-space:nowrap`, non-interactive.

### Buttons / CTAs
- `.btn` — mono 13px, uppercase, `letter-spacing:.04em`, `padding:15px 24px`,
  `border-radius:10px`, 1px transparent border, inline-flex `gap:10px`.
  Transitions bg/color/border/transform.
- `.btn .ar` (the `→` arrow) translates `+4px` on hover.
- `.btn-primary` — `background/border: var(--cta)`, `color: var(--bg)`. Hover:
  `translateY(-2px)` + soft colored shadow.
- `.btn-ghost` — transparent, `color: var(--fg)`, border `--line-2`. Hover:
  border `--fg`, faint `--fg` 6% wash.
- `.btn:focus-visible` — `outline: 2px solid var(--cta); outline-offset: 3px`.
- `.btn-row` — flex, wrap, `gap:14px`, items center.

### Nav (fixed top, 64px)
- `.nav` — fixed, `z-index:50`, flex space-between, `padding: 0 var(--gut)`,
  transparent bottom border. Transitions bg/border/backdrop over `.4s`.
- `.nav.scrolled` (after `scrollY > 24`) — `background: color-mix(--bg 78%, transparent)`,
  `backdrop-filter: blur(14px) saturate(1.2)`, hairline bottom border.
- `.brand` — 26px logo mark + `.name` (display 700, 15px, uppercase, `.04em`).
  Logo paths use `fill: var(--fg)`; secondary `.mark-lo` paths use `--fg-2`.
- `.nav-links a` — mono 13px, `--fg-2`, animated underline (`::after` width 0→100%
  over `.3s`), color → `--fg` on hover.
- `.nav-tools` — language toggle + theme toggle + burger.
  - `.lang-toggle` — pill (`border-radius:999px`), two buttons EN/PT;
    `aria-pressed="true"` fills `--fg` bg / `--bg` text.
  - `.theme-toggle` — three `.icon-btn` (system/sun/moon), 30×30, 8px radius,
    `--fg-3` idle → `--fg-1` hover → active gets `--fg` + `--line-2` border + `--bg-1` bg.
  - `.nav-burger` — hidden ≥681px; shows the hamburger/X morph on mobile.

### Stat row (`.stats`)
4-col grid, 1px gap on a `--line` background = hairline cell dividers, outer 1px
`--line` border. Each `.stat`: display num (`clamp(26px,3.4vw,40px)`, 700) + mono
label (`12.5px`, `--fg-2`). (Defined in CSS; not currently rendered by s3 sections —
available building block.)

### Geospatial centerpiece (`.geo-map`)
Bordered, `border-radius:14px`, `--bg-1`, clipped. Inner `.map-canvas-wrap` padded
`clamp(16px,3vw,40px)`; ASCII US-map canvas inside. `.map-chrome` is an absolutely
positioned mono caption row (top, justified between) e.g. `us-albers // reactive` /
`records: 100,000+`. `.geo-foot .chip` = mono stat chips with a 7px `--fg-2` square
bullet and a bold `--fg` value.

### Work list (`.work-list`)
Stacked rows, 1px gap on `--line` (hairline rows), top+bottom 1px borders. Each
`.work-item`: 3-col grid `84px | 1fr | minmax(0,360px)`:
- `.idx` — mono index `01`, `02`… (`--fg-2`).
- `.role` — `h3` (display 700, `clamp(22px,2.6vw,31px)`), `.org` (mono `--fg-2`),
  `p` (`--fg-1`, `max-width:54ch`), `.meta-r` with a pill `.yr` year badge
  (`border:1px solid --line-2; border-radius:999px; padding:5px 13px`).
- `.bullets` — list with a mono `›` marker (`.mk`, `--fg-3`) per line.

### Migrations strip (`.mig-grid`)
5-col hairline grid (1px gap on `--line`, 1px border). Each `.mig`: `.from`
(mono `--fg-2`) + `↓` arrow, `.to` (display 700), `.why` (13px `--fg-2`, pushed to
bottom via `margin-top:auto`). Labeled by a mono `.mlabel` eyebrow.

### Stack (`.stack-grid`)
4-col grid. Each `.stack-col`: mono uppercase `h4` with bottom hairline, then a
list where each `li` has a 5px `--fg-3` square bullet (`.d`) + bold `--fg` term.

### Mentorship (`.ment-grid`)
2-col `.85fr | 1.15fr`. Left: a large body paragraph. Right: `.quotes` stack of
`.quote` cards (1px `--line` border, `border-radius:12px`, `--bg-2`, `--shadow`).
Quote `p` is italic `--fg`; `.by` is a mono attribution with a 22px circular `.av`
avatar (single initial).

### Roots (`.roots-grid`)
2-col `1.25fr | .75fr`. Left `.roots-body`: two paragraphs (`<b>`/`<em>` highlighted
to `--fg`) + a mini timeline `.tl` (rows `64px | 1fr`, top hairlines, mono year `.y`
+ text `.t`). Right `.beyond` card (`--bg-1`, bordered): mono `h4` + list of
`24px | 1fr` rows with a mono glyph key `.k` (♟ / 𝄞 / ≈).

### Lab (`.lab-grid`)
Flex column, top border. Each `.lab-item`: 3-col `96px | 1fr | auto` —
date `.d` (mono), title `.ti` (display 700, `clamp(18px,2vw,24px)`), pill `.tag`
(mono uppercase). Hover slides the row right (`padding-left: 14px` over `.3s`).

### Footer / Contact (`.footer`)
A distinct surface in **both** themes (`--footer-bg`), top border `--footer-line`,
`overflow:hidden`. A soft radial highlight (`::after`, `--fg` 6%) at top-right.
- `.foot-hero` — CTA block with an ASCII **logo backdrop** (`.foot-logo-bg`):
  absolutely positioned right, `width: clamp(190px,33vw,440px)`, `opacity:.55`,
  radial mask (`closest-side, #000 55%, transparent`).
- `.foot-cta` — display 700, `clamp(34px,6vw,74px)`, `max-width:15ch`; contains an
  underlined link (thick 2px underline via `--cta`, 8px offset).
- `.foot-cols` — 3-col: Navigate / Connect / Email. Links `17px --fg`, gap grows on
  hover; external links get a mono `↗` `.ext`.
- `.foot-bottom` — © line + version `.v` (mono).
- **Spotlight hover** — `.footer:has(a:hover)` dims *all* footer text/links to
  `--fg-3` while the hovered link stays `--fg` and the logo backdrop fades to `.16`.
  (The current site already implements this with `group-has-[a:hover]`.)

---

## 7. ASCII art engine (`ascii.jsx`)

A canvas component that rasterizes a shape into a character grid and animates a
travelling diagonal light wave (shimmer). This is richer than the current site's
mask shader — it has a **per-cell sine wave** driven by `requestAnimationFrame`.

Core: `AsciiArt({ builder, color, speed=1, kx=0.16, ky=0.085, dim=0.45, className, ariaLabel })`
- `CHAR_ASPECT = 1.85` (mono cell H/W).
- `sampleToCells(raster, cols, rows, chars, threshold)` — averages the alpha
  channel per cell; cells above threshold get a stable hashed character from the
  `chars` string and a brightness `b`.
- Per frame: `wave = .5 + .5*sin(phase - (c*kx + r*ky))`, alpha = `b*(dim + (1-dim)*wave)`.
  `phase = time * 1.1 * speed`. Reduced-motion freezes at a fixed phase.
- Uses `ResizeObserver` (relayout) + `IntersectionObserver` (pause when offscreen),
  DPR-aware (capped at 2). Font `JetBrains Mono`.

**Builders:**
- `buildName(lines, cols, chars)` — renders text lines in `Space Grotesk 700` to an
  offscreen canvas then samples. Hero uses `buildName(['ABRAÃO','ALVES'], 116, 'abraãoalvesdeveloper')`.
- `buildLogo(cols, chars)` — fills the triangle logo `Path2D` (viewBox `344 -44 680 680`),
  `evenodd`. Footer uses `buildLogo(66, 'abraãoalves△')`.
- `buildUSMap(cols, chars)` — **real geography**: lazy-loads `d3` + `topojson-client`
  + `us-atlas` (states-10m) from CDN, projects with `geoAlbersUsa`, fills, samples.
  Graceful fallback to a dotted rectangle. Geo uses `buildUSMap(170, 'geospatiallatlng·smartscout')`.

Per-instance tuning (from sections.jsx):
| Instance | cols | chars | speed | kx | ky | dim |
|---|---|---|---|---|---|---|
| Hero name | 116 | `abraãoalvesdeveloper` | 1 | 0.14 | 0.16 | 0.55 |
| Geo map | 170 | `geospatiallatlng·smartscout` | 0.9 | 0.1 | 0.07 | 0.4 |
| Footer logo | 66 | `abraãoalves△` | 0.7 | 0.17 | 0.14 | 0.42 |

ASCII color resolves from theme: `auto` → `#e7e9e9` (dark) / `#1d2022` (light).
Other presets: `mid #9aa0a2`, `blue #5b9bd5`.

> The current repo has its own `asciiart` engine (`AsciiTextCanvas`, `AsciiArtCanvas`,
> `AsciiImageCanvas`, `drawUSMap`, `drawLogo`, mask + ripple + wave shaders). The
> prototype's wave-shimmer + `buildName`/`buildUSMap` is a stylistic variant — see
> plan §E for whether to port the shimmer or adapt the existing engine.

---

## 8. Motion

- **Reveal** (`.reveal`) — visible by default; `.js-anim .reveal` adds the hidden
  start state (`opacity:0; translateY(22px)`), `.in` reveals over `.9s
  cubic-bezier(.2,.7,.2,1)`. Gated by a `.js-anim` class added pre-paint so
  no-JS/SSR content is never trapped hidden. `IntersectionObserver` threshold `.12`,
  `rootMargin: 0 0 -8% 0`; a 1s fallback force-shows if the transition stalls.
  Per-item `delay` staggers (e.g. `i*60ms`).
  > Current site's `Reveal` uses Framer Motion `whileInView` (duration .6,
  > `[0.22,1,0.36,1]`). Equivalent intent; keep Framer or port the CSS version.
- **Scroll cue** (`.scroll-cue`) — mono uppercase label + a 40px rule with a sliding
  highlight (`cueslide` 2.4s infinite).
- **Nav underline**, **button arrow nudge**, **lab row slide**, **footer link gap
  growth** — all described per-component above.
- Reduced-motion: disables reveal transforms, the theme wipe, the ASCII shimmer
  (freezes), and smooth scroll.

---

## 9. Responsive breakpoints

- **≤1080px**: hero → 1 col (ASCII name moves above, `order:-1`); stats/migrations/
  stack → 2 col; mentorship/roots → 1 col; work-item → `60px 1fr` with meta row
  spanning full width.
- **≤960px & ≥681px**: hide `.brand .name`.
- **≤680px**: nav links collapse into a burger dropdown (`.nav-links.open` fixed
  panel under the 64px bar); stats `1fr 1fr`; migrations/stack/foot-cols → 1 col;
  work bullets span full width; lab-item → `64px 1fr`; footer logo `56vw`, `opacity:.3`.

---

## 10. Content (bilingual EN / PT)

`window.CONTENT` carries `en` and `pt` trees; `window.SOCIALS` is shared. Language
persists in `localStorage.aa_lang`, toggled in the nav, sets `<html lang>`.

Sections & their copy keys: `hero` (eyebrow, lead, meta[], cue, ctaPrimary,
ctaSecondary), `geo` (eyebrow, ghost, title, body, chrome[], chips[]), `work`
(eyebrow, ghost, title, items[{role,org,year,desc,bullets[]}], migLabel,
migrations[{from,to,why}]), `stack` (cols[{h,items[]}]), `ment` (body, quotes[{t,by}]),
`roots` (p1, p2 with `<b>/<em>`, timeline[[year,text]], beyondH, beyond[[glyph,text]]),
`lab` (body, items[[date,title,tag]], soon), `contact` (eyebrow, cta, ctaLink, navH,
connectH, navLinks[]).

`SOCIALS`: LinkedIn, GitHub, Stack Overflow, X, CodePen.
Email CTA: `abraao.teodosio@gmail.com`. Version badge: `V2.0`. © 2026.

> The copy here is the **canonical, updated** narrative (SmartScout 9-year arc,
> 5 migrations, OUTFRONT acquisition, real mentee quotes). It supersedes the
> placeholder copy currently in `page.tsx`.

### Page section order (final)
`Nav → Hero → Geo → Work (+migrations) → Stack → Mentorship → Roots → Lab → Footer`

Anchors: `#top`, `#geo`, `#work`, `#stack`, `#mentorship`, `#roots`, `#lab`, `#contact`.

---

## 11. Gap analysis vs. current `src/`

| Area | Current site | Prototype | Action |
|---|---|---|---|
| Sections | Hero, Work (2 cards), Mentorship, About | Hero, **Geo**, Work (list + migrations), **Stack**, Mentorship, Roots, **Lab** | Add Geo, Stack, Lab; rebuild Work as a list + migrations strip; expand Roots w/ timeline |
| Tokens | `--background/--foreground` only (`#faf9f7`/`#121212`) | full 14-token scale ×2 themes | Introduce the token set |
| Type scale | Tailwind ad-hoc | `--t-*` clamp scale + 3 named families | Add scale; decide Plex vs JetBrains mono |
| Display font | (none explicit) | Space Grotesk 700 | Add Space Grotesk |
| Grain / vignette | none | fixed SVG grain overlay | Add `body::before` overlay |
| Theme switch | next-themes class, footer switch | nav toggle + View-Transition circular wipe | Add nav toggle + optional VT wipe |
| Language | EN only | EN/PT toggle + `CONTENT` map | Add i18n content map + toggle |
| ASCII | mask/ripple/wave shaders, `drawUSMap`, `drawLogo` | wave-shimmer `AsciiArt` + `buildName/buildLogo/buildUSMap` | Reuse existing engine; match the 3 instances + tuning |
| Reveal | Framer `whileInView` | CSS `.js-anim .reveal` | Keep Framer (parity) |
| Nav | sticky 14px-tall, 3 links | fixed 64px, scrolled blur, brand mark, lang+theme tools, burger | Rebuild header |
| Footer | wordmark + 2 link cols + theme switch + spotlight | CTA + ASCII logo backdrop + 3 cols + spotlight + version | Extend footer |

See `PLAN-proto-integration.md` for the phased implementation plan.
