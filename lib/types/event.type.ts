export interface EventResponseDTO {
  id: number
  name: string
  description: string
  location: string
  eventDate: string
  capacity: number
  availableSlots: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface OlympicEvent {
  id: number
  title: string
  sport: string
  date: string
  time: string
  location: string
  status: "available" | "limited" | "soldout"
  category: string
}
