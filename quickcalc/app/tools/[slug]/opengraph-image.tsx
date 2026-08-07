/**
 * app/tools/[slug]/opengraph-image.tsx
 *
 * Generates a unique 1200×630 Open Graph image for every tool page using
 * Next.js's built-in ImageResponse (next/og).
 *
 * Design anatomy (left→right layout):
 * ┌──────────────────────────────────────────────────────────────────┐
 * │  [gradient accent strip on left edge]                            │
 * │                                                                  │
 * │  QuickCalc  ·  quickcalc.cloud          [category badge]        │
 * │                                                                  │
 * │  ────────────────────────────────────────                        │
 * │                                                                  │
 * │  TOOL NAME (large Space Grotesk bold)                            │
 * │  tagline (medium, muted)                                         │
 * │                                                                  │
 * │  ┌────────────────────────────────────────┐                     │
 * │  │  📊  Example result value              │  ← example chip     │
 * │  └────────────────────────────────────────┘                     │
 * │                                                                  │
 * │  100% Free · No Sign-Up · Client-Side                           │
 * └──────────────────────────────────────────────────────────────────┘
 */

import { ImageResponse } from "next/og";
import { toolOGData } from "@/lib/ogData";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: { slug: string } }) {
  const data = toolOGData[params.slug];

  // Fallback for unknown slugs
  const toolName  = data?.name     ?? "QuickCalc Tool";
  const tagline   = data?.tagline  ?? "Free online calculator — no sign-up needed";
  const example   = data?.example  ?? "Calculate instantly, 100% free";
  const category  = data?.category ?? "Calculator";
  const gradArr   = data?.gradient ?? ["#059669", "#0d9488"];
  const gradFrom  = gradArr[0];
  const gradTo    = gradArr[gradArr.length - 1];

  // Load Inter font subset (used as fallback for Space Grotesk in edge)
  const fontData = await fetch(
    new URL("https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2")
  ).then((r) => r.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          background: "#0f0f0f",
          fontFamily: "Inter, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* ── Background gradient blob (top-right) ── */}
        <div
          style={{
            position: "absolute",
            top: "-120px",
            right: "-80px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${gradFrom}30 0%, transparent 70%)`,
          }}
        />

        {/* ── Left accent bar ── */}
        <div
          style={{
            position: "absolute",
            left: "0",
            top: "0",
            bottom: "0",
            width: "6px",
            background: `linear-gradient(180deg, ${gradFrom}, ${gradTo})`,
          }}
        />

        {/* ── Main content wrapper ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "52px 72px 52px 80px",
            width: "100%",
            height: "100%",
          }}
        >
          {/* Top row: logo + category */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            {/* Logo + domain */}
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              {/* Logo mark — calculator emoji substitute */}
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  background: `linear-gradient(135deg, ${gradFrom}, ${gradTo})`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "22px",
                }}
              >
                🧮
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span
                  style={{
                    fontSize: "22px",
                    fontWeight: "800",
                    color: "#ffffff",
                    letterSpacing: "-0.5px",
                  }}
                >
                  QuickCalc
                </span>
                <span style={{ fontSize: "13px", color: "#71717a", marginTop: "1px" }}>
                  quickcalc.cloud
                </span>
              </div>
            </div>

            {/* Category badge */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                background: `${gradFrom}22`,
                border: `1.5px solid ${gradFrom}55`,
                borderRadius: "999px",
                padding: "8px 20px",
              }}
            >
              <span style={{ fontSize: "15px", fontWeight: "600", color: gradFrom }}>
                {category}
              </span>
            </div>
          </div>

          {/* ── Divider ── */}
          <div
            style={{
              width: "100%",
              height: "1px",
              background: "#27272a",
              marginTop: "4px",
              marginBottom: "4px",
            }}
          />

          {/* ── Tool name + tagline ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "14px", flex: 1, justifyContent: "center" }}>
            <div
              style={{
                fontSize: "62px",
                fontWeight: "800",
                color: "#ffffff",
                lineHeight: "1.1",
                letterSpacing: "-2px",
                maxWidth: "900px",
              }}
            >
              {toolName}
            </div>
            <div
              style={{
                fontSize: "26px",
                color: "#a1a1aa",
                fontWeight: "400",
                lineHeight: "1.4",
                maxWidth: "700px",
              }}
            >
              {tagline}
            </div>
          </div>

          {/* ── Example result chip ── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              background: "#18181b",
              border: `1.5px solid #27272a`,
              borderRadius: "16px",
              padding: "18px 28px",
              maxWidth: "680px",
            }}
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: gradFrom,
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: "22px",
                color: "#e4e4e7",
                fontWeight: "600",
                fontFamily: "monospace",
                letterSpacing: "0.3px",
              }}
            >
              {example}
            </span>
          </div>

          {/* ── Footer badges ── */}
          <div style={{ display: "flex", alignItems: "center", gap: "24px", marginTop: "28px" }}>
            {["100% Free", "No Sign-Up", "Works Offline", "Client-Side"].map((badge) => (
              <div
                key={badge}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "7px",
                  color: "#52525b",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                <div
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: gradFrom,
                  }}
                />
                {badge}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Inter",
          data: fontData,
          weight: 400,
        },
      ],
    }
  );
}
