import { api } from "@/lib/utils/api"
import { ScanRequest, ScanResponse } from "@/lib/types/scan.type"

export async function scanTicket(req: ScanRequest): Promise<ScanResponse> {
  return api<ScanResponse>("/tickets/scan", {
    method: "POST",
    body: req,
  })
}
