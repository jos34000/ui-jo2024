import { SportCategory } from "@/lib/types/category.type"
import { EventPhase } from "@/lib/types/phases.type"

export interface EventSeed {
  name: string
  description: string
  category: SportCategory
  phase: EventPhase
  location: string
  city: string
  eventDate: string
  capacity: number
  availableSlots: number
  isActive: boolean
  sport: string
}

export interface EventDTO {
  id: number
  name: string
  description: string
  category: SportCategory
  phase: EventPhase
  location: string
  city: string
  eventDate: string
  capacity: number
  availableSlots: number
  isActive: boolean
  sport: string
}

export type EventStatus = "available" | "limited" | "soldout"

export interface OlympicEvent {
  id: number
  name: string
  description: string
  category: SportCategory
  phase: EventPhase
  location: string
  city: string
  date: string
  time: string
  capacity: number
  availableSlots: number
  isActive: boolean
  status: EventStatus
  sport: string
}
