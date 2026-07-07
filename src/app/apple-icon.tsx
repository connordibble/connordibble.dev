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
          position: "relative",
          overflow: "hidden",
          borderRadius: 36,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 7,
            border: "1px solid #2d251f",
            borderRadius: 31,
          }}
        />
        {/* The CD monogram, matching the favicon and hero watermark. */}
        <svg
          width={180}
          height={180}
          viewBox="0 0 512 512"
          fill="none"
          strokeWidth={38}
          strokeLinecap="butt"
          strokeLinejoin="round"
        >
          <g transform="translate(256 256) scale(1.17) translate(-256 -256)">
            <path
              d="M278 166H216C164 166 126 204 126 256C126 308 164 346 216 346H278"
              stroke="#f0ece6"
            />
            <path d="M262 166V346" stroke="#c97a45" />
            <path
              d="M262 166H306C358 166 386 204 386 256C386 308 358 346 306 346H262"
              stroke="#f0ece6"
            />
          </g>
        </svg>
      </div>
    ),
    size,
  );
}
