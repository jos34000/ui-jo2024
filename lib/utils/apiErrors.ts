/**
 * @deprecated Import from "@/lib/errors/maps" or "@/lib/errors/createAppError" instead.
 * This file is kept for backward compatibility.
 */
export {
  BACKEND_ERROR_MAP,
  BACKEND_ERROR_PREFIXES,
} from "@/lib/errors/maps"

import {
  BACKEND_ERROR_MAP,
  BACKEND_ERROR_PREFIXES,
} from "@/lib/errors/maps"
import type { ErrorKey } from "@/lib/errors/registry"

export function resolveBackendErrorKey(message: string): ErrorKey | undefined {
  if (BACKEND_ERROR_MAP[message]) return BACKEND_ERROR_MAP[message]
  for (const [prefix, key] of BACKEND_ERROR_PREFIXES) {
    if (message.startsWith(prefix)) return key
  }
  return undefined
}
