import { ImageResponse } from "next/og";
import { siteConfig } from "./config";

export const OG_SIZE = { width: 1200, height: 630 } as const;

export interface DetailOgInput {
  eyebrow: string;
  title: string;
  byline?: string;
}

export function renderDetailOg(input: DetailOgInput): ImageResponse {
  const safeTitle =
    input.title.length > 110 ? input.title.slice(0, 107) + "..." : input.title;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "linear-gradient(135deg, #0f172a 0%, #1e3a8a 60%, #0f172a 100%)",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#fbbf24",
            fontSize: 24,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          <div>{siteConfig.name}</div>
          <div>{input.eyebrow}</div>
        </div>

        <div
          style={{
            color: "#ffffff",
            fontSize: 68,
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.01em",
            maxWidth: 1040,
            display: "flex",
          }}
        >
          {safeTitle}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            color: "#cbd5e1",
            fontSize: 26,
          }}
        >
          <div>{input.byline ?? ""}</div>
          <div style={{ color: "#94a3b8" }}>kohamar.aradhanaplatform.com</div>
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
