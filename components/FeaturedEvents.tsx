"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, Clock, MapPin } from "lucide-react"
import { OlympicEvent } from "@/lib/types/event.type"
import { formatDateLong } from "@/lib/utils/date"
import { useTranslations } from "next-intl"
import { useTranslateSport } from "@/lib/utils/i18nHelpers"
import { cn } from "@/lib/utils"

interface FeaturedEventsProps {
  events: OlympicEvent[]
}

const STATUS = {
  available: { hex: "#00A651", bg: "#00A65114", border: "#00A65130" },
  limited: { hex: "#FCB131", bg: "#FCB13114", border: "#FCB13130" },
  soldout: { hex: "#EE334E", bg: "#EE334E14", border: "#EE334E30" },
} as const

export function FeaturedEvents({ events }: Readonly<FeaturedEventsProps>) {
  const t = useTranslations("featuredEvents")
  const translateSport = useTranslateSport()

  return (
    <section id="events" className="py-20 bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-mono">
              {t("title")}
            </h2>
            <p className="mt-2 text-muted-foreground">{t("subtitle")}</p>
          </div>
          <Button variant="outline" className="w-fit bg-transparent" asChild>
            <Link href="/calendrier">
              {t("viewCalendar")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map(event => {
            const s = STATUS[event.status]
            const isSoldOut = event.status === "soldout"

            return (
              <Link key={event.id} href={`/events/${event.id}`}>
                <article
                  className={cn(
                    "group relative flex flex-col overflow-hidden rounded-2xl h-full",
                    "border border-border/40 bg-card",
                    "hover:-translate-y-0.5 hover:shadow-lg hover:border-border/70",
                    "transition-all duration-200 ease-out shadow-sm",
                  )}
                >
                  {/* Top accent bar */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl"
                    style={{ backgroundColor: s.hex }}
                  />

                  {/* Header — icon + status */}
                  <div
                    className="px-5 pt-6 pb-4"
                    style={{ background: `linear-gradient(180deg, ${s.bg} 0%, transparent 100%)` }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="text-4xl leading-none">{event.icon}</span>
                      <span
                        className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider"
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

                    <div className="mt-3 space-y-0.5">
                      <p
                        className="text-[10px] font-bold uppercase tracking-[0.15em]"
                        style={{ color: s.hex }}
                      >
                        {translateSport(event.sport)}
                      </p>
                      <h3 className="text-base font-semibold leading-snug group-hover:text-primary transition-colors line-clamp-2">
                        {event.name}
                      </h3>
                    </div>
                  </div>

                  {/* Perforated separator */}
                  <div className="border-t-2 border-dashed border-border/30 mx-5" />

                  {/* Details */}
                  <div className="flex-1 px-5 py-4 space-y-2 text-[11px] text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3.5 w-3.5 shrink-0" />
                      <span>{formatDateLong(event.date)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5 shrink-0" />
                      <span className="font-mono font-semibold">{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">{event.location}</span>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="px-5 pb-5 flex justify-end border-t border-border/30 pt-4">
                    <Button
                      size="sm"
                      disabled={isSoldOut}
                      className={cn(
                        "h-7 rounded-full text-[11px] font-semibold px-3.5",
                        isSoldOut && "opacity-40",
                      )}
                      variant={isSoldOut ? "outline" : "default"}
                    >
                      {isSoldOut ? t("soldout") : t("reserve")}
                    </Button>
                  </div>
                </article>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
