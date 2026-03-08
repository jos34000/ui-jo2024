import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { SportResponseDTO } from "@/lib/types/sport.type"

const getAllSport = async (): Promise<SportResponseDTO[] | null> => {
  const res = await fetch(`${process.env.API_BASE_URL}/sport`)
  if (!res.ok) return null
  return await res.json()
}

export const SportCategories = async () => {
  const sports = await getAllSport()
  return (
    <section id="sports" className="py-20 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-mono">
            Explorer par sport
          </h2>
          <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
            {sports?.length} sports, 329 evenements. Trouvez les billets pour
            vos sports preferes.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {sports?.map(sport => (
            <Link
              key={sport.id}
              href={`/sports/${sport.id}`}
              className="group flex flex-col items-center justify-center p-6 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-primary/5 transition-all duration-200"
            >
              <span className="font-medium text-foreground text-sm">
                {sport.name}
              </span>
              <span className="text-xs text-muted-foreground mt-1">
                {sport.eventCount} epreuves
              </span>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button variant="outline" size="lg" asChild>
            <Link href="/calendrier">
              Voir le calendrier complet
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
