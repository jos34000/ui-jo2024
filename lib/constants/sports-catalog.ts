export interface Sport {
  name: string
  slug: string
  icon: string
  events: number
  description: string
  venues: string[]
  dates: string
  phases: string[]
}

export const sports: Sport[] = [
  {
    name: "Athletisme",
    slug: "athletisme",
    icon: "\u{1F3C3}",
    events: 48,
    description:
      "Le programme d'athletisme des Jeux Olympiques de Paris 2024 comprend 48 epreuves allant du sprint au marathon, en passant par les sauts, lancers et epreuves combinees.",
    venues: ["Stade de France", "Hotel de Ville (Marathon)"],
    dates: "1 - 11 aout 2024",
    phases: ["Series", "Qualifications", "Demi-finales", "Finales"],
  },
  {
    name: "Natation",
    slug: "natation",
    icon: "\u{1F3CA}",
    events: 35,
    description:
      "Les epreuves de natation se deroulent a la Paris La Defense Arena, transformee en centre aquatique pour l'occasion. 35 epreuves de nage libre, dos, brasse, papillon et relais.",
    venues: ["Paris La Defense Arena"],
    dates: "27 juillet - 4 aout 2024",
    phases: ["Series", "Demi-finales", "Finales"],
  },
  {
    name: "Gymnastique",
    slug: "gymnastique",
    icon: "\u{1F938}",
    events: 18,
    description:
      "La gymnastique artistique, rythmique et le trampoline se disputent a la Bercy Arena. 18 finales au programme dans ce sports spectaculaire.",
    venues: ["Bercy Arena"],
    dates: "27 juillet - 5 aout 2024",
    phases: ["Qualifications", "Finales par equipe", "Finales individuelles"],
  },
  {
    name: "Basketball",
    slug: "basketball",
    icon: "\u{1F3C0}",
    events: 4,
    description:
      "Le tournoi olympique de basketball reunit les meilleures equipes nationales du monde. Phase de poules, quarts de finale, demi-finales et finales hommes et femmes.",
    venues: ["Bercy Arena", "Stade Pierre-Mauroy (Lille)"],
    dates: "27 juillet - 11 aout 2024",
    phases: ["Phase de poules", "Quarts de finale", "Demi-finales", "Finales"],
  },
  {
    name: "Football",
    slug: "football",
    icon: "\u26BD",
    events: 4,
    description:
      "Le tournoi de football olympique se joue dans plusieurs stades a travers la France. Les equipes U23 renforcees de 3 joueurs seniors s'affrontent pour la medaille d'or.",
    venues: [
      "Parc des Princes",
      "Stade de Lyon",
      "Stade de Marseille",
      "Stade de Bordeaux",
    ],
    dates: "24 juillet - 10 aout 2024",
    phases: [
      "Phase de poules",
      "Quarts de finale",
      "Demi-finales",
      "Match pour le bronze",
      "Finale",
    ],
  },
  {
    name: "Tennis",
    slug: "tennis",
    icon: "\u{1F3BE}",
    events: 5,
    description:
      "Les epreuves de tennis se jouent sur la terre battue mythique de Roland-Garros. Simple, double et double mixte sont au programme.",
    venues: ["Roland-Garros"],
    dates: "27 juillet - 4 aout 2024",
    phases: [
      "1er tour",
      "2e tour",
      "3e tour",
      "Quarts de finale",
      "Demi-finales",
      "Finales",
    ],
  },
  {
    name: "Cyclisme",
    slug: "cyclisme",
    icon: "\u{1F6B4}",
    events: 22,
    description:
      "Le cyclisme aux JO 2024 couvre la route, la piste, le VTT et le BMX. Les epreuves sur route traversent le coeur de Paris avec des paysages spectaculaires.",
    venues: [
      "Trocadero",
      "Velodrome de Saint-Quentin",
      "Colline d'Elancourt",
      "Stade BMX",
    ],
    dates: "27 juillet - 11 aout 2024",
    phases: [
      "Contre-la-montre",
      "Course en ligne",
      "Poursuite",
      "Sprint",
      "Finales",
    ],
  },
  {
    name: "Escrime",
    slug: "escrime",
    icon: "\u{1F93A}",
    events: 12,
    description:
      "L'escrime, sports olympique historique depuis 1896, se deroule dans le cadre exceptionnel du Grand Palais. Epee, fleuret et sabre en individuel et par equipe.",
    venues: ["Grand Palais"],
    dates: "27 juillet - 4 aout 2024",
    phases: [
      "Tableau principal",
      "Quarts de finale",
      "Demi-finales",
      "Finales",
    ],
  },
  {
    name: "Judo",
    slug: "judo",
    icon: "\u{1F94B}",
    events: 15,
    description:
      "Le judo se dispute au Champ-de-Mars Arena, au pied de la Tour Eiffel. 15 categories de poids chez les hommes et les femmes plus l'epreuve par equipe mixte.",
    venues: ["Champ-de-Mars Arena"],
    dates: "27 juillet - 3 aout 2024",
    phases: ["Eliminatoires", "Repechages", "Demi-finales", "Finales"],
  },
  {
    name: "Aviron",
    slug: "aviron",
    icon: "\u{1F6A3}",
    events: 14,
    description:
      "Les epreuves d'aviron se tiennent au Stade Nautique de Vaires-sur-Marne. 14 epreuves en skiff, deux de couple, quatre de couple et plus.",
    venues: ["Stade Nautique de Vaires-sur-Marne"],
    dates: "27 juillet - 3 aout 2024",
    phases: ["Series", "Repechages", "Demi-finales", "Finales"],
  },
  {
    name: "Voile",
    slug: "voile",
    icon: "\u26F5",
    events: 10,
    description:
      "La voile se deroule a Marseille, dans la rade naturelle du Roucas Blanc. 10 epreuves dans differentes classes de bateaux.",
    venues: ["Marina de Marseille"],
    dates: "28 juillet - 8 aout 2024",
    phases: ["Regates de flotte", "Medal Race"],
  },
  {
    name: "Equitation",
    slug: "equitation",
    icon: "\u{1F3C7}",
    events: 6,
    description:
      "Les epreuves equestres se tiennent au Chateau de Versailles. Dressage, saut d'obstacles et concours complet sont au programme dans un cadre historique.",
    venues: ["Chateau de Versailles"],
    dates: "27 juillet - 6 aout 2024",
    phases: ["Dressage", "Cross-country", "Saut d'obstacles", "Finales"],
  },
]
