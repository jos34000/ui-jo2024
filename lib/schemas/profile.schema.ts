import { z } from "zod"

export const profileSchema = z.object({
  firstName: z.string().min(2, "Le prenom doit contenir au moins 2 caracteres"),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caracteres"),
  email: z.email("Adresse email invalide"),
  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
    .regex(/\d/, "Le mot de passe doit contenir au moins un chiffre")
    .optional(),
})
