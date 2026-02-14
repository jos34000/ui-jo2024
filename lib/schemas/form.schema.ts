import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Adresse email invalide"),
  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
  rememberMe: z.boolean().optional(),
});

export const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "Le prénom doit contenir au moins 2 caractères")
      .max(30, "Le prénom fait maximum 30 caractères"),
    lastName: z
      .string()
      .min(2, "Le nom doit contenir au moins 2 caractères")
      .max(30, "Le nom fait maximum 30 caractères"),
    email: z.email("Adresse email invalide"),
    password: z
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères")
      .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
      .regex(/\d/, "Le mot de passe doit contenir au moins un chiffre"),
    confirmPassword: z.string(),
    acceptTerms: z.boolean().refine((val: boolean) => val, {
      message: "Vous devez accepter les conditions d'utilisation",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });
