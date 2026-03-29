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
      } catch (err: any) {
        setError(err.message ?? t("loadingError"))
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
          <div className="flex items-center gap-3 mb-1">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 shrink-0">
              <Ticket className="h-5 w-5 text-primary" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">{t("title")}</h1>
          </div>
          {!isLoading && !error && (
            <p className="text-sm text-muted-foreground ml-13">
              {groups.length === 0 ? (
                t("noOrders")
              ) : (
                <>
                  {t("ordersCount", { count: groups.length })}
                  {" · "}
                  {t("seatsCount", { count: totalSeats })}
                  {activeCount > 0 && (
                    <>
                      {" "}
                      ·{" "}
                      <span className="text-green-600 dark:text-green-400 font-medium">
                        {t("activeCount", { count: activeCount })}
                      </span>
                    </>
                  )}
                  {usedCount > 0 && (
                    <> · {t("usedCount", { count: usedCount })}</>
                  )}
                </>
              )}
            </p>
          )}
        </div>
      </div>

      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {isLoading && (
            <div className="flex flex-col gap-3">
              {[1, 2, 3].map(i => (
                <div
                  key={i}
                  className="h-44 rounded-xl border border-border bg-muted/30 animate-pulse"
                />
              ))}
            </div>
          )}

          {error && !isLoading && (
            <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-6 text-center">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {!isLoading && !error && groups.length === 0 && (
            <div className="rounded-xl border border-border bg-card p-12 text-center">
              <Ticket className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
              <p className="font-medium">{t("noTickets")}</p>
              <p className="text-sm text-muted-foreground mt-1 mb-5">
                {t("noTicketsSubtitle")}
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
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
