"use client"

import { useState } from "react"
import { useAuthStore } from "@/lib/stores/auth.store"
import { useCartStore } from "@/lib/stores/cart.store"
import { checkoutOrchestrator, CheckoutResult, ConfirmationResult } from "./orchestrator"
import { CheckoutRequest } from "@/lib/types/payment.type"
import { Cart } from "@/lib/types/cart.type"

export interface UseCheckoutOrchestratorResult {
  canCheckout: boolean
  isProcessing: boolean
  cart: Cart | null
  submitCheckout: (data: CheckoutRequest) => Promise<CheckoutResult>
  confirmCheckout: (transactionId: number) => Promise<ConfirmationResult>
}

export function useCheckoutOrchestrator(): UseCheckoutOrchestratorResult {
  const [isProcessing, setIsProcessing] = useState(false)
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)
  const cart = useCartStore(state => state.cart)

  const canCheckout =
    isAuthenticated && cart !== null && cart.items.length > 0

  const submitCheckout = async (data: CheckoutRequest): Promise<CheckoutResult> => {
    setIsProcessing(true)
    try {
      return await checkoutOrchestrator.submitCheckout(data)
    } finally {
      setIsProcessing(false)
    }
  }

  const confirmCheckout = async (transactionId: number): Promise<ConfirmationResult> => {
    return checkoutOrchestrator.confirmCheckout(transactionId)
  }

  return { canCheckout, isProcessing, cart, submitCheckout, confirmCheckout }
}
