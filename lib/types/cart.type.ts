export interface CartItem {
  id: number
  eventId: number
  eventName: string
  eventDate: string
  location: string
  offerName: string
  numberOfTickets: number
  unitPrice: number
  totalPrice: number
}

export interface Cart {
  id: number
  items: CartItem[]
  totalAmount: number
  itemCount: number
}

export interface CartState {
  cart: Cart | null
  isLoading: boolean
  fetchCart: () => Promise<void>
}
