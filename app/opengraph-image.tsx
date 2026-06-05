import { ImageResponse } from "next/og";
import { siteConfig } from "../lib/seo/config";

export const runtime = "edge";
export const alt = siteConfig.fullName;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "80px",
          background:
            "linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0f172a 100%)",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            color: "#fbbf24",
            fontSize: 28,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: 32,
          }}
        >
          {siteConfig.tagline}
        </div>
        <div
          style={{
            color: "#ffffff",
            fontSize: 96,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            marginBottom: 24,
            maxWidth: 1000,
          }}
        >
          {siteConfig.name}
        </div>
        <div
          style={{
            color: "#cbd5e1",
            fontSize: 32,
            lineHeight: 1.3,
            maxWidth: 1000,
          }}
        >
          Thinking Scripturally — Articles, Books, Magazines, Songs
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 56,
            left: 80,
            color: "#94a3b8",
            fontSize: 24,
          }}
        >
          kohamar.aradhanaplatform.com
        </div>
      </div>
    ),
    { ...size },
  );
}
