import { create } from "zustand"
import { api } from "@/lib/utils/api"

interface EventResponseDTO {
  id: number
  name: string
  description: string
  icon: string
  category: string
  phase: string
  location: string
  city: string
  eventDate: string
  capacity: number
  availableSlots: number
  isActive: boolean
  sport: string
}

export interface AdminEvent {
  id: number
  name: string
  description: string
  icon: string
  category: string
  phase: string
  location: string
  city: string
  date: string
  time: string
  capacity: number
  availableSlots: number
  isActive: boolean
  sport: string
}

function mapEvent(dto: EventResponseDTO): AdminEvent {
  const [date = "", timePart = ""] = dto.eventDate.split("T")
  return {
    id: dto.id,
    name: dto.name,
    description: dto.description,
    icon: dto.icon,
    category: dto.category,
    phase: dto.phase,
    location: dto.location,
    city: dto.city,
    date,
    time: timePart.slice(0, 5),
    capacity: dto.capacity,
    availableSlots: dto.availableSlots,
    isActive: dto.isActive,
    sport: dto.sport,
  }
}

function toEventDate(date: string, time: string): string {
  return `${date}T${time}:00`
}

interface AdminEventsState {
  events: AdminEvent[]
  isLoading: boolean
  fetchEvents: () => Promise<void>
  addEvent: (event: Omit<AdminEvent, "id">) => Promise<void>
  updateEvent: (
    id: number,
    updates: Partial<Omit<AdminEvent, "id">>,
  ) => Promise<void>
  deleteEvent: (id: number) => Promise<void>
  toggleEventStatus: (id: number) => Promise<void>
}

export const useAdminEventsStore = create<AdminEventsState>()((set, get) => ({
  events: [],
  isLoading: false,

  fetchEvents: async () => {
    set({ isLoading: true })
    try {
      const data = await api<EventResponseDTO[]>("/events/all")
      set({ events: data.map(mapEvent) })
    } catch {
      set({ events: [] })
    } finally {
      set({ isLoading: false })
    }
  },

  addEvent: async event => {
    const created = await api<EventResponseDTO>("/events", {
      method: "POST",
      body: {
        name: event.name,
        description: event.description,
        icon: event.icon,
        category: event.category,
        phase: event.phase,
        location: event.location,
        city: event.city,
        sport: event.sport,
        eventDate: toEventDate(event.date, event.time),
        capacity: event.capacity,
        availableSlots: event.availableSlots,
        isActive: event.isActive,
      },
    })
    set(state => ({ events: [...state.events, mapEvent(created)] }))
  },

  updateEvent: async (id, updates) => {
    const body: Record<string, unknown> = { ...updates }
    if (updates.date !== undefined || updates.time !== undefined) {
      const event = get().events.find(e => e.id === id)
      const date = updates.date ?? event?.date ?? ""
      const time = updates.time ?? event?.time ?? ""
      body.eventDate = toEventDate(date, time)
      delete body.date
      delete body.time
    }
    const updated = await api<EventResponseDTO>(`/events/${id}`, {
      method: "PUT",
      body,
    })
    set(state => ({
      events: state.events.map(e => (e.id === id ? mapEvent(updated) : e)),
    }))
  },

  deleteEvent: async id => {
    await api(`/events/${id}`, { method: "DELETE", raw: true })
    set(state => ({ events: state.events.filter(e => e.id !== id) }))
  },

  toggleEventStatus: async id => {
    const event = get().events.find(e => e.id === id)
    if (!event) return
    const newIsActive = !event.isActive
    set(state => ({
      events: state.events.map(e =>
        e.id === id ? { ...e, isActive: newIsActive } : e,
      ),
    }))
    try {
      await api(`/events/${id}`, {
        method: "PUT",
        body: { isActive: newIsActive },
      })
    } catch {
      set(state => ({
        events: state.events.map(e =>
          e.id === id ? { ...e, isActive: !newIsActive } : e,
        ),
      }))
    }
  },
}))
