import { z } from "zod"
import { sportCategorySchema } from "@/lib/types/sport.type"
import { eventPhaseSchema } from "@/lib/types/phases.type"
import { eventStatusSchema } from "@/lib/types/event.type"

export const eventSchema = z.object({
  name: z.string().min(3, "Le nom doit contenir au moins 3 caracteres"),
  sport: z.string().min(3, "Le sport doit contenir au moins 3 caracteres"),
  category: sportCategorySchema,
  phase: eventPhaseSchema,
  date: z.string().min(1, "La date est requise"),
  time: z.string().min(1, "L'heure est requise"),
  location: z.string().min(3, "Le lieu doit contenir au moins 3 caracteres"),
  city: z.string().min(3, "La ville doit contenir au moins 3 caracteres"),
  description: z
    .string()
    .min(10, "La description doit contenir au moins 10 caracteres"),
  capacity: z.number().min(1, "La capacite minimum est de 1"),
  availableSlots: z.number().min(0, "Le nombre de places doit etre positif"),
  icon: z.string().min(1, "L'emoji est requis"),
  isActive: z.boolean(),
  status: eventStatusSchema,
})
