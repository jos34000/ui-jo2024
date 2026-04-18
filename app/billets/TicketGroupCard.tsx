import { TicketGroup, TicketStatus } from "@/lib/types/payment.type"
import { useTranslations } from "next-intl"
import { useTranslateOffer, useTranslatePhase } from "@/lib/utils/i18nHelpers"
import { useState } from "react"
import { CalendarDays, Download, MapPin, Tag, Users } from "lucide-react"
import { formatDateWithTime, formatStringDateClassic } from "@/lib/utils/date"
import { formatPrice } from "@/lib/utils/format"

const TICKET_STATUS: Record<TicketStatus, { hex: string; bg: string; border: string }> = {
  VALID: { hex: "#00A651", bg: "#00A65114", border: "#00A65130" },
  USED: { hex: "#6B7280", bg: "#6B728014", border: "#6B728030" },
  CANCELLED: { hex: "#EE334E", bg: "#EE334E14", border: "#EE334E30" },
}

export const TicketGroupCard = ({
  group,
  onDownload,
}: Readonly<{ group: TicketGroup; onDownload: () => void }>) => {
  const t = useTranslations("tickets")
  const translatePhase = useTranslatePhase()
  const translateOffer = useTranslateOffer()
  const s = TICKET_STATUS[group.groupStatus]
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
    <article className="relative overflow-hidden rounded-2xl border border-border/40 bg-card shadow-sm hover:shadow-md transition-shadow">
      <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl" style={{ backgroundColor: s.hex }} />

      <div className="px-5 pt-6 pb-4">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="min-w-0">
            <p className="font-semibold text-base leading-tight truncate">{group.event.name}</p>
            <p className="text-[10px] text-muted-foreground font-mono mt-0.5 uppercase tracking-[0.1em]">
              {t("ref", { ref: group.paymentReference })}
            </p>
          </div>
          <span
            className="shrink-0 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider"
            style={{ color: s.hex, backgroundColor: s.bg, border: `1px solid ${s.border}` }}
          >
            <span className="w-1.5 h-1.5 rounded-full block" style={{ backgroundColor: s.hex }} />
            {t(`status.${group.groupStatus}`)}
          </span>
        </div>

        <div className="border-t-2 border-dashed border-border/30 mb-4" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            { icon: CalendarDays, value: formatDateWithTime(group.event.eventDate) },
            { icon: MapPin, value: `${group.event.location} · ${group.event.city}` },
            { icon: Tag, value: `${translateOffer(group.offer.name)} · ${translatePhase(group.event.phase)}` },
            { icon: Users, value: `${group.totalSeats} place${group.totalSeats > 1 ? "s" : ""}` },
          ].map(({ icon: Icon, value }) => (
            <div key={value} className="flex items-center gap-2 text-[11px] text-muted-foreground">
              <Icon className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{value}</span>
            </div>
          ))}
        </div>

        {group.barcodes.length > 1 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {group.barcodes.map(bc => (
              <span
                key={bc}
                className="font-mono text-[10px] bg-muted border border-border/40 px-2 py-1 rounded-full text-muted-foreground"
              >
                {bc}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between mt-4 pt-3 border-t-2 border-dashed border-border/30">
          <span className="text-[10px] text-muted-foreground uppercase tracking-[0.1em]">
            {t("purchasedOn", { date: formatStringDateClassic(group.purchasedAt) })}
          </span>
          <div className="flex items-center gap-3">
            {group.groupStatus === "VALID" && (
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-primary hover:text-primary/80 disabled:opacity-50 transition-colors"
              >
                <Download className="h-3.5 w-3.5" />
                {isDownloading ? t("downloading") : t("downloadPdf")}
              </button>
            )}
            <span className="font-black font-mono text-sm" style={{ color: s.hex }}>
              {formatPrice(group.totalPrice)}
            </span>
          </div>
        </div>
      </div>
    </article>
  )
}
