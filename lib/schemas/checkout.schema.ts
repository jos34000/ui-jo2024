import { z } from "zod"

export const checkoutSchema = z.object({
  cardHolder: z.string().min(2, "Nom du titulaire requis"),
  cardNumber: z.string().refine(
    v => v.replace(/\D/g, "").length === 16,
    "Le numéro de carte doit contenir 16 chiffres",
  ),
  expiry: z
    .string()
    .regex(/^\d{2}\/\d{2}$/, "Format MM/AA invalide")
    .refine(v => {
      const month = parseInt(v.split("/")[0], 10)
      return month >= 1 && month <= 12
    }, "Mois invalide"),
  cvv: z.string().regex(/^\d{3,4}$/, "CVV invalide (3 ou 4 chiffres)"),
})

export type CheckoutFormValues = z.infer<typeof checkoutSchema>
