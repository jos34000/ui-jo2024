import { LucideIcon } from "lucide-react"

export interface OfferDTO {
  id: number
  name: string
  description: string
  price: number
  numberOfTickets: number
  isActive: boolean
  displayOrder: number
  features: string[]
}

export interface OlympicOffer extends OfferDTO {
  subtitle: string
  style: OfferStyle
}

export type OfferStyle = {
  icon: LucideIcon
  color: string
  isPopular: boolean
}
