"use client"

import { useAuthStore } from "@/lib/stores/auth.store"
import { User } from "@/lib/types/user.types"

export type Session =
  | { user: User; isAuthenticated: true }
  | { user: null; isAuthenticated: false }

export function useSession(): Session {
  const user = useAuthStore(state => state.user)
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)
  return { user, isAuthenticated } as Session
}

/**
 * Use inside middleware-protected routes only.
 * Throws if called outside a protected route (isAuthenticated is false).
 */
export function useRequiredSession(): { user: User; isAuthenticated: true } {
  const session = useSession()
  if (!session.isAuthenticated) {
    throw new Error(
      "useRequiredSession called outside a protected route — user is not authenticated",
    )
  }
  return session as { user: User; isAuthenticated: true }
}
