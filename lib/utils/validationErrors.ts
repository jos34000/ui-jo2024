/**
 * @deprecated Import from "@/lib/errors/maps" or "@/lib/errors/createAppError" instead.
 * This file is kept for backward compatibility.
 */
export { VALIDATION_ERROR_MAP } from "@/lib/errors/maps"

import { VALIDATION_ERROR_MAP } from "@/lib/errors/maps"

export function translateValidationError(
  message: string,
  t: (key: string) => string,
): string {
  const key = VALIDATION_ERROR_MAP[message]
  return key ? t(key) : message
}
