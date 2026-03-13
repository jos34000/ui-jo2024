import { notFound } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Layers,
  MapPin,
  Trophy,
} from "lucide-react"
import { SportResponseDTO } from "@/lib/types/sport.type"
import { EVENT_PHASE_LABELS, EventPhase } from "@/lib/types/phases.type"

const getCurrentSport = async (
  id: number,
): Promise<SportResponseDTO | null> => {
  const res = await fetch(`${process.env.API_BASE_URL}/sport/${id}`, {
    cache: "no-store",
  })

  if (!res.ok) return null
  return await res.json()
}

const getAllSports = async (): Promise<SportResponseDTO[] | null> => {
  const res = await fetch(`${process.env.API_BASE_URL}/sport`)
  if (!res.ok) return null
  return await res.json()
}

const SportPage = async ({ params }: { params: Promise<{ id: number }> }) => {
  const { id } = await params
  const [sport, sports] = await Promise.all([
    getCurrentSport(id),
    getAllSports(),
  ])

  if (!sport) {
    notFound()
  }

  const otherSports = sports?.filter(e => e.name !== sport.name).slice(0, 4)

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
                href="/#sports"
                className="hover:text-primary transition-colors"
              >
                Sports
              </Link>
              <span>/</span>
              <span className="text-foreground font-medium">{sport.name}</span>
            </nav>
          </div>
        </div>

        <section className="bg-background">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10 sm:py-14">
            <div className="flex flex-col sm:flex-row sm:items-start gap-6">
              <div className="flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-2xl bg-primary/5 border border-primary/20 shrink-0">
                <span className="text-5xl sm:text-6xl">{sport.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight font-mono">
                  {sport.name}
                </h1>
                <p className="mt-3 text-muted-foreground leading-relaxed max-w-2xl">
                  {sport.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button asChild>
                    <Link
                      href={`/calendrier?sport=${encodeURIComponent(sport.name)}`}
                    >
                      <CalendarDays className="mr-2 h-4 w-4" />
                      Voir le calendrier
                    </Link>
                  </Button>
                  <Button variant="outline" className="bg-transparent" asChild>
                    <Link href="/#sports">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Tous les sports
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-muted/30 border-t border-border">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10 sm:py-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                      <Trophy className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">
                      Épreuves
                    </span>
                  </div>
                  <p className="text-2xl font-bold font-mono">
                    {sport.eventCount}
                  </p>
                </CardContent>
              </Card>

              {/*<Card>
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                      <CalendarDays className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">
                      Dates
                    </span>
                  </div>
                  <p className="text-sm font-semibold leading-snug">
                    {sport.dates}
                  </p>
                </CardContent>
              </Card>*/}

              <Card>
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                      <MapPin className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">
                      {sport.places.length > 1 ? "Sites" : "Site"}
                    </span>
                  </div>
                  <ul className="space-y-1">
                    {sport.places.map(place => (
                      <li
                        key={place}
                        className="text-sm font-semibold leading-snug"
                      >
                        {place}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                      <Layers className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">
                      Phases
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {sport.phases.map(phase => (
                      <Badge
                        key={phase}
                        variant="secondary"
                        className="text-xs"
                      >
                        {EVENT_PHASE_LABELS[phase as EventPhase]}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="border-t border-border bg-background">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10 sm:py-12">
            <h2 className="text-xl font-bold font-mono mb-6">
              Découvrir d{"'"}autres sports
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {otherSports?.map(s => (
                <Link
                  key={s.id}
                  href={`/sports/${s.id}`}
                  className="group flex flex-col items-center justify-center p-5 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-primary/5 transition-all"
                >
                  <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                    {s.icon}
                  </span>
                  <span className="font-medium text-foreground text-sm">
                    {s.name}
                  </span>
                  <span className="text-xs text-muted-foreground mt-0.5">
                    {s.eventCount} epreuves
                  </span>
                </Link>
              ))}
            </div>
            <div className="text-center mt-6">
              <Button variant="ghost" asChild>
                <Link href="/#sports">
                  Tous les sports
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default SportPage
