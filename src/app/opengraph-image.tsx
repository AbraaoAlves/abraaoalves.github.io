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
          background: "#0a0a0a",
          color: "#ededed",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, letterSpacing: 6, color: "#5b9bd5", textTransform: "uppercase" }}>
          Staff Engineer · Architect · Mentor
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 150, fontWeight: 900, lineHeight: 1 }}>ABRAÃO</div>
          <div style={{ fontSize: 150, fontWeight: 900, lineHeight: 1 }}>ALVES</div>
        </div>
        <div style={{ display: "flex", fontSize: 32, color: "#a3a3a3" }}>
          Building software that lasts. Since 2008.
        </div>
      </div>
    ),
    { ...size }
  );
}
