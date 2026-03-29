import { create } from "zustand"
import { PaymentState, TicketGroup, TransactionResponse } from "@/lib/types/payment.type"
import { api } from "@/lib/utils/api"

export const usePaymentStore = create<PaymentState>()(() => ({
  getTransaction: async (transactionId: number): Promise<TransactionResponse> => {
    return api<TransactionResponse>(`/checkout/${transactionId}`)
  },

  getUserTickets: async (): Promise<TicketGroup[]> => {
    return api<TicketGroup[]>("/checkout/tickets")
  },

  downloadTicketPdf: async (transactionId: number): Promise<void> => {
    const response = await api(`/checkout/${transactionId}/pdf`, { raw: true })
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
