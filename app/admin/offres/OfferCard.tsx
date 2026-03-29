"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Pencil, Ticket, ToggleLeft, ToggleRight, Trash2 } from "lucide-react"
import { api } from "@/lib/utils/api"
import { OfferDTO } from "@/lib/types/offer.type"
import { OfferForm } from "@/components/form/OfferForm"

interface OfferCardProps {
  offer: OfferDTO
  onUpdated: (offer: OfferDTO) => void
  onDeleted: (id: number) => void
}

export const OfferCard = ({ offer, onUpdated, onDeleted }: OfferCardProps) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [isToggling, setIsToggling] = useState(false)

  const handleToggle = async () => {
    setIsToggling(true)
    try {
      const updated = await api<OfferDTO>(`/offer/${offer.id}`, {
        method: "PUT",
        body: {
          name: offer.name,
          description: offer.description,
          price: offer.price,
          numberOfTickets: offer.numberOfTickets,
          displayOrder: offer.displayOrder,
          isActive: !offer.isActive,
          features: offer.features,
        },
      })
      onUpdated(updated)
    } catch {
      // silent — UI stays unchanged
    } finally {
      setIsToggling(false)
    }
  }

  const handleDelete = async () => {
    try {
      await api(`/offer/${offer.id}`, { method: "DELETE" })
      onDeleted(offer.id)
    } catch {
      // silent
    }
  }

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(price)

  return (
    <Card className={`transition-all ${!offer.isActive ? "opacity-60" : ""}`}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 shrink-0">
              <Ticket className="h-6 w-6 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold">{offer.name}</h3>
                <Badge
                  variant="outline"
                  className={
                    offer.isActive
                      ? "border-[#00A651]/30 text-[#00A651]"
                      : "border-muted-foreground/30 text-muted-foreground"
                  }
                >
                  {offer.isActive ? "Actif" : "Inactif"}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                {offer.description}
              </p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>
                  <strong className="text-foreground">
                    {offer.numberOfTickets}
                  </strong>{" "}
                  billet{offer.numberOfTickets > 1 ? "s" : ""}
                </span>
                <span>
                  Prix:{" "}
                  <strong className="text-foreground">
                    {formatPrice(offer.price)}
                  </strong>
                </span>
                <span>
                  Ordre:{" "}
                  <strong className="text-foreground">
                    {offer.displayOrder}
                  </strong>
                </span>
              </div>
              {offer.features.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {offer.features.map(f => (
                    <span
                      key={f}
                      className="text-xs bg-muted px-2 py-0.5 rounded-full"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleToggle}
              disabled={isToggling}
              title={offer.isActive ? "Désactiver" : "Activer"}
            >
              {offer.isActive ? (
                <ToggleRight className="h-5 w-5 text-[#00A651]" />
              ) : (
                <ToggleLeft className="h-5 w-5 text-muted-foreground" />
              )}
            </Button>

            <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Pencil className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="font-mono">
                    Modifier l&apos;offre
                  </DialogTitle>
                  <DialogDescription>
                    Modifiez les détails de l&apos;offre {offer.name}
                  </DialogDescription>
                </DialogHeader>
                <OfferForm
                  offer={offer}
                  onSuccess={updated => {
                    onUpdated(updated)
                    setEditDialogOpen(false)
                  }}
                  onCancel={() => setEditDialogOpen(false)}
                />
              </DialogContent>
            </Dialog>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Supprimer cette offre ?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Cette action est irréversible. L&apos;offre &quot;
                    {offer.name}&quot; sera définitivement supprimée.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-transparent">
                    Annuler
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Supprimer
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
