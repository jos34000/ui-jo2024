export interface CartEventSummary {
  id: number
  name: string
  eventDate: string
  location: string
  city: string
  phase: string
}

export interface CartOfferSummary {
  id: number
  name: string
  numberOfTickets: number
  price: number
}

export interface CartItemResponse {
  id: number
  quantity: number
  unitPrice: number
  subtotal: number
  event: CartEventSummary
  offer: CartOfferSummary
}

export interface Cart {
  id: number
  status: "ACTIVE" | "ABANDONED" | "CONVERTED"
  expiresAt: string
  totalPrice: number
  totalTickets: number
  items: CartItemResponse[]
}

export interface CartState {
  cart: Cart | null
  isLoading: boolean
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  fetchCart: () => Promise<void>
  addItem: (eventId: number, offerId: number, quantity?: number) => Promise<void>
}
