"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Calendar, Clock, MapPin } from "lucide-react"

const events = [
  {
    id: 1,
    title: "Cérémonie d'ouverture",
    sport: "Cérémonie",
    date: "26 Juillet 2024",
    time: "19:30",
    location: "Seine",
    status: "limited",
    image: "🏛️",
  },
  {
    id: 2,
    title: "Finale 100m Hommes",
    sport: "Athlétisme",
    date: "4 Août 2024",
    time: "21:50",
    location: "Stade de France",
    status: "available",
    image: "🏃",
  },
  {
    id: 3,
    title: "Finale Basketball",
    sport: "Basketball",
    date: "10 Août 2024",
    time: "21:30",
    location: "Bercy Arena",
    status: "available",
    image: "🏀",
  },
  {
    id: 4,
    title: "Finale Natation 4x100m",
    sport: "Natation",
    date: "28 Juillet 2024",
    time: "20:30",
    location: "Paris La Défense Arena",
    status: "available",
    image: "🏊",
  },
  {
    id: 5,
    title: "Finale Football Hommes",
    sport: "Football",
    date: "9 Août 2024",
    time: "18:00",
    location: "Parc des Princes",
    status: "soldout",
    image: "⚽",
  },
  {
    id: 6,
    title: "Cérémonie de clôture",
    sport: "Cérémonie",
    date: "11 Août 2024",
    time: "21:00",
    location: "Stade de France",
    status: "limited",
    image: "🎆",
  },
]

const statusConfig = {
  available: {
    label: "Disponible",
    variant: "default" as const,
    className: "bg-olympic-green text-white",
  },
  limited: {
    label: "Dernières places",
    variant: "secondary" as const,
    className: "bg-olympic-yellow text-black",
  },
  soldout: {
    label: "Épuisé",
    variant: "destructive" as const,
    className: "bg-olympic-red text-white",
  },
}

export function FeaturedEvents() {
  return (
    <section id="events" className="py-20 bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-mono">
              Événements populaires
            </h2>
            <p className="mt-2 text-muted-foreground">
              Les événements les plus attendus des Jeux Olympiques 2024
            </p>
          </div>
          <Button variant="outline" className="w-fit bg-transparent">
            Voir tout le calendrier
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map(event => (
            <Card
              key={event.id}
              className="group overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all border-border/50"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="text-4xl">{event.image}</div>
                  <Badge
                    className={
                      statusConfig[event.status as keyof typeof statusConfig]
                        .className
                    }
                  >
                    {
                      statusConfig[event.status as keyof typeof statusConfig]
                        .label
                    }
                  </Badge>
                </div>
                <div className="space-y-1 pt-2">
                  <p className="text-sm font-medium text-primary">
                    {event.sport}
                  </p>
                  <h3 className="text-lg font-semibold leading-tight group-hover:text-primary transition-colors">
                    {event.title}
                  </h3>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{event.date}</span>
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
                  {event.status === "soldout" ? "Épuisé" : "Réserver"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
