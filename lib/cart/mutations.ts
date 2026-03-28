import { apiClient } from "@/lib/utils/apiClient"
import { resolveBackendErrorKey } from "@/lib/utils/apiErrors"
import { Cart } from "@/lib/types/cart.type"

export type CartErrorCode =
  | "cartExpired"
  | "cartNotActive"
  | "cartAlreadyPaid"
  | "cartEmpty"
  | "itemNotFound"
  | "eventSoldOut"
  | "offerNotFound"
  | "networkError"
  | "unknown"

export class CartError extends Error {
  constructor(
    public readonly code: CartErrorCode,
    public readonly rawMessage: string,
  ) {
    super(rawMessage)
    this.name = "CartError"
  }
}

export type CartResult = { ok: true; cart: Cart } | { ok: false; error: CartError }

export interface AddItemInput {
  eventId: number
  offerId: number
  quantity?: number
}

export interface UpdateItemInput {
  itemId: number
  quantity: number
}

const CART_ERROR_CODES = new Set<string>([
  "cartExpired",
  "cartNotActive",
  "cartAlreadyPaid",
  "cartEmpty",
  "itemNotFound",
  "eventSoldOut",
  "offerNotFound",
])

async function parseCartFailure(response: Response): Promise<CartError> {
  let rawMessage = "Une erreur est survenue"
  try {
    const body = await response.json()
    rawMessage =
      body.message ??
      (Object.values(body).find(v => typeof v === "string") as string | undefined) ??
      rawMessage
  } catch {
    // non-JSON body — keep default message
  }
  const i18nKey = resolveBackendErrorKey(rawMessage)
  const code: CartErrorCode =
    i18nKey && CART_ERROR_CODES.has(i18nKey)
      ? (i18nKey as CartErrorCode)
      : "unknown"
  return new CartError(code, rawMessage)
}

export async function addItem(input: AddItemInput): Promise<CartResult> {
  try {
    const response = await apiClient("/cart/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventId: input.eventId,
        offerId: input.offerId,
        quantity: input.quantity ?? 1,
      }),
    })
    if (!response.ok) {
      const error = await parseCartFailure(response)
      return { ok: false, error }
    }
    const cart: Cart = await response.json()
    return { ok: true, cart }
  } catch {
    return {
      ok: false,
      error: new CartError("networkError", "Erreur réseau"),
    }
  }
}

export async function updateItem(input: UpdateItemInput): Promise<Cart> {
  const { itemId, quantity } = input
  const response =
    quantity === 0
      ? await apiClient(`/cart/items/${itemId}`, { method: "DELETE" })
      : await apiClient(`/cart/items/${itemId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantity }),
        })

  if (!response.ok) {
    throw await parseCartFailure(response)
  }
  return response.json()
}

export async function clearCart(): Promise<Cart> {
  const response = await apiClient("/cart/items", { method: "DELETE" })
  if (!response.ok) {
    throw await parseCartFailure(response)
  }
  return response.json()
}
