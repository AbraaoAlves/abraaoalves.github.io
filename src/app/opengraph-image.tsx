import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const alt = "Abraão Alves — software engineering, architecture, and mentorship";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0b0c0d",
          color: "#f6f7f7",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, letterSpacing: 6, color: "#abafb1", textTransform: "uppercase" }}>
          Staff Engineer · Architect · Mentor
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 150, fontWeight: 900, lineHeight: 1, letterSpacing: -4 }}>ABRAÃO</div>
          <div style={{ fontSize: 150, fontWeight: 900, lineHeight: 1, letterSpacing: -4 }}>ALVES</div>
        </div>
        <div style={{ display: "flex", fontSize: 32, color: "#abafb1" }}>
          Building software that lasts. Since 2008.
        </div>
      </div>
    ),
    { ...size }
  );
}
