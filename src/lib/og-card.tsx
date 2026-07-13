/* Hallmark · social thumbnail system · genre: modern-minimal · theme: graphite/copper
 * pre-emit critique: P5 H4 E4 S5 R5 V4
 */
import { ImageResponse } from "next/og";

/**
 * Shared Open Graph card for project and writing detail pages. Same visual
 * family as the root card: canvas background, inset hairline frame, Geist
 * type, CD monogram. Content pages lead with the page's own title so shared
 * links (LinkedIn, iMessage, Slack) preview the thing being linked.
 */

export const ogSize = { width: 1200, height: 630 };

type OgVariant = "project" | "essay";

const palette = {
  canvas: "#0b0908",
  panel: "#12100e",
  border: "#2d251f",
  borderStrong: "#493b31",
  text: "#f0ece6",
  textMuted: "#b4aaa0",
  textSubtle: "#8d8379",
  accent: "#c97a45",
} as const;

// Geist from the official package CDN. Fetched rather than read from disk so
// the route also works if it ever runs in the Cloudflare Worker runtime,
// which has no Node filesystem access to the source tree.
const FONT_BASE = "https://cdn.jsdelivr.net/npm/geist@1.7.2/dist/fonts";
const FONT_FILES = {
  regular: `${FONT_BASE}/geist-sans/Geist-Regular.ttf`,
  medium: `${FONT_BASE}/geist-sans/Geist-Medium.ttf`,
  mono: `${FONT_BASE}/geist-mono/GeistMono-Regular.ttf`,
};

async function fetchFont(url: string) {
  const res = await fetch(url, { cache: "force-cache" });
  if (!res.ok) throw new Error(`Failed to load font ${url} (${res.status})`);
  return res.arrayBuffer();
}

/** All three weights, or null so the card still renders in the default face
 * instead of 500-ing the whole image. */
async function loadFontData() {
  try {
    const [regular, medium, mono] = await Promise.all([
      fetchFont(FONT_FILES.regular),
      fetchFont(FONT_FILES.medium),
      fetchFont(FONT_FILES.mono),
    ]);
    return { regular, medium, mono };
  } catch {
    return null;
  }
}

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : max).trimEnd()}…`;
}

export async function renderOgCard({
  variant,
  kicker,
  title,
  subtitle,
}: {
  variant: OgVariant;
  kicker: string;
  title: string;
  subtitle: string;
}) {
  const fonts = await loadFontData();
  const heading = truncate(title, 90);
  const sub = truncate(subtitle, 165);
  const titleSize =
    variant === "essay"
      ? heading.length <= 36
        ? 54
        : 46
      : heading.length <= 18
        ? 88
        : heading.length <= 36
          ? 68
          : 54;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: palette.canvas,
          color: palette.text,
          fontFamily: fonts ? "Geist" : "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 30,
            border: `1px solid ${palette.border}`,
            borderRadius: 28,
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            width: "100%",
            padding: "72px 86px 64px",
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
                fontSize: 21,
                letterSpacing: 3,
                textTransform: "uppercase",
                color: palette.textSubtle,
              }}
            >
              {kicker}
            </div>
            <div
              style={{
                fontFamily: fonts ? "Geist Mono" : "monospace",
                fontSize: 21,
                color: palette.accent,
              }}
            >
              connordibble.dev
            </div>
          </div>

          {variant === "project" ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexGrow: 1,
                width: "100%",
                gap: 56,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  width: 680,
                }}
              >
                <div
                  style={{
                    fontSize: titleSize,
                    lineHeight: 1.04,
                    fontWeight: 500,
                    letterSpacing: -1.5,
                    color: palette.text,
                  }}
                >
                  {heading}
                </div>
                <div
                  style={{
                    marginTop: 26,
                    fontSize: 27,
                    lineHeight: 1.42,
                    color: palette.textMuted,
                  }}
                >
                  {sub}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  width: 260,
                  gap: 0,
                  borderLeft: `1px solid ${palette.borderStrong}`,
                  paddingLeft: 34,
                }}
              >
                {["Intent", "Review", "Export"].map((step, index) => (
                  <div
                    key={step}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 18,
                      minHeight: 64,
                      borderBottom:
                        index < 2 ? `1px solid ${palette.border}` : "none",
                      color: index === 1 ? palette.text : palette.textSubtle,
                      fontFamily: fonts ? "Geist Mono" : "monospace",
                      fontSize: 19,
                    }}
                  >
                    <div
                      style={{
                        width: 9,
                        height: 9,
                        borderRadius: 999,
                        background:
                          index === 1 ? palette.accent : palette.borderStrong,
                      }}
                    />
                    <div>{step}</div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexGrow: 1,
                width: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignSelf: "stretch",
                  width: 190,
                  padding: "76px 36px 58px 0",
                  borderRight: `1px solid ${palette.borderStrong}`,
                  fontFamily: fonts ? "Geist Mono" : "monospace",
                }}
              >
                <div style={{ fontSize: 17, color: palette.textSubtle }}>
                  FIELD NOTE
                </div>
                <div
                  style={{
                    display: "flex",
                    width: 54,
                    height: 4,
                    background: palette.accent,
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  flexGrow: 1,
                  paddingLeft: 52,
                }}
              >
                <div
                  style={{
                    fontSize: titleSize,
                    lineHeight: 1.04,
                    fontWeight: 500,
                    letterSpacing: -1.5,
                    color: palette.text,
                  }}
                >
                  {heading}
                </div>
                <div
                  style={{
                    marginTop: 26,
                    fontSize: 26,
                    lineHeight: 1.4,
                    color: palette.textMuted,
                    maxWidth: 760,
                  }}
                >
                  {sub}
                </div>
              </div>
            </div>
          )}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              width: "100%",
              borderTop: `1px solid ${palette.border}`,
              paddingTop: 26,
            }}
          >
            <svg
              width={40}
              height={40}
              viewBox="0 0 512 512"
              fill="none"
              strokeWidth={44}
              strokeLinecap="butt"
              strokeLinejoin="round"
            >
              <path
                d="M278 166H216C164 166 126 204 126 256C126 308 164 346 216 346H278"
                stroke={palette.text}
              />
              <path d="M262 166V346" stroke={palette.accent} />
              <path
                d="M262 166H306C358 166 386 204 386 256C386 308 358 346 306 346H262"
                stroke={palette.text}
              />
            </svg>
            <div
              style={{ display: "flex", fontSize: 23, color: palette.textMuted }}
            >
              Connor Dibble
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      ...(fonts
        ? {
            fonts: [
              { name: "Geist", data: fonts.regular, weight: 400 as const, style: "normal" as const },
              { name: "Geist", data: fonts.medium, weight: 500 as const, style: "normal" as const },
              { name: "Geist Mono", data: fonts.mono, weight: 400 as const, style: "normal" as const },
            ],
          }
        : {}),
    },
  );
}
