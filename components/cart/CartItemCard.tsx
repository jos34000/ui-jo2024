"use client"

import { useState } from "react"
import { Calendar, MapPin, Ticket, Trash2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { CartItemResponse } from "@/lib/types/cart.type"
import { useCartStore } from "@/lib/stores/cart.store"
import { toast } from "sonner"

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
  const removeItem = useCartStore(state => state.removeItem)
  const [isRemoving, setIsRemoving] = useState(false)

  const handleRemove = async () => {
    setIsRemoving(true)
    try {
      await removeItem(item.id)
    } catch {
      toast.error("Impossible de supprimer l'article")
    } finally {
      setIsRemoving(false)
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
                {item.offer.name} — {item.offer.numberOfTickets * item.quantity} billet
                {item.offer.numberOfTickets * item.quantity > 1 ? "s" : ""}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2 shrink-0">
            <div className="text-right">
              <p className="font-bold text-sm">{formatPrice(item.subtotal)}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {formatPrice(item.unitPrice)} / formule
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
              onClick={handleRemove}
              disabled={isRemoving}
              aria-label="Supprimer l'article"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
        <Separator className="mt-3" />
      </CardContent>
    </Card>
  )
}
