"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Heart, User, Users } from "lucide-react"

interface TicketOffer {
  name: string
  subtitle: string
  icon: React.ElementType
  count: number
  description: string
  features: string[]
  popular: boolean
  color: string
}

const offers: TicketOffer[] = [
  {
    name: "Solo",
    subtitle: "1 billet",
    icon: User,
    count: 1,
    description: "Parfait pour vivre votre passion en toute liberte.",
    features: [
      "Acces a tous les evenements",
      "1 place assise garantie",
      "E-billet sur mobile",
      "Acces aux zones communes",
    ],
    popular: false,
    color: "text-[#0081C8]",
  },
  {
    name: "Duo",
    subtitle: "2 billets",
    icon: Users,
    count: 2,
    description: "Partagez des moments uniques a deux, cote a cote.",
    features: [
      "Acces a tous les evenements",
      "2 places cote a cote garanties",
      "E-billets sur mobile",
      "Acces aux zones communes",
    ],
    popular: true,
    color: "text-primary",
  },
  {
    name: "Famille",
    subtitle: "4 billets",
    icon: Heart,
    count: 4,
    description: "Vivez les Jeux en famille avec des places regroupees.",
    features: [
      "Acces a tous les evenements",
      "4 places regroupees garanties",
      "E-billets sur mobile",
      "Acces aux zones communes",
      "Sac souvenir Paris 2024 offert",
    ],
    popular: false,
    color: "text-[#00A651]",
  },
]

export const TicketTypes = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-mono">
            Nos offres
          </h2>
          <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
            {
              "Choisissez la formule adaptee a votre experience. Chaque billet donne acces a l'ensemble des evenements."
            }
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3 items-start">
          {offers.map(offer => (
            <Card
              key={offer.name}
              className={`relative flex flex-col transition-all duration-200 hover:shadow-lg hover:border-primary/30 ${
                offer.popular
                  ? "border-primary shadow-md lg:scale-105"
                  : "border-border/50"
              }`}
            >
              {offer.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground shadow-sm">
                    Le plus choisi
                  </Badge>
                </div>
              )}
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-lg bg-muted ${offer.color}`}
                  >
                    <offer.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold font-mono">
                      {offer.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {offer.subtitle}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {offer.description}
                </p>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3">
                  {offer.features.map(feature => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant={offer.popular ? "default" : "outline"}
                >
                  {offer.popular ? "Choisir Duo" : `Choisir ${offer.name}`}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
