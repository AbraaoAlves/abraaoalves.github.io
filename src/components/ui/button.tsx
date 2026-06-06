import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href: string;
  variant?: "primary" | "ghost";
  /** Append the nudging `→` arrow (animates on hover via `.btn .ar`). */
  arrow?: boolean;
  /** Open in a new tab (sets target/rel). Implied for absolute/mailto hrefs. */
  newTab?: boolean;
  children: ReactNode;
  className?: string;
};

/**
 * CTA button rendered as a link, ported from the prototype's `.btn` system.
 * Route paths (`/lab`) use Next's <Link>; anchors (`#work`), `mailto:`, and
 * absolute URLs render a plain <a>. Variant maps to `.btn-primary`/`.btn-ghost`.
 */
export function Button({
  href,
  variant = "primary",
  arrow = false,
  newTab,
  children,
  className,
}: ButtonProps) {
  const classes = cn("btn", `btn-${variant}`, className);
  const inner = (
    <>
      {children}
      {arrow && (
        <span className="ar" aria-hidden="true">
          →
        </span>
      )}
    </>
  );

  const isRoute = href.startsWith("/") && !href.startsWith("//");
  if (isRoute) {
    return (
      <Link href={href} className={classes}>
        {inner}
      </Link>
    );
  }

  const isExternal = /^(https?:)?\/\//.test(href) || href.startsWith("mailto:");
  const openNewTab = newTab ?? (isExternal && !href.startsWith("mailto:"));
  return (
    <a
      href={href}
      className={classes}
      {...(openNewTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {inner}
    </a>
  );
}
