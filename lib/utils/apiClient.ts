import { getAuthStore } from "@/lib/stores/auth.store"

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"
const PUBLIC_ENDPOINTS = ["/auth/", "/2fa/send", "/2fa/verify"]

let isRefreshing = false
let refreshPromise: Promise<boolean> | null = null

async function refreshTokens(): Promise<boolean> {
  if (isRefreshing && refreshPromise) {
    return refreshPromise
  }

  isRefreshing = true
  refreshPromise = fetch(`${API_URL}/auth/refresh`, {
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
  let response = await fetch(`${API_URL}${endpoint}`, {
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
      response = await fetch(`${API_URL}${endpoint}`, {
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
