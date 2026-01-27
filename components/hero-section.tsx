"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, MapPin, Ticket } from "lucide-react"

export function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-background">
            {/* Background pattern */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,transparent_49%,var(--border)_50%,transparent_51%,transparent_100%)] bg-[length:60px_100%] opacity-30" />
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,transparent_49%,var(--border)_50%,transparent_51%,transparent_100%)] bg-[length:100%_60px] opacity-30" />
            </div>

            <div className="mx-auto max-w-7xl px-6 py-20 lg:py-32 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
                            Billets disponibles maintenant
                        </div>

                        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl text-balance">
                            Vivez les{" "}
                            <span className="text-primary">Jeux Olympiques</span>{" "}
                            de Paris 2024
                        </h1>

                        <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                            Soyez au cœur de l'action. Réservez vos places pour assister aux plus grands athlètes
                            du monde dans la ville lumière.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button size="lg" className="text-base">
                                Voir les événements
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                            <Button size="lg" variant="outline" className="text-base bg-transparent">
                                Guide d'achat
                            </Button>
                        </div>

                        <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-primary">
                                    <Calendar className="h-4 w-4" />
                                    <span className="text-2xl font-bold">16</span>
                                </div>
                                <p className="text-sm text-muted-foreground">Jours de compétition</p>
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-primary">
                                    <Ticket className="h-4 w-4" />
                                    <span className="text-2xl font-bold">32</span>
                                </div>
                                <p className="text-sm text-muted-foreground">Sports</p>
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-primary">
                                    <MapPin className="h-4 w-4" />
                                    <span className="text-2xl font-bold">35</span>
                                </div>
                                <p className="text-sm text-muted-foreground">Sites</p>
                            </div>
                        </div>
                    </div>

                    {/* Hero visual */}
                    <div className="relative lg:pl-8">
                        <div className="relative aspect-square max-w-lg mx-auto">
                            {/* Decorative rings */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-full h-full rounded-full border-2 border-primary/20 animate-pulse" />
                            </div>
                            <div className="absolute inset-8 flex items-center justify-center">
                                <div className="w-full h-full rounded-full border-2 border-accent/30" />
                            </div>

                            {/* Central content */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center space-y-4 bg-background/80 backdrop-blur-sm rounded-2xl p-8 border border-border">
                                    <div className="text-6xl font-bold tracking-tighter">
                                        <span className="text-olympic-blue">P</span>
                                        <span className="text-olympic-black">A</span>
                                        <span className="text-olympic-red">R</span>
                                        <span className="text-olympic-yellow">I</span>
                                        <span className="text-olympic-green">S</span>
                                    </div>
                                    <div className="text-8xl font-bold text-foreground tracking-tighter">2024</div>
                                    <div className="flex justify-center gap-1 pt-4">
                                        <div className="w-3 h-3 rounded-full bg-[#0081C8]" />
                                        <div className="w-3 h-3 rounded-full bg-foreground" />
                                        <div className="w-3 h-3 rounded-full bg-[#EE334E]" />
                                        <div className="w-3 h-3 rounded-full bg-[#FCB131]" />
                                        <div className="w-3 h-3 rounded-full bg-[#00A651]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
