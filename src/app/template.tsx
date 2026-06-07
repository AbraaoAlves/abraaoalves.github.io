/**
 * Per-route entrance. CSS-only (no framer-motion) so the server-rendered HTML is
 * always visible even before/without JS — important for a static export and for
 * crawlers. The animation is transform-only (a small slide, never an opacity
 * fade), gated on `.js-anim` and disabled under `prefers-reduced-motion` in
 * globals.css (`.route-enter`). Dropping framer-motion here removes ~38KB gzip
 * from every route — it was this file's only consumer.
 *
 * No client hooks remain, so this is a server component (less client JS).
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="route-enter flex flex-col flex-1 w-full">{children}</div>;
}
