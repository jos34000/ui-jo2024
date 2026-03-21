"use client"

import Link from "next/link"
import { OlympicRings } from "@/lib/svg/OlympicRings"
import { useTranslations } from "next-intl"
import { CookieSettingsButton } from "@/components/CookieBanner"

export const Footer = () => {
  const t = useTranslations("footer")

  const footerNavigation = {
    billetterie: [
      { name: t("links.allEvents"), href: "#" },
      { name: t("links.calendar"), href: "#" },
      { name: t("links.resale"), href: "#" },
      { name: t("links.familyPack"), href: "#" },
    ],
    sports: [
      { name: t("links.athletics"), href: "#" },
      { name: t("links.swimming"), href: "#" },
      { name: t("links.basketball"), href: "#" },
      { name: t("links.football"), href: "#" },
    ],
    infos: [
      { name: t("links.about"), href: "#" },
      { name: t("links.faq"), href: "#" },
      { name: t("links.accessibility"), href: "#" },
      { name: t("links.contact"), href: "#" },
    ],
    legal: [
      { name: t("links.terms"), href: "#" },
      { name: t("links.privacy"), href: "#" },
    ],
  }

  return (
    <footer className="bg-card border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <OlympicRings className="h-8 w-auto" />
              <span className="font-bold text-xl font-mono">Paris 2024</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              {t("description")}
            </p>
            <div className="flex gap-1 pt-2">
              <div className="w-4 h-4 rounded-full bg-[#0081C8]" />
              <div className="w-4 h-4 rounded-full bg-foreground" />
              <div className="w-4 h-4 rounded-full bg-[#EE334E]" />
              <div className="w-4 h-4 rounded-full bg-[#FCB131]" />
              <div className="w-4 h-4 rounded-full bg-[#00A651]" />
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold">{t("sections.ticketing")}</h3>
                <ul className="mt-4 space-y-3">
                  {footerNavigation.billetterie.map(item => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold">{t("sections.popularSports")}</h3>
                <ul className="mt-4 space-y-3">
                  {footerNavigation.sports.map(item => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold">{t("sections.information")}</h3>
                <ul className="mt-4 space-y-3">
                  {footerNavigation.infos.map(item => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold">{t("sections.legal")}</h3>
                <ul className="mt-4 space-y-3">
                  {footerNavigation.legal.map(item => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <CookieSettingsButton />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-8">
          <p className="text-xs text-muted-foreground text-center">
            {t("copyright")}
          </p>
        </div>
      </div>
    </footer>
  )
}
