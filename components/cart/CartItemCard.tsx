"use client"

import { useState } from "react"
import { Calendar, MapPin, Minus, Plus, Ticket } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CartItemResponse } from "@/lib/types/cart.type"
import { useCartStore } from "@/lib/stores/cart.store"
import { CartError } from "@/lib/cart/mutations"
import { toast } from "sonner"
import { useTranslations } from "next-intl"

interface CartItemCardProps {
  item: CartItemResponse
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

function formatPrice(amount: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(amount)
}

export const CartItemCard = ({ item }: CartItemCardProps) => {
  const updateQuantity = useCartStore(state => state.updateQuantity)
  const [isUpdating, setIsUpdating] = useState(false)
  const t = useTranslations("cart")
  const tErrors = useTranslations("errors")

  const handleQuantityChange = async (newQuantity: number) => {
    setIsUpdating(true)
    try {
      await updateQuantity(item.id, newQuantity)
    } catch (err) {
      const msg =
        err instanceof CartError && err.code !== "unknown"
          ? tErrors(err.code)
          : tErrors("genericError")
      toast.error(msg)
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <article className="relative overflow-hidden rounded-2xl border border-border/40 bg-card shadow-sm">
      <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-2xl bg-primary/40" />
      <div className="pl-4 pr-4 py-3.5 flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1 pl-1">
          <p className="font-semibold text-sm leading-tight truncate">{item.event.name}</p>
          <div className="mt-2 flex flex-col gap-1">
            <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <Calendar className="h-3 w-3 shrink-0" />
              {formatDate(item.event.eventDate)}
            </span>
            <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <MapPin className="h-3 w-3 shrink-0" />
              {item.event.location}
            </span>
            <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <Ticket className="h-3 w-3 shrink-0" />
              {item.offer.name} — {t("tickets", { count: item.offer.numberOfTickets * item.quantity })}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2.5 shrink-0">
          <div className="text-right">
            <p className="font-black text-sm font-mono">{formatPrice(item.subtotal)}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">
              {formatPrice(item.unitPrice)} {t("formule")}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-6 w-6 rounded-full"
              onClick={() => handleQuantityChange(item.quantity - 1)}
              disabled={isUpdating}
              aria-label={t("decreaseQty")}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-6 text-center text-sm font-mono font-bold">
              {item.quantity}
            </span>
            <Button
              variant="outline"
              size="icon"
              className="h-6 w-6 rounded-full"
              onClick={() => handleQuantityChange(item.quantity + 1)}
              disabled={isUpdating}
              aria-label={t("increaseQty")}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    </article>
  )
}
