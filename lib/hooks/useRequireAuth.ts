"use client"

import { useAuthStore } from "@/lib/stores/authStore"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export const useRequireAuth = () => {
  const { isAuthenticated } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth")
    }
  }, [isAuthenticated, router])

  return isAuthenticated
}
