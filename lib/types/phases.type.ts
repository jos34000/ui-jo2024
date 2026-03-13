export type EventPhase =
  | "SERIES"
  | "REPECHAGE"
  | "QUALIFICATION"
  | "TOUR_PRELIMINAIRE"
  | "PHASE_DE_POULES"
  | "PHASE_DE_GROUPES"
  | "SOIXANTE_QUATRIEME_DE_FINALE"
  | "TRENTE_DEUXIEME_DE_FINALE"
  | "SEIZIEME_DE_FINALE"
  | "QUART_DE_FINALE"
  | "DEMI_FINALE"
  | "FINALE"
  | "CONTRE_LA_MONTRE"
  | "CLASSEMENT"
  | "RELAIS_MIXTE"
  | "MATCH_BRONZE"
  | "EPREUVE_PAR_EQUIPES"

export const EVENT_PHASE_LABELS: Record<EventPhase, string> = {
  SERIES: "Séries",
  REPECHAGE: "Repêchage",
  QUALIFICATION: "Qualification",
  TOUR_PRELIMINAIRE: "Tour préliminaire",
  PHASE_DE_POULES: "Phase de poules",
  PHASE_DE_GROUPES: "Phase de groupes",
  SOIXANTE_QUATRIEME_DE_FINALE: "64e de finale",
  TRENTE_DEUXIEME_DE_FINALE: "32e de finale",
  SEIZIEME_DE_FINALE: "16e de finale",
  QUART_DE_FINALE: "Quart de finale",
  DEMI_FINALE: "Demi-finale",
  FINALE: "Finale",
  CONTRE_LA_MONTRE: "Contre-la-montre",
  CLASSEMENT: "Match de classement",
  RELAIS_MIXTE: "Relais mixte",
  MATCH_BRONZE: "Match pour la médaille de bronze",
  EPREUVE_PAR_EQUIPES: "Epreuve par équipes",
}
