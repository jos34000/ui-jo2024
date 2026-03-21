"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Home, Trophy } from "lucide-react"
import { cn } from "@/lib/utils"
import React from "react"

type NotFoundType = "page" | "event" | "sport" | "ticket"

interface NotFoundContentProps {
  type?: NotFoundType
  title?: string
  description?: string
}

const presets: Record<
  NotFoundType,
  {
    title: string
    description: string
    backLink: { href: string; label: string }
    suggestions: { href: string; label: string; icon: React.ReactNode }[]
  }
> = {
  page: {
    title: "Page introuvable",
    description: "La page que vous recherchez n'existe pas ou a ete deplacee.",
    backLink: { href: "/", label: "Retour a l'accueil" },
    suggestions: [
      {
        href: "/calendrier",
        label: "Calendrier",
        icon: <Calendar className="h-3.5 w-3.5" />,
      },
      {
        href: "/sports",
        label: "Sports",
        icon: <Trophy className="h-3.5 w-3.5" />,
      },
    ],
  },
  event: {
    title: "Evenement introuvable",
    description: "Cet evenement n'existe pas ou n'est plus disponible.",
    backLink: { href: "/calendrier", label: "Voir le calendrier" },
    suggestions: [
      { href: "/", label: "Accueil", icon: <Home className="h-3.5 w-3.5" /> },
      {
        href: "/sports",
        label: "Sports",
        icon: <Trophy className="h-3.5 w-3.5" />,
      },
    ],
  },
  sport: {
    title: "Sport introuvable",
    description: "Ce sport ne fait pas partie du programme Paris 2024.",
    backLink: { href: "/sports", label: "Voir les sports" },
    suggestions: [
      { href: "/", label: "Accueil", icon: <Home className="h-3.5 w-3.5" /> },
      {
        href: "/calendrier",
        label: "Calendrier",
        icon: <Calendar className="h-3.5 w-3.5" />,
      },
    ],
  },
  ticket: {
    title: "Billet introuvable",
    description: "Ce billet n'existe pas ou a ete annule.",
    backLink: { href: "/panier", label: "Voir mon panier" },
    suggestions: [
      {
        href: "/calendrier",
        label: "Calendrier",
        icon: <Calendar className="h-3.5 w-3.5" />,
      },
      { href: "/", label: "Accueil", icon: <Home className="h-3.5 w-3.5" /> },
    ],
  },
}

// 3D Olympic Rings with premium metallic effect
const OlympicRings3D = () => (
  <div className="relative">
    {/* Glow layer */}
    <div className="absolute inset-0 blur-2xl opacity-40">
      <svg viewBox="0 0 280 140" className="w-full h-full">
        <circle cx="70" cy="55" r="30" fill="#0081C8" />
        <circle cx="120" cy="55" r="30" fill="#333" />
        <circle cx="170" cy="55" r="30" fill="#EE334E" />
        <circle cx="95" cy="90" r="30" fill="#FCB131" />
        <circle cx="145" cy="90" r="30" fill="#00A651" />
      </svg>
    </div>

    <svg
      viewBox="0 0 280 140"
      className="w-48 h-24 sm:w-56 sm:h-28 relative z-10"
      style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.15))" }}
    >
      <defs>
        <linearGradient id="nf-blue" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#005A8C" />
          <stop offset="50%" stopColor="#00B4F0" />
          <stop offset="100%" stopColor="#005A8C" />
        </linearGradient>
        <linearGradient id="nf-black" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1a1a1a" />
          <stop offset="50%" stopColor="#4a4a4a" />
          <stop offset="100%" stopColor="#1a1a1a" />
        </linearGradient>
        <linearGradient id="nf-red" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#B82438" />
          <stop offset="50%" stopColor="#FF6B7A" />
          <stop offset="100%" stopColor="#B82438" />
        </linearGradient>
        <linearGradient id="nf-yellow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C48A20" />
          <stop offset="50%" stopColor="#FFD166" />
          <stop offset="100%" stopColor="#C48A20" />
        </linearGradient>
        <linearGradient id="nf-green" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#007A3D" />
          <stop offset="50%" stopColor="#00D96E" />
          <stop offset="100%" stopColor="#007A3D" />
        </linearGradient>
        <filter id="nf-glow">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Bottom row */}
      <g filter="url(#nf-glow)">
        <circle
          cx="95"
          cy="90"
          r="32"
          fill="none"
          stroke="url(#nf-yellow)"
          strokeWidth="6"
          className="animate-[ringPulse_3s_ease-in-out_infinite]"
          style={{ animationDelay: "0.6s" }}
        />
        <circle
          cx="145"
          cy="90"
          r="32"
          fill="none"
          stroke="url(#nf-green)"
          strokeWidth="6"
          className="animate-[ringPulse_3s_ease-in-out_infinite]"
          style={{ animationDelay: "0.8s" }}
        />
      </g>

      {/* Top row */}
      <g filter="url(#nf-glow)">
        <circle
          cx="70"
          cy="55"
          r="32"
          fill="none"
          stroke="url(#nf-blue)"
          strokeWidth="6"
          className="animate-[ringPulse_3s_ease-in-out_infinite]"
          style={{ animationDelay: "0s" }}
        />
        <circle
          cx="120"
          cy="55"
          r="32"
          fill="none"
          stroke="url(#nf-black)"
          strokeWidth="6"
          className="animate-[ringPulse_3s_ease-in-out_infinite]"
          style={{ animationDelay: "0.2s" }}
        />
        <circle
          cx="170"
          cy="55"
          r="32"
          fill="none"
          stroke="url(#nf-red)"
          strokeWidth="6"
          className="animate-[ringPulse_3s_ease-in-out_infinite]"
          style={{ animationDelay: "0.4s" }}
        />
      </g>
    </svg>
  </div>
)

export const NotFoundContent = ({
  type = "page",
  title,
  description,
}: NotFoundContentProps) => {
  const preset = presets[type]
  const displayTitle = title ?? preset.title
  const displayDescription = description ?? preset.description

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      {/* Animated background - identical to loader */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Olympic colored orbs */}
        <div className="absolute top-1/4 left-[15%] w-96 h-96 rounded-full bg-[#0081C8]/10 blur-3xl animate-[float_8s_ease-in-out_infinite]" />
        <div
          className="absolute top-1/2 right-[15%] w-80 h-80 rounded-full bg-[#EE334E]/10 blur-3xl animate-[float_8s_ease-in-out_infinite]"
          style={{ animationDelay: "-2s" }}
        />
        <div
          className="absolute bottom-1/4 left-1/3 w-72 h-72 rounded-full bg-[#FCB131]/10 blur-3xl animate-[float_8s_ease-in-out_infinite]"
          style={{ animationDelay: "-4s" }}
        />
        <div
          className="absolute bottom-1/3 right-1/3 w-64 h-64 rounded-full bg-[#00A651]/10 blur-3xl animate-[float_8s_ease-in-out_infinite]"
          style={{ animationDelay: "-6s" }}
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Glassy card - identical style to loader */}
      <div
        className={cn(
          "relative z-10 mx-4 w-full max-w-md",
          "backdrop-blur-xl bg-card/60 dark:bg-card/40",
          "rounded-2xl border border-white/10 dark:border-white/5",
          "shadow-2xl",
          "p-8 sm:p-10",
        )}
      >
        {/* Card shine effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* Content */}
        <div className="relative flex flex-col items-center text-center">
          {/* Olympic Rings */}
          <div className="mb-6">
            <OlympicRings3D />
          </div>

          {/* 404 with 3D effect */}
          <div className="relative mb-6">
            {/* Shadow layers for 3D depth */}
            <span
              className="absolute inset-0 flex justify-center font-mono text-7xl sm:text-8xl font-black text-foreground/5 select-none"
              style={{ transform: "translate(3px, 3px)" }}
              aria-hidden="true"
            >
              404
            </span>
            <span
              className="absolute inset-0 flex justify-center font-mono text-7xl sm:text-8xl font-black text-foreground/10 select-none"
              style={{ transform: "translate(1.5px, 1.5px)" }}
              aria-hidden="true"
            >
              404
            </span>
            {/* Main 404 with gradient */}
            <span className="relative font-mono text-7xl sm:text-8xl font-black bg-gradient-to-b from-foreground via-foreground/80 to-foreground/60 bg-clip-text text-transparent">
              404
            </span>
          </div>

          {/* Title */}
          <h1 className="text-lg sm:text-xl font-bold font-mono text-foreground mb-2">
            {displayTitle}
          </h1>

          {/* Description */}
          <p className="text-sm text-muted-foreground mb-8 max-w-xs">
            {displayDescription}
          </p>

          {/* Primary CTA */}
          <Button asChild size="lg" className="w-full mb-6 shadow-lg">
            <Link href={preset.backLink.href}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              {preset.backLink.label}
            </Link>
          </Button>

          {/* Suggestions */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>Ou explorez</span>
            <span className="text-border">|</span>
            {preset.suggestions.map(suggestion => (
              <Link
                key={suggestion.href}
                href={suggestion.href}
                className={cn(
                  "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full",
                  "bg-white/5 hover:bg-white/10 dark:bg-white/5 dark:hover:bg-white/10",
                  "border border-white/10 hover:border-primary/30",
                  "transition-all hover:scale-105",
                )}
              >
                {suggestion.icon}
                {suggestion.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-24 rounded-b-2xl bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
      </div>

      {/* Bottom branding */}
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <span className="text-xs font-mono text-muted-foreground/40 tracking-widest">
          PARIS 2024
        </span>
      </div>
    </div>
  )
}

export default NotFoundContent
