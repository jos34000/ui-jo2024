import {
  EventResponseDTO,
  FullEvent,
  OlympicEvent,
} from "@/lib/types/event.type"

export const mapEventFromDTO = (dto: EventResponseDTO): OlympicEvent => {
  const eventDateTime = new Date(dto.eventDate)
  const date = eventDateTime.toISOString().split("T")[0]
  const time = eventDateTime.toTimeString().slice(0, 5)

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
    sport: dto.sport,
    date: date,
    time: time,
    location: dto.location,
    status: calculateStatus(dto.availableSlots, dto.capacity),
    category: dto.category,
  }
}

export const toFullEvent = (dto: EventResponseDTO): FullEvent => {
  const olympicEvent = mapEventFromDTO(dto)

  return {
    ...olympicEvent,
    description: dto.description,
    capacity: dto.capacity,
    availableSlots: dto.availableSlots,
  }
}
