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
          position: "relative",
          width: "30px",
          height: "14px",
          display: "flex",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "0px",
            top: "0px",
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            border: "1.5px solid #0081C8",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "9px",
            top: "0px",
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            border: "1.5px solid #000000",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "18px",
            top: "0px",
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            border: "1.5px solid #EE334E",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "4.5px",
            top: "5px",
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            border: "1.5px solid #FCB131",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "13.5px",
            top: "5px",
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            border: "1.5px solid #00A651",
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
