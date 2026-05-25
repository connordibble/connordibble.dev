import { ImageResponse } from "next/og";

export const alt = "Connor Dibble — Senior Software Engineer";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0b0908",
          color: "#f0ece6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 72,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            border: "2px solid #2e2620",
            borderRadius: 28,
            background: "#100d0b",
            display: "flex",
            alignItems: "center",
            padding: 64,
          }}
        >
          <div
            style={{
              width: 180,
              height: 180,
              border: "3px solid #2e2620",
              borderRadius: 40,
              background: "#161210",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 76,
              fontWeight: 600,
              letterSpacing: -7,
              flexShrink: 0,
            }}
          >
            C<span style={{ color: "#c97a45" }}>D</span>
          </div>
          <div
            style={{
              marginLeft: 56,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                color: "#8d8379",
                fontSize: 24,
                letterSpacing: 2,
                textTransform: "uppercase",
                marginBottom: 18,
              }}
            >
              Senior Software Engineer
            </div>
            <div
              style={{
                fontSize: 80,
                lineHeight: 1,
                fontWeight: 600,
                letterSpacing: -3,
                marginBottom: 30,
              }}
            >
              Connor Dibble
            </div>
            <div
              style={{
                color: "#afa69b",
                fontSize: 34,
                lineHeight: 1.35,
                maxWidth: 690,
              }}
            >
              Enterprise design systems. AI tooling. Production code.
            </div>
            <div
              style={{
                color: "#c97a45",
                fontSize: 22,
                marginTop: 44,
              }}
            >
              connordibble.dev
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
