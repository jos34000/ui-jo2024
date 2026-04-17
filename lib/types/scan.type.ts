export interface ScanRequest {
  combinedKey: string
}

export type ScanOutcome = "SUCCESS" | "ALREADY_USED" | "INVALID" | "CANCELLED"

export interface ScanEventSummary {
  name: string
  eventDate: string
  location: string
  city: string
  phase: string
}

export interface ScanOfferSummary {
  name: string
  numberOfTickets: number
}

export interface ScanResponse {
  outcome: ScanOutcome
  holderFirstName: string
  holderLastName: string
  holderEmail: string
  status: string
  scannedAt: string
  scannedBy: string
  event: ScanEventSummary
  offer: ScanOfferSummary
}
