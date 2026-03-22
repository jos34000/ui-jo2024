"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useAuthStore } from "@/lib/stores/auth.store"
import { useCartStore } from "@/lib/stores/cart.store"
import { usePaymentStore } from "@/lib/stores/payment.store"
import { TransactionResponse } from "@/lib/types/payment.type"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CheckCircle2, Loader2, Mail, Ticket } from "lucide-react"
import Link from "next/link"
import { useTranslations } from "next-intl"

function formatPrice(amount: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(amount)
}

function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateStr))
}

export default function ConfirmationPage() {
  const params = useParams()
  const router = useRouter()
  const t = useTranslations("confirmation")
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)
  const setCart = useCartStore(state => state.fetchCart)
  const { getTransaction } = usePaymentStore()

  const [transaction, setTransaction] = useState<TransactionResponse | null>(
    null,
  )
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth")
      return
    }

    const transactionId = Number(params.transactionId)
    if (Number.isNaN(transactionId)) {
      router.push("/")
      return
    }

    getTransaction(transactionId)
      .then(data => {
        setTransaction(data)
        useCartStore.setState({ cart: null })
      })
      .catch(err => {
        setError(err instanceof Error ? err.message : t("error"))
      })
      .finally(() => setIsLoading(false))
  }, [
    isAuthenticated,
    params.transactionId,
    router,
    getTransaction,
    setCart,
    t,
  ])

  if (!isAuthenticated) return null

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </main>
    )
  }

  if (error || !transaction) {
    return (
      <main className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">{error ?? t("notFound")}</p>
        <Button asChild variant="outline">
          <Link href="/">{t("backHome")}</Link>
        </Button>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-4 mb-4">
            <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-2xl font-bold">{t("title")}</h1>
          <p className="text-muted-foreground mt-1 text-sm">{t("subtitle")}</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-5 mb-5">
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t("reference")}</span>
              <span className="font-mono font-medium">
                {transaction.paymentReference}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t("date")}</span>
              <span>
                {transaction.payedDate
                  ? formatDate(transaction.payedDate)
                  : "—"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t("amount")}</span>
              <span className="font-bold font-mono text-base">
                {formatPrice(transaction.amount)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                {t("ticketsGenerated")}
              </span>
              <span>
                {t("ticketsCount", { count: transaction.tickets.length })}
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-5 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Ticket className="h-4 w-4 text-muted-foreground" />
            <h2 className="font-semibold text-sm">{t("yourTickets")}</h2>
          </div>
          <div className="flex flex-col gap-3">
            {transaction.tickets.map((ticket, index) => (
              <div key={ticket.id}>
                {index > 0 && <Separator className="mb-3" />}
                <div className="flex items-start justify-between gap-3 text-sm">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{ticket.event.name}</p>
                    <p className="text-muted-foreground text-xs mt-0.5">
                      {ticket.offer.name} · {ticket.event.city}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {formatDate(ticket.event.eventDate)}
                    </p>
                    <p className="font-mono text-xs text-muted-foreground mt-1">
                      {ticket.barcode}
                    </p>
                  </div>
                  <span className="font-mono shrink-0 text-xs pt-0.5">
                    {formatPrice(ticket.price)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
            <Mail className="h-4 w-4 shrink-0 text-primary" />
            <span>{t("emailSent")}</span>
          </div>
          <Button asChild size="lg" className="w-full">
            <Link href="/">{t("backHome")}</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
