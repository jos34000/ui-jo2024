"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  Calendar,
  HelpCircle,
  Home,
  Search,
  Ticket,
  Trophy,
} from "lucide-react"
import React from "react"

type NotFoundType = "page" | "event" | "sport" | "ticket" | "custom"

interface NotFoundContentProps {
  type?: NotFoundType
  title?: string
  description?: string
  icon?: React.ReactNode
  backLink?: {
    href: string
    label: string
  }
  suggestions?: {
    href: string
    label: string
    icon?: React.ReactNode
  }[]
}

const presets: Record<
  Exclude<NotFoundType, "custom">,
  {
    title: string
    description: string
    icon: React.ReactNode
    backLink: { href: string; label: string }
    suggestions: { href: string; label: string; icon: React.ReactNode }[]
  }
> = {
  page: {
    title: "Page introuvable",
    description: "La page que vous recherchez n'existe pas ou a ete deplacee.",
    icon: <Search className="h-8 w-8" />,
    backLink: { href: "/", label: "Retour a l'accueil" },
    suggestions: [
      {
        href: "/calendrier",
        label: "Calendrier",
        icon: <Calendar className="h-4 w-4" />,
      },
      {
        href: "/#sports",
        label: "Sports",
        icon: <Trophy className="h-4 w-4" />,
      },
      { href: "/#faq", label: "FAQ", icon: <HelpCircle className="h-4 w-4" /> },
    ],
  },
  event: {
    title: "Évènement introuvable",
    description: "Cet évènement n'existe pas ou n'est plus disponible.",
    icon: <Ticket className="h-8 w-8" />,
    backLink: { href: "/calendrier", label: "Voir le calendrier" },
    suggestions: [
      {
        href: "/calendrier",
        label: "Évènement",
        icon: <Calendar className="h-4 w-4" />,
      },
      {
        href: "/#sports",
        label: "Sports",
        icon: <Trophy className="h-4 w-4" />,
      },
      { href: "/", label: "Accueil", icon: <Home className="h-4 w-4" /> },
    ],
  },
  sport: {
    title: "Sport introuvable",
    description: "Ce sport ne fait pas partie du programme Paris 2024.",
    icon: <Trophy className="h-8 w-8" />,
    backLink: { href: "/#sports", label: "Voir les sports" },
    suggestions: [
      {
        href: "/#sports",
        label: "Sports",
        icon: <Trophy className="h-4 w-4" />,
      },
      {
        href: "/calendrier",
        label: "Calendrier",
        icon: <Calendar className="h-4 w-4" />,
      },
      { href: "/", label: "Accueil", icon: <Home className="h-4 w-4" /> },
    ],
  },
  ticket: {
    title: "Billet introuvable",
    description: "Ce billet n'existe pas ou a ete annule.",
    icon: <Ticket className="h-8 w-8" />,
    backLink: { href: "/auth", label: "Mon compte" },
    suggestions: [
      {
        href: "/calendrier",
        label: "Billets",
        icon: <Ticket className="h-4 w-4" />,
      },
      { href: "/#faq", label: "FAQ", icon: <HelpCircle className="h-4 w-4" /> },
      { href: "/", label: "Accueil", icon: <Home className="h-4 w-4" /> },
    ],
  },
}

export const NotFoundContent = ({
  type = "page",
  title,
  description,
  icon,
  backLink,
  suggestions,
}: NotFoundContentProps) => {
  const preset = type !== "custom" ? presets[type] : null

  const displayTitle = title ?? preset?.title ?? "Page introuvable"
  const displayDescription =
    description ??
    preset?.description ??
    "La page que vous recherchez n'existe pas."
  const displayIcon = icon ?? preset?.icon ?? <Search className="h-8 w-8" />
  const displayBackLink = backLink ??
    preset?.backLink ?? { href: "/", label: "Retour a l'accueil" }
  const displaySuggestions = suggestions ?? preset?.suggestions ?? []

  return (
    <div className="relative flex flex-col items-center justify-center text-center px-4 py-12 sm:py-20 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-[#0081C8]/10 blur-3xl animate-pulse" />
        <div
          className="absolute top-20 right-20 w-40 h-40 rounded-full bg-[#EE334E]/10 blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-20 left-1/4 w-36 h-36 rounded-full bg-[#FCB131]/10 blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-10 right-1/3 w-28 h-28 rounded-full bg-[#00A651]/10 blur-3xl animate-pulse"
          style={{ animationDelay: "0.5s" }}
        />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="relative backdrop-blur-xl bg-card/60 dark:bg-card/40 border border-white/20 dark:border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none" />

          <div className="relative z-10">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/30 rounded-2xl blur-xl" />
                <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg transform hover:scale-105 transition-transform">
                  {displayIcon}
                </div>
              </div>
            </div>

            <div className="relative mb-4">
              <span className="absolute inset-0 text-7xl sm:text-8xl font-bold font-mono text-primary/5 transform translate-x-1 translate-y-1">
                404
              </span>
              <span className="relative text-7xl sm:text-8xl font-bold font-mono bg-gradient-to-br from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                404
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold tracking-tight font-mono mb-2 text-foreground">
              {displayTitle}
            </h1>

            <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
              {displayDescription}
            </p>

            <Button
              asChild
              size="lg"
              className="w-full mb-4 shadow-lg hover:shadow-xl transition-shadow"
            >
              <Link href={displayBackLink.href}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                {displayBackLink.label}
              </Link>
            </Button>

            {displaySuggestions.length > 0 && (
              <div className="pt-4 border-t border-border/50">
                <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wider font-mono">
                  Ou explorez
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {displaySuggestions.map(suggestion => (
                    <Link
                      key={suggestion.href}
                      href={suggestion.href}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-secondary/50 hover:bg-secondary text-secondary-foreground border border-border/50 hover:border-primary/30 transition-all hover:scale-105"
                    >
                      {suggestion.icon}
                      {suggestion.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="absolute -inset-4 bg-gradient-to-r from-[#0081C8]/20 via-[#FCB131]/20 to-[#EE334E]/20 rounded-3xl blur-2xl opacity-50 -z-10" />
      </div>
    </div>
  )
}
