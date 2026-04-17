"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Euro, ShoppingCart, Ticket, TrendingUp } from "lucide-react"
import { api } from "@/lib/utils/api"
import { StatCard } from "@/app/admin/StatCard"

interface SalesByOffer {
  offerName: string
  ticketsSold: number
  revenue: number
  percentage: number
}

interface SalesByEvent {
  eventName: string
  ticketsSold: number
  revenue: number
}

interface SalesBySport {
  sport: string
  ticketsSold: number
  revenue: number
}

interface DashboardData {
  totalRevenue: number
  totalTicketsSold: number
  totalTransactions: number
  transactionsByStatus: Partial<Record<"COMPLETED" | "CANCELED" | "FAILED", number>>
  salesByOffer: SalesByOffer[]
  salesByEvent: SalesByEvent[]
  salesBySport: SalesBySport[]
}

const formatEuro = (amount: number) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(amount)

const statusConfig = {
  COMPLETED: { label: "Complétées", color: "text-[#00A651]", bg: "bg-[#00A651]/10", border: "border-[#00A651]/30" },
  CANCELED: { label: "Annulées", color: "text-[#FCB131]", bg: "bg-[#FCB131]/10", border: "border-[#FCB131]/30" },
  FAILED: { label: "Échouées", color: "text-[#EE334E]", bg: "bg-[#EE334E]/10", border: "border-[#EE334E]/30" },
} as const

const VentesPage = () => {
  const [data, setData] = useState<DashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    api<DashboardData>("/admin/dashboard")
      .then(setData)
      .catch(() => {})
      .finally(() => setIsLoading(false))
  }, [])

  const successRate = data
    ? Math.round(((data.transactionsByStatus.COMPLETED ?? 0) / data.totalTransactions) * 100)
    : 0

  const maxEventTickets = data?.salesByEvent?.[0]?.ticketsSold ?? 1
  const maxSportTickets = data?.salesBySport?.[0]?.ticketsSold ?? 1

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-mono">Ventes</h1>
        <p className="text-muted-foreground mt-1">
          Analyse des revenus et de la billetterie
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-5">
                <div className="h-16 animate-pulse bg-muted rounded-lg" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard
              label="Revenus totaux"
              value={data ? formatEuro(data.totalRevenue) : "—"}
              icon={<Euro className="h-5 w-5 text-[#0081C8]" />}
              iconWrapperClassName="bg-[#0081C8]/10"
            />
            <StatCard
              label="Billets vendus"
              value={data?.totalTicketsSold ?? "—"}
              icon={<Ticket className="h-5 w-5 text-[#00A651]" />}
              iconWrapperClassName="bg-[#00A651]/10"
            />
            <StatCard
              label="Transactions"
              value={data?.totalTransactions ?? "—"}
              icon={<ShoppingCart className="h-5 w-5 text-[#FCB131]" />}
              iconWrapperClassName="bg-[#FCB131]/10"
            />
            <StatCard
              label="Taux de succès"
              value={`${successRate}%`}
              icon={<TrendingUp className="h-5 w-5 text-[#EE334E]" />}
              iconWrapperClassName="bg-[#EE334E]/10"
              valueClassName={successRate >= 80 ? "text-[#00A651]" : "text-[#EE334E]"}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            {(["COMPLETED", "CANCELED", "FAILED"] as const).map(status => {
              const cfg = statusConfig[status]
              const count = data?.transactionsByStatus[status] ?? 0
              const pct = data ? Math.round((count / data.totalTransactions) * 100) : 0
              return (
                <Card key={status} className={`border ${cfg.border}`}>
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm font-medium text-muted-foreground">{cfg.label}</p>
                      <Badge variant="outline" className={`${cfg.color} ${cfg.border}`}>
                        {pct}%
                      </Badge>
                    </div>
                    <p className={`text-2xl font-bold font-mono ${cfg.color}`}>{count}</p>
                    <div className="mt-3 h-1.5 rounded-full bg-muted overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${cfg.bg.replace("/10", "")} ${cfg.color.replace("text-", "bg-")}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-mono">Ventes par offre</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {data?.salesByOffer.map(offer => (
                  <div key={offer.offerName}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{offer.offerName}</span>
                        <Badge variant="outline" className="text-xs">
                          {offer.ticketsSold} billet{offer.ticketsSold > 1 ? "s" : ""}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-mono font-semibold">{formatEuro(offer.revenue)}</span>
                        <span className="text-xs text-muted-foreground ml-2">{offer.percentage.toFixed(1)}%</span>
                      </div>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[#0081C8] transition-all"
                        style={{ width: `${offer.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-mono">Ventes par sport</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {data?.salesBySport.map(sport => {
                  const pct = Math.round((sport.ticketsSold / maxSportTickets) * 100)
                  return (
                    <div key={sport.sport}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-medium">{sport.sport}</span>
                        <div className="text-right">
                          <span className="text-sm font-mono font-semibold">{formatEuro(sport.revenue)}</span>
                          <span className="text-xs text-muted-foreground ml-2">{sport.ticketsSold} bil.</span>
                        </div>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full bg-[#00A651] transition-all"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-mono">Top événements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {data?.salesByEvent.map((event, index) => {
                  const pct = Math.round((event.ticketsSold / maxEventTickets) * 100)
                  return (
                    <div key={event.eventName} className="flex items-center gap-4">
                      <span className="text-xs font-mono text-muted-foreground w-5 shrink-0">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium truncate">{event.eventName}</span>
                          <div className="flex items-center gap-3 shrink-0 ml-4">
                            <span className="text-xs text-muted-foreground">
                              {event.ticketsSold} bil.
                            </span>
                            <span className="text-sm font-mono font-semibold">
                              {formatEuro(event.revenue)}
                            </span>
                          </div>
                        </div>
                        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full rounded-full bg-[#FCB131] transition-all"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}

export default VentesPage
