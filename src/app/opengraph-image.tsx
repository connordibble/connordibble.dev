import { ImageResponse } from "next/og";

export const alt =
  "Connor Dibble | Developer platforms, agent context, and applied AI";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Prerender to a static PNG at build time. The route would otherwise run in
// the Cloudflare Worker at request time, where it has previously failed.
export const dynamic = "force-static";

// Geist (the site's typeface) from the official package CDN. Fetched rather
// than read from disk so it also works if the route ever runs in the Worker
// runtime, which has no Node filesystem access to the source tree.
const FONT_BASE = "https://cdn.jsdelivr.net/npm/geist@1.7.2/dist/fonts";
const FONT_FILES = {
  regular: `${FONT_BASE}/geist-sans/Geist-Regular.ttf`,
  semibold: `${FONT_BASE}/geist-sans/Geist-SemiBold.ttf`,
  mono: `${FONT_BASE}/geist-mono/GeistMono-Regular.ttf`,
};

async function fetchFont(url: string) {
  const res = await fetch(url, { cache: "force-cache" });
  if (!res.ok) throw new Error(`Failed to load font ${url} (${res.status})`);
  return res.arrayBuffer();
}

/** Returns the three weights, or null if any fetch fails so the card still
 * renders (in the default face) instead of 500-ing the whole image. */
async function loadFontData() {
  try {
    const [regular, semibold, mono] = await Promise.all([
      fetchFont(FONT_FILES.regular),
      fetchFont(FONT_FILES.semibold),
      fetchFont(FONT_FILES.mono),
    ]);
    return { regular, semibold, mono };
  } catch {
    return null;
  }
}

export default async function OpenGraphImage() {
  const fonts = await loadFontData();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: "#0b0908",
          color: "#f0ece6",
          fontFamily: fonts ? "Geist" : "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 30,
            border: "1px solid #2d251f",
            borderRadius: 28,
          }}
        />

        <svg
          width={430}
          height={430}
          viewBox="0 0 512 512"
          fill="none"
          stroke="#241d18"
          strokeWidth={36}
          strokeLinecap="butt"
          strokeLinejoin="round"
          style={{ position: "absolute", right: 64, top: 98 }}
        >
          <path d="M278 166H216C164 166 126 204 126 256C126 308 164 346 216 346H278" />
          <path d="M262 166V346" />
          <path d="M262 166H306C358 166 386 204 386 256C386 308 358 346 306 346H262" />
        </svg>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            width: "100%",
            padding: "74px 86px 68px",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div
              style={{
                fontFamily: fonts ? "Geist Mono" : "monospace",
                fontSize: 22,
                color: "#c97a45",
              }}
            >
              connordibble.dev
            </div>
            <div
              style={{
                width: 290,
                height: 1,
                background: "#2d251f",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: 735,
            }}
          >
            <div
              style={{
                fontSize: 96,
                lineHeight: 0.98,
                fontWeight: 500,
                color: "#f0ece6",
              }}
            >
              Connor Dibble
            </div>
            <div
              style={{
                marginTop: 28,
                fontSize: 29,
                lineHeight: 1.35,
                color: "#b4aaa0",
              }}
            >
              Developer platforms, agent context, and applied AI systems for
              software people can still reason about.
            </div>
          </div>

          <div
            style={{
              display: "flex",
              width: "100%",
              borderTop: "1px solid #2d251f",
              borderBottom: "1px solid #2d251f",
              fontSize: 19,
              color: "#b4aaa0",
            }}
          >
            {[
              ["Technical direction", "8 teams · 40–50 engineers"],
              ["Enterprise platform", "SFDS · 1000+ engineers & designers"],
              ["Agent context + evaluation", "Docs · skills · deterministic CLI"],
            ].map(([label, value], index) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  width: "33.333%",
                  padding: index === 0 ? "24px 26px 24px 0" : "24px 26px",
                  ...(index === 0 ? {} : { borderLeft: "1px solid #2d251f" }),
                }}
              >
                <div
                  style={{
                    fontFamily: fonts ? "Geist Mono" : "monospace",
                    fontSize: 16,
                    color: "#8d8379",
                  }}
                >
                  {label}
                </div>
                <div style={{ color: "#f0ece6" }}>{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      ...(fonts
        ? {
            fonts: [
              { name: "Geist", data: fonts.regular, weight: 400, style: "normal" },
              { name: "Geist", data: fonts.semibold, weight: 600, style: "normal" },
              { name: "Geist Mono", data: fonts.mono, weight: 400, style: "normal" },
            ],
          }
        : {}),
    },
  );
}
