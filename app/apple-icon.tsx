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
          position: "relative",
          width: "160px",
          height: "75px",
          display: "flex",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "0px",
            top: "0px",
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            border: "4px solid #0081C8",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "48px",
            top: "0px",
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            border: "4px solid #000000",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "96px",
            top: "0px",
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            border: "4px solid #EE334E",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "24px",
            top: "27px",
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            border: "4px solid #FCB131",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "72px",
            top: "27px",
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            border: "4px solid #00A651",
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
