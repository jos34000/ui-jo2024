import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import { AuthState, User } from "@/lib/types/user.types"

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

      updateUser: (data: Partial<Omit<User, "password">>) =>
        set(state => ({
          user: state.user ? { ...state.user, ...data } : null,
        })),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
