/**
 * Maps known backend error messages to i18n keys in the "errors" namespace.
 * Backend returns ErrorResponseDTO.message as a human-readable string.
 * All keys here must exist in all 4 translation files (fr, en, de, es).
 *
 * To extend: add the exact string returned by the backend + a camelCase key,
 * then add the key to all messages/*.json files.
 *
 * For messages with dynamic content (e.g. "Article introuvable : 42"),
 * use BACKEND_ERROR_PREFIXES below for prefix matching.
 */
export const BACKEND_ERROR_MAP: Record<string, string> = {
  // ─── Utilisateurs (UserService, CartService, TransactionService) ───────────
  "Utilisateur introuvable":                               "userNotFound",
  "Utilisateur non trouvé":                                "userNotFound",
  "L'utilisateur n'existe pas":                            "userNotFound",

  // ─── Email (UserService) ───────────────────────────────────────────────────
  "Cet email est déjà utilisé":                            "emailAlreadyUsed",

  // ─── Mot de passe (UserService) ───────────────────────────────────────────
  "Mot de passe actuel incorrect":                         "wrongPassword",

  // ─── Panier (CartService, TransactionService) ─────────────────────────────
  "Aucun panier actif":                                    "cartNotActive",
  "Le panier a expiré":                                    "cartExpired",
  "Ce panier a déjà été payé":                             "cartAlreadyPaid",
  "Le panier est vide":                                    "cartEmpty",
  "Article introuvable":                                   "itemNotFound",

  // ─── Évènements (EventService) ────────────────────────────────────────────
  "Évènement non trouvé":                                  "eventNotFound",
  "Événement non trouvé":                                  "eventNotFound",
  "Cet événement existe déjà":                             "eventAlreadyExists",

  // ─── Offres (OfferService) ────────────────────────────────────────────────
  "Cette offre existe déjà.":                              "offerAlreadyExists",

  // ─── Paiement / cartes (PaymentMockService) ───────────────────────────────
  "Carte déclinée":                                        "cardDeclined",
  "Fonds insuffisants":                                    "insufficientFunds",
  "Carte expirée":                                         "cardExpired",

  // ─── Transactions (TransactionService) ────────────────────────────────────
  "Transaction introuvable":                               "transactionNotFound",
  "Aucun billet valide disponible pour cette transaction": "noValidTickets",

  // ─── 2FA (TwoFactorService) ───────────────────────────────────────────────
  "Code invalide.":                                        "invalidOtpCode",
  "Pas de code valide.":                                   "otpExpired",
  "Tentatives maximales atteintes pour ce code.":          "otpMaxAttempts",

  // ─── Générique ─────────────────────────────────────────────────────────────
  "Une erreur est survenue":                               "genericError",
  "An error occurred":                                     "genericError",
}

/**
 * For backend messages that include dynamic content (IDs, emails…),
 * we match by prefix. Order matters: more specific prefixes first.
 * Each entry is [prefix, i18nKey].
 */
export const BACKEND_ERROR_PREFIXES: Array<[string, string]> = [
  ["Cet évènement est complet",           "eventSoldOut"],
  ["Cette offre n'existe plus",           "offerNotFound"],
  ["Évènement non trouvé",               "eventNotFound"],
  ["Article introuvable",                 "itemNotFound"],
  ["Aucun utilisateur avec ce mail",      "userNotFound"],
  ["Cet utilisateur n'existe pas",        "userNotFound"],
  ["User not found",                      "userNotFound"],
]

export function resolveBackendErrorKey(message: string): string | undefined {
  // 1. Exact match
  if (BACKEND_ERROR_MAP[message]) return BACKEND_ERROR_MAP[message]
  // 2. Prefix match
  for (const [prefix, key] of BACKEND_ERROR_PREFIXES) {
    if (message.startsWith(prefix)) return key
  }
  return undefined
}
