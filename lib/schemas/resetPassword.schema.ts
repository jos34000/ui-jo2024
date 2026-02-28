import { z } from "zod"

export const resetPasswordSchema = z.object({
  email: z.email("Adresse email invalide"),
})
