import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0b0908",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 132,
            height: 132,
            border: "3px solid #2e2620",
            borderRadius: 36,
            background: "#161210",
            color: "#f0ece6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 54,
            fontWeight: 600,
            letterSpacing: -5,
          }}
        >
          C<span style={{ color: "#c97a45" }}>D</span>
        </div>
      </div>
    ),
    size,
  );
}
