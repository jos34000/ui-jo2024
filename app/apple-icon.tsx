import { ImageResponse } from "next/og"

export const runtime = "edge"

export const size = {
  width: 180,
  height: 180,
}

export const contentType = "image/png"

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        background: "#0B1120",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "36px",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "14px",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            border: "4px solid #0081C8",
            display: "flex",
          }}
        />
        <div
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            border: "4px solid #FCB131",
            display: "flex",
          }}
        />
        <div
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            border: "4px solid #FFFFFF",
            display: "flex",
          }}
        />
        <div
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            border: "4px solid #00A651",
            display: "flex",
          }}
        />
        <div
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            border: "4px solid #EE334E",
            display: "flex",
          }}
        />
      </div>
    </div>,
    {
      ...size,
    },
  )
}
