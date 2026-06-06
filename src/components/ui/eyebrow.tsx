import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Mono uppercase eyebrow with a leading tick rule — the label that sits above
 * every section lead/title in the prototype. Styling lives in `.eyebrow` /
 * `.eyebrow .tick` (globals.css).
 */
export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("eyebrow", className)}>
      <span className="tick" aria-hidden="true" />
      {children}
    </span>
  );
}
