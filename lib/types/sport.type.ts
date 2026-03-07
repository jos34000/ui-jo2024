import { EventPhase } from "@/lib/types/phases.type"

export interface SportResponseDTO {
  id: number
  name: string
  description: string
  phases: string[]
  eventCount: number
  places: string[]
}

export interface SportSeed {
  name: string
  description: string
  phases: EventPhase[]
}
