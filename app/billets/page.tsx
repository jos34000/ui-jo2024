"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePaymentStore } from "@/lib/stores/payment.store"
import { TicketGroup } from "@/lib/types/payment.type"
import { Ticket } from "lucide-react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { useTranslations } from "next-intl"
import { TicketGroupCard } from "@/app/billets/TicketGroupCard"

export default function BilletsPage() {
  const t = useTranslations("tickets")
  const getUserTickets = usePaymentStore(state => state.getUserTickets)
  const downloadTicketPdf = usePaymentStore(state => state.downloadTicketPdf)

  const [groups, setGroups] = useState<TicketGroup[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    ;(async () => {
      try {
        const data = await getUserTickets()
        setGroups(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : t("loadingError"))
      } finally {
        setIsLoading(false)
      }
    })()
  }, [getUserTickets, t])

  const totalSeats = groups.reduce((sum, g) => sum + g.totalSeats, 0)
  const activeCount = groups.filter(g => g.groupStatus === "VALID").length
  const usedCount = groups.filter(g => g.groupStatus === "USED").length

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <div className="bg-card border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-8 sm:py-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 shrink-0">
              <Ticket className="h-5 w-5 text-primary" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight font-mono">{t("title")}</h1>
          </div>
          {!isLoading && !error && groups.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 ml-13">
              <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider border border-border/40 bg-muted text-muted-foreground">
                {t("ordersCount", { count: groups.length })}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider border border-border/40 bg-muted text-muted-foreground">
                {t("seatsCount", { count: totalSeats })}
              </span>
              {activeCount > 0 && (
                <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider" style={{ color: "#00A651", backgroundColor: "#00A65114", border: "1px solid #00A65130" }}>
                  <span className="w-1.5 h-1.5 rounded-full block bg-[#00A651]" />
                  {t("activeCount", { count: activeCount })}
                </span>
              )}
              {usedCount > 0 && (
                <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider border border-border/40 bg-muted text-muted-foreground">
                  {t("usedCount", { count: usedCount })}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {isLoading && (
            <div className="flex flex-col gap-4">
              {[1, 2, 3].map(i => (
                <div
                  key={i}
                  className="h-44 rounded-2xl border border-border/40 bg-muted/30 animate-pulse"
                />
              ))}
            </div>
          )}

          {error && !isLoading && (
            <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6 text-center">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {!isLoading && !error && groups.length === 0 && (
            <div className="relative overflow-hidden rounded-2xl border border-border/40 bg-card p-12 text-center shadow-sm">
              <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl bg-border" />
              <Ticket className="h-10 w-10 text-muted-foreground/40 mx-auto mb-3" />
              <p className="font-semibold">{t("noTickets")}</p>
              <p className="text-sm text-muted-foreground mt-1 mb-6">{t("noTicketsSubtitle")}</p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                {t("discover")}
              </Link>
            </div>
          )}

          {!isLoading && !error && groups.length > 0 && (
            <div className="flex flex-col gap-4">
              {groups.map(group => (
                <TicketGroupCard
                  key={`${group.transactionId}-${group.event.id}-${group.offer.id}`}
                  group={group}
                  onDownload={() => downloadTicketPdf(group.transactionId)}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
