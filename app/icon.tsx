import { ImageResponse } from "next/og"

export const runtime = "edge"

export const size = {
  width: 32,
  height: 32,
}

export const contentType = "image/png"

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        background: "#0B1120",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "6px",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "6px",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "7px",
            height: "7px",
            borderRadius: "50%",
            border: "1.5px solid #0081C8",
            display: "flex",
          }}
        />
        <div
          style={{
            width: "7px",
            height: "7px",
            borderRadius: "50%",
            border: "1.5px solid #FCB131",
            display: "flex",
          }}
        />
        <div
          style={{
            width: "7px",
            height: "7px",
            borderRadius: "50%",
            border: "1.5px solid #FFFFFF",
            display: "flex",
          }}
        />
        <div
          style={{
            width: "7px",
            height: "7px",
            borderRadius: "50%",
            border: "1.5px solid #00A651",
            display: "flex",
          }}
        />
        <div
          style={{
            width: "7px",
            height: "7px",
            borderRadius: "50%",
            border: "1.5px solid #EE334E",
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
