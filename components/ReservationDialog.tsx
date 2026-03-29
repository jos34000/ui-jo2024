"use client"
import { useState } from "react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
  CalendarDays,
  CheckCircle2,
  Info,
  ShoppingCart,
  Ticket,
} from "lucide-react"
import { formatDateLong } from "@/lib/utils/date"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { OlympicEvent } from "@/lib/types/event.type"
import { OfferDTO } from "@/lib/types/offer.type"
import { useCartStore } from "@/lib/stores/cart.store"
import { addItem as addCartItem } from "@/lib/cart/mutations"
import { Label } from "@/components/ui/label"
import { useTranslations } from "next-intl"

interface ReservationDialogProps {
  event: OlympicEvent
  offers: OfferDTO[]
  disabled: boolean
}

function formatPrice(amount: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(amount)
}

export const ReservationDialog = ({
  event,
  offers,
  disabled,
}: ReservationDialogProps) => {
  const t = useTranslations("reservation")
  const tErrors = useTranslations("errors")
  const [selectedOfferId, setSelectedOfferId] = useState<string | undefined>(
    undefined,
  )
  const [isConfirming, setIsConfirming] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const setSidebarOpen = useCartStore(state => state.setSidebarOpen)

  const handleReserve = async () => {
    if (!selectedOfferId) return
    setIsConfirming(true)
    setError(null)

    const result = await addCartItem({
      eventId: event.id,
      offerId: Number(selectedOfferId),
      quantity: 1,
    })

    if (result.ok) {
      useCartStore.setState({ cart: result.cart })
      setIsComplete(true)
    } else {
      const msg =
        result.error.code !== "unknown"
          ? tErrors(result.error.code)
          : result.error.rawMessage
      setError(msg)
    }

    setIsConfirming(false)
  }

  const resetDialog = () => {
    setSelectedOfferId(undefined)
    setIsComplete(false)
    setError(null)
  }

  const activeOffers = offers.filter(o => o.isActive)

  return (
    <Dialog onOpenChange={open => !open && resetDialog()}>
      <DialogTrigger asChild>
        <Button size="lg" className="w-full sm:w-auto" disabled={disabled}>
          <Ticket className="mr-2 h-4 w-4" />
          {disabled ? t("disabled") : t("reserveNow")}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        {isComplete ? (
          <>
            <DialogHeader>
              <div className="flex justify-center mb-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#00A651]/10">
                  <CheckCircle2 className="h-8 w-8 text-[#00A651]" />
                </div>
              </div>
              <DialogTitle className="text-center font-mono">
                {t("added.title")}
              </DialogTitle>
              <DialogDescription className="text-center">
                {t("added.subtitle", { name: event.name })}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mt-4 flex flex-col gap-2 sm:flex-row">
              <DialogClose asChild>
                <Button
                  variant="outline"
                  className="bg-transparent w-full sm:w-auto"
                >
                  {t("continue")}
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button className="w-full sm:w-auto gap-2" onClick={() => setSidebarOpen(true)}>
                  <ShoppingCart className="h-4 w-4" />
                  {t("viewCart")}
                </Button>
              </DialogClose>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="font-mono">
                {t("title")}
              </DialogTitle>
              <DialogDescription>{event.name}</DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <CalendarDays className="h-5 w-5 text-muted-foreground shrink-0" />
                <div>
                  <p className="text-sm font-medium">
                    {formatDateLong(event.date)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {event.time} - {event.location}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">{t("ticketType")}</Label>
                <Select
                  value={selectedOfferId}
                  onValueChange={setSelectedOfferId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t("selectOffer")} />
                  </SelectTrigger>
                  <SelectContent>
                    {activeOffers.map(offer => (
                      <SelectItem key={offer.id} value={String(offer.id)}>
                        <span>
                          {offer.name} — {t("tickets", { count: offer.numberOfTickets })} ·{" "}
                          {formatPrice(offer.price)}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {error && <p className="text-sm text-destructive">{error}</p>}

              <div className="p-3 rounded-lg border border-border bg-card">
                <div className="flex items-start gap-2">
                  <Info className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <p className="text-xs text-muted-foreground">
                    {t("info")}
                  </p>
                </div>
              </div>
            </div>

            <DialogFooter className="gap-2">
              <DialogClose asChild>
                <Button variant="outline" className="bg-transparent">
                  {t("cancel")}
                </Button>
              </DialogClose>
              <Button
                onClick={handleReserve}
                disabled={!selectedOfferId || isConfirming}
              >
                {isConfirming ? t("adding") : t("addToCart")}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
