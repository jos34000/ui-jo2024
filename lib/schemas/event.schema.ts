import { z } from "zod"

export const eventSchema = z.object({
  title: z.string().min(3, "Le titre doit contenir au moins 3 caracteres"),
  sport: z.string().min(2, "Le sport doit contenir au moins 2 caracteres"),
  date: z.string().min(1, "La date est requise"),
  time: z.string().min(1, "L'heure est requise"),
  location: z.string().min(3, "Le lieu doit contenir au moins 3 caracteres"),
  description: z
    .string()
    .min(10, "La description doit contenir au moins 10 caracteres"),
  price: z.number().min(0, "Le prix doit etre positif"),
  capacity: z.number().min(1, "La capacite minimum est de 1"),
  availableTickets: z.number().min(0, "Le nombre de billets doit etre positif"),
  imageUrl: z.string().url("URL invalide").or(z.literal("")),
  isActive: z.boolean(),
})
