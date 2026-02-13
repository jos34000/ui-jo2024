import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

interface User {
  id: number
  email: string
  firstName: string
  lastName: string
  mfaEnabled: boolean
  createdDate: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  setUser: (user: User | null) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      user: null,
      isAuthenticated: false,

      setUser: user =>
        set({
          user,
          isAuthenticated: user !== null,
        }),

      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
