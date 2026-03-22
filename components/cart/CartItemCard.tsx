"use client"

import { useState } from "react"
import { Calendar, MapPin, Minus, Plus, Ticket } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { CartItemResponse } from "@/lib/types/cart.type"
import { useCartStore } from "@/lib/stores/cart.store"
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

  const handleQuantityChange = async (newQuantity: number) => {
    setIsUpdating(true)
    try {
      await updateQuantity(item.id, newQuantity)
    } catch {
      toast.error(t("updateError"))
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <Card className="gap-0 py-0 overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-sm leading-tight truncate">
              {item.event.name}
            </p>
            <div className="mt-2 flex flex-col gap-1">
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Calendar className="h-3.5 w-3.5 shrink-0" />
                {formatDate(item.event.eventDate)}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                {item.event.location}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Ticket className="h-3.5 w-3.5 shrink-0" />
                {item.offer.name} — {t("tickets", { count: item.offer.numberOfTickets * item.quantity })}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2 shrink-0">
            <div className="text-right">
              <p className="font-bold text-sm">{formatPrice(item.subtotal)}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {formatPrice(item.unitPrice)} {t("formule")}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                className="h-6 w-6"
                onClick={() => handleQuantityChange(item.quantity - 1)}
                disabled={isUpdating}
                aria-label={t("decreaseQty")}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="w-6 text-center text-sm font-mono font-medium">
                {item.quantity}
              </span>
              <Button
                variant="outline"
                size="icon"
                className="h-6 w-6"
                onClick={() => handleQuantityChange(item.quantity + 1)}
                disabled={isUpdating}
                aria-label={t("increaseQty")}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
        <Separator className="mt-3" />
      </CardContent>
    </Card>
  )
}
