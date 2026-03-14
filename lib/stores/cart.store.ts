import { create } from "zustand"
import { Cart, CartState } from "@/lib/types/cart.type"
import { apiClient } from "@/lib/utils/apiClient"

export const useCartStore = create<CartState>()(set => ({
  cart: null,
  isLoading: false,
  sidebarOpen: false,
  setSidebarOpen: open => set({ sidebarOpen: open }),

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

  addItem: async (eventId: any, offerId: any, quantity = 1) => {
    const response = await apiClient("/cart/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventId, offerId, quantity }),
    })
    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      throw new Error(error.message || "Impossible d'ajouter au panier")
    }
    const data: Cart = await response.json()
    set({ cart: data })
  },
}))
