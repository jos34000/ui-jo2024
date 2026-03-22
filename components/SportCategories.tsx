import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { SportResponseDTO } from "@/lib/types/sport.type"
import { getTranslations, getMessages } from "next-intl/server"

const getAllSport = async (): Promise<SportResponseDTO[] | null> => {
  const res = await fetch(`${process.env.API_BASE_URL}/sport`)
  if (!res.ok) return null
  return await res.json()
}

export const SportCategories = async () => {
  const sports = await getAllSport()
  const featuredSports = sports?.splice(0, 12)
  const t = await getTranslations("sportCategories")
  const messages = await getMessages()
  const sportNamesMap = (messages as Record<string, unknown>).sportNames as Record<string, string> | undefined
  const translateSport = (name: string) => sportNamesMap?.[name] ?? name

  return (
    <section id="sports" className="py-20 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-mono">
            {t("title")}
          </h2>
          <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
            {t("subtitle", { count: sports?.length ?? 0 })}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {featuredSports?.map(sport => (
            <Link
              key={sport.id}
              href={`/sports/${sport.id}`}
              className="group flex flex-col items-center justify-center p-6 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-primary/5 transition-all duration-200"
            >
              <span className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                {sport.icon}
              </span>
              <span className="font-medium text-foreground text-sm">
                {translateSport(sport.name)}
              </span>
              <span className="text-xs text-muted-foreground mt-1">
                {sport.eventCount} {t("events")}
              </span>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button variant="outline" size="lg" asChild>
            <Link href="/calendrier">
              {t("viewCalendar")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
