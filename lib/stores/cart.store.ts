import { create } from "zustand"
import { Cart, CartState } from "@/lib/types/cart.type"
import { apiClient } from "@/lib/utils/apiClient"

export const useCartStore = create<CartState>()(set => ({
  cart: null,
  isLoading: false,

  fetchCart: async () => {
    set({ isLoading: true })
    try {
      const response = await apiClient("/cart")
      if (response.ok) {
        const data: Cart = await response.json()
        set({ cart: data })
      } else {
        set({ cart: null })
      }
    } catch {
      set({ cart: null })
    } finally {
      set({ isLoading: false })
    }
  },
}))
