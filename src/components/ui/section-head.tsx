import { Reveal } from "@/components/reveal";
import { Eyebrow } from "./eyebrow";

/**
 * Section header from the prototype: a giant faint ghost word behind a mono
 * eyebrow + display title. The whole block reveals on scroll. Markup mirrors
 * proto's `SectionHead` (.ghosthead → .ghost + .real).
 */
export function SectionHead({
  eyebrow,
  ghost,
  title,
}: {
  eyebrow: string;
  ghost?: string;
  title: string;
}) {
  return (
    <Reveal className="ghosthead">
      {ghost ? (
        <div className="ghost" aria-hidden="true">
          {ghost}
        </div>
      ) : null}
      <div className="real flex flex-col gap-[18px]">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="h-display" style={{ fontSize: "clamp(40px, 7vw, 92px)" }}>
          {title}
        </h2>
      </div>
    </Reveal>
  );
}
