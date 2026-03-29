import { SportCategory } from "@/lib/types/sport.type"
import { EventPhase } from "@/lib/types/phases.type"
import { z } from "zod"

export const eventStatusSchema = z.enum(["available", "limited", "soldout"])

export type EventStatus = z.infer<typeof eventStatusSchema>

export interface EventDTO {
  id: number
  name: string
  description: string
  icon: string
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

export interface OlympicEvent {
  id: number
  name: string
  description: string
  icon: string
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
