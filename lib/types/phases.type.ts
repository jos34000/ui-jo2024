import { z } from "zod"

export const eventPhaseSchema = z.enum([
  "SERIES",
  "REPECHAGE",
  "QUALIFICATION",
  "TOUR_PRELIMINAIRE",
  "PHASE_DE_POULES",
  "PHASE_DE_GROUPES",
  "SOIXANTE_QUATRIEME_DE_FINALE",
  "TRENTE_DEUXIEME_DE_FINALE",
  "SEIZIEME_DE_FINALE",
  "QUART_DE_FINALE",
  "DEMI_FINALE",
  "FINALE",
  "CONTRE_LA_MONTRE",
  "CLASSEMENT",
  "RELAIS_MIXTE",
  "MATCH_BRONZE",
  "EPREUVE_PAR_EQUIPES",
])

export type EventPhase = z.infer<typeof eventPhaseSchema>
