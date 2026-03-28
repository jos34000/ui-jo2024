import type { BackendError, ValidationError, UIError } from "./types"
import type { ErrorKey } from "./registry"
import {
  BACKEND_ERROR_MAP,
  BACKEND_ERROR_PREFIXES,
  VALIDATION_ERROR_MAP,
} from "./maps"

export function backendError(rawMessage: string): BackendError {
  const key = resolveBackendKey(rawMessage)
  return { source: "backend", key, raw: rawMessage }
}

export function validationError(rawMessage: string): ValidationError {
  const key: ErrorKey = VALIDATION_ERROR_MAP[rawMessage] ?? "genericError"
  return { source: "validation", key, raw: rawMessage }
}

export function uiError(key: ErrorKey): UIError {
  return { source: "ui", key }
}

function resolveBackendKey(message: string): ErrorKey {
  if (BACKEND_ERROR_MAP[message]) return BACKEND_ERROR_MAP[message]
  for (const [prefix, key] of BACKEND_ERROR_PREFIXES) {
    if (message.startsWith(prefix)) return key
  }
  return "genericError"
}
