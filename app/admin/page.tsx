"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  CalendarDays,
  Euro,
  Ticket,
  TrendingUp,
} from "lucide-react"
import { apiClient } from "@/lib/utils/apiClient"
import { OfferDTO } from "@/lib/types/offer.type"
import { EventDTO } from "@/lib/types/event.type"

const AdminDashboard = () => {
  const [offers, setOffers] = useState<OfferDTO[]>([])
  const [events, setEvents] = useState<EventDTO[]>([])

  useEffect(() => {
    apiClient("/offer/all")
      .then(r => (r.ok ? r.json() : []))
      .then(setOffers)
      .catch(() => {})
    apiClient("/events/all")
      .then(r => (r.ok ? r.json() : []))
      .then(setEvents)
      .catch(() => {})
  }, [])

  const activeOffers = offers.filter(o => o.isActive)

  const getEventStatus = (event: EventDTO) => {
    if (event.availableSlots === 0) return "soldout"
    if (event.availableSlots < event.capacity * 0.2) return "limited"
    return "available"
  }

  const stats = [
    {
      title: "Offres actives",
      value: activeOffers.length,
      total: offers.length,
      icon: Ticket,
      href: "/admin/offres",
      color: "text-[#0081C8]",
      bgColor: "bg-[#0081C8]/10",
    },
    {
      title: "Evenements",
      value: events.length,
      description: "evenements programmes",
      icon: CalendarDays,
      href: "/admin/evenements",
      color: "text-[#00A651]",
      bgColor: "bg-[#00A651]/10",
    },
    {
      title: "Places vendues",
      value: "12,847",
      trend: "+12%",
      icon: TrendingUp,
      href: "#",
      color: "text-[#FCB131]",
      bgColor: "bg-[#FCB131]/10",
    },
    {
      title: "Revenus",
      value: "284,520",
      suffix: "EUR",
      icon: Euro,
      href: "#",
      color: "text-[#EE334E]",
      bgColor: "bg-[#EE334E]/10",
    },
  ]

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-mono">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Vue d&apos;ensemble de la billetterie Paris 2024
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(stat => (
          <Card
            key={stat.title}
            className="hover:border-primary/30 transition-colors"
          >
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-2xl font-bold font-mono">
                      {stat.value}
                    </span>
                    {"total" in stat && stat.total !== undefined && (
                      <span className="text-sm text-muted-foreground">
                        / {stat.total}
                      </span>
                    )}
                    {"suffix" in stat && stat.suffix && (
                      <span className="text-sm text-muted-foreground">
                        {stat.suffix}
                      </span>
                    )}
                    {"trend" in stat && stat.trend && (
                      <Badge
                        variant="outline"
                        className="text-[#00A651] border-[#00A651]/30"
                      >
                        {stat.trend}
                      </Badge>
                    )}
                  </div>
                  {"description" in stat && stat.description && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {stat.description}
                    </p>
                  )}
                </div>
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.bgColor}`}
                >
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-lg font-mono">
              Offres de billets
            </CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/offres">
                Voir tout
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {offers.slice(0, 4).map(offer => (
              <div
                key={offer.id}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                    <Ticket className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{offer.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {offer.numberOfTickets} billet
                      {offer.numberOfTickets > 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
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
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-lg font-mono">Evenements</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/evenements">
                Voir tout
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {events.slice(0, 4).map(event => {
              const status = getEventStatus(event)
              return (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{event.icon}</span>
                    <div>
                      <p className="text-sm font-medium">{event.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {event.sport}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      status === "available"
                        ? "border-[#00A651]/30 text-[#00A651]"
                        : status === "limited"
                          ? "border-[#FCB131]/30 text-[#FCB131]"
                          : "border-[#EE334E]/30 text-[#EE334E]"
                    }
                  >
                    {status === "available"
                      ? "Disponible"
                      : status === "limited"
                        ? "Limite"
                        : "Complet"}
                  </Badge>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AdminDashboard
