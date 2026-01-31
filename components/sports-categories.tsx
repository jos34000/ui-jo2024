"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const sports = [
    { name: "Athlétisme", icon: "🏃", events: 48 },
    { name: "Natation", icon: "🏊", events: 35 },
    { name: "Gymnastique", icon: "🤸", events: 18 },
    { name: "Basketball", icon: "🏀", events: 4 },
    { name: "Football", icon: "⚽", events: 4 },
    { name: "Tennis", icon: "🎾", events: 5 },
    { name: "Cyclisme", icon: "🚴", events: 22 },
    { name: "Escrime", icon: "🤺", events: 12 },
    { name: "Judo", icon: "🥋", events: 15 },
    { name: "Aviron", icon: "🚣", events: 14 },
    { name: "Voile", icon: "⛵", events: 10 },
    { name: "Équitation", icon: "🏇", events: 6 },
]

export function SportsCategories() {
    return (
        <section id="sports" className="py-20 bg-background">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-mono">
                        Explorer par sport
                    </h2>
                    <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
                        32 sports, 329 événements. Trouvez les billets pour vos sports préférés.
                    </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {sports.map((sport) => (
                        <button
                            key={sport.name}
                            className="group flex flex-col items-center justify-center p-6 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-primary/5 transition-all duration-200"
                        >
                            <span className="text-4xl mb-3 group-hover:scale-110 transition-transform">{sport.icon}</span>
                            <span className="font-medium text-foreground text-sm">{sport.name}</span>
                            <span className="text-xs text-muted-foreground mt-1">{sport.events} épreuves</span>
                        </button>
                    ))}
                </div>

                <div className="text-center mt-10">
                    <Button variant="outline" size="lg">
                        Voir tous les sports
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </div>
        </section>
    )
}
