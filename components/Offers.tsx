"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"
import React from "react"
import { OfferDTO, OlympicOffer } from "@/lib/types/offer.type"
import { toOlympicOffer } from "@/lib/utils/offerMapper"
import { useTranslations } from "next-intl"
import {
  useTranslateOffer,
  useTranslateOfferDescription,
  useTranslateOfferFeature,
} from "@/lib/utils/i18nHelpers"

interface OffersProps {
  offers: OlympicOffer[]
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
            <Card
              key={offer.name}
              className={`relative flex flex-col transition-all duration-200 hover:shadow-lg hover:border-primary/30 ${
                offer.style.isPopular
                  ? "border-primary shadow-md lg:scale-105"
                  : "border-border/50"
              }`}
            >
              {offer.style.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground shadow-sm">
                    {t("mostChosen")}
                  </Badge>
                </div>
              )}
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-lg bg-muted ${offer.style.color}`}
                  >
                    <offer.style.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold font-mono">
                      {translateOffer(offer.name)}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {t("ticketCount", { count: offer.numberOfTickets })}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {translateDescription(offer.name)}
                </p>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3">
                  {offer.features.map(feature => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">
                        {translateFeature(feature)}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              {/*<CardFooter>
                <Button
                  className="w-full"
                  variant={offer.style.isPopular ? "default" : "outline"}
                >
                  {t("choose", { name: translateOffer(offer.name) })}
                </Button>
              </CardFooter>*/}
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
