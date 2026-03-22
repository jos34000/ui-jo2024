/**
 * Maps hardcoded French Zod validation messages to i18n keys in the "validation" namespace.
 * All keys here must exist in all 4 translation files (fr, en, de, es).
 */
export const VALIDATION_ERROR_MAP: Record<string, string> = {
  // Email
  "Adresse email invalide":                          "invalidEmail",

  // Mot de passe
  "Le mot de passe doit contenir au moins 8 caractères": "passwordMin",
  "Le mot de passe doit contenir au moins une majuscule": "passwordUppercase",
  "Le mot de passe doit contenir au moins un chiffre":   "passwordDigit",
  "Les mots de passe ne correspondent pas":              "passwordsMustMatch",
  "Mot de passe actuel requis":                          "currentPasswordRequired",

  // Prénom / Nom
  "Le prénom doit contenir au moins 2 caractères":       "firstNameMin",
  "Le prénom fait maximum 30 caractères":                "firstNameMax",
  "Le nom doit contenir au moins 2 caractères":          "lastNameMin",
  "Le nom fait maximum 30 caractères":                   "lastNameMax",

  // CGU
  "Vous devez accepter les conditions d'utilisation":    "termsRequired",

  // Paiement
  "Nom du titulaire requis":                             "cardHolderMin",
  "Le numéro de carte doit contenir 16 chiffres":        "cardNumberLength",
  "Format MM/AA invalide":                               "expiryFormat",
  "Mois invalide":                                       "expiryMonth",
  "CVV invalide (3 ou 4 chiffres)":                      "cvvFormat",
}

export function translateValidationError(
  message: string,
  t: (key: string) => string,
): string {
  const key = VALIDATION_ERROR_MAP[message]
  return key ? t(key) : message
}
