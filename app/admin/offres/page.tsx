"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
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
import {
  Pencil,
  Plus,
  Ticket,
  ToggleLeft,
  ToggleRight,
  Trash2,
} from "lucide-react"
import { apiClient } from "@/lib/utils/apiClient"
import { OfferDTO } from "@/lib/types/offer.type"

interface OfferFormValues {
  name: string
  description: string
  price: string
  numberOfTickets: string
  displayOrder: string
  isActive: boolean
  features: string
}

const emptyForm = (): OfferFormValues => ({
  name: "",
  description: "",
  price: "",
  numberOfTickets: "1",
  displayOrder: "0",
  isActive: true,
  features: "",
})

const offerToForm = (offer: OfferDTO): OfferFormValues => ({
  name: offer.name,
  description: offer.description,
  price: String(offer.price),
  numberOfTickets: String(offer.numberOfTickets),
  displayOrder: String(offer.displayOrder),
  isActive: offer.isActive,
  features: offer.features.join("\n"),
})

const parseForm = (values: OfferFormValues) => ({
  name: values.name.trim(),
  description: values.description.trim(),
  price: parseFloat(values.price) || 0,
  numberOfTickets: parseInt(values.numberOfTickets, 10) || 1,
  displayOrder: parseInt(values.displayOrder, 10) || 0,
  isActive: values.isActive,
  features: values.features
    .split("\n")
    .map(f => f.trim())
    .filter(Boolean),
})

interface OfferFormProps {
  offer?: OfferDTO
  onSuccess: (offer: OfferDTO) => void
  onCancel: () => void
}

const OfferForm = ({ offer, onSuccess, onCancel }: OfferFormProps) => {
  const [values, setValues] = useState<OfferFormValues>(
    offer ? offerToForm(offer) : emptyForm(),
  )
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const setField =
    (field: keyof OfferFormValues) => (value: string | boolean) =>
      setValues(prev => ({ ...prev, [field]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const body = parseForm(values)

    try {
      const response = offer
        ? await apiClient(`/offer/${offer.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          })
        : await apiClient("/offer", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          })

      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        setError(data.message || "Une erreur est survenue")
        return
      }

      const saved: OfferDTO = await response.json()
      onSuccess(saved)
    } catch {
      setError("Erreur réseau, veuillez réessayer")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nom de l&apos;offre</Label>
        <Input
          id="name"
          placeholder="Ex: Solo"
          value={values.name}
          onChange={e => setField("name")(e.target.value)}
          required
          minLength={2}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Décrivez cette offre..."
          value={values.description}
          onChange={e => setField("description")(e.target.value)}
          rows={3}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Prix (EUR)</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            min="0"
            placeholder="29.99"
            value={values.price}
            onChange={e => setField("price")(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="numberOfTickets">Nombre de billets</Label>
          <Input
            id="numberOfTickets"
            type="number"
            min="1"
            max="20"
            value={values.numberOfTickets}
            onChange={e => setField("numberOfTickets")(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="displayOrder">Ordre d&apos;affichage</Label>
        <Input
          id="displayOrder"
          type="number"
          min="0"
          value={values.displayOrder}
          onChange={e => setField("displayOrder")(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="features">
          Fonctionnalités{" "}
          <span className="text-xs text-muted-foreground">(une par ligne)</span>
        </Label>
        <Textarea
          id="features"
          placeholder={"1 billet\nAccès aux tribunes\nProgramme inclus"}
          value={values.features}
          onChange={e => setField("features")(e.target.value)}
          rows={4}
        />
      </div>

      <div className="flex items-center justify-between rounded-lg border border-border p-4">
        <div className="space-y-0.5">
          <Label htmlFor="isActive">Offre active</Label>
          <p className="text-xs text-muted-foreground">
            Les offres actives sont visibles par les utilisateurs
          </p>
        </div>
        <Switch
          id="isActive"
          checked={values.isActive}
          onCheckedChange={checked => setField("isActive")(checked)}
        />
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <DialogFooter className="gap-2 sm:gap-0">
        <DialogClose asChild>
          <Button
            type="button"
            variant="outline"
            className="bg-transparent"
            onClick={onCancel}
          >
            Annuler
          </Button>
        </DialogClose>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Enregistrement..." : offer ? "Modifier" : "Créer"}
        </Button>
      </DialogFooter>
    </form>
  )
}

interface OfferCardProps {
  offer: OfferDTO
  onUpdated: (offer: OfferDTO) => void
  onDeleted: (id: number) => void
}

const OfferCard = ({ offer, onUpdated, onDeleted }: OfferCardProps) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [isToggling, setIsToggling] = useState(false)

  const handleToggle = async () => {
    setIsToggling(true)
    try {
      const response = await apiClient(`/offer/${offer.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: offer.name,
          description: offer.description,
          price: offer.price,
          numberOfTickets: offer.numberOfTickets,
          displayOrder: offer.displayOrder,
          isActive: !offer.isActive,
          features: offer.features,
        }),
      })
      if (response.ok) {
        const updated: OfferDTO = await response.json()
        onUpdated(updated)
      }
    } catch {
      // silent — UI stays unchanged
    } finally {
      setIsToggling(false)
    }
  }

  const handleDelete = async () => {
    try {
      const response = await apiClient(`/offer/${offer.id}`, {
        method: "DELETE",
      })
      if (response.ok) {
        onDeleted(offer.id)
      }
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

const AdminOffersPage = () => {
  const [offers, setOffers] = useState<OfferDTO[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [createDialogOpen, setCreateDialogOpen] = useState(false)

  useEffect(() => {
    apiClient("/offer/all")
      .then(r => (r.ok ? r.json() : []))
      .then((data: OfferDTO[]) => {
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
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total offres</p>
                <p className="text-2xl font-bold font-mono mt-1">
                  {offers.length}
                </p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Ticket className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Offres actives</p>
                <p className="text-2xl font-bold font-mono mt-1 text-[#00A651]">
                  {activeCount}
                </p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#00A651]/10">
                <ToggleRight className="h-5 w-5 text-[#00A651]" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Offres inactives
                </p>
                <p className="text-2xl font-bold font-mono mt-1 text-muted-foreground">
                  {offers.length - activeCount}
                </p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <ToggleLeft className="h-5 w-5 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
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
