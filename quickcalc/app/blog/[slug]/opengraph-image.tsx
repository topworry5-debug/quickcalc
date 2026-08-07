/**
 * app/blog/[slug]/opengraph-image.tsx
 *
 * Generates a unique 1200×630 Open Graph card for every blog/guide post
 * using Next.js ImageResponse (edge runtime).
 *
 * Design anatomy:
 * ┌──────────────────────────────────────────────────────────────────┐
 * │  [left accent bar]  [top-right glow blob]                        │
 * │                                                                  │
 * │  QuickCalc  ·  Blog & Guides                [category badge]    │
 * │  ─────────────────────────────────────────                       │
 * │                                                                  │
 * │  ARTICLE TITLE (large, up to 2 lines, ellipsised)                │
 * │                                                                  │
 * │  [description excerpt, 1 line]                                   │
 * │                                                                  │
 * │  ● X min read    ● Category    ● quickcalc.cloud/blog           │
 * └──────────────────────────────────────────────────────────────────┘
 */

import { ImageResponse } from "next/og";
import { articles } from "@/app/blog/articlesData";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Map category → gradient hex pair */
function categoryGradient(category: string): [string, string] {
  const map: Record<string, [string, string]> = {
    "Finance & Math":         ["#059669", "#0d9488"],
    "Health & Fitness":       ["#e11d48", "#db2777"],
    "Utility & Programming":  ["#4f46e5", "#6366f1"],
    "Utility & Shopping":     ["#d97706", "#f59e0b"],
    "Time & Productivity":    ["#2563eb", "#4f46e5"],
    "Life & Math":            ["#d97706", "#ea580c"],
    "Security":               ["#7c3aed", "#6366f1"],
  };
  for (const key of Object.keys(map)) {
    if (category.toLowerCase().includes(key.toLowerCase().split(" ")[0].toLowerCase())) {
      return map[key];
    }
  }
  // Fallback — teal
  return ["#059669", "#0d9488"];
}

export default async function Image({ params }: { params: { slug: string } }) {
  const article = articles.find((a) => a.slug === params.slug);

  const title    = article?.title    ?? "QuickCalc Blog";
  const category = article?.category ?? "Guide";
  const readTime = article?.readTime  ?? "8 min read";
  const excerpt  = article?.excerpt   ?? "In-depth calculators, tutorials, and financial guides — 100% free.";

  const [gradFrom, gradTo] = categoryGradient(category);

  // Trim title to ~65 chars for display
  const displayTitle = title.length > 68 ? title.slice(0, 65).trimEnd() + "…" : title;
  // Trim excerpt to ~110 chars
  const displayExcerpt = excerpt.length > 112 ? excerpt.slice(0, 109).trimEnd() + "…" : excerpt;

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
          background: "#0a0a0a",
          fontFamily: "Inter, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* ── Background glow (top-right) ── */}
        <div
          style={{
            position: "absolute",
            top: "-150px",
            right: "-100px",
            width: "520px",
            height: "520px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${gradFrom}28 0%, transparent 70%)`,
          }}
        />

        {/* ── Bottom-left subtle glow ── */}
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            left: "-80px",
            width: "380px",
            height: "380px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${gradTo}18 0%, transparent 70%)`,
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

        {/* ── Main content ── */}
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
          {/* Top row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
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
                📝
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "22px", fontWeight: "800", color: "#ffffff", letterSpacing: "-0.5px" }}>
                  QuickCalc
                </span>
                <span style={{ fontSize: "13px", color: "#71717a", marginTop: "1px" }}>
                  Blog & Guides
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

          {/* Divider */}
          <div style={{ width: "100%", height: "1px", background: "#1f1f23", marginTop: "4px", marginBottom: "4px" }} />

          {/* Title + excerpt */}
          <div style={{ display: "flex", flexDirection: "column", gap: "18px", flex: 1, justifyContent: "center" }}>
            {/* "ARTICLE" label */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: gradFrom,
                }}
              />
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: "700",
                  color: gradFrom,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                }}
              >
                In-Depth Guide
              </span>
            </div>

            {/* Title */}
            <div
              style={{
                fontSize: "52px",
                fontWeight: "800",
                color: "#ffffff",
                lineHeight: "1.15",
                letterSpacing: "-1.5px",
                maxWidth: "960px",
              }}
            >
              {displayTitle}
            </div>

            {/* Excerpt */}
            <div
              style={{
                fontSize: "22px",
                color: "#71717a",
                fontWeight: "400",
                lineHeight: "1.5",
                maxWidth: "820px",
              }}
            >
              {displayExcerpt}
            </div>
          </div>

          {/* Footer row */}
          <div style={{ display: "flex", alignItems: "center", gap: "32px", marginTop: "24px" }}>
            {[
              `📖 ${readTime}`,
              `🏷️ ${category}`,
              "✓ Free & No Sign-Up",
              "quickcalc.cloud/blog",
            ].map((item) => (
              <span
                key={item}
                style={{
                  fontSize: "15px",
                  color: "#52525b",
                  fontWeight: "500",
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Inter", data: fontData, weight: 400 }],
    }
  );
}
