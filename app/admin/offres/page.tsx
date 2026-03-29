"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Ticket, ToggleLeft, ToggleRight } from "lucide-react"
import { api } from "@/lib/utils/api"
import { OfferDTO } from "@/lib/types/offer.type"
import { OfferForm } from "@/components/form/OfferForm"
import { OfferCard } from "@/app/admin/offres/OfferCard"
import { StatCard } from "@/app/admin/StatCard"

const AdminOffersPage = () => {
  const [offers, setOffers] = useState<OfferDTO[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [createDialogOpen, setCreateDialogOpen] = useState(false)

  useEffect(() => {
    api<OfferDTO[]>("/offer/all")
      .then(data => {
        setOffers([...data].sort((a, b) => a.displayOrder - b.displayOrder))
      })
      .catch(() => {})
      .finally(() => setIsLoading(false))
  }, [])

  const handleCreated = (offer: OfferDTO) => {
    setOffers(prev =>
      [...prev, offer].sort((a, b) => a.displayOrder - b.displayOrder),
    )
    setCreateDialogOpen(false)
  }

  const handleUpdated = (updated: OfferDTO) => {
    setOffers(prev =>
      prev
        .map(o => (o.id === updated.id ? updated : o))
        .sort((a, b) => a.displayOrder - b.displayOrder),
    )
  }

  const handleDeleted = (id: number) => {
    setOffers(prev => prev.filter(o => o.id !== id))
  }

  const activeCount = offers.filter(o => o.isActive).length

  return (
    <div className="p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold font-mono">Offres de billets</h1>
          <p className="text-muted-foreground mt-1">
            {activeCount} offre{activeCount > 1 ? "s" : ""} active
            {activeCount > 1 ? "s" : ""} sur {offers.length}
          </p>
        </div>

        <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nouvelle offre
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-mono">Créer une offre</DialogTitle>
              <DialogDescription>
                Créez une nouvelle offre de billets pour les événements
              </DialogDescription>
            </DialogHeader>
            <OfferForm
              onSuccess={handleCreated}
              onCancel={() => setCreateDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatCard
          label="Total offres"
          value={offers.length}
          icon={<Ticket className="h-5 w-5 text-primary" />}
          iconWrapperClassName="bg-primary/10"
        />
        <StatCard
          label="Offres actives"
          value={activeCount}
          icon={<ToggleRight className="h-5 w-5 text-[#00A651]" />}
          iconWrapperClassName="bg-[#00A651]/10"
          valueClassName="text-[#00A651]"
        />
        <StatCard
          label="Offres inactives"
          value={offers.length - activeCount}
          icon={<ToggleLeft className="h-5 w-5 text-muted-foreground" />}
          iconWrapperClassName="bg-muted"
          valueClassName="text-muted-foreground"
        />
      </div>

      <div className="space-y-4">
        {isLoading ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">Chargement...</p>
            </CardContent>
          </Card>
        ) : offers.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Ticket className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Aucune offre</h3>
              <p className="text-muted-foreground mb-4">
                Commencez par créer votre première offre de billets
              </p>
              <Button onClick={() => setCreateDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Créer une offre
              </Button>
            </CardContent>
          </Card>
        ) : (
          offers.map(offer => (
            <OfferCard
              key={offer.id}
              offer={offer}
              onUpdated={handleUpdated}
              onDeleted={handleDeleted}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default AdminOffersPage
