// Run with: pnpm validate:errors
import fr from "../../messages/fr.json"
import en from "../../messages/en.json"
import de from "../../messages/de.json"
import es from "../../messages/es.json"
import { ERROR_KEYS } from "./registry"

const VALIDATION_KEYS = new Set([
  "invalidEmail",
  "passwordMin",
  "passwordUppercase",
  "passwordDigit",
  "passwordsMustMatch",
  "currentPasswordRequired",
  "firstNameMin",
  "firstNameMax",
  "lastNameMin",
  "lastNameMax",
  "termsRequired",
  "cardHolderMin",
  "cardNumberLength",
  "expiryFormat",
  "expiryMonth",
  "cvvFormat",
])

export function validateErrorTranslations(): void {
  const files = { fr, en, de, es } as unknown as Record<
    string,
    Record<string, Record<string, string>>
  >
  const missing: string[] = []
  for (const [locale, messages] of Object.entries(files)) {
    for (const key of ERROR_KEYS) {
      const ns = VALIDATION_KEYS.has(key) ? "validation" : "errors"
      if (!messages[ns]?.[key]) missing.push(`[${locale}] ${ns}.${key}`)
    }
  }
  if (missing.length > 0) {
    throw new Error(
      `Missing translation keys:\n${missing.map(k => `  - ${k}`).join("\n")}`,
    )
  }
}

validateErrorTranslations()
console.log("All error keys have translations in all 4 locales")
