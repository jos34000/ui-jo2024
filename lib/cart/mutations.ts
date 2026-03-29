import { api, ApiError } from "@/lib/utils/api"
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

function toCartError(err: ApiError): CartError {
  const code: CartErrorCode =
    err.i18nKey && CART_ERROR_CODES.has(err.i18nKey)
      ? (err.i18nKey as CartErrorCode)
      : "unknown"
  return new CartError(code, err.rawMessage)
}

export async function addItem(input: AddItemInput): Promise<CartResult> {
  try {
    const cart = await api<Cart>("/cart/items", {
      method: "POST",
      body: {
        eventId: input.eventId,
        offerId: input.offerId,
        quantity: input.quantity ?? 1,
      },
    })
    return { ok: true, cart }
  } catch (err) {
    if (err instanceof ApiError) {
      return { ok: false, error: toCartError(err) }
    }
    return {
      ok: false,
      error: new CartError("networkError", "Erreur réseau"),
    }
  }
}

export async function updateItem(input: UpdateItemInput): Promise<Cart> {
  const { itemId, quantity } = input
  try {
    if (quantity === 0) {
      return await api<Cart>(`/cart/items/${itemId}`, { method: "DELETE" })
    }
    return await api<Cart>(`/cart/items/${itemId}`, {
      method: "PATCH",
      body: { quantity },
    })
  } catch (err) {
    if (err instanceof ApiError) throw toCartError(err)
    throw err
  }
}

export async function clearCart(): Promise<Cart> {
  try {
    return await api<Cart>("/cart/items", { method: "DELETE" })
  } catch (err) {
    if (err instanceof ApiError) throw toCartError(err)
    throw err
  }
}
