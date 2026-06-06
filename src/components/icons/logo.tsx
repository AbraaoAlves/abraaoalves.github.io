import React from "react";

/**
 * Abraão Alves monogram — isometric "A".
 * Recreated faithfully from the original pen: https://codepen.io/AbraaoAlves/pen/BjzPjy
 * Two-tone blue mark on a transparent background (works over light and dark).
 * The light face uses an even-odd hole for the inner negative space, so no
 * background fill is needed and the mark sits cleanly on any surface.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="344 -44 680 680"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Abraão Alves"
      className={className}
    >
      {/* Light face — outer triangle with inner triangular cut-out */}
      <path
        fill="#5B9BD5"
        fillRule="evenodd"
        d="M374,565 L684.4,27.3 L995,565 Z M684.4,207.3 L477.9,565 L891.1,565 Z"
      />
      {/* Dark facets — isometric shading on the right leg and inner chevron.
          The `mark-lo` class lets the nav recolor them to the muted token for a
          two-tone monochrome brand mark (see `.brand .mark .mark-lo`). */}
      <path className="mark-lo" fill="#1F4E79" d="M995.8,562.4L837.4,471.8L685.2,210.1L684.8,27.7l311,534.7Z" />
      <path className="mark-lo" fill="#1F4E79" d="M550,565.7l103.1,0.8L738.2,420.3L686.6,330.9L550,565.7Z" />
      <path className="mark-lo" fill="#1F4E79" d="M999.6,562.5l-108.1,1.3l-55,-93.2l163.1,91.9Z" />
    </svg>
  );
}
