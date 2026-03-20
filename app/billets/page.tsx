"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuthStore } from "@/lib/stores/auth.store"
import { usePaymentStore } from "@/lib/stores/payment.store"
import { TicketGroup, TicketStatus } from "@/lib/types/payment.type"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CalendarDays, MapPin, Tag, Ticket, Users } from "lucide-react"
import { formatDateWithTime, formatDatePurchase } from "@/lib/utils/date"
import { formatPrice, formatPhase } from "@/lib/utils/format"

const STATUS_CONFIG: Record<
  TicketStatus,
  {
    label: string
    variant: "default" | "secondary" | "destructive" | "outline"
  }
> = {
  VALID: { label: "Actif", variant: "default" },
  USED: { label: "Utilisé", variant: "secondary" },
  CANCELLED: { label: "Annulé", variant: "destructive" },
}


function TicketGroupCard({ group }: Readonly<{ group: TicketGroup }>) {
  const cfg = STATUS_CONFIG[group.groupStatus]

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden transition-shadow hover:shadow-md">
      <div className="h-1 bg-primary" />

      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="min-w-0">
            <p className="font-semibold text-base leading-tight truncate">
              {group.event.name}
            </p>
            <p className="text-xs text-muted-foreground font-mono mt-0.5">
              Réf. {group.paymentReference}
            </p>
          </div>
          <Badge variant={cfg.variant} className="shrink-0 text-xs">
            {cfg.label}
          </Badge>
        </div>

        <Separator className="mb-3" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <CalendarDays className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">
              {formatDateWithTime(group.event.eventDate)}
            </span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">
              {group.event.location} · {group.event.city}
            </span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Tag className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">
              {group.offer.name} · {formatPhase(group.event.phase)}
            </span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="h-3.5 w-3.5 shrink-0" />
            <span>
              {group.totalSeats} place{group.totalSeats > 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {group.barcodes.length > 1 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {group.barcodes.map(bc => (
              <span
                key={bc}
                className="font-mono text-xs bg-muted px-2 py-0.5 rounded text-muted-foreground"
              >
                {bc}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
          <span className="text-xs text-muted-foreground">
            Acheté le {formatDatePurchase(group.purchasedAt)}
          </span>
          <span className="font-mono font-bold text-sm">
            {formatPrice(group.totalPrice)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default function BilletsPage() {
  const router = useRouter()
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)
  const getUserTickets = usePaymentStore(state => state.getUserTickets)

  const [groups, setGroups] = useState<TicketGroup[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth")
      return
    }
    ;(async () => {
      try {
        const data = await getUserTickets()
        setGroups(data)
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Erreur lors du chargement",
        )
      } finally {
        setIsLoading(false)
      }
    })()
  }, [isAuthenticated, getUserTickets, router])

  const totalSeats = groups.reduce((sum, g) => sum + g.totalSeats, 0)
  const activeCount = groups.filter(g => g.groupStatus === "VALID").length
  const usedCount = groups.filter(g => g.groupStatus === "USED").length

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Retour
          </Link>
          <div className="flex items-center gap-3 mt-3">
            <Ticket className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">Mes billets</h1>
          </div>
          {!isLoading && !error && groups.length > 0 && (
            <p className="text-sm text-muted-foreground mt-1">
              {groups.length} commande{groups.length > 1 ? "s" : ""}
              {" · "}
              {totalSeats} place{totalSeats > 1 ? "s" : ""}
              {activeCount > 0 &&
                ` · ${activeCount} actif${activeCount > 1 ? "s" : ""}`}
              {usedCount > 0 &&
                ` · ${usedCount} utilisé${usedCount > 1 ? "s" : ""}`}
            </p>
          )}
        </div>

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
            <p className="font-medium">Aucun billet pour le moment</p>
            <p className="text-sm text-muted-foreground mt-1 mb-5">
              Vos billets apparaîtront ici après un achat.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Découvrir les épreuves
            </Link>
          </div>
        )}

        {!isLoading && !error && groups.length > 0 && (
          <div className="flex flex-col gap-4">
            {groups.map(group => (
              <TicketGroupCard
                key={`${group.transactionId}-${group.event.id}-${group.offer.id}`}
                group={group}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
