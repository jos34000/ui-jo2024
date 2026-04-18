"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useCheckoutOrchestrator } from "@/lib/checkout/useCheckoutOrchestrator"
import { TransactionResponse } from "@/lib/types/payment.type"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Loader2, Mail, Ticket } from "lucide-react"
import Link from "next/link"
import { formatDateWithTime } from "@/lib/utils/date"
import { formatPrice } from "@/lib/utils/format"
import { useTranslations } from "next-intl"

export default function ConfirmationPage() {
  const params = useParams()
  const router = useRouter()
  const t = useTranslations("confirmation")
  const { confirmCheckout } = useCheckoutOrchestrator()

  const [transaction, setTransaction] = useState<TransactionResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const transactionId = Number(params.transactionId)
    if (Number.isNaN(transactionId)) {
      router.push("/")
      return
    }

    confirmCheckout(transactionId)
      .then(({ transaction }) => {
        setTransaction(transaction)
      })
      .catch(err => {
        setError(err instanceof Error ? err.message : t("error"))
      })
      .finally(() => setIsLoading(false))
  }, [params.transactionId, router, confirmCheckout, t])

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
        <Button asChild variant="outline" className="rounded-full">
          <Link href="/">{t("backHome")}</Link>
        </Button>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-12">

        {/* Success header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#00A651]/10 mb-4">
            <CheckCircle2 className="h-10 w-10 text-[#00A651]" />
          </div>
          <h1 className="text-2xl font-bold font-mono">{t("title")}</h1>
          <p className="text-muted-foreground mt-1 text-sm">{t("subtitle")}</p>
        </div>

        {/* Transaction summary */}
        <article className="relative overflow-hidden rounded-2xl border border-border/40 bg-card shadow-sm mb-4">
          <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl bg-[#00A651]" />
          <div className="px-5 pt-6 pb-4 flex flex-col gap-2.5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                {t("reference")}
              </span>
              <span className="font-mono font-semibold">{transaction.paymentReference}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                {t("date")}
              </span>
              <span className="text-sm">
                {transaction.payedDate ? formatDateWithTime(transaction.payedDate) : "—"}
              </span>
            </div>
            <div className="border-t-2 border-dashed border-border/30 my-1" />
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                {t("amount")}
              </span>
              <span className="font-black font-mono text-lg" style={{ color: "#00A651" }}>
                {formatPrice(transaction.amount)}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                {t("ticketsGenerated")}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider border border-border/40 bg-muted text-muted-foreground font-mono">
                {t("ticketsCount", { count: transaction.tickets.length })}
              </span>
            </div>
          </div>
        </article>

        {/* Ticket list */}
        <article className="relative overflow-hidden rounded-2xl border border-border/40 bg-card shadow-sm mb-4">
          <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl bg-primary/40" />
          <div className="px-5 pt-6 pb-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10">
                <Ticket className="h-3.5 w-3.5 text-primary" />
              </div>
              <h2 className="text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                {t("yourTickets")}
              </h2>
            </div>
            <div className="flex flex-col gap-3">
              {transaction.tickets.map((ticket, index) => (
                <div key={ticket.id}>
                  {index > 0 && <div className="border-t-2 border-dashed border-border/30 mb-3" />}
                  <div className="relative overflow-hidden flex items-start justify-between gap-3 rounded-xl border border-border/30 bg-background/50 px-3 py-2.5">
                    <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-xl bg-primary/40" />
                    <div className="flex-1 min-w-0 pl-1">
                      <p className="text-sm font-semibold truncate">{ticket.event.name}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        {ticket.offer.name} · {ticket.event.city}
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        {formatDateWithTime(ticket.event.eventDate)}
                      </p>
                      <p className="font-mono text-[10px] text-muted-foreground mt-1 tracking-wider">
                        {ticket.barcode}
                      </p>
                    </div>
                    <span className="font-black font-mono text-sm shrink-0">
                      {formatPrice(ticket.price)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </article>

        {/* Email notice + CTA */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3 rounded-2xl border border-border/40 bg-card px-4 py-3 text-sm text-muted-foreground">
            <Mail className="h-4 w-4 shrink-0 text-primary" />
            <span>{t("emailSent")}</span>
          </div>
          <Button asChild size="lg" className="w-full rounded-full">
            <Link href="/">{t("backHome")}</Link>
          </Button>
        </div>

      </div>
    </main>
  )
}
