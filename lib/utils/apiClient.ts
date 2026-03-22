import { getAuthStore } from "@/lib/stores/auth.store"
import { resolveBackendErrorKey } from "@/lib/utils/apiErrors"

const API_BASE = "/api"
const PUBLIC_ENDPOINTS = ["/auth/", "/2fa/send", "/2fa/verify"]

let isRefreshing = false
let refreshPromise: Promise<boolean> | null = null

async function refreshTokens(): Promise<boolean> {
  if (isRefreshing && refreshPromise) {
    return refreshPromise
  }

  isRefreshing = true
  refreshPromise = fetch(`${API_BASE}/auth/refresh`, {
    method: "POST",
    credentials: "include",
  })
    .then(res => res.ok)
    .finally(() => {
      isRefreshing = false
      refreshPromise = null
    })

  return refreshPromise
}

export async function apiClient(endpoint: string, options?: RequestInit) {
  let response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  })

  if (
    (response.status === 401 || response.status === 403) &&
    !PUBLIC_ENDPOINTS.some(e => endpoint.includes(e))
  ) {
    const refreshed = await refreshTokens()

    if (refreshed) {
      response = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          ...options?.headers,
        },
      })
    } else {
      getAuthStore().logout()
      window.location.href = "/auth"
    }
  }

  return response
}

export async function parseApiError(
  response: Response,
  fallback = "Une erreur est survenue",
  t?: (key: string) => string,
): Promise<string> {
  const error = await response.json().catch(() => ({}))
  const rawMessage: string | undefined =
    error.message ??
    (Object.values(error).filter(v => typeof v === "string")[0] as string | undefined)

  if (rawMessage) {
    if (t) {
      const key = resolveBackendErrorKey(rawMessage)
      if (key) return t(key)
    }
    return rawMessage
  }

  return fallback
}
