import { useAuthStore } from "@/lib/stores/authStore"

const API_URL = process.env.API_BASE_URL

export const apiFetch = async (url: string, options: RequestInit = {}) => {
  const { accessToken, refreshToken, setAuth, clearAuth } =
    useAuthStore.getState()

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  }

  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`
  }

  let response = await fetch(`${API_URL}${url}`, {
    ...options,
    headers,
  })

  if (
    (response.status === 401 && refreshToken) ||
    (response.status === 403 && refreshToken)
  ) {
    const refreshResponse = await fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    })

    if (refreshResponse.ok) {
      const data = await refreshResponse.json()
      setAuth(data.accessToken, data.refreshToken)

      headers["Authorization"] = `Bearer ${data.accessToken}`
      response = await fetch(`${API_URL}${url}`, {
        ...options,
        headers,
      })
    } else {
      clearAuth()
      globalThis.location.href = "/auth/login"
    }
  }

  return response
}
