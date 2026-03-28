"use client"

import { useTranslations } from "next-intl"
import type { AppError } from "./types"

export function useErrorMessage() {
  const tErrors = useTranslations("errors")
  const tValidation = useTranslations("validation")

  function resolve(error: AppError): string {
    const t = error.source === "validation" ? tValidation : tErrors
    return t(error.key)
  }

  function resolveOr(error: AppError, fallback: string): string {
    try {
      return resolve(error)
    } catch {
      return fallback
    }
  }

  return { resolve, resolveOr }
}
