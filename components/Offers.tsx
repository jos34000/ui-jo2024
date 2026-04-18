"use client"

import { Check } from "lucide-react"
import { OfferDTO, OlympicOffer } from "@/lib/types/offer.type"
import { toOlympicOffer } from "@/lib/utils/offerMapper"
import { useTranslations } from "next-intl"
import {
  useTranslateOffer,
  useTranslateOfferDescription,
  useTranslateOfferFeature,
} from "@/lib/utils/i18nHelpers"
import { cn } from "@/lib/utils"

interface OffersProps {
  offers: OlympicOffer[]
}

const COLOR_TO_BG: Record<string, string> = {
  "text-blue-500": "bg-blue-500",
  "text-green-500": "bg-green-500",
  "text-red-500": "bg-red-500",
  "text-muted-foreground": "bg-muted-foreground",
}

export const Offers = ({ offers }: Readonly<OffersProps>) => {
  const t = useTranslations("offers")
  const translateOffer = useTranslateOffer()
  const translateDescription = useTranslateOfferDescription()
  const translateFeature = useTranslateOfferFeature()
  const mappedOffers = offers
    .map((offer: OfferDTO) => toOlympicOffer(offer))
    .toSorted((a, b) => a.displayOrder - b.displayOrder)

  return (
    <section id="offers" className="py-20 bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-mono">
            {t("title")}
          </h2>
          <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3 items-start">
          {mappedOffers.map(offer => (
            <article
              key={offer.name}
              className={cn(
                "group relative flex flex-col overflow-hidden rounded-2xl transition-all duration-200",
                offer.style.isPopular
                  ? "border border-primary/50 shadow-lg lg:scale-105"
                  : "border border-border/40 shadow-sm hover:border-border/70 hover:-translate-y-0.5 hover:shadow-lg",
              )}
            >
              {/* Top accent bar */}
              <div
                className={cn(
                  "absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl",
                  COLOR_TO_BG[offer.style.color] ?? "bg-primary",
                )}
              />

              {/* Header */}
              <div className="px-6 pt-7 pb-5 bg-card">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div
                    className={cn(
                      "flex h-11 w-11 items-center justify-center rounded-xl bg-muted",
                      offer.style.color,
                    )}
                  >
                    <offer.style.icon className="h-5 w-5" />
                  </div>
                  {offer.style.isPopular && (
                    <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary border border-primary/30 bg-primary/10">
                      <span className="w-1.5 h-1.5 rounded-full block bg-primary" />
                      {t("mostChosen")}
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold font-mono mb-0.5">
                  {translateOffer(offer.name)}
                </h3>
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                  {t("ticketCount", { count: offer.numberOfTickets })}
                </p>
              </div>

              {/* Perforated separator */}
              <div className="border-t-2 border-dashed border-border/30 mx-6 bg-card" />

              {/* Description + features */}
              <div className="flex-1 px-6 py-5 bg-card space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {translateDescription(offer.name)}
                </p>
                <ul className="space-y-2.5">
                  {offer.features.map(feature => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <Check className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                      <span className="text-[13px] text-muted-foreground">
                        {translateFeature(feature)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
