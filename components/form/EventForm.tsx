"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { DialogClose, DialogFooter } from "@/components/ui/dialog"
import { useAdminEventsStore } from "@/lib/stores/admin-events.store"
import { useAppForm } from "@/lib/hooks/useAppForm"
import { z } from "zod"
import { eventSchema } from "@/lib/schemas/event.schema"
import { OlympicEvent } from "@/lib/types/event.type"

type EventFormValues = z.infer<typeof eventSchema>

const PHASE_OPTIONS = [
  { value: "SERIES", label: "Séries" },
  { value: "REPECHAGE", label: "Repêchage" },
  { value: "QUALIFICATION", label: "Qualification" },
  { value: "TOUR_PRELIMINAIRE", label: "Tour préliminaire" },
  { value: "PHASE_DE_POULES", label: "Phase de poules" },
  { value: "PHASE_DE_GROUPES", label: "Phase de groupes" },
  { value: "SOIXANTE_QUATRIEME_DE_FINALE", label: "1/64 de finale" },
  { value: "TRENTE_DEUXIEME_DE_FINALE", label: "1/32 de finale" },
  { value: "SEIZIEME_DE_FINALE", label: "1/16 de finale" },
  { value: "QUART_DE_FINALE", label: "Quart de finale" },
  { value: "DEMI_FINALE", label: "Demi-finale" },
  { value: "FINALE", label: "Finale" },
  { value: "CONTRE_LA_MONTRE", label: "Contre-la-montre" },
  { value: "CLASSEMENT", label: "Classement" },
  { value: "RELAIS_MIXTE", label: "Relais mixte" },
  { value: "EPREUVE_PAR_EQUIPES", label: "Épreuve par équipes" },
  { value: "MATCH_BRONZE", label: "Match pour la 3e place" },
]

interface EventFormProps {
  event?: OlympicEvent
  onSuccess: () => void
}

export const EventForm = ({ event, onSuccess }: EventFormProps) => {
  const addEvent = useAdminEventsStore(state => state.addEvent)
  const updateEvent = useAdminEventsStore(state => state.updateEvent)

  const form = useAppForm({
    defaultValues: {
      name: event?.name ?? "",
      sport: event?.sport ?? "",
      category: event?.category ?? "",
      phase: event?.phase ?? "",
      date: event?.date ?? "",
      time: event?.time ?? "",
      location: event?.location ?? "",
      city: event?.city ?? "",
      description: event?.description ?? "",
      capacity: event?.capacity ?? 100,
      availableSlots: event?.availableSlots ?? 100,
      icon: event?.icon ?? "",
      isActive: event?.isActive ?? true,
      status: event?.status,
    } as EventFormValues,
    validators: {
      onSubmit: eventSchema,
    },
    onSubmit: async ({ value }) => {
      if (event) {
        await updateEvent(event.id, value)
      } else {
        await addEvent(value)
      }
      onSuccess()
    },
  })

  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit().then()
      }}
      className="space-y-4 max-h-[60vh] overflow-y-auto pr-2"
    >
      <form.AppField name="name">
        {field => (
          <field.TextField
            label="Nom de l'evenement"
            placeholder="Ex: Finale 100m Hommes"
          />
        )}
      </form.AppField>

      <div className="grid grid-cols-2 gap-4">
        <form.AppField name="sport">
          {field => (
            <field.TextField label="Sport" placeholder="Ex: Athletisme" />
          )}
        </form.AppField>

        <form.AppField name="category">
          {field => (
            <field.TextField label="Categorie" placeholder="Ex: Athletisme" />
          )}
        </form.AppField>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <form.AppField name="location">
          {field => (
            <field.TextField label="Lieu" placeholder="Ex: Stade de France" />
          )}
        </form.AppField>

        <form.AppField name="city">
          {field => <field.TextField label="Ville" placeholder="Ex: Paris" />}
        </form.AppField>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <form.AppField name="date">
          {field => <field.TextField label="Date" type="date" />}
        </form.AppField>

        <form.AppField name="time">
          {field => <field.TextField label="Heure" type="time" />}
        </form.AppField>
      </div>

      <form.AppField name="phase">
        {field => (
          <field.SelectField
            label="Phase"
            options={PHASE_OPTIONS}
            placeholder="Selectionner une phase"
            value={field.state.value}
          />
        )}
      </form.AppField>

      <form.AppField name="description">
        {field => (
          <field.TextareaField
            label="Description"
            placeholder="Decrivez cet evenement..."
            rows={3}
          />
        )}
      </form.AppField>

      <div className="grid grid-cols-2 gap-4">
        <form.Field name="capacity">
          {field => (
            <div className="space-y-2">
              <Label htmlFor="capacity">Capacite</Label>
              <Input
                id="capacity"
                type="number"
                min={1}
                value={field.state.value}
                onChange={e =>
                  field.handleChange(Number.parseInt(e.target.value) || 1)
                }
                onBlur={field.handleBlur}
              />
              {field.state.meta.errors[0] && (
                <p className="text-sm text-destructive">
                  {field.state.meta.errors[0].message}
                </p>
              )}
            </div>
          )}
        </form.Field>

        <form.Field name="availableSlots">
          {field => (
            <div className="space-y-2">
              <Label htmlFor="availableSlots">Places dispo.</Label>
              <Input
                id="availableSlots"
                type="number"
                min={0}
                value={field.state.value}
                onChange={e =>
                  field.handleChange(Number.parseInt(e.target.value) || 0)
                }
                onBlur={field.handleBlur}
              />
              {field.state.meta.errors[0] && (
                <p className="text-sm text-destructive">
                  {field.state.meta.errors[0].message}
                </p>
              )}
            </div>
          )}
        </form.Field>
      </div>

      <form.AppField name="icon">
        {field => <field.TextField label="Emoji" placeholder="🏅" />}
      </form.AppField>

      <form.Field name="isActive">
        {field => (
          <div className="flex items-center justify-between rounded-lg border border-border p-4">
            <div className="space-y-0.5">
              <Label htmlFor="isActive">Evenement actif</Label>
              <p className="text-xs text-muted-foreground">
                Les evenements actifs sont visibles par les utilisateurs
              </p>
            </div>
            <Switch
              id="isActive"
              checked={field.state.value}
              onCheckedChange={checked => field.handleChange(checked)}
            />
          </div>
        )}
      </form.Field>

      <DialogFooter className="gap-2 sm:gap-0 pt-4">
        <DialogClose asChild>
          <Button type="button" variant="outline" className="bg-transparent">
            Annuler
          </Button>
        </DialogClose>
        <form.AppForm>
          <form.SubmitButton>{event ? "Modifier" : "Creer"}</form.SubmitButton>
        </form.AppForm>
      </DialogFooter>
    </form>
  )
}
