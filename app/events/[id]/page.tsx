import { notFound } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  CalendarDays,
  Clock,
  Heart,
  MapPin,
  Share2,
  Ticket,
  Users,
} from "lucide-react"
import { formatDateLong, formatDateShort } from "@/lib/utils/date"
import { EventDTO, EventStatus, OlympicEvent } from "@/lib/types/event.type"
import { ReservationDialog } from "@/components/ReservationDialog"
import { EventStatusProps } from "@/lib/types/props.type"
import { toOlympicEvent } from "@/lib/utils/eventMapper"
import { OfferDTO } from "@/lib/types/offer.type"

const statusConfig: Record<EventStatus, EventStatusProps> = {
  available: {
    label: "Disponible",
    className: "bg-[#00A651] text-white",
    dotColor: "bg-[#00A651]",
  },
  limited: {
    label: "Dernières places",
    className: "bg-[#FCB131] text-black",
    dotColor: "bg-[#FCB131]",
  },
  soldout: {
    label: "Complet",
    className: "bg-[#EE334E] text-white",
    dotColor: "bg-[#EE334E]",
  },
}

const getThisEvent = async (id: number): Promise<OlympicEvent | null> => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/events/${id}`
  const res = await fetch(url, { cache: "no-store" })

  if (!res.ok) return null

  const data = await res.json()
  return toOlympicEvent(data)
}

const getOffers = async (): Promise<OfferDTO[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/offer/all`, {
    cache: "no-store",
  })
  if (!res.ok) return []
  return res.json()
}

const getAllEventsBySport = async (
  sport: string,
  thisId: number,
): Promise<OlympicEvent[] | null> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/events/sport/${sport}`, {
    cache: "no-store",
  })

  if (!res.ok) return null

  const data = await res.json()
  return data
    .filter((e: EventDTO) => e.id !== thisId)
    .map((e: EventDTO) => toOlympicEvent(e))
}

const EventPage = async ({ params }: { params: Promise<{ id: number }> }) => {
  const event = await getThisEvent((await params).id)

  if (!event) notFound()

  const [otherEvents, offers] = await Promise.all([
    getAllEventsBySport(event.sport, event.id),
    getOffers(),
  ])

  const status = statusConfig[event.status as EventStatus]
  const occupancyRate =
    ((event.capacity - event.availableSlots) / event.capacity) * 100
  const isSoldOut = event.status === "soldout"

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="border-b border-border">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 py-3">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-primary transition-colors">
                Accueil
              </Link>
              <span>/</span>
              <Link
                href="/calendrier"
                className="hover:text-primary transition-colors"
              >
                Calendrier
              </Link>
              <span>/</span>
              <span className="text-foreground font-medium truncate">
                {event.name}
              </span>
            </nav>
          </div>
        </div>

        <section className="bg-background">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-12">
            <div className="flex flex-col lg:flex-row lg:items-start gap-8">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-4">
                  <Badge className={status.className}>{status.label}</Badge>
                  <Badge variant="outline">{event.sport}</Badge>
                </div>

                <div className="flex items-start gap-4 mb-4">
                  <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-xl bg-primary/5 border border-primary/20 shrink-0">
                    <span className="text-3xl sm:text-4xl">{event.icon}</span>
                  </div>
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight font-mono">
                      {event.name}
                    </h1>
                    <p className="text-muted-foreground mt-1">
                      {event.category}
                    </p>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  {event.description}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <CalendarDays className="h-4 w-4 text-primary shrink-0" />
                    <span>{formatDateShort(event.date)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-primary shrink-0" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-primary shrink-0" />
                    <span className="truncate">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-primary shrink-0" />
                    <span>{event.capacity.toLocaleString("fr-FR")}</span>
                  </div>
                </div>

                <div className="lg:hidden mb-6">
                  <ReservationDialog event={event} offers={offers} disabled={isSoldOut} />
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-transparent"
                  >
                    <Heart className="mr-2 h-4 w-4" />
                    Favoris
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-transparent"
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    Partager
                  </Button>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/calendrier">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Calendrier
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="hidden lg:block w-80 shrink-0">
                <Card className="sticky top-24">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-mono">
                      Reservation
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          Disponibilite
                        </span>
                        <span className="font-medium">
                          {event.availableSlots.toLocaleString("fr-FR")} places
                        </span>
                      </div>
                      <Progress value={occupancyRate} className="h-2" />
                      <p className="text-xs text-muted-foreground">
                        {Math.round(occupancyRate)}% des places vendues
                      </p>
                    </div>

                    <div className="p-3 rounded-lg bg-muted/50 space-y-1">
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <MapPin className="h-4 w-4 text-primary" />
                        {event.location}
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-muted/50 space-y-1">
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <CalendarDays className="h-4 w-4 text-primary" />
                        {formatDateLong(event.date)}
                      </div>
                      <p className="text-xs text-muted-foreground pl-6">
                        Debut a {event.time}
                      </p>
                    </div>

                    <ReservationDialog event={event} offers={offers} disabled={isSoldOut} />

                    {isSoldOut && (
                      <p className="text-xs text-center text-muted-foreground">
                        Cet évènement est complet. Consultez les autres epreuves
                        de {event.sport}.
                      </p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-muted/30 border-t border-border">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-10">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                      <Users className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">
                      Capacité totale
                    </span>
                  </div>
                  <p className="text-2xl font-bold font-mono">
                    {event.capacity.toLocaleString("fr-FR")}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    spectateurs
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                      <Ticket className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">
                      Places disponibles
                    </span>
                  </div>
                  <p className="text-2xl font-bold font-mono">
                    {event.availableSlots.toLocaleString("fr-FR")}
                  </p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <div
                      className={`h-2 w-2 rounded-full ${status.dotColor}`}
                    />
                    <p className="text-xs text-muted-foreground">
                      {status.label}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                      <MapPin className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">
                      Lieu
                    </span>
                  </div>
                  <p className="text-base font-bold leading-tight">
                    {event.location}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {otherEvents && otherEvents.length > 0 && (
          <section className="border-t border-border bg-background">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-10">
              <h2 className="text-xl font-bold font-mono mb-6">
                {event.sport === "Cérémonie"
                  ? "Autres cérémonies"
                  : `Autres épreuves de ${event.sport}`}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {otherEvents.map(event => (
                  <Link key={event.id} href={`/events/${event.id}`}>
                    <Card className="group hover:border-primary/30 transition-all h-full">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <span className="text-2xl">{event.icon}</span>
                          <div className="min-w-0">
                            <p className="text-xs text-muted-foreground mb-0.5">
                              {formatDateShort(event.date)} - {event.time}
                            </p>
                            <h3 className="text-sm font-semibold leading-tight group-hover:text-primary transition-colors">
                              {event.name}
                            </h3>
                            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {event.location}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
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
