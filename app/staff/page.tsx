"use client"

import { useState, useCallback } from "react"
import dynamic from "next/dynamic"
import { useTranslations } from "next-intl"
import { toast } from "sonner"
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  Ban,
  QrCode,
  Loader2,
  Camera,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { scanTicket } from "@/lib/mutations/scan.mutations"
import { ScanResponse, ScanOutcome } from "@/lib/types/scan.type"
import { ApiError, resolveApiErrorMessage } from "@/lib/utils/api"

const QRScannerView = dynamic(
  () =>
    import("@/components/staff/QRScannerView").then(m => ({ default: m.QRScannerView })),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    ),
  },
)

type Phase = "idle" | "scanning" | "processing" | "result"

interface OutcomeConfig {
  icon: LucideIcon
  iconClass: string
  badgeClass: string
}

const OUTCOME_CONFIG: Record<ScanOutcome, OutcomeConfig> = {
  SUCCESS: {
    icon: CheckCircle,
    iconClass: "text-green-600 dark:text-green-400",
    badgeClass: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  },
  ALREADY_USED: {
    icon: AlertTriangle,
    iconClass: "text-orange-500",
    badgeClass: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  },
  INVALID: {
    icon: XCircle,
    iconClass: "text-red-600 dark:text-red-400",
    badgeClass: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  },
  CANCELLED: {
    icon: Ban,
    iconClass: "text-muted-foreground",
    badgeClass: "bg-muted text-muted-foreground",
  },
}

const StaffScanner = () => {
  const t = useTranslations("staff.scanner")
  const tErrors = useTranslations("errors")

  const [phase, setPhase] = useState<Phase>("idle")
  const [result, setResult] = useState<ScanResponse | null>(null)

  const handleScanSuccess = useCallback(
    async (decodedText: string) => {
      setPhase("processing")
      try {
        const response = await scanTicket({ combinedKey: decodedText })
        setResult(response)
        setPhase("result")
      } catch (err) {
        setPhase("scanning")
        const message =
          err instanceof ApiError
            ? resolveApiErrorMessage(err, tErrors, t("scanError"))
            : t("scanError")
        toast.error(message)
      }
    },
    [t, tErrors],
  )

  const handleCameraError = useCallback(
    (error: string) => {
      console.error("Camera error:", error)
      setPhase("idle")
      toast.error(t("cameraError"))
    },
    [t],
  )

  const resetScanner = () => {
    setResult(null)
    setPhase("scanning")
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="font-mono text-2xl font-bold">{t("title")}</h1>
        <p className="mt-1 text-muted-foreground">{t("subtitle")}</p>
      </div>

      <div className="max-w-md space-y-6">
        {phase === "idle" && (
          <Card>
            <CardContent className="flex flex-col items-center gap-4 py-16">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                <QrCode className="h-10 w-10 text-primary" />
              </div>
              <Button onClick={() => setPhase("scanning")} size="lg" className="gap-2">
                <Camera className="h-5 w-5" />
                {t("startScan")}
              </Button>
            </CardContent>
          </Card>
        )}

        {(phase === "scanning" || phase === "processing") && (
          <Card>
            <CardContent className="p-4">
              <QRScannerView
                onScanSuccess={handleScanSuccess}
                onCameraError={handleCameraError}
              />
              {phase === "processing" && (
                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {t("scanning")}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {phase === "result" && result && <ScanResultCard result={result} t={t} onReset={resetScanner} />}
      </div>
    </div>
  )
}

interface ScanResultCardProps {
  result: ScanResponse
  t: ReturnType<typeof useTranslations>
  onReset: () => void
}

function ScanResultCard({ result, t, onReset }: ScanResultCardProps) {
  const config = OUTCOME_CONFIG[result.outcome]
  const Icon = config.icon

  const formattedDate = new Date(result.scannedAt).toLocaleString()
  const eventDate = new Date(result.event.eventDate).toLocaleDateString(undefined, {
    dateStyle: "long",
  })

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">{t("title")}</CardTitle>
          <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ${config.badgeClass}`}>
            <Icon className="h-4 w-4" />
            {t(`outcome.${result.outcome}`)}
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <section>
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {t("holder")}
          </p>
          <p className="font-medium">
            {result.holderFirstName} {result.holderLastName}
          </p>
          <p className="text-sm text-muted-foreground">{result.holderEmail}</p>
        </section>

        <section>
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {t("event")}
          </p>
          <p className="font-medium">{result.event.name}</p>
          <p className="text-sm text-muted-foreground">
            {eventDate} · {result.event.location}, {result.event.city}
          </p>
          <p className="text-sm text-muted-foreground">{result.event.phase}</p>
        </section>

        <section>
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {t("offer")}
          </p>
          <p className="font-medium">{result.offer.name}</p>
          <p className="text-sm text-muted-foreground">
            {t("seats", { count: result.offer.numberOfTickets })}
          </p>
        </section>

        <section className="border-t border-border pt-3">
          <p className="text-xs text-muted-foreground">
            {t("scannedAt")} {formattedDate}
          </p>
          <p className="text-xs text-muted-foreground">
            {t("scannedBy")} {result.scannedBy}
          </p>
        </section>

        <Button onClick={onReset} variant="outline" className="w-full gap-2">
          <QrCode className="h-4 w-4" />
          {t("scanAgain")}
        </Button>
      </CardContent>
    </Card>
  )
}

export default StaffScanner
