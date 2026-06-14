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
        {/* The CD arc mark, matching the favicon and hero watermark. */}
        <svg
          width={118}
          height={118}
          viewBox="0 0 512 512"
          fill="none"
          strokeWidth={44}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            d="M278 160H214C160.981 160 120 200.981 120 256C120 311.019 160.981 352 214 352H278"
            stroke="#f0ece6"
          />
          <path
            d="M260 160V352H304C357.019 352 392 311.019 392 256C392 200.981 357.019 160 304 160H260"
            stroke="#c97a45"
          />
        </svg>
      </div>
    ),
    size,
  );
}
