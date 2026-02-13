const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"

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

  if (response.status === 401 && !endpoint.includes("/auth/")) {
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
      globalThis.location.href = "/auth"
    }
  }

  return response
}
