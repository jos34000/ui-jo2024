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
import { CalendarDays, Plus, ToggleLeft, ToggleRight, Users } from "lucide-react"
import { useAdminEventsStore } from "@/lib/stores/admin-events.store"
import { EventForm } from "@/components/form/EventForm"
import { AdminEventCard } from "@/app/admin/evenements/AdminEventCard"
import { StatCard } from "@/app/admin/StatCard"

const AdminEventsPage = () => {
  const events = useAdminEventsStore(state => state.events)
  const fetchEvents = useAdminEventsStore(state => state.fetchEvents)
  const [createDialogOpen, setCreateDialogOpen] = useState(false)

  useEffect(() => {
    fetchEvents().then()
  }, [fetchEvents])

  const activeCount = events.filter(e => e.isActive).length
  const totalTickets = events.reduce((acc, e) => acc + (e.availableSlots ?? 0), 0)

  return (
    <div className="p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold font-mono">Evenements</h1>
          <p className="text-muted-foreground mt-1">
            {activeCount} evenement{activeCount > 1 ? "s" : ""} actif
            {activeCount > 1 ? "s" : ""} sur {events.length}
          </p>
        </div>

        <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nouvel evenement
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="font-mono">
                Creer un evenement
              </DialogTitle>
              <DialogDescription>
                Creez un nouvel evenement pour les Jeux Olympiques
              </DialogDescription>
            </DialogHeader>
            <EventForm onSuccess={() => setCreateDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
        <StatCard
          label="Total evenements"
          value={events.length}
          icon={<CalendarDays className="h-5 w-5 text-primary" />}
          iconWrapperClassName="bg-primary/10"
        />
        <StatCard
          label="Evenements actifs"
          value={activeCount}
          icon={<ToggleRight className="h-5 w-5 text-[#00A651]" />}
          iconWrapperClassName="bg-[#00A651]/10"
          valueClassName="text-[#00A651]"
        />
        <StatCard
          label="Evenements inactifs"
          value={events.length - activeCount}
          icon={<ToggleLeft className="h-5 w-5 text-muted-foreground" />}
          iconWrapperClassName="bg-muted"
          valueClassName="text-muted-foreground"
        />
        <StatCard
          label="Billets disponibles"
          value={totalTickets}
          icon={<Users className="h-5 w-5 text-primary" />}
          iconWrapperClassName="bg-primary/10"
        />
      </div>

      <div className="space-y-4">
        {events.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <CalendarDays className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Aucun evenement</h3>
              <p className="text-muted-foreground mb-4">
                Commencez par creer votre premier evenement
              </p>
              <Button onClick={() => setCreateDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Creer un evenement
              </Button>
            </CardContent>
          </Card>
        ) : (
          events.map(event => <AdminEventCard key={event.id} event={event} />)
        )}
      </div>
    </div>
  )
}

export default AdminEventsPage
