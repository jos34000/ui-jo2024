import { create } from "zustand"
import { api } from "@/lib/utils/api"
import { EventDTO, OlympicEvent } from "@/lib/types/event.type"
import { toOlympicEvent } from "@/lib/utils/eventMapper"

function toEventDate(date: string, time: string): string {
  return `${date}T${time}:00`
}

interface AdminEventsState {
  events: OlympicEvent[]
  isLoading: boolean
  fetchEvents: () => Promise<void>
  addEvent: (event: Omit<OlympicEvent, "id">) => Promise<void>
  updateEvent: (
    id: number,
    updates: Partial<Omit<OlympicEvent, "id">>,
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
      const data = await api<EventDTO[]>("/events/all")
      set({ events: data.map(toOlympicEvent) })
    } catch {
      set({ events: [] })
    } finally {
      set({ isLoading: false })
    }
  },

  addEvent: async event => {
    const created = await api<EventDTO>("/events", {
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
    set(state => ({ events: [...state.events, toOlympicEvent(created)] }))
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
    const updated = await api<EventDTO>(`/events/${id}`, {
      method: "PUT",
      body,
    })
    set(state => ({
      events: state.events.map(e =>
        e.id === id ? toOlympicEvent(updated) : e,
      ),
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
