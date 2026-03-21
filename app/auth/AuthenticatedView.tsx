"use client"

import {
  ArrowLeft,
  ArrowRight,
  Lock,
  LogOut,
  Mail,
  Pencil,
  Shield,
  Ticket,
  User,
} from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { StoredUser } from "@/lib/types/user.types"
import { useEffect, useState } from "react"
import { ProfileForm } from "@/components/form/ProfileForm"
import { InfoRow } from "@/app/auth/InfoRow"
import { ResetPasswordDialog } from "@/components/ResetPasswordDialog"
import { usePaymentStore } from "@/lib/stores/payment.store"
import { TicketGroup } from "@/lib/types/payment.type"
import { formatDatePurchase } from "@/lib/utils/date"
import { formatPrice } from "@/lib/utils/format"
import { useTranslations } from "next-intl"

interface AuthenticatedViewProps {
  user: StoredUser
  onLogout: () => void
  initials: string
}

export const AuthenticatedView = ({
  user,
  onLogout,
  initials,
}: Readonly<AuthenticatedViewProps>) => {
  const t = useTranslations("profile")
  const [isEditing, setIsEditing] = useState(false)
  const [groups, setGroups] = useState<TicketGroup[]>([])
  const [ticketsLoaded, setTicketsLoaded] = useState(false)
  const getUserTickets = usePaymentStore(state => state.getUserTickets)

  const STATUS_BADGE: Record<string, { label: string; variant: "default" | "secondary" | "destructive" }> = {
    VALID:     { label: t("status.VALID"),     variant: "default" },
    USED:      { label: t("status.USED"),      variant: "secondary" },
    CANCELLED: { label: t("status.CANCELLED"), variant: "destructive" },
  }

  useEffect(() => {
    getUserTickets()
      .then(setGroups)
      .finally(() => setTicketsLoaded(true))
  }, [getUserTickets])

  const totalSeats  = groups.reduce((sum, g) => sum + g.totalSeats, 0)
  const activeCount = groups.filter(g => g.groupStatus === "VALID").length
  const recentGroups = groups.slice(0, 2)

  const ticketSummary = !ticketsLoaded
    ? t("loadingTickets")
    : groups.length === 0
      ? undefined
      : `${t("ticketSummaryOrders", { count: groups.length })} · ${t("ticketSummarySeats", { count: totalSeats })}${activeCount > 0 ? ` · ${t("ticketSummaryActive", { count: activeCount })}` : ""}`

  return (
    <main className="flex-1 mx-auto w-full max-w-3xl px-4 sm:px-6 py-8 sm:py-12 lg:py-16">
      <div className="space-y-8">
        <div className="flex items-center gap-4 sm:gap-5">
          <span className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-lg sm:text-xl font-mono font-bold shrink-0">
            {initials}
          </span>
          <div className="min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight font-mono truncate">
              {t("greeting", { name: user.firstName })}
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              {t("welcomeSubtitle")}
            </p>
          </div>
        </div>

        <Card className="border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div>
              <CardTitle className="text-lg font-mono">
                {isEditing ? t("editTitle") : t("title")}
              </CardTitle>
              <CardDescription className="mt-1">
                {isEditing ? t("editDescription") : t("description")}
              </CardDescription>
            </div>
            {!isEditing && (
              <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)} className="shrink-0">
                <Pencil className="mr-2 h-4 w-4" />
                {t("edit")}
              </Button>
            )}
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <ProfileForm
                user={user}
                onCancel={() => setIsEditing(false)}
                onSuccess={() => setIsEditing(false)}
              />
            ) : (
              <div className="space-y-0">
                <InfoRow icon={User} label={t("fullName")} value={`${user.firstName} ${user.lastName}`} hasBorder />
                <InfoRow icon={Mail} label={t("email")} value={user.email} hasBorder />
                <InfoRow
                  icon={Ticket}
                  label={t("tickets")}
                  value={ticketSummary}
                  placeholder={t("noTickets")}
                />
              </div>
            )}
          </CardContent>
        </Card>

        {ticketsLoaded && recentGroups.length > 0 && (
          <Card className="border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-base font-mono">{t("recentTickets")}</CardTitle>
              <Link href="/billets" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                {t("viewAll")}
              </Link>
            </CardHeader>
            <CardContent className="space-y-2 pt-0">
              {recentGroups.map(group => {
                const cfg = STATUS_BADGE[group.groupStatus]
                return (
                  <div
                    key={`${group.transactionId}-${group.event.id}`}
                    className="flex items-center justify-between gap-3 rounded-lg bg-muted/40 px-3 py-2.5"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">{group.event.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {t("seatsCount", { count: group.totalSeats })} · {formatDatePurchase(group.purchasedAt)} · {formatPrice(group.totalPrice)}
                      </p>
                    </div>
                    <Badge variant={cfg.variant} className="text-xs shrink-0">{cfg.label}</Badge>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        )}

        <div className="grid sm:grid-cols-2 gap-4">
          <Link href="/calendrier">
            <Card className="border-border/50 hover:border-primary/30 transition-colors cursor-pointer h-full">
              <CardContent className="flex items-center gap-4 py-5 sm:py-6">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                  <Ticket className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm sm:text-base">{t("buyTickets")}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">{t("exploreEvents")}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
              </CardContent>
            </Card>
          </Link>

          <Link href="/billets">
            <Card className="border-border/50 hover:border-primary/30 transition-colors cursor-pointer h-full">
              <CardContent className="flex items-center gap-4 py-5 sm:py-6">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                  <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm sm:text-base">{t("myTickets")}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {ticketsLoaded && groups.length > 0
                      ? t("ordersCount", { count: groups.length })
                      : t("viewReservations")}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button variant="outline" className="bg-transparent" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("backHome")}
            </Link>
          </Button>
          <ResetPasswordDialog
            mode="change"
            trigger={
              <Button variant="outline" className="bg-transparent">
                <Lock className="mr-2 h-4 w-4" />
                {t("changePassword")}
              </Button>
            }
          />
          <Button
            variant="ghost"
            onClick={onLogout}
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <LogOut className="mr-2 h-4 w-4" />
            {t("logout")}
          </Button>
        </div>
      </div>
    </main>
  )
}
