import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import Cookies from "js-cookie"

interface AuthState {
  accessToken: string | null
  refreshToken: string | null
  user: never | null
  isAuthenticated: boolean
  setAuth: (accessToken: string, refreshToken: string, user?: never) => void
  clearAuth: () => void
}

const cookieStorage = {
  getItem: (name: string) => {
    const value = Cookies.get(name)
    return value ? JSON.parse(value) : null
  },
  setItem: (name: string, value: string) => {
    Cookies.set(name, value, { expires: 7 })
  },
  removeItem: (name: string) => {
    Cookies.remove(name)
  },
}

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,
      setAuth: (accessToken, refreshToken, user) =>
        set({ accessToken, refreshToken, user, isAuthenticated: true }),
      clearAuth: () =>
        set({
          accessToken: null,
          refreshToken: null,
          user: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => cookieStorage),
    },
  ),
)
