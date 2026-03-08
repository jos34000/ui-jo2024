import { EventPhase } from "@/lib/types/phases.type"

export interface SportResponseDTO {
  id: number
  name: string
  description: string
  icon: string
  phases: string[]
  eventCount: number
  places: string[]
}

export interface SportSeed {
  name: string
  description: string
  icon: string
  phases: EventPhase[]
}

export type SportCategory =
  | "Athlétisme"
  | "Sport collectif"
  | "Sport aquatique"
  | "Gymnastique"
  | "Sport de combat"
  | "Sport de raquette"
  | "Sport équestre"
  | "Sport urbain"
  | "Sport nautique"
  | "Cérémonie"
  | "Sport de force"
  | "Sport combiné"
  | "Golf"
  | "Cyclisme"
  | "Sport de précision"
