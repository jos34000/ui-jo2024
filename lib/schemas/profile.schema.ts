import { z } from "zod"

export const profileSchema = z.object({
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.email("Adresse email invalide"),
  twoFactor: z.boolean(),
})
