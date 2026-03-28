"use client"

import { useTranslations } from "next-intl"
import { useFieldContext } from "@/lib/hooks/formContexts"
import { translateValidationError } from "@/lib/utils/validationErrors"

export function useFieldValidation<T = string>() {
  const tV = useTranslations("validation")
  const field = useFieldContext<T>()

  const translated = field.state.meta.errors
    .map(e => (e?.message ? translateValidationError(e.message, tV) : ""))
    .filter(Boolean)

  const error = translated.length > 0 ? translated.join(" ") : undefined

  return { field, validation: { error, invalid: error !== undefined } }
}
