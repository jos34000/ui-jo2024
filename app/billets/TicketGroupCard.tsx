import { TicketGroup, TicketStatus } from "@/lib/types/payment.type"
import { useTranslations } from "next-intl"
import { useTranslateOffer, useTranslatePhase } from "@/lib/utils/i18nHelpers"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CalendarDays, Download, MapPin, Tag, Users } from "lucide-react"
import { formatDateWithTime, formatStringDateClassic } from "@/lib/utils/date"
import { formatPrice } from "@/lib/utils/format"

export const TicketGroupCard = ({
  group,
  onDownload,
}: Readonly<{ group: TicketGroup; onDownload: () => void }>) => {
  const t = useTranslations("tickets")
  const translatePhase = useTranslatePhase()
  const translateOffer = useTranslateOffer()

  const STATUS_CONFIG: Record<
    TicketStatus,
    {
      label: string
      variant: "default" | "secondary" | "destructive" | "outline"
    }
  > = {
    VALID: { label: t("status.VALID"), variant: "default" },
    USED: { label: t("status.USED"), variant: "secondary" },
    CANCELLED: { label: t("status.CANCELLED"), variant: "destructive" },
  }

  const cfg = STATUS_CONFIG[group.groupStatus]
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = async () => {
    setIsDownloading(true)
    try {
      onDownload()
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden transition-shadow hover:shadow-md">
      <div className="h-1 bg-primary" />
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="min-w-0">
            <p className="font-semibold text-base leading-tight truncate">
              {group.event.name}
            </p>
            <p className="text-xs text-muted-foreground font-mono mt-0.5">
              {t("ref", { ref: group.paymentReference })}
            </p>
          </div>
          <Badge variant={cfg.variant} className="shrink-0 text-xs">
            {cfg.label}
          </Badge>
        </div>

        <Separator className="mb-3" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <CalendarDays className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">
              {formatDateWithTime(group.event.eventDate)}
            </span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">
              {group.event.location} · {group.event.city}
            </span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Tag className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">
              {translateOffer(group.offer.name)} ·{" "}
              {translatePhase(group.event.phase)}
            </span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="h-3.5 w-3.5 shrink-0" />
            <span>
              {group.totalSeats} place{group.totalSeats > 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {group.barcodes.length > 1 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {group.barcodes.map(bc => (
              <span
                key={bc}
                className="font-mono text-xs bg-muted px-2 py-0.5 rounded text-muted-foreground"
              >
                {bc}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
          <span className="text-xs text-muted-foreground">
            {t("purchasedOn", {
              date: formatStringDateClassic(group.purchasedAt),
            })}
          </span>
          <div className="flex items-center gap-3">
            {group.groupStatus === "VALID" && (
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className="flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 disabled:opacity-50 transition-colors"
              >
                <Download className="h-3.5 w-3.5" />
                {isDownloading ? t("downloading") : t("downloadPdf")}
              </button>
            )}
            <span className="font-mono font-bold text-sm">
              {formatPrice(group.totalPrice)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
