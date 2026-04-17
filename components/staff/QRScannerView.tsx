"use client"

import { useEffect, useRef } from "react"
import { Html5Qrcode } from "html5-qrcode"

interface QRScannerViewProps {
  onScanSuccess: (decodedText: string) => void
  onCameraError: (error: string) => void
}

const SCANNER_ELEMENT_ID = "staff-qr-scanner"

export function QRScannerView({ onScanSuccess, onCameraError }: QRScannerViewProps) {
  const hasScannedRef = useRef(false)

  useEffect(() => {
    hasScannedRef.current = false
    let scanner: InstanceType<typeof Html5Qrcode> | null = null
    let started = false
    let cleanedUp = false

    const timerId = setTimeout(() => {
      scanner = new Html5Qrcode(SCANNER_ELEMENT_ID)

      scanner
        .start(
          { facingMode: "environment" },
          { fps: 10, qrbox: { width: 250, height: 250 } },
          decodedText => {
            if (hasScannedRef.current) return
            hasScannedRef.current = true
            started = false
            scanner!.stop().catch(() => {})
            onScanSuccess(decodedText)
          },
          () => {},
        )
        .then(() => {
          started = true
          if (cleanedUp) scanner!.stop().catch(() => {})
        })
        .catch((err: unknown) => {
          if (!cleanedUp) onCameraError(String(err))
        })
    }, 0)

    return () => {
      cleanedUp = true
      clearTimeout(timerId)
      if (started && scanner) scanner.stop().catch(() => {})
    }
  }, [onScanSuccess, onCameraError])

  return <div id={SCANNER_ELEMENT_ID} className="w-full overflow-hidden rounded-lg" />
}
