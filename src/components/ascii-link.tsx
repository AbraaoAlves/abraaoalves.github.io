"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useState } from "react";
import { AsciiTextCanvas } from "./asciiart";

// Same shade-block fill + page background as the hero / footer wordmark, so a
// hovered link "dithers" into the exact ASCII treatment used elsewhere.
const FILL_SOURCE = "▓█▒▓░█";
const PAPER_LIGHT = "#ffffff";
const PAPER_DARK = "#0a0a0a";
const BRAND = "#5b9bd5";

type AsciiLinkProps = {
  href: string;
  label: string;
  external?: boolean;
  className?: string;
};

/**
 * Footer link that renders plain text normally and swaps to an ASCII-dithered
 * canvas of the same label on hover/focus — the Ettrics-style effect from the
 * name wordmark, applied per link. The canvas only mounts while active, so
 * there is at most one animation loop running at a time.
 */
export function AsciiLink({ href, label, external, className }: AsciiLinkProps) {
  const [active, setActive] = useState(false);
  const { resolvedTheme } = useTheme();
  const background = resolvedTheme === "dark" ? PAPER_DARK : PAPER_LIGHT;

  const interaction = {
    onMouseEnter: () => setActive(true),
    onMouseLeave: () => setActive(false),
    onFocus: () => setActive(true),
    onBlur: () => setActive(false),
  };

  const inner = (
    <span className="relative inline-block">
      {/* Kept for layout, accessibility, and no-JS; hidden while dithering. */}
      <span className={active ? "opacity-0" : undefined}>{label}</span>
      {active && (
        <AsciiTextCanvas
          text={label}
          source={FILL_SOURCE}
          speed={2}
          fontSize={3}
          weight={900}
          threshold={0.25}
          feather={0.5}
          color={BRAND}
          background={background}
          className="pointer-events-none"
          style={{ position: "absolute", inset: 0, minHeight: 0 }}
        />
      )}
    </span>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className} {...interaction}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={className} {...interaction}>
      {inner}
    </Link>
  );
}
