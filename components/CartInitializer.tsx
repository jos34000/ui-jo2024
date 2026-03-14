"use client"

import { useEffect } from "react"
import { useAuthStore } from "@/lib/stores/auth.store"
import { useCartStore } from "@/lib/stores/cart.store"

export const CartInitializer = () => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)
  const fetchCart = useCartStore(state => state.fetchCart)

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart()
    }
  }, [isAuthenticated, fetchCart])

  return null
}
