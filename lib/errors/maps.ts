import type { ErrorKey } from "./registry"

export const BACKEND_ERROR_MAP: Record<string, ErrorKey> = {
  // ─── Utilisateurs ────────────────────────────────────────────────────────────
  "Utilisateur introuvable":                               "userNotFound",
  "Utilisateur non trouvé":                                "userNotFound",
  "L'utilisateur n'existe pas":                            "userNotFound",

  // ─── Email ───────────────────────────────────────────────────────────────────
  "Cet email est déjà utilisé":                            "emailAlreadyUsed",

  // ─── Mot de passe ────────────────────────────────────────────────────────────
  "Mot de passe actuel incorrect":                         "wrongPassword",

  // ─── Panier ──────────────────────────────────────────────────────────────────
  "Aucun panier actif":                                    "cartNotActive",
  "Le panier a expiré":                                    "cartExpired",
  "Ce panier a déjà été payé":                             "cartAlreadyPaid",
  "Le panier est vide":                                    "cartEmpty",
  "Article introuvable":                                   "itemNotFound",

  // ─── Évènements ──────────────────────────────────────────────────────────────
  "Évènement non trouvé":                                  "eventNotFound",
  "Événement non trouvé":                                  "eventNotFound",
  "Cet événement existe déjà":                             "eventAlreadyExists",

  // ─── Offres ──────────────────────────────────────────────────────────────────
  "Cette offre existe déjà.":                              "offerAlreadyExists",

  // ─── Paiement ────────────────────────────────────────────────────────────────
  "Carte déclinée":                                        "cardDeclined",
  "Fonds insuffisants":                                    "insufficientFunds",
  "Carte expirée":                                         "cardExpired",

  // ─── Transactions ────────────────────────────────────────────────────────────
  "Transaction introuvable":                               "transactionNotFound",
  "Aucun billet valide disponible pour cette transaction": "noValidTickets",

  // ─── 2FA ─────────────────────────────────────────────────────────────────────
  "Code invalide.":                                        "invalidOtpCode",
  "Pas de code valide.":                                   "otpExpired",
  "Tentatives maximales atteintes pour ce code.":          "otpMaxAttempts",

  // ─── Générique ───────────────────────────────────────────────────────────────
  "Une erreur est survenue":                               "genericError",
  "An error occurred":                                     "genericError",
} satisfies Record<string, ErrorKey>

export const BACKEND_ERROR_PREFIXES: readonly [string, ErrorKey][] = [
  ["Cet évènement est complet",           "eventSoldOut"],
  ["Cette offre n'existe plus",           "offerNotFound"],
  ["Évènement non trouvé",               "eventNotFound"],
  ["Article introuvable",                 "itemNotFound"],
  ["Aucun utilisateur avec ce mail",      "userNotFound"],
  ["Cet utilisateur n'existe pas",        "userNotFound"],
  ["User not found",                      "userNotFound"],
]

export const VALIDATION_ERROR_MAP: Record<string, ErrorKey> = {
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
} satisfies Record<string, ErrorKey>
