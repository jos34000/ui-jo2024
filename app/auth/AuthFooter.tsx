import React from "react"
import Link from "next/link"

export const AuthFooter = () => {
  return (
    <footer className="border-t border-border shrink-0">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between gap-3 text-xs sm:text-sm text-muted-foreground">
          <p className="shrink-0">Paris 2024</p>
          <nav className="flex items-center gap-3 sm:gap-6">
            <Link href="#" className="hover:text-primary transition-colors">
              Aide
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              Confidentialité
            </Link>
            <Link
              href="#"
              className="hidden sm:inline hover:text-primary transition-colors"
            >
              Mentions légales
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
