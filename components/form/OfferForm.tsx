// components/form/OfferForm.tsx
"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { DialogClose, DialogFooter } from "@/components/ui/dialog"
import { api, ApiError } from "@/lib/utils/api"
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

export const OfferForm = ({ offer, onSuccess, onCancel }: OfferFormProps) => {
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
      const saved = offer
        ? await api<OfferDTO>(`/offer/${offer.id}`, { method: "PUT", body })
        : await api<OfferDTO>("/offer", { method: "POST", body })
      onSuccess(saved)
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.rawMessage || "Une erreur est survenue")
      } else {
        setError("Erreur réseau, veuillez réessayer")
      }
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
