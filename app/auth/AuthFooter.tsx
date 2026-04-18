"use client"

import Link from "next/link"
import { useTranslations } from "next-intl"

export const AuthFooter = () => {
  const t = useTranslations("auth")
  return (
    <footer className="border-t border-border shrink-0">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between gap-3 text-xs sm:text-sm text-muted-foreground">
          <p className="shrink-0">Paris 2024</p>
          <nav className="flex items-center gap-3 sm:gap-6">
            <Link
              href="/confidentialite"
              className="hover:text-primary transition-colors"
            >
              {t("footer.privacy")}
            </Link>
            <Link
              href="/conditions-utilisation"
              className="hidden sm:inline hover:text-primary transition-colors"
            >
              {t("footer.terms")}
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
