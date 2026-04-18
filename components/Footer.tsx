"use client"

import Link from "next/link"
import { OlympicRings } from "@/lib/svg/OlympicRings"
import { useTranslations } from "next-intl"
import { CookieSettingsButton } from "@/components/CookieBanner"

export const Footer = () => {
  const t = useTranslations("footer")

  const legalLinks = [
    { name: t("links.mentions"), href: "/mentions-legales" },
    { name: t("links.terms"), href: "/conditions-utilisation" },
    { name: t("links.privacy"), href: "/confidentialite" },
    { name: t("links.cookiesPolicy"), href: "/cookies" },
  ]

  return (
    <footer className="bg-card border-t border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <div className="flex items-center gap-2.5 shrink-0">
            <OlympicRings className="h-6 w-auto" />
            <span className="font-bold text-sm font-mono tracking-tight">Paris 2024</span>
          </div>

          <nav aria-label={t("sections.legal")} className="flex items-center flex-wrap gap-y-2">
            {legalLinks.map((item, i) => (
              <span key={item.name} className="flex items-center">
                {i > 0 && <span className="mx-3 text-border select-none" aria-hidden>·</span>}
                <Link
                  href={item.href}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
                >
                  {item.name}
                </Link>
              </span>
            ))}
            <span className="flex items-center">
              <span className="mx-3 text-border select-none" aria-hidden>·</span>
              <CookieSettingsButton />
            </span>
          </nav>
        </div>

        <div className="border-t border-border py-3">
          <p className="text-xs text-muted-foreground text-center">
            {t("copyright")}
          </p>
        </div>
      </div>
    </footer>
  )
}
