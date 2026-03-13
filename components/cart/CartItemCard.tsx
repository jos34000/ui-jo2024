"use client"

import { Calendar, MapPin, Ticket } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CartItem } from "@/lib/types/cart.type"

interface CartItemCardProps {
  item: CartItem
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
  return (
    <Card className="gap-0 py-0 overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-sm leading-tight truncate">
              {item.eventName}
            </p>
            <div className="mt-2 flex flex-col gap-1">
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Calendar className="h-3.5 w-3.5 shrink-0" />
                {formatDate(item.eventDate)}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                {item.location}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Ticket className="h-3.5 w-3.5 shrink-0" />
                {item.offerName} — {item.numberOfTickets} billet
                {item.numberOfTickets > 1 ? "s" : ""}
              </span>
            </div>
          </div>
          <div className="text-right shrink-0">
            <p className="font-bold text-sm">{formatPrice(item.totalPrice)}</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {formatPrice(item.unitPrice)} / billet
            </p>
          </div>
        </div>
        <Separator className="mt-3" />
      </CardContent>
    </Card>
  )
}
