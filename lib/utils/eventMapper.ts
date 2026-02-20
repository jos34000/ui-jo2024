import { EventResponseDTO, OlympicEvent } from "@/lib/types/event.type"
import { sportsNames } from "@/lib/constants/sports-names"

export const mapEventFromDTO = (dto: EventResponseDTO): OlympicEvent => {
  const eventDateTime = new Date(dto.eventDate)
  const date = eventDateTime.toISOString().split("T")[0]
  const time = eventDateTime.toTimeString().slice(0, 5)

  const extractSport = (name: string): string => {
    const lowerName = name.toLowerCase()

    for (const [key, value] of Object.entries(sportsNames)) {
      if (lowerName.includes(key)) {
        return value
      }
    }

    const parts = name.split("-")
    return parts[0].trim() || "Événement"
  }
  const calculateStatus = (
    availableSlots: number,
    capacity: number,
  ): "available" | "limited" | "soldout" => {
    if (availableSlots === 0) return "soldout"
    const percentAvailable = (availableSlots / capacity) * 100
    if (percentAvailable < 20) return "limited"
    return "available"
  }

  return {
    id: dto.id,
    title: dto.name,
    sport: extractSport(dto.name),
    date: date,
    time: time,
    location: dto.location,
    status: calculateStatus(dto.availableSlots, dto.capacity),
    category: extractSport(dto.name),
  }
}
