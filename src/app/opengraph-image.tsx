import { ImageResponse } from "next/og";

export const alt =
  "Connor Dibble — Senior Software Engineer, Platform Engineering & Design Systems";

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
          fontFamily: fonts ? "Geist" : "sans-serif",
        }}
      >
        {/* The CD brand mark as a quiet watermark in the right field. Unlike
            the hero (which bleeds off the screen edge), the card is a contained
            object, so the mark sits fully inside it with margin. Single muted
            tone keeps it background texture, not a competing logo. */}
        <svg
          width={560}
          height={560}
          viewBox="0 0 512 512"
          fill="none"
          stroke="#3d332b"
          strokeWidth={36}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ position: "absolute", top: 35, left: 688, opacity: 0.5 }}
        >
          <path d="M278 160H214C160.981 160 120 200.981 120 256C120 311.019 160.981 352 214 352H278" />
          <path d="M260 160V352H304C357.019 352 392 311.019 392 256C392 200.981 357.019 160 304 160H260" />
        </svg>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
            padding: "0 92px",
            position: "relative",
          }}
        >
          {/* Restrained accent detail. */}
          <div
            style={{
              width: 56,
              height: 5,
              borderRadius: 3,
              background: "#c97a45",
              marginBottom: 30,
            }}
          />
          <div
            style={{
              fontFamily: fonts ? "Geist Mono" : "monospace",
              fontSize: 25,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#8d8379",
            }}
          >
            Senior Software Engineer
          </div>
          <div
            style={{
              fontWeight: 600,
              fontSize: 104,
              lineHeight: 1,
              letterSpacing: -4,
              color: "#f0ece6",
              marginTop: 22,
            }}
          >
            Connor Dibble
          </div>
          <div
            style={{
              fontSize: 33,
              lineHeight: 1.4,
              color: "#afa69b",
              marginTop: 30,
              maxWidth: 720,
            }}
          >
            Platform engineering, design systems, and AI tooling that keep large
            engineering orgs shipping.
          </div>
          <div
            style={{
              fontFamily: fonts ? "Geist Mono" : "monospace",
              fontSize: 23,
              color: "#c97a45",
              marginTop: 48,
            }}
          >
            connordibble.dev
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
