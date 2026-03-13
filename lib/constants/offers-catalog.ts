import { OfferSeed } from "@/lib/types/offer.type"

export const offersCatalog: OfferSeed[] = [
  {
    name: "Solo",
    description: "Parfait pour vivre votre passion en toute liberté.",
    price: 40,
    numberOfTickets: 1,
    isActive: true,
    displayOrder: 1,
    features: [
      "Accès a tous les évènements",
      "1 place assise garantie",
      "E-billet sur mobile",
      "Accès aux zones communes",
    ],
  },
  {
    name: "Famille",
    description: "Vivez les Jeux en famille avec des places regroupées.",
    price: 135,
    numberOfTickets: 4,
    isActive: true,
    displayOrder: 3,
    features: [
      "Accès à tous les évènements",
      "4 places regroupées garanties",
      "E-billets sur mobile",
      "Accès aux zones communes",
      "Sac souvenir Paris 2024 offert",
    ],
  },
  {
    name: "Duo",
    description: "Partagez des moments uniques à deux, côte a côte.",
    price: 75,
    numberOfTickets: 2,
    isActive: true,
    displayOrder: 2,
    features: [
      "Accès a tous les évènements",
      "2 places côte à côte garanties",
      "E-billets sur mobile",
      "Accès aux zones communes",
    ],
  },
]
