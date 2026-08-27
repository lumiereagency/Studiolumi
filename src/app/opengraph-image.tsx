import { ImageResponse } from "next/og";
import { INFINITY_PATH } from "@/components/LogoMark";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "radial-gradient(120% 130% at 15% 15%, rgba(232,80,2,0.35) 0%, rgba(193,8,1,0.12) 40%, #050403 72%)",
          fontFamily: "sans-serif",
        }}
      >
        <svg width="120" height="60" viewBox="-12 -12 184 104" fill="none">
          <path
            d={INFINITY_PATH}
            stroke="#f9f9f9"
            strokeWidth={16}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div
          style={{
            marginTop: 48,
            fontSize: 72,
            fontWeight: 600,
            color: "#f9f9f9",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
          }}
        >
          Produção audiovisual premium.
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 30,
            color: "rgba(249,249,249,0.6)",
          }}
        >
          Direção, produção e pós-produção em uma única operação.
        </div>
      </div>
    ),
    { ...size }
  );
}
