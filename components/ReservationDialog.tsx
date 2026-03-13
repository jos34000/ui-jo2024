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
import { CalendarDays, CheckCircle2, Info, Ticket } from "lucide-react"
import { formatDateLong } from "@/lib/utils/date"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { OlympicEvent } from "@/lib/types/event.type"

interface ReservationDialogProps {
  event: OlympicEvent
  disabled: boolean
}

export const ReservationDialog = ({
  event,
  disabled,
}: ReservationDialogProps) => {
  const [ticketType, setTicketType] = useState<string>("")
  const [isConfirming, setIsConfirming] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const handleReserve = async () => {
    setIsConfirming(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsConfirming(false)
    setIsComplete(true)
  }

  const resetDialog = () => {
    setTicketType("")
    setIsComplete(false)
  }

  return (
    <Dialog onOpenChange={open => !open && resetDialog()}>
      <DialogTrigger asChild>
        <Button size="lg" className="w-full sm:w-auto" disabled={disabled}>
          <Ticket className="mr-2 h-4 w-4" />
          {disabled ? "Complet" : "Reserver maintenant"}
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
                Reservation confirmee
              </DialogTitle>
              <DialogDescription className="text-center">
                Votre reservation pour {event.name} a ete enregistree. Vous
                recevrez un email de confirmation.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button className="w-full">Fermer</Button>
              </DialogClose>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="font-mono">
                Reserver des billets
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
                <label className="text-sm font-medium">Type de billet</label>
                <Select value={ticketType} onValueChange={setTicketType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selectionnez une formule" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="solo">Solo - 1 billet</SelectItem>
                    <SelectItem value="duo">Duo - 2 billets</SelectItem>
                    <SelectItem value="famille">Famille - 4 billets</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="p-3 rounded-lg border border-border bg-card">
                <div className="flex items-start gap-2">
                  <Info className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <p className="text-xs text-muted-foreground">
                    Votre billet donne accès a tous les évènement des Jeux
                    Olympiques. Les places sont attribuees selon la
                    disponibilite.
                  </p>
                </div>
              </div>
            </div>

            <DialogFooter className="gap-2 sm:gap-0">
              <DialogClose asChild>
                <Button variant="outline" className="bg-transparent">
                  Annuler
                </Button>
              </DialogClose>
              <Button
                onClick={handleReserve}
                disabled={!ticketType || isConfirming}
              >
                {isConfirming ? "Reservation..." : "Confirmer"}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
