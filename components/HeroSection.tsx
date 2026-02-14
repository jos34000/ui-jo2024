"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, MapPin, Star, Ticket } from "lucide-react"
import { useAuthStore } from "@/lib/stores/auth.store"

export const HeroSection = () => {
  const user = useAuthStore(state => state.user)
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)

  return (
    <section className="relative overflow-hidden bg-background">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,transparent_49%,var(--border)_50%,transparent_51%,transparent_100%)] bg-[length:60px_100%] opacity-30" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,transparent_49%,var(--border)_50%,transparent_51%,transparent_100%)] bg-[length:100%_60px] opacity-30" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-20 lg:py-32 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            {isAuthenticated && user ? (
              <>
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
                  <Star className="h-3.5 w-3.5 fill-primary" />
                  {"Bienvenue dans votre espace"}
                </div>

                <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl text-balance font-mono">
                  Bonjour,{" "}
                  <span className="text-primary">{user.firstName}</span>
                </h1>

                <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                  {
                    "Retrouvez vos billets, explorez les prochains événements et ne manquez aucun moment des Jeux Olympiques de Paris 2024."
                  }
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="text-base">
                    <Ticket className="mr-2 h-4 w-4" />
                    Mes billets
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-base bg-transparent"
                    asChild
                  >
                    <Link href="#events">
                      Explorer les événements
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  Billets disponibles maintenant
                </div>

                <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl text-balance font-mono">
                  Vivez les{" "}
                  <span className="text-primary">Jeux Olympiques</span> de Paris
                  2024
                </h1>

                <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                  {
                    "Soyez au cœur de l'action. Réservez vos places pour assister aux plus grands athlètes du monde dans la ville lumière."
                  }
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="text-base">
                    Voir les événements
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-base bg-transparent"
                  >
                    {"Guide d'achat"}
                  </Button>
                </div>
              </>
            )}

            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-primary">
                  <Calendar className="h-4 w-4" />
                  <span className="text-2xl font-bold">16</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Jours de compétition
                </p>
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

          <div className="relative lg:pl-8">
            <div className="relative max-w-lg mx-auto">
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2 row-span-2 bg-card border border-border rounded-2xl p-6 flex flex-col justify-between min-h-[280px]">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                      Jeux Olympiques
                    </span>
                    <h3 className="text-5xl sm:text-6xl font-mono font-bold mt-2 tracking-tight">
                      <span className="text-[#0081C8]">P</span>
                      <span className="text-foreground">A</span>
                      <span className="text-[#EE334E]">R</span>
                      <span className="text-[#FCB131]">I</span>
                      <span className="text-[#00A651]">S</span>
                    </h3>
                  </div>
                  <div>
                    <div className="text-7xl sm:text-8xl font-mono font-bold text-foreground tracking-tighter">
                      2024
                    </div>
                    <div className="flex gap-2 mt-4">
                      <div className="h-1.5 w-8 rounded-full bg-[#0081C8]" />
                      <div className="h-1.5 w-8 rounded-full bg-foreground" />
                      <div className="h-1.5 w-8 rounded-full bg-[#EE334E]" />
                      <div className="h-1.5 w-8 rounded-full bg-[#FCB131]" />
                      <div className="h-1.5 w-8 rounded-full bg-[#00A651]" />
                    </div>
                  </div>
                </div>

                <div className="bg-[#0081C8] rounded-2xl p-4 flex flex-col justify-center items-center text-white">
                  <span className="text-3xl font-mono font-bold">206</span>
                  <span className="text-xs opacity-80 text-center">
                    Nations
                  </span>
                </div>

                <div className="bg-[#FCB131] rounded-2xl p-4 flex flex-col justify-center items-center text-black">
                  <span className="text-3xl font-mono font-bold">329</span>
                  <span className="text-xs opacity-80 text-center">
                    Épreuves
                  </span>
                </div>

                <div className="bg-[#00A651] rounded-2xl p-4 flex flex-col justify-center items-center text-white">
                  <span className="text-2xl font-mono font-bold">26/07</span>
                  <span className="text-xs opacity-80">Début</span>
                </div>

                <div className="bg-card border border-border rounded-2xl p-4 flex flex-col justify-center items-center">
                  <span className="text-2xl font-mono font-bold text-foreground">
                    10K+
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Athlètes
                  </span>
                </div>

                <div className="bg-[#EE334E] rounded-2xl p-4 flex flex-col justify-center items-center text-white">
                  <span className="text-2xl font-mono font-bold">11/08</span>
                  <span className="text-xs opacity-80">Fin</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
