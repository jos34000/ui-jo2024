import { create } from "zustand"
import { api } from "@/lib/utils/api"

export interface AdminEvent {
  id: number
  title: string
  sport: string
  date: string
  time: string
  location: string
  description: string
  price: number
  capacity: number
  availableTickets: number
  imageUrl: string
  isActive: boolean
  slug: string
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
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
      const data = await api<AdminEvent[]>("/events/all")
      set({ events: data })
    } catch {
      set({ events: [] })
    } finally {
      set({ isLoading: false })
    }
  },

  addEvent: async event => {
    const created = await api<AdminEvent>("/events", {
      method: "POST",
      body: event,
    })
    set(state => ({ events: [...state.events, created] }))
  },

  updateEvent: async (id, updates) => {
    const updated = await api<AdminEvent>(`/events/${id}`, {
      method: "PUT",
      body: updates,
    })
    set(state => ({
      events: state.events.map(e => (e.id === id ? updated : e)),
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
