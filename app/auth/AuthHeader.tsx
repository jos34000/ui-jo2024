import React from "react"
import Link from "next/link"
import { OlympicRings } from "@/lib/svg/OlympicRings"
import { ThemeToggle } from "@/components/theme-toggle"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export const AuthHeader = () => {
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur shrink-0">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
        <Link href="/" className="flex items-center gap-3">
          <OlympicRings className="h-7 sm:h-8 w-auto" />
          <span className="font-bold text-lg sm:text-xl tracking-tight font-mono">
            Paris <span className="text-primary">2024</span>
          </span>
        </Link>
        <div className="flex items-center gap-2 sm:gap-4">
          <ThemeToggle />
          <Button variant="ghost" size="icon" asChild className="sm:hidden">
            <Link href="/">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">{"Retour à l'accueil"}</span>
            </Link>
          </Button>
          <Button variant="ghost" asChild className="hidden sm:inline-flex">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {"Retour à l'accueil"}
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
