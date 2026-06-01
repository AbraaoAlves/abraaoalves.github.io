"use client";

import { useMemo } from "react";
import { AsciiCanvas } from "./canvas";
import { drawLogo, drawUSMap } from "./drawImages";
import { createRippleShader, createShapeMaskShader } from "./masks";
import type { AsciiCanvasBaseProps, InteractiveRippleProps } from "./types";
import { useRippleOrigin } from "./use-ripple-origin";

export type AsciiArtCanvasProps = AsciiCanvasBaseProps & InteractiveRippleProps & {
  art?: "USmap" | "logo";
  source?: string;
  speed?: number;
  threshold?: number;
  feather?: number;
  phaseJitter?: number;
  scale?: number;
  warp?: number;
};

export function AsciiArtCanvas({
  art = "logo",
  ripple = true,
  clickable = false,
  origin,
  onOriginChange,
  source = "developer ",
  speed = 7,
  threshold = 0.5,
  feather = 0.7,
  phaseJitter = 1,
  scale = 0.2,
  warp = 0,
  fontSize = 12,
  lineHeight,
  color,
  background,
  fps,
  className,
  style,
}: AsciiArtCanvasProps) {
  const selectedOrigin = useRippleOrigin({ clickable, origin, onOriginChange });
  const drawMask = art === "USmap" ? drawUSMap : drawLogo;

  const shader = useMemo(
    () => ripple
      ? createRippleShader({ drawMask, source, speed, threshold, scale, warp, origin: selectedOrigin.origin })
      : createShapeMaskShader({ drawShape: drawMask, source, speed, threshold, feather, phaseJitter }),
    [drawMask, feather, phaseJitter, ripple, scale, selectedOrigin.origin, source, speed, threshold, warp]
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
      style={{ minHeight: 320, ...style, cursor: selectedOrigin.cursor ?? style?.cursor }}
      onClick={selectedOrigin.handleClick}
    />
  );
}
