import { create } from "zustand"
import { CheckoutRequest, PaymentState, TicketGroup, TransactionResponse } from "@/lib/types/payment.type"
import { apiClient } from "@/lib/utils/apiClient"
import { useCartStore } from "@/lib/stores/cart.store"

export const usePaymentStore = create<PaymentState>()(set => ({
  isProcessing: false,

  checkout: async (data: CheckoutRequest): Promise<TransactionResponse> => {
    set({ isProcessing: true })
    try {
      const response = await apiClient("/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        const error = await response.json().catch(() => ({}))
        throw new Error(error.message || "Erreur lors du paiement")
      }
      const transaction: TransactionResponse = await response.json()
      useCartStore.getState().fetchCart()
      return transaction
    } finally {
      set({ isProcessing: false })
    }
  },

  getTransaction: async (transactionId: number): Promise<TransactionResponse> => {
    const response = await apiClient(`/checkout/${transactionId}`)
    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      throw new Error(error.message || "Transaction introuvable")
    }
    return response.json()
  },

  getUserTickets: async (): Promise<TicketGroup[]> => {
    const response = await apiClient("/checkout/tickets")
    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      throw new Error(error.message || "Impossible de récupérer vos billets")
    }
    return response.json()
  },
}))
