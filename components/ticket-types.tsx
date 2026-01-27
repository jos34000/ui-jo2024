"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Crown, Sparkles, Star } from "lucide-react"

const ticketTypes = [
    {
        name: "Standard",
        icon: Star,
        price: "À partir de 24€",
        description: "L'essentiel pour vivre l'expérience olympique",
        features: [
            "Accès à la session sélectionnée",
            "Place assise garantie",
            "E-billet sur mobile",
            "Accès aux zones communes",
        ],
        buttonVariant: "outline" as const,
        popular: false,
    },
    {
        name: "Premium",
        icon: Sparkles,
        price: "À partir de 195€",
        description: "Une vue imprenable sur l'action",
        features: [
            "Tout ce qui est inclus en Standard",
            "Meilleures places de la catégorie",
            "Accès prioritaire au site",
            "Programme souvenir inclus",
            "Espace restauration dédié",
        ],
        buttonVariant: "default" as const,
        popular: true,
    },
    {
        name: "Hospitalité",
        icon: Crown,
        price: "À partir de 950€",
        description: "L'expérience ultime des Jeux",
        features: [
            "Tout ce qui est inclus en Premium",
            "Suite privée ou loge VIP",
            "Service de conciergerie",
            "Restauration gastronomique",
            "Meet & greet exclusifs",
            "Cadeaux Paris 2024",
        ],
        buttonVariant: "outline" as const,
        popular: false,
    },
]

export function TicketTypes() {
    return (
        <section className="py-20 bg-muted/30">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Types de billets
                    </h2>
                    <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
                        Choisissez l'expérience qui vous correspond pour vivre les Jeux Olympiques 2024
                    </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-3">
                    {ticketTypes.map((ticket) => (
                        <Card
                            key={ticket.name}
                            className={`relative flex flex-col ${ticket.popular ? 'border-primary shadow-lg scale-105' : 'border-border/50'}`}
                        >
                            {ticket.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                    Le plus populaire
                  </span>
                                </div>
                            )}
                            <CardHeader className="text-center pb-4">
                                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                                    <ticket.icon className="h-7 w-7 text-primary" />
                                </div>
                                <CardTitle className="text-xl">{ticket.name}</CardTitle>
                                <CardDescription>{ticket.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <div className="mb-6 text-center">
                                    <span className="text-3xl font-bold">{ticket.price}</span>
                                </div>
                                <ul className="space-y-3">
                                    {ticket.features.map((feature) => (
                                        <li key={feature} className="flex items-start gap-3">
                                            <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                            <span className="text-sm text-muted-foreground">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button variant={ticket.buttonVariant} className="w-full">
                                    {ticket.name === "Hospitalité" ? "Nous contacter" : "Sélectionner"}
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
