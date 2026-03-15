"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/lib/stores/auth.store"
import { useCartStore } from "@/lib/stores/cart.store"
import { usePaymentStore } from "@/lib/stores/payment.store"
import { useAppForm } from "@/lib/hooks/useAppForm"
import { checkoutSchema } from "@/lib/schemas/checkout.schema"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { CreditCard, Info } from "lucide-react"
import Link from "next/link"

const TEST_CARDS = [
  { number: "4242424242424242", label: "4242 4242 4242 4242", result: "Paiement accepté", success: true },
  { number: "5555555555554444", label: "5555 5555 5555 4444", result: "Accepté (Mastercard)", success: true },
  { number: "4000000000000002", label: "4000 0000 0000 0002", result: "Carte déclinée", success: false },
  { number: "4000000000009995", label: "4000 0000 0000 9995", result: "Fonds insuffisants", success: false },
  { number: "4000000000000069", label: "4000 0000 0000 0069", result: "Carte expirée", success: false },
]

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

  const checkoutForm = useAppForm({
    defaultValues: {
      cardHolder: "",
      cardNumber: "",
      expiry: "",
      cvv: "",
    },
    validators: { onSubmit: checkoutSchema },
    onSubmit: async ({ value }) => {
      const rawCard = value.cardNumber.replace(/\D/g, "")
      const [month, year] = value.expiry.split("/")
      try {
        const transaction = await checkout({
          cardNumber: rawCard,
          expiryMonth: parseInt(month, 10),
          expiryYear: 2000 + parseInt(year, 10),
          cvv: value.cvv,
          paymentMethod: "CREDIT_CARD",
        })
        router.push(`/confirmation/${transaction.id}`)
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Erreur lors du paiement")
      }
    },
  })

  useEffect(() => {
    if (!isAuthenticated) router.push("/auth")
  }, [isAuthenticated, router])

  useEffect(() => {
    if (isAuthenticated && cart !== null && cart.items.length === 0) router.push("/")
  }, [cart, isAuthenticated, router])

  if (!isAuthenticated || !cart || cart.items.length === 0) return null

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            ← Retour
          </Link>
          <h1 className="text-2xl font-bold mt-3">Finaliser la commande</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Récapitulatif commande */}
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
                      className="font-mono text-xs hover:text-primary transition-colors"
                      onClick={() => checkoutForm.setFieldValue("cardNumber", card.number)}
                    >
                      {card.label}
                    </button>
                    <span className={`text-xs ${card.success ? "text-green-600 dark:text-green-400" : "text-destructive"}`}>
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
              <div className="flex items-center gap-2 mb-5">
                <CreditCard className="h-4 w-4 text-muted-foreground" />
                <h2 className="font-semibold text-base">Carte bancaire</h2>
              </div>

              <form
                onSubmit={e => {
                  e.preventDefault()
                  e.stopPropagation()
                  checkoutForm.handleSubmit()
                }}
                className="space-y-4"
              >
                <checkoutForm.AppField name="cardHolder">
                  {field => (
                    <field.TextField
                      label="Titulaire de la carte"
                      placeholder="Jean Dupont"
                      autoComplete="cc-name"
                    />
                  )}
                </checkoutForm.AppField>

                <checkoutForm.AppField name="cardNumber">
                  {field => (
                    <field.TextField
                      label="Numéro de carte"
                      placeholder="1234567890123456"
                      autoComplete="cc-number"
                      inputMode="numeric"
                      maxLength={16}
                      icon={<CreditCard />}
                    />
                  )}
                </checkoutForm.AppField>

                <div className="grid grid-cols-2 gap-3">
                  <checkoutForm.AppField name="expiry">
                    {field => <field.ExpiryField />}
                  </checkoutForm.AppField>

                  <checkoutForm.AppField name="cvv">
                    {field => <field.CvvField />}
                  </checkoutForm.AppField>
                </div>

                <Separator />

                <div className="flex items-center justify-between text-sm text-muted-foreground mb-1">
                  <span>Total à payer</span>
                  <span className="font-bold font-mono text-foreground text-base">
                    {formatPrice(cart.totalPrice)}
                  </span>
                </div>

                <checkoutForm.AppForm>
                  <checkoutForm.SubmitButton className="w-full" size="lg" disabled={isProcessing}>
                    {isProcessing ? "Traitement en cours…" : `Payer ${formatPrice(cart.totalPrice)}`}
                  </checkoutForm.SubmitButton>
                </checkoutForm.AppForm>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
