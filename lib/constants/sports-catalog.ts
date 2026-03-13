import { SportSeed } from "@/lib/types/sport.type"

export const sportsSeed: SportSeed[] = [
  {
    name: "Sprint",
    description:
      "Épreuves de course à pied sur courtes distances : 100m, 200m et 400m.",
    icon: "🏃",
    phases: ["SERIES", "DEMI_FINALE", "FINALE"],
  },
  {
    name: "Marathon",
    description: "Course à pied longue distance de 42,195 km sur route.",
    icon: "🏅",
    phases: ["FINALE"],
  },
  {
    name: "Natation",
    description:
      "Épreuves en piscine couvrant nage libre, dos, brasse, papillon et relais.",
    icon: "🏊",
    phases: ["SERIES", "DEMI_FINALE", "FINALE"],
  },
  {
    name: "Natation en eau libre",
    description: "Course de 10 km en milieu naturel, ici dans la Seine.",
    icon: "🌊",
    phases: ["FINALE"],
  },
  {
    name: "Triathlon",
    description:
      "Enchaînement natation, cyclisme et course à pied en milieu urbain.",
    icon: "🤸",
    phases: ["FINALE", "RELAIS_MIXTE"],
  },
  {
    name: "Aviron",
    description:
      "Épreuves sur plan d'eau en embarcations individuelles et collectives.",
    icon: "🚣",
    phases: ["SERIES", "REPECHAGE", "DEMI_FINALE", "FINALE", "CLASSEMENT"],
  },
  {
    name: "Canoë-kayak sprint",
    description: "Courses de vitesse sur eau calme en canoë et kayak.",
    icon: "🛶",
    phases: ["SERIES", "DEMI_FINALE", "FINALE"],
  },
  {
    name: "Canoë-kayak slalom",
    description:
      "Descente de parcours artificiels avec portes, en kayak monoplace et canoë.",
    icon: "🌀",
    phases: ["QUALIFICATION", "DEMI_FINALE", "FINALE"],
  },
  {
    name: "Water-polo",
    description:
      "Sport collectif aquatique opposant deux équipes de sept joueurs.",
    icon: "🤽",
    phases: [
      "PHASE_DE_GROUPES",
      "QUART_DE_FINALE",
      "DEMI_FINALE",
      "MATCH_BRONZE",
      "FINALE",
    ],
  },
  {
    name: "Plongeon",
    description:
      "Épreuves depuis le tremplin 3m et la plateforme 10m, individuel et synchronisé.",
    icon: "🤿",
    phases: ["QUALIFICATION", "FINALE"],
  },
  {
    name: "Voile",
    description:
      "Régates olympiques en plusieurs classes de bateaux sur la rade de Marseille.",
    icon: "⛵",
    phases: ["SERIES", "FINALE"],
  },
  {
    name: "Surf",
    description: "Discipline sur vagues naturelles à Teahupo'o, Tahiti.",
    icon: "🏄",
    phases: [
      "TOUR_PRELIMINAIRE",
      "SEIZIEME_DE_FINALE",
      "QUART_DE_FINALE",
      "DEMI_FINALE",
      "FINALE",
    ],
  },
  {
    name: "Gymnastique artistique",
    description:
      "Agilité, force et grâce sur agrès : sol, barres, poutre, saut.",
    icon: "🤸",
    phases: ["QUALIFICATION", "FINALE", "EPREUVE_PAR_EQUIPES"],
  },
  {
    name: "Gymnastique rythmique",
    description: "Enchaînements avec engins (cerceau, ballon, massues, ruban).",
    icon: "🎀",
    phases: ["QUALIFICATION", "FINALE"],
  },
  {
    name: "Trampoline",
    description: "Figures acrobatiques enchaînées sur trampoline.",
    icon: "⬆️",
    phases: ["QUALIFICATION", "FINALE"],
  },
  {
    name: "Basketball",
    description:
      "Sport collectif en salle opposant deux équipes de cinq joueurs.",
    icon: "🏀",
    phases: [
      "PHASE_DE_GROUPES",
      "QUART_DE_FINALE",
      "DEMI_FINALE",
      "MATCH_BRONZE",
      "FINALE",
    ],
  },
  {
    name: "Basketball 3x3",
    description:
      "Format urbain du basketball sur demi-terrain, en équipes de trois joueurs.",
    icon: "🏀",
    phases: ["PHASE_DE_GROUPES", "QUART_DE_FINALE", "DEMI_FINALE", "FINALE"],
  },
  {
    name: "Volleyball",
    description:
      "Sport collectif en salle opposant deux équipes de six joueurs.",
    icon: "🏐",
    phases: [
      "PHASE_DE_GROUPES",
      "QUART_DE_FINALE",
      "DEMI_FINALE",
      "MATCH_BRONZE",
      "FINALE",
    ],
  },
  {
    name: "Beach volley",
    description: "Volleyball pratiqué sur sable, en équipes de deux joueurs.",
    icon: "🏖️",
    phases: [
      "PHASE_DE_GROUPES",
      "SEIZIEME_DE_FINALE",
      "QUART_DE_FINALE",
      "DEMI_FINALE",
      "MATCH_BRONZE",
      "FINALE",
    ],
  },
  {
    name: "Rugby à 7",
    description: "Format raccourci du rugby à XV, joué à 7 par équipe.",
    icon: "🏉",
    phases: [
      "PHASE_DE_GROUPES",
      "QUART_DE_FINALE",
      "DEMI_FINALE",
      "MATCH_BRONZE",
      "FINALE",
    ],
  },
  {
    name: "Tennis",
    description: "Sport de raquette sur terre battue à Roland-Garros.",
    icon: "🎾",
    phases: [
      "TOUR_PRELIMINAIRE",
      "SEIZIEME_DE_FINALE",
      "QUART_DE_FINALE",
      "DEMI_FINALE",
      "MATCH_BRONZE",
      "FINALE",
    ],
  },
  {
    name: "Badminton",
    description:
      "Sport de raquette au volant, en simple et double sur surface indoor.",
    icon: "🏸",
    phases: [
      "PHASE_DE_GROUPES",
      "SEIZIEME_DE_FINALE",
      "QUART_DE_FINALE",
      "DEMI_FINALE",
      "MATCH_BRONZE",
      "FINALE",
    ],
  },
  {
    name: "Tennis de table",
    description: "Sport de raquette sur table, en simple et par équipes.",
    icon: "🏓",
    phases: [
      "TOUR_PRELIMINAIRE",
      "SEIZIEME_DE_FINALE",
      "QUART_DE_FINALE",
      "DEMI_FINALE",
      "MATCH_BRONZE",
      "FINALE",
    ],
  },
  {
    name: "Football",
    description:
      "Sport collectif opposant deux équipes de onze joueurs sur gazon.",
    icon: "⚽",
    phases: [
      "PHASE_DE_GROUPES",
      "QUART_DE_FINALE",
      "DEMI_FINALE",
      "MATCH_BRONZE",
      "FINALE",
    ],
  },
  {
    name: "Handball",
    description:
      "Sport collectif en salle opposant deux équipes de sept joueurs.",
    icon: "🤾",
    phases: [
      "PHASE_DE_GROUPES",
      "QUART_DE_FINALE",
      "DEMI_FINALE",
      "MATCH_BRONZE",
      "FINALE",
    ],
  },
  {
    name: "Hockey sur gazon",
    description:
      "Sport collectif joué sur gazon synthétique avec crosses et balle.",
    icon: "🏑",
    phases: [
      "PHASE_DE_GROUPES",
      "QUART_DE_FINALE",
      "DEMI_FINALE",
      "MATCH_BRONZE",
      "FINALE",
    ],
  },
  {
    name: "Judo",
    description:
      "Art martial japonais basé sur les projections et les immobilisations.",
    icon: "🥋",
    phases: [
      "TOUR_PRELIMINAIRE",
      "REPECHAGE",
      "DEMI_FINALE",
      "MATCH_BRONZE",
      "FINALE",
      "EPREUVE_PAR_EQUIPES",
    ],
  },
  {
    name: "Boxe",
    description: "Sport de combat en ring à coups de poings gantés.",
    icon: "🥊",
    phases: [
      "TOUR_PRELIMINAIRE",
      "SEIZIEME_DE_FINALE",
      "QUART_DE_FINALE",
      "DEMI_FINALE",
      "FINALE",
    ],
  },
  {
    name: "Taekwondo",
    description:
      "Art martial coréen basé sur les techniques de pieds et de poings.",
    icon: "🦵",
    phases: [
      "TOUR_PRELIMINAIRE",
      "QUART_DE_FINALE",
      "DEMI_FINALE",
      "MATCH_BRONZE",
      "FINALE",
    ],
  },
  {
    name: "Lutte",
    description:
      "Discipline de combat en gréco-romaine et libre, hommes et femmes.",
    icon: "🤼",
    phases: [
      "TOUR_PRELIMINAIRE",
      "REPECHAGE",
      "DEMI_FINALE",
      "MATCH_BRONZE",
      "FINALE",
    ],
  },
  {
    name: "Escrime",
    description:
      "Combat à l'arme blanche : fleuret, épée et sabre, en individuel et par équipes.",
    icon: "🤺",
    phases: [
      "TOUR_PRELIMINAIRE",
      "TRENTE_DEUXIEME_DE_FINALE",
      "SEIZIEME_DE_FINALE",
      "QUART_DE_FINALE",
      "DEMI_FINALE",
      "MATCH_BRONZE",
      "FINALE",
      "EPREUVE_PAR_EQUIPES",
    ],
  },
  {
    name: "Tir à l'arc",
    description:
      "Précision sur cibles à 70m, en individuel et par équipes mixtes.",
    icon: "🏹",
    phases: [
      "SOIXANTE_QUATRIEME_DE_FINALE",
      "TRENTE_DEUXIEME_DE_FINALE",
      "SEIZIEME_DE_FINALE",
      "QUART_DE_FINALE",
      "DEMI_FINALE",
      "MATCH_BRONZE",
      "FINALE",
    ],
  },
  {
    name: "Tir sportif",
    description:
      "Épreuves de précision au pistolet et à la carabine, à 10m, 25m et 50m.",
    icon: "🎯",
    phases: ["QUALIFICATION", "FINALE"],
  },
  {
    name: "Cyclisme sur route",
    description:
      "Course en ligne et contre-la-montre sur les routes d'Île-de-France.",
    icon: "🚴",
    phases: ["FINALE", "CONTRE_LA_MONTRE"],
  },
  {
    name: "Cyclisme sur piste",
    description: "Épreuves de vitesse et d'endurance sur vélodrome.",
    icon: "🚵",
    phases: ["QUALIFICATION", "DEMI_FINALE", "FINALE"],
  },
  {
    name: "VTT",
    description: "Cross-country olympique sur parcours tout-terrain en forêt.",
    icon: "🌲",
    phases: ["FINALE"],
  },
  {
    name: "BMX Racing",
    description: "Descente de piste en terre avec sauts et virages relevés.",
    icon: "🏎️",
    phases: ["SERIES", "QUART_DE_FINALE", "DEMI_FINALE", "FINALE"],
  },
  {
    name: "BMX Freestyle",
    description: "Figures acrobatiques sur rampe de skatepark.",
    icon: "🛹",
    phases: ["QUALIFICATION", "FINALE"],
  },
  {
    name: "Skateboard",
    description:
      "Disciplines street et park avec figures techniques et acrobatiques.",
    icon: "🛹",
    phases: ["QUALIFICATION", "FINALE"],
  },
  {
    name: "Breaking",
    description:
      "Danse hip-hop compétitive en battle, discipline olympique depuis Paris 2024.",
    icon: "🕺",
    phases: ["QUALIFICATION", "QUART_DE_FINALE", "DEMI_FINALE", "FINALE"],
  },
  {
    name: "Escalade sportive",
    description: "Combiné vitesse et bloc/difficulté sur mur artificiel.",
    icon: "🧗",
    phases: ["QUALIFICATION", "DEMI_FINALE", "FINALE"],
  },
  {
    name: "Équitation",
    description:
      "Dressage, saut d'obstacles et concours complet dans le parc de Versailles.",
    icon: "🏇",
    phases: ["QUALIFICATION", "FINALE", "EPREUVE_PAR_EQUIPES"],
  },
  {
    name: "Golf",
    description: "Tournoi de 72 trous sur le parcours du Golf National.",
    icon: "⛳",
    phases: ["FINALE"],
  },
  {
    name: "Haltérophilie",
    description: "Épreuves d'arraché et d'épaulé-jeté par catégories de poids.",
    icon: "🏋️",
    phases: ["FINALE"],
  },
  {
    name: "Pentathlon moderne",
    description:
      "Combiné de cinq disciplines : escrime, natation, équitation, tir et course.",
    icon: "🎖️",
    phases: ["QUALIFICATION", "FINALE"],
  },
]
