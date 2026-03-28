import { create } from "zustand"
import { Cart, CartState } from "@/lib/types/cart.type"
import { apiClient } from "@/lib/utils/apiClient"
import * as cartMutations from "@/lib/cart/mutations"

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

  addItem: async (eventId: number, offerId: number, quantity = 1) => {
    const result = await cartMutations.addItem({ eventId, offerId, quantity })
    if (result.ok) {
      set({ cart: result.cart })
    } else {
      throw result.error
    }
  },

  removeItem: async (itemId: number) => {
    const cart = await cartMutations.updateItem({ itemId, quantity: 0 })
    set({ cart })
  },

  updateQuantity: async (itemId: number, quantity: number) => {
    const cart = await cartMutations.updateItem({ itemId, quantity })
    set({ cart })
  },

  clearCart: async () => {
    const cart = await cartMutations.clearCart()
    set({ cart })
  },

  clearCartLocally: () => set({ cart: null }),
}))
