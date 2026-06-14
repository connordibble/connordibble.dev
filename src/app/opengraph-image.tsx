import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt =
  "Connor Dibble — Senior Software Engineer, Platform Engineering & Design Systems";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Vendored Geist TTFs (the site's typeface) so the card renders in the real
// brand font instead of the next/og fallback. Read at build time; the route
// is fully static, so this never runs at request time.
function loadFont(file: string) {
  return readFile(join(process.cwd(), "src", "app", "_fonts", file));
}

export default async function OpenGraphImage() {
  const [geist, geistSemiBold, geistMono] = await Promise.all([
    loadFont("Geist-Regular.ttf"),
    loadFont("Geist-SemiBold.ttf"),
    loadFont("GeistMono-Regular.ttf"),
  ]);

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
          fontFamily: "Geist",
        }}
      >
        {/* The CD brand mark as a quiet, oversized watermark, bleeding off the
            right edge exactly like the hero. Single muted tone keeps it
            background texture, not a competing logo. */}
        <svg
          width={780}
          height={780}
          viewBox="0 0 512 512"
          fill="none"
          stroke="#3d332b"
          strokeWidth={36}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ position: "absolute", top: -75, right: -188, opacity: 0.55 }}
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
              fontFamily: "Geist Mono",
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
              fontFamily: "Geist",
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
              fontFamily: "Geist",
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
              fontFamily: "Geist Mono",
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
      fonts: [
        { name: "Geist", data: geist, weight: 400, style: "normal" },
        { name: "Geist", data: geistSemiBold, weight: 600, style: "normal" },
        { name: "Geist Mono", data: geistMono, weight: 400, style: "normal" },
      ],
    },
  );
}
