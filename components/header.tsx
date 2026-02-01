"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, ShoppingCart, User, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { OlympicRings } from "@/lib/svg/OlympicRings"

const navigation = [
  { name: "Événements", href: "#events" },
  { name: "Sports", href: "#sports" },
  { name: "Calendrier", href: "#calendar" },
  { name: "FAQ", href: "#faq" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-3">
            <OlympicRings className="h-8 w-auto" />
            <span className="font-bold text-xl tracking-tight font-mono">
              Paris <span className="text-primary">2024</span>
            </span>
          </Link>
        </div>

        <div className="flex lg:hidden gap-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Ouvrir le menu</span>
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map(item => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4 lg:items-center">
          <ThemeToggle />
          <Button variant="ghost" size="icon">
            <ShoppingCart className="h-5 w-5" />
            <span className="sr-only">Panier</span>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/auth">
              <User className="h-5 w-5" />
              <span className="sr-only">Compte</span>
            </Link>
          </Button>
          <Button>Acheter des billets</Button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-background px-6 py-6 shadow-xl">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-3">
                <OlympicRings className="h-8 w-auto" />
                <span className="font-bold text-xl font-mono">Paris 2024</span>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Fermer le menu</span>
                <X className="h-6 w-6" />
              </Button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-border">
                <div className="space-y-2 py-6">
                  {navigation.map(item => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-medium text-muted-foreground hover:bg-primary/5 hover:text-primary"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="py-6 space-y-3">
                  <Button className="w-full">Acheter des billets</Button>
                  <Button
                    variant="outline"
                    className="w-full bg-transparent hover:text-primary"
                    asChild
                  >
                    <Link href="/auth">Mon compte</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
