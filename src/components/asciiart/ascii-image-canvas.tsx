"use client";

import { useEffect, useMemo, useState } from "react";
import { AsciiCanvas } from "./canvas";
import { createImageMaskShader, createRippleShader } from "./masks";
import type { ImageMaskShaderOptions, Shader } from "./masks";
import type { AsciiCanvasBaseProps, InteractiveRippleProps, RippleOrigin } from "./types";
import type { DrawFn } from "./utils";
import { useRippleOrigin } from "./use-ripple-origin";

type ImageCrossOrigin = "" | "anonymous" | "use-credentials";

export type UseImageMaskShaderOptions = Omit<ImageMaskShaderOptions, "img"> & {
  src?: string;
  crossOrigin?: ImageCrossOrigin;
  ripple?: boolean;
  origin?: RippleOrigin;
  scale?: number;
  warp?: number;
};

export type AsciiImageCanvasProps = AsciiCanvasBaseProps & InteractiveRippleProps & UseImageMaskShaderOptions;

function createImageDrawMask(img: HTMLImageElement): DrawFn {
  return (ctx, cols, rows) => {
    const nw = img.naturalWidth || 1, nh = img.naturalHeight || 1;
    const scale = Math.min(cols / nw, rows / nh);
    ctx.drawImage(img, (cols - nw * scale) / 2, (rows - nh * scale) / 2, nw * scale, nh * scale);
  };
}

export function useImageMaskShader({
  src,
  crossOrigin = "anonymous",
  ripple = false,
  origin = { x: 0.5, y: 0.5 },
  source,
  speed,
  threshold,
  feather,
  phaseJitter,
  scale,
  warp,
}: UseImageMaskShaderOptions): Shader | null {
  const cacheKey = src ? `${crossOrigin}:${src}` : null;
  const [loadedImage, setLoadedImage] = useState<{ cacheKey: string; img: HTMLImageElement } | null>(null);
  const img = loadedImage?.cacheKey === cacheKey ? loadedImage.img : null;

  useEffect(() => {
    if (!src) return;

    let cancelled = false;
    const image = new Image();
    image.crossOrigin = crossOrigin;
    image.onload = () => { if (!cancelled) setLoadedImage({ cacheKey: `${crossOrigin}:${src}`, img: image }); };
    image.onerror = () => console.warn("ASCII mask: image failed to load", src);
    image.src = src;
    return () => { cancelled = true; };
  }, [crossOrigin, src]);

  return useMemo(() => {
    if (!img) return null;

    if (ripple) {
      return createRippleShader({
        drawMask: createImageDrawMask(img),
        source,
        speed,
        threshold,
        scale,
        warp,
        origin,
      });
    }

    return createImageMaskShader({ img, source, speed, threshold, feather, phaseJitter });
  }, [feather, img, origin, phaseJitter, ripple, scale, source, speed, threshold, warp]);
}

export function AsciiImageCanvas({
  clickable = false,
  origin,
  onOriginChange,
  ripple = false,
  src,
  crossOrigin,
  source,
  speed,
  threshold,
  feather,
  phaseJitter,
  scale,
  warp,
  fontSize = 12,
  lineHeight,
  color,
  background,
  fps,
  className,
  style,
}: AsciiImageCanvasProps) {
  const selectedOrigin = useRippleOrigin({ clickable, origin, onOriginChange });
  const shader = useImageMaskShader({
    src,
    crossOrigin,
    ripple,
    origin: selectedOrigin.origin,
    source,
    speed,
    threshold,
    feather,
    phaseJitter,
    scale,
    warp,
  });

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
