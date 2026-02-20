"use client"
import { useState } from "react"
import { useAuthStore } from "@/lib/stores/auth.store"
import { useRouter } from "next/navigation"
import { AuthHeader } from "@/app/auth/AuthHeader"
import { AuthenticatedView } from "@/app/auth/AuthenticatedView"
import { UnauthenticatedView } from "@/app/auth/UnauthenticatedView"
import { AuthFooter } from "@/app/auth/AuthFooter"

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "register">("login")
  const user = useAuthStore(state => state.user)
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)
  const logout = useAuthStore(state => state.logout)
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const initials = user
    ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase()
    : ""

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <AuthHeader />
      {isAuthenticated && user ? (
        <AuthenticatedView
          user={user}
          onLogout={handleLogout}
          initials={initials}
        />
      ) : (
        <UnauthenticatedView
          mode={mode}
          onToggleMode={() => setMode(mode === "login" ? "register" : "login")}
        />
      )}
      <AuthFooter />
    </div>
  )
}
