import { EventDTO, EventStatus, OlympicEvent } from "@/lib/types/event.type"

export const toOlympicEvent = (dto: EventDTO): OlympicEvent => {
  const eventDateTime = new Date(dto.eventDate)
  const date = eventDateTime.toISOString().split("T")[0]
  const time = eventDateTime.toTimeString().slice(0, 5)

  const calculateStatus = (
    availableSlots: number,
    capacity: number,
  ): EventStatus => {
    if (availableSlots === 0) return "soldout"
    const percentAvailable = (availableSlots / capacity) * 100
    if (percentAvailable < 20) return "limited"
    return "available"
  }

  return {
    id: dto.id,
    name: dto.name,
    description: dto.description,
    icon: dto.icon,
    category: dto.category,
    phase: dto.phase,
    location: dto.location,
    city: dto.city,
    date: date,
    time: time,
    capacity: dto.capacity,
    availableSlots: dto.availableSlots,
    isActive: dto.isActive,
    status: calculateStatus(dto.availableSlots, dto.capacity),
    sport: dto.sport,
  }
}
