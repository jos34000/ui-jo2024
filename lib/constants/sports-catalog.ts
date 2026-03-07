import { SportSeed } from "@/lib/types/sport.type"

export const sportsSeed: SportSeed[] = [
  {
    name: "Sprint",
    description:
      "Épreuves de course à pied sur courtes distances : 100m, 200m et 400m.",
    phases: ["SERIES", "DEMI_FINALE", "FINALE"],
  },
  {
    name: "Marathon",
    description: "Course à pied longue distance de 42,195 km sur route.",
    phases: ["FINALE"],
  },
  {
    name: "Natation",
    description:
      "Épreuves en piscine couvrant nage libre, dos, brasse, papillon et relais.",
    phases: ["SERIES", "DEMI_FINALE", "FINALE"],
  },
  {
    name: "Natation en eau libre",
    description: "Course de 10 km en milieu naturel, ici dans la Seine.",
    phases: ["FINALE"],
  },
  {
    name: "Triathlon",
    description:
      "Enchaînement natation, cyclisme et course à pied en milieu urbain.",
    phases: ["FINALE", "RELAIS_MIXTE"],
  },
  {
    name: "Aviron",
    description:
      "Épreuves sur plan d'eau en embarcations individuelles et collectives.",
    phases: ["SERIES", "REPECHAGE", "DEMI_FINALE", "FINALE", "CLASSEMENT"],
  },
  {
    name: "Canoë-kayak sprint",
    description: "Courses de vitesse sur eau calme en canoë et kayak.",
    phases: ["SERIES", "DEMI_FINALE", "FINALE"],
  },
  {
    name: "Canoë-kayak slalom",
    description:
      "Descente de parcours artificiels avec portes, en kayak monoplace et canoë.",
    phases: ["QUALIFICATION", "DEMI_FINALE", "FINALE"],
  },
  {
    name: "Water-polo",
    description:
      "Sport collectif aquatique opposant deux équipes de sept joueurs.",
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
    phases: ["QUALIFICATION", "FINALE"],
  },
  {
    name: "Voile",
    description:
      "Régates olympiques en plusieurs classes de bateaux sur la rade de Marseille.",
    phases: ["SERIES", "FINALE"],
  },
  {
    name: "Surf",
    description: "Discipline sur vagues naturelles à Teahupo'o, Tahiti.",
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
    phases: ["QUALIFICATION", "FINALE", "EPREUVE_PAR_EQUIPES"],
  },
  {
    name: "Gymnastique rythmique",
    description: "Enchaînements avec engins (cerceau, ballon, massues, ruban).",
    phases: ["QUALIFICATION", "FINALE"],
  },
  {
    name: "Trampoline",
    description: "Figures acrobatiques enchaînées sur trampoline.",
    phases: ["QUALIFICATION", "FINALE"],
  },
  {
    name: "Basketball",
    description:
      "Sport collectif en salle opposant deux équipes de cinq joueurs.",
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
    phases: ["PHASE_DE_GROUPES", "QUART_DE_FINALE", "DEMI_FINALE", "FINALE"],
  },
  {
    name: "Volleyball",
    description:
      "Sport collectif en salle opposant deux équipes de six joueurs.",
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
    phases: ["QUALIFICATION", "FINALE"],
  },
  {
    name: "Cyclisme sur route",
    description:
      "Course en ligne et contre-la-montre sur les routes d'Île-de-France.",
    phases: ["FINALE", "CONTRE_LA_MONTRE"],
  },
  {
    name: "Cyclisme sur piste",
    description: "Épreuves de vitesse et d'endurance sur vélodrome.",
    phases: ["QUALIFICATION", "DEMI_FINALE", "FINALE"],
  },
  {
    name: "VTT",
    description: "Cross-country olympique sur parcours tout-terrain en forêt.",
    phases: ["FINALE"],
  },
  {
    name: "BMX Racing",
    description: "Descente de piste en terre avec sauts et virages relevés.",
    phases: ["SERIES", "QUART_DE_FINALE", "DEMI_FINALE", "FINALE"],
  },
  {
    name: "BMX Freestyle",
    description: "Figures acrobatiques sur rampe de skatepark.",
    phases: ["QUALIFICATION", "FINALE"],
  },
  {
    name: "Skateboard",
    description:
      "Disciplines street et park avec figures techniques et acrobatiques.",
    phases: ["QUALIFICATION", "FINALE"],
  },
  {
    name: "Breaking",
    description:
      "Danse hip-hop compétitive en battle, discipline olympique depuis Paris 2024.",
    phases: ["QUALIFICATION", "QUART_DE_FINALE", "DEMI_FINALE", "FINALE"],
  },
  {
    name: "Escalade sportive",
    description: "Combiné vitesse et bloc/difficulté sur mur artificiel.",
    phases: ["QUALIFICATION", "DEMI_FINALE", "FINALE"],
  },
  {
    name: "Équitation",
    description:
      "Dressage, saut d'obstacles et concours complet dans le parc de Versailles.",
    phases: ["QUALIFICATION", "FINALE", "EPREUVE_PAR_EQUIPES"],
  },
  {
    name: "Golf",
    description: "Tournoi de 72 trous sur le parcours du Golf National.",
    phases: ["FINALE"],
  },
  {
    name: "Haltérophilie",
    description: "Épreuves d'arraché et d'épaulé-jeté par catégories de poids.",
    phases: ["FINALE"],
  },
  {
    name: "Pentathlon moderne",
    description:
      "Combiné de cinq disciplines : escrime, natation, équitation, tir et course.",
    phases: ["QUALIFICATION", "FINALE"],
  },
]
