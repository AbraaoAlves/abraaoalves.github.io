"use client";

import { useCallback, useState } from "react";
import type { MouseEvent } from "react";
import type { RippleOrigin } from "./types";

type UseRippleOriginOptions = {
  clickable?: boolean;
  defaultOrigin?: RippleOrigin;
  origin?: RippleOrigin;
  onOriginChange?: (origin: RippleOrigin) => void;
};

const clamp01 = (value: number) => Math.max(0, Math.min(1, value));

export function useRippleOrigin({
  clickable = false,
  defaultOrigin = { x: 0.5, y: 0.5 },
  origin,
  onOriginChange,
}: UseRippleOriginOptions) {
  const [internalOrigin, setInternalOrigin] = useState(defaultOrigin);
  const resolvedOrigin = origin ?? internalOrigin;

  const handleClick = useCallback((event: MouseEvent<HTMLDivElement>) => {
    if (!clickable) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const nextOrigin = {
      x: rect.width ? clamp01((event.clientX - rect.left) / rect.width) : 0.5,
      y: rect.height ? clamp01((event.clientY - rect.top) / rect.height) : 0.5,
    };

    setInternalOrigin(nextOrigin);
    onOriginChange?.(nextOrigin);
  }, [clickable, onOriginChange]);

  return {
    origin: resolvedOrigin,
    handleClick,
    cursor: clickable ? "crosshair" : undefined,
  };
}
