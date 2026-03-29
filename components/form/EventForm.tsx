"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { DialogClose, DialogFooter } from "@/components/ui/dialog"
import {
  AdminEvent,
  generateSlug,
  useAdminEventsStore,
} from "@/lib/stores/admin-events.store"
import { useAppForm } from "@/lib/hooks/useAppForm"
import { z } from "zod"
import { eventSchema } from "@/lib/schemas/event.schema"

type EventFormValues = z.infer<typeof eventSchema>

interface EventFormProps {
  event?: AdminEvent
  onSuccess: () => void
}

export const EventForm = ({ event, onSuccess }: EventFormProps) => {
  const addEvent = useAdminEventsStore(state => state.addEvent)
  const updateEvent = useAdminEventsStore(state => state.updateEvent)

  const form = useAppForm({
    defaultValues: {
      title: event?.title ?? "",
      sport: event?.sport ?? "",
      date: event?.date ?? "",
      time: event?.time ?? "",
      location: event?.location ?? "",
      description: event?.description ?? "",
      price: event?.price ?? 0,
      capacity: event?.capacity ?? 100,
      availableTickets: event?.availableTickets ?? 100,
      imageUrl: event?.imageUrl ?? "",
      isActive: event?.isActive ?? true,
    } as EventFormValues,
    validators: {
      onSubmit: eventSchema,
    },
    onSubmit: async ({ value }) => {
      if (event) {
        await updateEvent(event.id, {
          ...value,
          slug: generateSlug(value.title),
        })
      } else {
        await addEvent({
          ...value,
          slug: generateSlug(value.title),
        })
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
      <form.AppField name="title">
        {field => (
          <field.TextField
            label="Titre de l'evenement"
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

        <form.AppField name="location">
          {field => (
            <field.TextField label="Lieu" placeholder="Ex: Stade de France" />
          )}
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

      <form.AppField name="description">
        {field => (
          <field.TextareaField
            label="Description"
            placeholder="Decrivez cet evenement..."
            rows={3}
          />
        )}
      </form.AppField>

      <div className="grid grid-cols-3 gap-4">
        <form.Field name="price">
          {field => (
            <div className="space-y-2">
              <Label htmlFor="price">Prix (EUR)</Label>
              <Input
                id="price"
                type="number"
                min={0}
                step={0.01}
                value={field.state.value}
                onChange={e =>
                  field.handleChange(Number.parseFloat(e.target.value) || 0)
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

        <form.Field name="availableTickets">
          {field => (
            <div className="space-y-2">
              <Label htmlFor="availableTickets">Billets dispo.</Label>
              <Input
                id="availableTickets"
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

      <form.AppField name="imageUrl">
        {field => (
          <field.TextField
            label="URL de l'image (optionnel)"
            type="url"
            placeholder="https://example.com/image.jpg"
          />
        )}
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
