import { notFound } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Layers,
  MapPin,
  Trophy,
} from "lucide-react"
import { SportResponseDTO } from "@/lib/types/sport.type"
import { getMessages, getTranslations } from "next-intl/server"

const getCurrentSport = async (
  id: number,
): Promise<SportResponseDTO | null> => {
  const res = await fetch(
    `${process.env.API_BASE_URL}/sport/${id}`,
    {
      cache: "no-store",
    },
  )

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
  const t = await getTranslations("sports")
  const messages = await getMessages()
  const sportNamesMap = (messages as Record<string, unknown>).sportNames as
    | Record<string, string>
    | undefined
  const translateSport = (name: string) => sportNamesMap?.[name] ?? name
  const phasesMap = (messages as Record<string, unknown>).phases as
    | Record<string, string>
    | undefined
  const translatePhase = (phase: string) => phasesMap?.[phase] ?? phase

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
                {t("home")}
              </Link>
              <span>/</span>
              <Link
                href="/#sports"
                className="hover:text-primary transition-colors"
              >
                {t("sports")}
              </Link>
              <span>/</span>
              <span className="text-foreground font-medium">
                {translateSport(sport.name)}
              </span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <section className="bg-background">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10 sm:py-14">
            <div className="flex flex-col sm:flex-row sm:items-start gap-6">
              <div className="flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-2xl border border-border/40 bg-card shrink-0 shadow-sm">
                <span className="text-5xl sm:text-6xl">{sport.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight font-mono">
                  {translateSport(sport.name)}
                </h1>
                <p className="mt-3 text-muted-foreground leading-relaxed max-w-2xl">
                  {sport.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button className="rounded-full" asChild>
                    <Link href={`/calendrier?sport=${encodeURIComponent(sport.name)}`}>
                      <CalendarDays className="mr-2 h-4 w-4" />
                      {t("viewCalendar")}
                    </Link>
                  </Button>
                  <Button variant="outline" className="bg-transparent rounded-full" asChild>
                    <Link href="/#sports">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      {t("allSports")}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-muted/30 border-t border-border">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10 sm:py-12">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

              <article className="relative overflow-hidden rounded-2xl border border-border/40 bg-card p-5 shadow-sm">
                <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl bg-[#FCB131]" />
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted">
                    <Trophy className="h-4 w-4 text-[#FCB131]" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                    {t("events")}
                  </span>
                </div>
                <p className="text-2xl font-black font-mono leading-none">{sport.eventCount}</p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <span className="w-1.5 h-1.5 rounded-full block bg-[#FCB131]" />
                  <p className="text-[11px] text-muted-foreground">{t("eventsCount")}</p>
                </div>
              </article>

              <article className="relative overflow-hidden rounded-2xl border border-border/40 bg-card p-5 shadow-sm">
                <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl bg-[#00A651]" />
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted">
                    <MapPin className="h-4 w-4 text-[#00A651]" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                    {sport.places.length > 1 ? t("sites") : t("site")}
                  </span>
                </div>
                <ul className="space-y-1">
                  {sport.places.map(place => (
                    <li key={place} className="text-sm font-semibold leading-snug">{place}</li>
                  ))}
                </ul>
              </article>

              <article className="relative overflow-hidden rounded-2xl border border-border/40 bg-card p-5 shadow-sm">
                <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl bg-[#0081C8]" />
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted">
                    <Layers className="h-4 w-4 text-[#0081C8]" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                    {t("phases")}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {sport.phases.map(phase => (
                    <span
                      key={phase}
                      className="inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider border border-border/40 bg-muted text-muted-foreground"
                    >
                      {translatePhase(phase)}
                    </span>
                  ))}
                </div>
              </article>

            </div>
          </div>
        </section>

        {/* Other sports */}
        <section className="border-t border-border bg-background">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10 sm:py-12">
            <h2 className="text-xl font-bold font-mono mb-6">{t("discoverOthers")}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {otherSports?.map(sp => (
                <Link
                  key={sp.id}
                  href={`/sports/${sp.id}`}
                  className="group relative flex flex-col items-center justify-center p-5 rounded-2xl border border-border/40 bg-card overflow-hidden hover:-translate-y-0.5 hover:shadow-md hover:border-border/70 transition-all duration-200 shadow-sm"
                >
                  <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl bg-primary/20 group-hover:bg-primary transition-colors duration-300" />
                  <span className="text-3xl mb-2.5 mt-1 group-hover:scale-110 transition-transform duration-200 leading-none">
                    {sp.icon}
                  </span>
                  <span className="font-semibold text-sm text-center leading-tight">
                    {translateSport(sp.name)}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground mt-1.5">
                    {sp.eventCount} {t("eventsCount")}
                  </span>
                </Link>
              ))}
            </div>
            <div className="text-center mt-6">
              <Button variant="ghost" className="rounded-full" asChild>
                <Link href="/#sports">
                  {t("allSports")}
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
