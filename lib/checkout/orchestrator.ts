import { useAuthStore } from "@/lib/stores/auth.store"
import { useCartStore } from "@/lib/stores/cart.store"
import { api } from "@/lib/utils/api"
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

  const transaction = await api<TransactionResponse>("/checkout", {
    method: "POST",
    body: data,
  })

  // Await the cart refresh — fixes the fire-and-forget bug
  await useCartStore.getState().fetchCart().catch(() => {
    // Cart refresh failure is non-fatal — checkout already succeeded
  })

  return { transactionId: transaction.id }
}

async function confirmCheckout(transactionId: number): Promise<ConfirmationResult> {
  const transaction = await api<TransactionResponse>(`/checkout/${transactionId}`)

  // Clear cart locally — no network call needed, no setState surgery
  useCartStore.getState().clearCartLocally()

  return { transaction }
}

export const checkoutOrchestrator = { submitCheckout, confirmCheckout }
