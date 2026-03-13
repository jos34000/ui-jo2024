import { z } from "zod"

export const profileSchema = z.object({
  firstName: z.string().min(2, "Le prenom doit contenir au moins 2 caracteres"),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caracteres"),
  email: z.email("Adresse email invalide"),
  twoFactor: z.boolean(),
})
