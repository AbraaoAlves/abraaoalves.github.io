"use client";

import { useMemo } from "react";
import { AsciiCanvas } from "./canvas";
import { createRippleShader, createTextMaskDrawFn, createTextMaskShader } from "./masks";
import type { AsciiCanvasBaseProps, InteractiveRippleProps } from "./types";
import { useRippleOrigin } from "./use-ripple-origin";

export type AsciiTextCanvasProps = AsciiCanvasBaseProps & InteractiveRippleProps & {
  text?: string;
  source?: string;
  speed?: number;
  threshold?: number;
  feather?: number;
  phaseJitter?: number;
  weight?: number;
  scale?: number;
  warp?: number;
};

export function AsciiTextCanvas({
  text = "TEXT",
  ripple = false,
  clickable = false,
  origin,
  onOriginChange,
  source = "typescriptdeveloper ",
  speed = 7,
  threshold = 0.34,
  feather = 0.6,
  phaseJitter = 1,
  weight = 800,
  scale = 0.2,
  warp = 0,
  fontSize = 12,
  lineHeight,
  color,
  background,
  fps,
  className,
  style,
}: AsciiTextCanvasProps) {
  const selectedOrigin = useRippleOrigin({ clickable, origin, onOriginChange });
  const drawMask = useMemo(() => createTextMaskDrawFn({ text, weight }), [text, weight]);

  const shader = useMemo(
    () => ripple
      ? createRippleShader({ drawMask, source, speed, threshold, scale, warp, origin: selectedOrigin.origin })
      : createTextMaskShader({ text, source, speed, threshold, feather, phaseJitter, weight }),
    [drawMask, feather, phaseJitter, ripple, scale, selectedOrigin.origin, source, speed, text, threshold, warp, weight]
  );

  return (
    <AsciiCanvas
      shader={shader}
      fontSize={fontSize}
      lineHeight={lineHeight}
      color={color}
      background={background}
      fps={fps}
      className={className}
      style={{ minHeight: 300, ...style, cursor: selectedOrigin.cursor ?? style?.cursor }}
      onClick={selectedOrigin.handleClick}
    />
  );
}
