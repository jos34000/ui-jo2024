import { create } from "zustand"
import { PaymentState, TicketGroup, TransactionResponse } from "@/lib/types/payment.type"
import { apiClient } from "@/lib/utils/apiClient"

export const usePaymentStore = create<PaymentState>()(() => ({
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

  downloadTicketPdf: async (transactionId: number): Promise<void> => {
    const response = await apiClient(`/checkout/${transactionId}/pdf`)
    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      throw new Error(error.message || "Impossible de télécharger le PDF")
    }
    const blob = await response.blob()
    if (typeof window === "undefined") return
    const url = window.URL.createObjectURL(blob)
    const a = window.document.createElement("a")
    a.href = url
    a.download = `billets-${transactionId}.pdf`
    window.document.body.appendChild(a)
    a.click()
    window.document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  },
}))
