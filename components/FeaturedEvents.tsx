"use client"

import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Calendar, Clock, MapPin } from "lucide-react"
import { OlympicEvent } from "@/lib/types/event.type"
import { formatDateLong } from "@/lib/utils/date"
import { useTranslations } from "next-intl"
import { useTranslateSport } from "@/lib/utils/i18nHelpers"

interface FeaturedEventsProps {
  events: OlympicEvent[]
}

export function FeaturedEvents({ events }: Readonly<FeaturedEventsProps>) {
  const t = useTranslations("featuredEvents")
  const translateSport = useTranslateSport()

  const statusConfig = {
    available: { label: t("status.available"), className: "bg-[#00A651] text-white" },
    limited: { label: t("status.limited"), className: "bg-[#FCB131] text-black" },
    soldout: { label: t("status.soldout"), className: "bg-[#EE334E] text-white" },
  }

  return (
    <section id="events" className="py-20 bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-mono">
              {t("title")}
            </h2>
            <p className="mt-2 text-muted-foreground">
              {t("subtitle")}
            </p>
          </div>
          <Button variant="outline" className="w-fit bg-transparent" asChild>
            <Link href="/calendrier">
              {t("viewCalendar")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map(event => (
            <Link key={event.id} href={`/events/${event.id}`}>
              <Card className="group overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all border-border/50 h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="text-4xl">{event.icon}</div>
                    <Badge className={statusConfig[event.status].className}>
                      {statusConfig[event.status].label}
                    </Badge>
                  </div>
                  <div className="space-y-1 pt-2">
                    <p className="text-sm font-medium text-primary">
                      {translateSport(event.sport)}
                    </p>
                    <h3 className="text-lg font-semibold leading-tight group-hover:text-primary transition-colors">
                      {event.name}
                    </h3>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDateLong(event.date)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{event.location}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end border-t border-border/50 pt-4">
                  <Button
                    size="sm"
                    disabled={event.status === "soldout"}
                    variant={event.status === "soldout" ? "outline" : "default"}
                  >
                    {event.status === "soldout" ? t("soldout") : t("reserve")}
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
