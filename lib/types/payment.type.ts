export type PaymentMethod = "CREDIT_CARD" | "BANK_TRANSFER"

export interface CheckoutRequest {
  cardNumber: string
  expiryMonth: number
  expiryYear: number
  cvv: string
  paymentMethod: PaymentMethod
}

export interface TicketEventSummary {
  id: number
  name: string
  eventDate: string
  location: string
  city: string
  phase: string
}

export interface TicketOfferSummary {
  id: number
  name: string
  numberOfTickets: number
  price: number
}

export interface TicketResponse {
  id: number
  ticketKey: string
  barcode: string
  price: number
  event: TicketEventSummary
  offer: TicketOfferSummary
}

export interface TransactionResponse {
  id: number
  transactionKey: string
  status: "COMPLETED" | "FAILED"
  amount: number
  paymentReference: string
  payedDate: string
  tickets: TicketResponse[]
}

export interface PaymentState {
  isProcessing: boolean
  checkout: (data: CheckoutRequest) => Promise<TransactionResponse>
  getTransaction: (transactionId: number) => Promise<TransactionResponse>
}
