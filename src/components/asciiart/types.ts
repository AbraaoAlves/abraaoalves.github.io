import type { CSSProperties } from "react";

export type RippleOrigin = { x: number; y: number };

export type AsciiCanvasBaseProps = {
  fontSize?: number;
  lineHeight?: number;
  color?: string;
  background?: string;
  fps?: number;
  className?: string;
  style?: CSSProperties;
};

export type InteractiveRippleProps = {
  ripple?: boolean;
  clickable?: boolean;
  origin?: RippleOrigin;
  onOriginChange?: (origin: RippleOrigin) => void;
};
