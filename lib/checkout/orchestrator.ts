import { useAuthStore } from "@/lib/stores/auth.store"
import { useCartStore } from "@/lib/stores/cart.store"
import { apiClient } from "@/lib/utils/apiClient"
import { CheckoutRequest, TransactionResponse } from "@/lib/types/payment.type"

export interface CheckoutResult {
  transactionId: number
}

export interface ConfirmationResult {
  transaction: TransactionResponse
}

async function submitCheckout(data: CheckoutRequest): Promise<CheckoutResult> {
  const { isAuthenticated } = useAuthStore.getState()
  if (!isAuthenticated) throw new Error("Not authenticated")

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

  // Await the cart refresh — fixes the fire-and-forget bug
  await useCartStore.getState().fetchCart().catch(() => {
    // Cart refresh failure is non-fatal — checkout already succeeded
  })

  return { transactionId: transaction.id }
}

async function confirmCheckout(transactionId: number): Promise<ConfirmationResult> {
  const response = await apiClient(`/checkout/${transactionId}`)

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.message || "Transaction introuvable")
  }

  const transaction: TransactionResponse = await response.json()

  // Clear cart locally — no network call needed, no setState surgery
  useCartStore.getState().clearCartLocally()

  return { transaction }
}

export const checkoutOrchestrator = { submitCheckout, confirmCheckout }
