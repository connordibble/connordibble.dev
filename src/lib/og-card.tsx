/* Hallmark · social thumbnail system · genre: modern-minimal · theme: graphite/copper
 * pre-emit critique: P5 H4 E4 S5 R5 V4
 */
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";

/**
 * Shared Open Graph card for project and writing detail pages. Same visual
 * family as the root card: canvas background, inset hairline frame, Geist
 * type, CD monogram. Content pages lead with the page's own title so shared
 * links (LinkedIn, iMessage, Slack) preview the thing being linked.
 */

export const ogSize = { width: 1200, height: 630 };

type OgVariant = "project" | "essay";

// ImageResponse cannot resolve the site's CSS custom properties. These values
// are fixed render-time equivalents of the locked graphite/copper tokens.
const palette = {
  canvas: "#0b0908", /* tokenlock-ignore */
  panel: "#12100e", /* tokenlock-ignore */
  border: "#2d251f", /* tokenlock-ignore */
  borderStrong: "#493b31", /* tokenlock-ignore */
  text: "#f0ece6", /* tokenlock-ignore */
  textMuted: "#b4aaa0", /* tokenlock-ignore */
  textSubtle: "#8d8379", /* tokenlock-ignore */
  accent: "#c97a45", /* tokenlock-ignore */
} as const;

async function readFont(path: string): Promise<ArrayBuffer> {
  const font = await readFile(new URL(path, import.meta.url));
  return font.buffer.slice(
    font.byteOffset,
    font.byteOffset + font.byteLength,
  ) as ArrayBuffer;
}

const fontData = Promise.all([
  readFont("../../assets/fonts/Geist-Regular.ttf"),
  readFont("../../assets/fonts/Geist-Medium.ttf"),
  readFont("../../assets/fonts/GeistMono-Regular.ttf"),
]);

async function loadFontData() {
  const [regular, medium, mono] = await fontData;
  return { regular, medium, mono };
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
  projectSteps,
  activeStep,
  essayLabel,
}: {
  variant: OgVariant;
  kicker: string;
  title: string;
  subtitle: string;
  projectSteps?: [string, string, string];
  activeStep?: 0 | 1 | 2;
  essayLabel?: string;
}) {
  const fonts = await loadFontData();
  const heading = truncate(title, 90);
  const sub = truncate(subtitle, 165);
  const titleSize =
    variant === "essay"
      ? heading.length <= 32
        ? 54
        : heading.length <= 44
          ? 44
          : 38
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
          fontFamily: "Geist",
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
              position: "absolute",
              top: 72,
              left: 86,
              right: 86,
              alignItems: "center",
              justifyContent: "space-between",
              height: 30,
            }}
          >
            <div
              style={{
                fontFamily: "Geist Mono",
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
                fontFamily: "Geist Mono",
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
                position: "absolute",
                top: 150,
                left: 86,
                right: 86,
                alignItems: "center",
                height: 300,
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
                {(projectSteps ?? ["Input", "Review", "Output"]).map(
                  (step, index) => (
                  <div
                    key={step}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 18,
                      minHeight: 64,
                      borderBottom:
                        index < 2 ? `1px solid ${palette.border}` : "none",
                      color:
                        index === (activeStep ?? 1)
                          ? palette.text
                          : palette.textSubtle,
                      fontFamily: "Geist Mono",
                      fontSize: 19,
                    }}
                  >
                    <div
                      style={{
                        width: 9,
                        height: 9,
                        borderRadius: 999,
                        background:
                          index === (activeStep ?? 1)
                            ? palette.accent
                            : palette.borderStrong,
                      }}
                    />
                    <div>{step}</div>
                  </div>
                  ),
                )}
              </div>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                position: "absolute",
                top: 140,
                left: 86,
                right: 86,
                alignItems: "center",
                height: 320,
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
                  fontFamily: "Geist Mono",
                }}
              >
                <div style={{ fontSize: 17, color: palette.textSubtle }}>
                  {(essayLabel ?? "Field note").toUpperCase()}
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
                  width: 734,
                  paddingLeft: 52,
                  overflow: "hidden",
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
              position: "absolute",
              left: 86,
              right: 86,
              bottom: 64,
              alignItems: "center",
              gap: 16,
              height: 68,
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
    ),
    {
      ...ogSize,
      fonts: [
        {
          name: "Geist",
          data: fonts.regular,
          weight: 400,
          style: "normal",
        },
        {
          name: "Geist",
          data: fonts.medium,
          weight: 500,
          style: "normal",
        },
        {
          name: "Geist Mono",
          data: fonts.mono,
          weight: 400,
          style: "normal",
        },
      ],
    },
  );
}
