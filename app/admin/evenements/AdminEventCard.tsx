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
import {
  CalendarDays,
  Clock,
  MapPin,
  Pencil,
  ToggleLeft,
  ToggleRight,
  Trash2,
  Users,
} from "lucide-react"
import {
  AdminEvent,
  useAdminEventsStore,
} from "@/lib/stores/admin-events.store"
import { EventForm } from "@/components/form/EventForm"

interface AdminEventCardProps {
  event: AdminEvent
}

export const AdminEventCard = ({ event }: AdminEventCardProps) => {
  const toggleEventStatus = useAdminEventsStore(
    state => state.toggleEventStatus,
  )
  const deleteEvent = useAdminEventsStore(state => state.deleteEvent)
  const [editDialogOpen, setEditDialogOpen] = useState(false)

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  return (
    <Card className={`transition-all ${event.isActive ? "" : "opacity-60"}`}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4 flex-1 min-w-0">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 shrink-0">
              <CalendarDays className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h3 className="font-semibold truncate">{event.title}</h3>
                <Badge variant="secondary" className="shrink-0">
                  {event.sport}
                </Badge>
                <Badge
                  variant="outline"
                  className={
                    event.isActive
                      ? "border-[#00A651]/30 text-[#00A651] shrink-0"
                      : "border-muted-foreground/30 text-muted-foreground shrink-0"
                  }
                >
                  {event.isActive ? "Actif" : "Inactif"}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2 line-clamp-1">
                {event.description}
              </p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
                <span className="flex items-center gap-1">
                  <CalendarDays className="h-3 w-3" />
                  {formatDate(event.date)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {event.time}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {event.location}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {event.availableTickets}/{event.capacity}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => toggleEventStatus(event.id)}
              title={event.isActive ? "Desactiver" : "Activer"}
            >
              {event.isActive ? (
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
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="font-mono">
                    Modifier l&apos;evenement
                  </DialogTitle>
                  <DialogDescription>
                    Modifiez les details de l&apos;evenement {event.title}
                  </DialogDescription>
                </DialogHeader>
                <EventForm
                  event={event}
                  onSuccess={() => setEditDialogOpen(false)}
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
                  <AlertDialogTitle>Supprimer cet evenement ?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Cette action est irreversible. L&apos;evenement &quot;
                    {event.title}&quot; sera definitivement supprime.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-transparent">
                    Annuler
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => deleteEvent(event.id)}
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
