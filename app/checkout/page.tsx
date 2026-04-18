"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useCheckoutOrchestrator } from "@/lib/checkout/useCheckoutOrchestrator"
import { useAppForm } from "@/lib/hooks/useAppForm"
import { checkoutSchema } from "@/lib/schemas/checkout.schema"
import { toast } from "sonner"
import { CreditCard, Info } from "lucide-react"
import Link from "next/link"
import { formatDateWithTime } from "@/lib/utils/date"
import { formatPrice } from "@/lib/utils/format"
import { useTranslations } from "next-intl"

export default function CheckoutPage() {
  const router = useRouter()
  const t = useTranslations("checkout")
  const { canCheckout, isProcessing, cart, submitCheckout } = useCheckoutOrchestrator()

  const TEST_CARDS = [
    {
      number: "4242424242424242",
      label: "4242 4242 4242 4242",
      result: t("testCards.accepted"),
      success: true,
    },
    {
      number: "5555555555554444",
      label: "5555 5555 5555 4444",
      result: t("testCards.mastercard"),
      success: true,
    },
    {
      number: "4000000000000002",
      label: "4000 0000 0000 0002",
      result: t("testCards.declined"),
      success: false,
    },
    {
      number: "4000000000009995",
      label: "4000 0000 0000 9995",
      result: t("testCards.insufficientFunds"),
      success: false,
    },
    {
      number: "4000000000000069",
      label: "4000 0000 0000 0069",
      result: t("testCards.expired"),
      success: false,
    },
  ]

  const checkoutForm = useAppForm({
    defaultValues: {
      cardHolder: "",
      cardNumber: "",
      expiry: "",
      cvv: "",
    },
    validators: { onSubmit: checkoutSchema },
    onSubmit: async ({ value }) => {
      const rawCard = value.cardNumber.replaceAll(/\D/g, "")
      const [month, year] = value.expiry.split("/")
      try {
        const result = await submitCheckout({
          cardNumber: rawCard,
          expiryMonth: Number.parseInt(month, 10),
          expiryYear: 2000 + Number.parseInt(year, 10),
          cvv: value.cvv,
          paymentMethod: "CREDIT_CARD",
        })
        router.push(`/confirmation/${result.transactionId}`)
      } catch (err) {
        toast.error(err instanceof Error ? err.message : t("paymentError"))
      }
    },
  })

  useEffect(() => {
    if (cart !== null && cart.items.length === 0) router.push("/")
  }, [cart, router])

  if (!canCheckout || !cart) return null

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {t("back")}
          </Link>
          <h1 className="text-2xl font-bold mt-3">{t("title")}</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Order summary */}
          <div className="order-2 lg:order-1 space-y-4">
            <article className="relative overflow-hidden rounded-2xl border border-border/40 bg-card shadow-sm">
              <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl bg-primary/40" />
              <div className="px-5 pt-6 pb-4">
                <h2 className="text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground mb-4">
                  {t("summary")}
                </h2>
                <div className="flex flex-col gap-3">
                  {cart.items.map(item => (
                    <div
                      key={item.id}
                      className="relative overflow-hidden flex items-start justify-between gap-3 rounded-xl border border-border/30 bg-background/50 px-3 py-2.5"
                    >
                      <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-xl bg-primary/40" />
                      <div className="flex-1 min-w-0 pl-1">
                        <p className="text-sm font-semibold truncate">{item.event.name}</p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">
                          {item.offer.name} · {item.quantity}×
                        </p>
                        <p className="text-[11px] text-muted-foreground">
                          {formatDateWithTime(item.event.eventDate)} · {item.event.city}
                        </p>
                      </div>
                      <span className="font-black font-mono text-sm shrink-0">
                        {formatPrice(item.subtotal)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t-2 border-dashed border-border/30 my-4" />
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                    {t("totalTickets", { count: cart.totalTickets })}
                  </span>
                  <span className="font-black font-mono text-lg">
                    {formatPrice(cart.totalPrice)}
                  </span>
                </div>
              </div>
            </article>

            <article className="relative overflow-hidden rounded-2xl border border-border/40 bg-card shadow-sm">
              <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl bg-muted-foreground/30" />
              <div className="px-5 pt-6 pb-4">
                <div className="flex items-center gap-2 mb-3">
                  <Info className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                    {t("testEnv")}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  {TEST_CARDS.map(card => (
                    <div key={card.number} className="flex items-center justify-between gap-3">
                      <button
                        type="button"
                        className="font-mono text-xs hover:text-primary transition-colors"
                        onClick={() => checkoutForm.setFieldValue("cardNumber", card.number)}
                      >
                        {card.label}
                      </button>
                      <span className={`text-[11px] font-medium ${card.success ? "text-[#00A651]" : "text-destructive"}`}>
                        {card.result}
                      </span>
                    </div>
                  ))}
                  <p className="text-[11px] text-muted-foreground mt-1">{t("clickToCopy")}</p>
                </div>
              </div>
            </article>
          </div>

          {/* Payment form */}
          <div className="order-1 lg:order-2">
            <article className="relative overflow-hidden rounded-2xl border border-border/40 bg-card shadow-sm">
              <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl bg-primary" />
              <div className="px-5 pt-6 pb-5">
                <div className="flex items-center gap-2 mb-5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
                    <CreditCard className="h-4 w-4 text-primary" />
                  </div>
                  <h2 className="font-bold font-mono text-base">{t("cardSection")}</h2>
                </div>

                <form
                  onSubmit={e => {
                    e.preventDefault()
                    e.stopPropagation()
                    checkoutForm.handleSubmit().then()
                  }}
                  className="space-y-4"
                >
                  <checkoutForm.AppField name="cardHolder">
                    {field => (
                      <field.TextField
                        label={t("cardHolder")}
                        placeholder={t("cardHolderPlaceholder")}
                        autoComplete="cc-name"
                      />
                    )}
                  </checkoutForm.AppField>

                  <checkoutForm.AppField name="cardNumber">
                    {field => (
                      <field.TextField
                        label={t("cardNumber")}
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

                  <div className="border-t-2 border-dashed border-border/30" />

                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                      {t("totalToPay")}
                    </span>
                    <span className="font-black font-mono text-lg">
                      {formatPrice(cart.totalPrice)}
                    </span>
                  </div>

                  <checkoutForm.AppForm>
                    <checkoutForm.SubmitButton
                      className="w-full rounded-full"
                      size="lg"
                      disabled={isProcessing}
                    >
                      {isProcessing
                        ? t("processing")
                        : t("pay", { amount: formatPrice(cart.totalPrice) })}
                    </checkoutForm.SubmitButton>
                  </checkoutForm.AppForm>
                </form>
              </div>
            </article>
          </div>

        </div>
      </div>
    </main>
  )
}
