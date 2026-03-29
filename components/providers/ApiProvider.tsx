"use client"

import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import { configureApi } from "@/lib/utils/api"
import { getAuthStore } from "@/lib/stores/auth.store"

export function ApiProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter()

  useEffect(() => {
    configureApi({
      onRefreshFailure: () => {
        getAuthStore().logout()
        router.push("/auth")
      },
    })
  }, [router])

  return <>{children}</>
}
