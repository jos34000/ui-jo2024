import { notFound } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  CalendarDays,
  Clock,
  MapPin,
  Ticket,
  Users,
} from "lucide-react"
import { formatDateLong, formatDateShort } from "@/lib/utils/date"
import { EventDTO, EventStatus, OlympicEvent } from "@/lib/types/event.type"
import { ReservationDialog } from "@/components/ReservationDialog"
import { toOlympicEvent } from "@/lib/utils/eventMapper"
import { OfferDTO } from "@/lib/types/offer.type"
import { getTranslations, getMessages, getLocale } from "next-intl/server"

const STATUS = {
  available: { hex: "#00A651", bg: "#00A65114", border: "#00A65130" },
  limited: { hex: "#FCB131", bg: "#FCB13114", border: "#FCB13130" },
  soldout: { hex: "#EE334E", bg: "#EE334E14", border: "#EE334E30" },
} as const

const getThisEvent = async (id: number, locale: string): Promise<OlympicEvent | null> => {
  const url = `${process.env.API_BASE_URL}/events/${id}`
  const res = await fetch(url, {
    cache: "no-store",
    headers: { "Accept-Language": locale },
  })

  if (!res.ok) return null

  const data = await res.json()
  return toOlympicEvent(data)
}

const getOffers = async (): Promise<OfferDTO[]> => {
  const res = await fetch(`${process.env.API_BASE_URL}/offer/all`, {
    cache: "no-store",
  })
  if (!res.ok) return []
  return res.json()
}

const getAllEventsBySport = async (
  sport: string,
  thisId: number,
  locale: string,
): Promise<OlympicEvent[] | null> => {
  const res = await fetch(`${process.env.API_BASE_URL}/events/sport/${sport}`, {
    cache: "no-store",
    headers: { "Accept-Language": locale },
  })

  if (!res.ok) return null

  const data = await res.json()
  return data
    .filter((e: EventDTO) => e.id !== thisId)
    .map((e: EventDTO) => toOlympicEvent(e))
}

const EventPage = async ({ params }: { params: Promise<{ id: number }> }) => {
  const t = await getTranslations("events")
  const messages = await getMessages()
  const locale = await getLocale()
  const sportNamesMap = (messages as Record<string, unknown>).sportNames as Record<string, string> | undefined
  const translateSport = (name: string) => sportNamesMap?.[name] ?? name
  const event = await getThisEvent((await params).id, locale)

  if (!event) notFound()

  const [otherEvents, offers] = await Promise.all([
    getAllEventsBySport(event.sport, event.id, locale),
    getOffers(),
  ])

  const statusLabel: Record<EventStatus, string> = {
    available: t("available"),
    limited: t("limited"),
    soldout: t("soldout"),
  }

  const s = STATUS[event.status as EventStatus]
  const occupancyRate =
    ((event.capacity - event.availableSlots) / event.capacity) * 100
  const isSoldOut = event.status === "soldout"

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">

        {/* Breadcrumb */}
        <div className="border-b border-border">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 py-3">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-primary transition-colors">
                {t("home")}
              </Link>
              <span>/</span>
              <Link href="/calendrier" className="hover:text-primary transition-colors">
                {t("calendar")}
              </Link>
              <span>/</span>
              <span className="text-foreground font-medium truncate">{event.name}</span>
            </nav>
          </div>
        </div>

        {/* Hero section */}
        <section className="bg-background">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-12">
            <div className="flex flex-col lg:flex-row lg:items-start gap-8">

              {/* Left — event info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-4 flex-wrap">
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider"
                    style={{ color: s.hex, backgroundColor: s.bg, border: `1px solid ${s.border}` }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full block" style={{ backgroundColor: s.hex }} />
                    {statusLabel[event.status as EventStatus]}
                  </span>
                  <span className="inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider border border-border/40 bg-card text-muted-foreground">
                    {translateSport(event.sport)}
                  </span>
                </div>

                <div className="flex items-start gap-4 mb-5">
                  <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl border border-border/40 bg-card shrink-0 shadow-sm">
                    <span className="text-3xl sm:text-4xl">{event.icon}</span>
                  </div>
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight font-mono">
                      {event.name}
                    </h1>
                    <p className="text-muted-foreground mt-1">{translateSport(event.category)}</p>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed mb-6">{event.description}</p>

                {/* Info grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                  {[
                    { icon: CalendarDays, value: formatDateShort(event.date) },
                    { icon: Clock, value: event.time },
                    { icon: MapPin, value: event.location },
                    { icon: Users, value: event.capacity.toLocaleString("fr-FR") },
                  ].map(({ icon: Icon, value }) => (
                    <div key={value} className="flex items-center gap-2 rounded-xl border border-border/40 bg-card px-3 py-2 text-sm shadow-sm">
                      <Icon className="h-3.5 w-3.5 text-primary shrink-0" />
                      <span className="truncate">{value}</span>
                    </div>
                  ))}
                </div>

                <div className="lg:hidden mb-6">
                  <ReservationDialog event={event} offers={offers} disabled={isSoldOut} />
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="rounded-full" asChild>
                    <Link href="/calendrier">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      {t("viewCalendar")}
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Right — sticky reservation card */}
              <div className="hidden lg:block w-80 shrink-0">
                <article className="sticky top-24 relative overflow-hidden rounded-2xl border border-border/40 bg-card shadow-sm">
                  <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl" style={{ backgroundColor: s.hex }} />
                  <div className="px-5 pt-6 pb-4">
                    <h2 className="text-base font-bold font-mono">{t("reservation")}</h2>
                  </div>
                  <div className="border-t-2 border-dashed border-border/30 mx-5" />
                  <div className="px-5 py-4 space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{t("availability")}</span>
                        <span className="font-medium text-xs">
                          {t("placesAvailable", { count: event.availableSlots.toLocaleString("fr-FR") })}
                        </span>
                      </div>
                      <Progress value={occupancyRate} className="h-1.5" />
                      <p className="text-[11px] text-muted-foreground">
                        {t("percentSold", { percent: Math.round(occupancyRate) })}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2.5 rounded-xl border border-border/40 bg-background/50 px-3 py-2.5 text-sm">
                        <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                        <span className="font-medium truncate">{event.location}</span>
                      </div>
                      <div className="flex flex-col gap-0.5 rounded-xl border border-border/40 bg-background/50 px-3 py-2.5">
                        <div className="flex items-center gap-2.5 text-sm">
                          <CalendarDays className="h-3.5 w-3.5 text-primary shrink-0" />
                          <span className="font-medium">{formatDateLong(event.date)}</span>
                        </div>
                        <p className="text-[11px] text-muted-foreground pl-6">
                          {t("startAt", { time: event.time })}
                        </p>
                      </div>
                    </div>

                    <ReservationDialog event={event} offers={offers} disabled={isSoldOut} />

                    {isSoldOut && (
                      <p className="text-[11px] text-center text-muted-foreground">
                        {t("soldoutInfo", { sport: translateSport(event.sport) })}
                      </p>
                    )}
                  </div>
                </article>
              </div>

            </div>
          </div>
        </section>

        {/* Stats section */}
        <section className="bg-muted/30 border-t border-border">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-10">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: Users, accent: "#0081C8", label: t("capacityTotal"), value: event.capacity.toLocaleString("fr-FR"), sub: t("spectators") },
                { icon: Ticket, accent: s.hex, label: t("availableSlots"), value: event.availableSlots.toLocaleString("fr-FR"), sub: statusLabel[event.status as EventStatus] },
                { icon: MapPin, accent: "#00A651", label: t("location"), value: event.location, sub: event.city },
              ].map(({ icon: Icon, accent, label, value, sub }) => (
                <article key={label} className="relative overflow-hidden rounded-2xl border border-border/40 bg-card p-5 shadow-sm">
                  <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl" style={{ backgroundColor: accent }} />
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted">
                      <Icon className="h-4 w-4" style={{ color: accent }} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                      {label}
                    </span>
                  </div>
                  <p className="text-2xl font-black font-mono leading-none">{value}</p>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <span className="w-1.5 h-1.5 rounded-full block" style={{ backgroundColor: accent }} />
                    <p className="text-[11px] text-muted-foreground">{sub}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Related events */}
        {otherEvents && otherEvents.length > 0 && (
          <section className="border-t border-border bg-background">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-10">
              <h2 className="text-xl font-bold font-mono mb-6">
                {event.sport === "Cérémonie"
                  ? t("otherCeremonies")
                  : t("otherEvents", { sport: translateSport(event.sport) })}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {otherEvents.map(ev => (
                  <Link key={ev.id} href={`/events/${ev.id}`}>
                    <article className="group relative overflow-hidden rounded-2xl border border-border/40 bg-card hover:-translate-y-0.5 hover:shadow-md hover:border-border/70 transition-all duration-200 shadow-sm h-full p-4">
                      <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl bg-primary/20 group-hover:bg-primary transition-colors duration-300" />
                      <div className="flex items-start gap-3">
                        <span className="text-2xl leading-none mt-0.5">{ev.icon}</span>
                        <div className="min-w-0">
                          <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground mb-0.5">
                            {formatDateShort(ev.date)} · {ev.time}
                          </p>
                          <h3 className="text-sm font-semibold leading-snug group-hover:text-primary transition-colors line-clamp-2">
                            {ev.name}
                          </h3>
                          <p className="text-[11px] text-muted-foreground mt-1.5 flex items-center gap-1">
                            <MapPin className="h-3 w-3 shrink-0" />
                            <span className="truncate">{ev.location}</span>
                          </p>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

      </main>

      <Footer />
    </div>
  )
}

export default EventPage
