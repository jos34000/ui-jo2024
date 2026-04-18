"use client"

import { OlympicEvent } from "@/lib/types/event.type"
import { MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { useTranslateSport } from "@/lib/utils/i18nHelpers"
import { cn } from "@/lib/utils"

interface EventCardProps {
  event: OlympicEvent
}

const STATUS = {
  available: { hex: "#00A651", bg: "#00A65114", border: "#00A65130" },
  limited: { hex: "#FCB131", bg: "#FCB13114", border: "#FCB13130" },
  soldout: { hex: "#EE334E", bg: "#EE334E14", border: "#EE334E30" },
} as const

export const EventCard = ({ event }: EventCardProps) => {
  const t = useTranslations("featuredEvents")
  const translateSport = useTranslateSport()
  const s = STATUS[event.status]
  const isSoldOut = event.status === "soldout"

  return (
    <Link href={`/events/${event.id}`}>
      <article
        className={cn(
          "group relative flex overflow-hidden rounded-2xl",
          "border border-border/40 bg-card",
          "hover:-translate-y-0.5 hover:shadow-lg hover:border-border/70",
          "transition-all duration-200 ease-out shadow-sm",
        )}
      >
        {/* Left edge accent bar */}
        <div
          className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-2xl"
          style={{ backgroundColor: s.hex }}
        />

        {/* Ticket stub — time panel */}
        <div
          className="shrink-0 w-[72px] flex flex-col items-center justify-center gap-1.5 py-4 pl-[3px]"
          style={{ background: `linear-gradient(135deg, ${s.bg} 0%, transparent 100%)` }}
        >
          <div
            className="w-1.5 h-1.5 rounded-full opacity-60"
            style={{ backgroundColor: s.hex }}
          />
          <time className="text-xl font-black font-mono tracking-tight leading-none tabular-nums">
            {event.time}
          </time>
          <div
            className="w-1.5 h-1.5 rounded-full opacity-60"
            style={{ backgroundColor: s.hex }}
          />
        </div>

        {/* Perforated separator */}
        <div className="shrink-0 border-l-2 border-dashed border-border/30 my-3" />

        {/* Main content */}
        <div className="flex-1 min-w-0 px-4 py-3 flex flex-col gap-2 justify-between">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <p
                className="text-[10px] font-bold uppercase tracking-[0.15em] mb-0.5"
                style={{ color: s.hex }}
              >
                {translateSport(event.sport)}
              </p>
              <h3 className="text-sm font-semibold leading-snug group-hover:text-primary transition-colors line-clamp-2">
                {event.name}
              </h3>
            </div>

            <span
              className="shrink-0 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider"
              style={{
                color: s.hex,
                backgroundColor: s.bg,
                border: `1px solid ${s.border}`,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full block"
                style={{ backgroundColor: s.hex }}
              />
              {t(`status.${event.status}`)}
            </span>
          </div>

          <div className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground min-w-0">
              <MapPin className="w-3 h-3 shrink-0" />
              <span className="truncate">{event.location}</span>
            </span>

            <Button
              size="sm"
              disabled={isSoldOut}
              className={cn(
                "shrink-0 h-7 rounded-full text-[11px] font-semibold px-3.5",
                isSoldOut && "opacity-40",
              )}
              variant={isSoldOut ? "outline" : "default"}
            >
              {isSoldOut ? t("soldout") : t("reserve")}
            </Button>
          </div>
        </div>
      </article>
    </Link>
  )
}
