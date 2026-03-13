import { OfferDTO, OfferStyle, OlympicOffer } from "@/lib/types/offer.type"
import { Heart, User, Users } from "lucide-react"

export const toOlympicOffer = (dto: OfferDTO): OlympicOffer => {
  const offerStyles: Record<string, OfferStyle> = {
    Solo: {
      icon: User,
      color: "text-blue-500",
      isPopular: false,
    },
    Duo: {
      icon: Users,
      color: "text-green-500",
      isPopular: true,
    },
    Famille: {
      icon: Heart,
      color: "text-red-500",
      isPopular: false,
    },
  }

  const subtitle = (nb: number) => `${nb} ${nb > 1 ? "billets" : "billet"}`

  return {
    id: dto.id,
    name: dto.name,
    description: dto.description,
    price: dto.price,
    numberOfTickets: dto.numberOfTickets,
    isActive: dto.isActive,
    displayOrder: dto.displayOrder,
    features: dto.features,
    subtitle: subtitle(dto.numberOfTickets),
    style: offerStyles[dto.name],
  }
}
