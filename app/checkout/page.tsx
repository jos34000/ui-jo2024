"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/lib/stores/auth.store"
import { useCartStore } from "@/lib/stores/cart.store"
import { usePaymentStore } from "@/lib/stores/payment.store"
import { PaymentMethod } from "@/lib/types/payment.type"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { CreditCard, Info, Loader2, ShieldCheck } from "lucide-react"
import Link from "next/link"

const TEST_CARDS = [
  { number: "4242 4242 4242 4242", result: "Paiement accepté", success: true },
  { number: "5555 5555 5555 4444", result: "Paiement accepté (Mastercard)", success: true },
  { number: "4000 0000 0000 0002", result: "Carte déclinée", success: false },
  { number: "4000 0000 0000 9995", result: "Fonds insuffisants", success: false },
  { number: "4000 0000 0000 0069", result: "Carte expirée", success: false },
]

function formatCardNumber(value: string) {
  return value
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim()
}

function formatExpiry(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 4)
  if (digits.length >= 3) return digits.slice(0, 2) + "/" + digits.slice(2)
  return digits
}

function formatPrice(amount: number): string {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(amount)
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

export default function CheckoutPage() {
  const router = useRouter()
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)
  const cart = useCartStore(state => state.cart)
  const { isProcessing, checkout } = usePaymentStore()

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("CREDIT_CARD")
  const [cardNumber, setCardNumber] = useState("")
  const [expiry, setExpiry] = useState("")
  const [cvv, setCvv] = useState("")
  const [cardHolder, setCardHolder] = useState("")

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth")
    }
  }, [isAuthenticated, router])

  useEffect(() => {
    if (isAuthenticated && cart !== null && cart.items.length === 0) {
      router.push("/")
    }
  }, [cart, isAuthenticated, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const rawNumber = cardNumber.replace(/\s/g, "")

    if (paymentMethod !== "PAYPAL" && rawNumber.length < 16) {
      toast.error("Numéro de carte invalide")
      return
    }

    const [month, year] = expiry.split("/")
    const expiryMonth = parseInt(month ?? "0", 10)
    const expiryYear = parseInt("20" + (year ?? "0"), 10)

    try {
      const transaction = await checkout({
        cardNumber: rawNumber,
        expiryMonth,
        expiryYear,
        cvv: paymentMethod === "PAYPAL" ? "000" : cvv,
        paymentMethod,
      })
      router.push(`/confirmation/${transaction.id}`)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erreur lors du paiement")
    }
  }

  if (!isAuthenticated || !cart || cart.items.length === 0) {
    return null
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Retour
          </Link>
          <h1 className="text-2xl font-bold mt-3">Finaliser la commande</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Récapitulatif */}
          <div className="order-2 lg:order-1">
            <div className="rounded-xl border border-border bg-card p-5">
              <h2 className="font-semibold text-base mb-4">Récapitulatif</h2>
              <div className="flex flex-col gap-3">
                {cart.items.map(item => (
                  <div key={item.id} className="flex items-start justify-between gap-3 text-sm">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{item.event.name}</p>
                      <p className="text-muted-foreground text-xs mt-0.5">
                        {item.offer.name} · {item.quantity}×
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {formatDate(item.event.eventDate)} · {item.event.city}
                      </p>
                    </div>
                    <span className="font-mono shrink-0">{formatPrice(item.subtotal)}</span>
                  </div>
                ))}
              </div>
              <Separator className="my-4" />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Total ({cart.totalTickets} billet{cart.totalTickets > 1 ? "s" : ""})
                </span>
                <span className="font-bold font-mono text-lg">{formatPrice(cart.totalPrice)}</span>
              </div>
            </div>

            {/* Cartes de test */}
            <div className="mt-4 rounded-xl border border-border bg-muted/40 p-4">
              <div className="flex items-center gap-2 mb-3">
                <Info className="h-4 w-4 text-muted-foreground shrink-0" />
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Environnement de test
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                {TEST_CARDS.map(card => (
                  <div key={card.number} className="flex items-center justify-between gap-3">
                    <button
                      type="button"
                      className="font-mono text-xs text-foreground hover:text-primary transition-colors"
                      onClick={() => setCardNumber(card.number)}
                    >
                      {card.number}
                    </button>
                    <span
                      className={`text-xs ${card.success ? "text-green-600 dark:text-green-400" : "text-destructive"}`}
                    >
                      {card.result}
                    </span>
                  </div>
                ))}
                <p className="text-xs text-muted-foreground mt-1">
                  Cliquez sur un numéro pour le copier dans le formulaire.
                </p>
              </div>
            </div>
          </div>

          {/* Formulaire paiement */}
          <div className="order-1 lg:order-2">
            <div className="rounded-xl border border-border bg-card p-5">
              <h2 className="font-semibold text-base mb-4">Paiement</h2>

              {/* Sélecteur méthode */}
              <div className="flex gap-2 mb-5">
                {(["CREDIT_CARD", "DEBIT_CARD", "PAYPAL"] as PaymentMethod[]).map(method => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setPaymentMethod(method)}
                    className={`flex-1 py-2 px-3 rounded-lg border text-xs font-medium transition-colors ${
                      paymentMethod === method
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground hover:border-foreground/40"
                    }`}
                  >
                    {method === "CREDIT_CARD"
                      ? "Carte crédit"
                      : method === "DEBIT_CARD"
                        ? "Carte débit"
                        : "PayPal"}
                  </button>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {paymentMethod !== "PAYPAL" ? (
                  <>
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="cardHolder">Titulaire de la carte</Label>
                      <Input
                        id="cardHolder"
                        placeholder="Jean Dupont"
                        value={cardHolder}
                        onChange={e => setCardHolder(e.target.value)}
                        required
                        autoComplete="cc-name"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="cardNumber">Numéro de carte</Label>
                      <div className="relative">
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={cardNumber}
                          onChange={e => setCardNumber(formatCardNumber(e.target.value))}
                          required
                          autoComplete="cc-number"
                          inputMode="numeric"
                          className="pr-10"
                        />
                        <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1.5">
                        <Label htmlFor="expiry">Date d&apos;expiration</Label>
                        <Input
                          id="expiry"
                          placeholder="MM/AA"
                          value={expiry}
                          onChange={e => setExpiry(formatExpiry(e.target.value))}
                          required
                          autoComplete="cc-exp"
                          inputMode="numeric"
                          maxLength={5}
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          value={cvv}
                          onChange={e => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                          required
                          autoComplete="cc-csc"
                          inputMode="numeric"
                          maxLength={4}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 gap-2 text-muted-foreground">
                    <p className="text-sm">Vous serez redirigé vers PayPal pour finaliser le paiement.</p>
                    <Badge variant="secondary" className="font-mono text-xs mt-1">
                      Mode test — aucun vrai paiement
                    </Badge>
                  </div>
                )}

                <Separator />

                <div className="flex items-center justify-between text-sm text-muted-foreground mb-1">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4" />
                    <span>Paiement sécurisé (simulé)</span>
                  </div>
                  <span className="font-bold font-mono text-foreground text-base">
                    {formatPrice(cart.totalPrice)}
                  </span>
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={isProcessing}>
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Traitement en cours…
                    </>
                  ) : (
                    `Payer ${formatPrice(cart.totalPrice)}`
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
