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
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { StoredUser } from "@/lib/types/user.types"
import { useEffect, useState } from "react"
import { ProfileForm } from "@/components/form/ProfileForm"
import { InfoRow } from "@/app/auth/InfoRow"
import { ResetPasswordDialog } from "@/components/ResetPasswordDialog"
import { usePaymentStore } from "@/lib/stores/payment.store"
import { TicketGroup } from "@/lib/types/payment.type"
import { formatStringDateClassic } from "@/lib/utils/date"
import { formatPrice } from "@/lib/utils/format"
import { useTranslations } from "next-intl"

interface AuthenticatedViewProps {
  user: StoredUser
  onLogout: () => void
  initials: string
}

const TICKET_STATUS = {
  VALID: { hex: "#00A651", bg: "#00A65114", border: "#00A65130" },
  USED: { hex: "#6B7280", bg: "#6B728014", border: "#6B728030" },
  CANCELLED: { hex: "#EE334E", bg: "#EE334E14", border: "#EE334E30" },
} as const

const QUICK_ACTIONS = (buyTickets: string, exploreEvents: string, myTickets: string) => [
  { href: "/calendrier", icon: Ticket, title: buyTickets, subtitle: exploreEvents },
  { href: "/billets", icon: Shield, title: myTickets, subtitle: null },
]

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

  useEffect(() => {
    getUserTickets()
      .then(setGroups)
      .catch(() => {})
      .finally(() => setTicketsLoaded(true))
  }, [getUserTickets])

  const totalSeats = groups.reduce((sum, g) => sum + g.totalSeats, 0)
  const activeCount = groups.filter(g => g.groupStatus === "VALID").length
  const recentGroups = groups.slice(0, 2)

  const ticketSummary = ticketsLoaded
    ? groups.length === 0
      ? undefined
      : `${t("ticketSummaryOrders", { count: groups.length })} · ${t("ticketSummarySeats", { count: totalSeats })}${activeCount > 0 ? ` · ${t("ticketSummaryActive", { count: activeCount })}` : ""}`
    : t("loadingTickets")

  return (
    <main className="flex-1 mx-auto w-full max-w-3xl px-4 sm:px-6 py-8 sm:py-12 lg:py-16">
      <div className="space-y-6">

        {/* Avatar + greeting */}
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

        {/* Profile card */}
        <article className="relative overflow-hidden rounded-2xl border border-border/40 bg-card shadow-sm">
          <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl bg-primary" />
          <div className="px-5 pt-6 pb-4 flex items-start justify-between gap-3">
            <div>
              <h2 className="text-base font-bold font-mono">
                {isEditing ? t("editTitle") : t("title")}
              </h2>
              <p className="text-sm text-muted-foreground mt-0.5">
                {isEditing ? t("editDescription") : t("description")}
              </p>
            </div>
            {!isEditing && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="shrink-0 h-8 text-xs rounded-full"
              >
                <Pencil className="mr-1.5 h-3.5 w-3.5" />
                {t("edit")}
              </Button>
            )}
          </div>
          <div className="border-t-2 border-dashed border-border/30 mx-5" />
          <div className="px-5 pb-4">
            {isEditing ? (
              <div className="pt-4">
                <ProfileForm
                  user={user}
                  onCancel={() => setIsEditing(false)}
                  onSuccess={() => setIsEditing(false)}
                />
              </div>
            ) : (
              <div className="space-y-0">
                <InfoRow
                  icon={User}
                  label={t("fullName")}
                  value={`${user.firstName} ${user.lastName}`}
                  hasBorder
                />
                <InfoRow icon={Mail} label={t("email")} value={user.email} hasBorder />
                <InfoRow
                  icon={Ticket}
                  label={t("tickets")}
                  value={ticketSummary}
                  placeholder={t("noTickets")}
                />
              </div>
            )}
          </div>
        </article>

        {/* Recent tickets */}
        {ticketsLoaded && recentGroups.length > 0 && (
          <article className="relative overflow-hidden rounded-2xl border border-border/40 bg-card shadow-sm">
            <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl bg-primary" />
            <div className="px-5 pt-6 pb-3 flex items-center justify-between gap-3">
              <h2 className="text-base font-bold font-mono">{t("recentTickets")}</h2>
              <Link
                href="/billets"
                className="text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground hover:text-primary transition-colors"
              >
                {t("viewAll")}
              </Link>
            </div>
            <div className="border-t-2 border-dashed border-border/30 mx-5" />
            <div className="px-5 py-4 space-y-2">
              {recentGroups.map(group => {
                const s = TICKET_STATUS[group.groupStatus as keyof typeof TICKET_STATUS] ?? TICKET_STATUS.USED
                return (
                  <div
                    key={`${group.transactionId}-${group.event.id}`}
                    className="relative overflow-hidden flex items-center justify-between gap-3 rounded-xl border border-border/30 bg-background/50 px-4 py-3"
                  >
                    <div
                      className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-xl"
                      style={{ backgroundColor: s.hex }}
                    />
                    <div className="min-w-0 flex-1 pl-1">
                      <p className="text-sm font-semibold truncate">{group.event.name}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        {t("seatsCount", { count: group.totalSeats })} ·{" "}
                        {formatStringDateClassic(group.purchasedAt)} ·{" "}
                        {formatPrice(group.totalPrice)}
                      </p>
                    </div>
                    <span
                      className="shrink-0 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider"
                      style={{ color: s.hex, backgroundColor: s.bg, border: `1px solid ${s.border}` }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full block"
                        style={{ backgroundColor: s.hex }}
                      />
                      {t(`status.${group.groupStatus}`)}
                    </span>
                  </div>
                )
              })}
            </div>
          </article>
        )}

        {/* Quick actions */}
        <div className="grid sm:grid-cols-2 gap-4">
          {([
            { href: "/calendrier", icon: Ticket, title: t("buyTickets"), subtitle: t("exploreEvents") },
            {
              href: "/billets",
              icon: Shield,
              title: t("myTickets"),
              subtitle: ticketsLoaded && groups.length > 0
                ? t("ordersCount", { count: groups.length })
                : t("viewReservations"),
            },
          ] as const).map(({ href, icon: Icon, title, subtitle }) => (
            <Link key={href} href={href}>
              <article className="group relative overflow-hidden flex items-center gap-4 rounded-2xl border border-border/40 bg-card px-5 py-4 hover:-translate-y-0.5 hover:shadow-md hover:border-border/70 transition-all duration-200 shadow-sm h-full">
                <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl bg-primary/25 group-hover:bg-primary transition-colors duration-300" />
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 shrink-0">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm">{title}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0 group-hover:text-primary transition-colors" />
              </article>
            </Link>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button variant="outline" className="bg-transparent rounded-full" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("backHome")}
            </Link>
          </Button>
          <ResetPasswordDialog
            mode="change"
            trigger={
              <Button variant="outline" className="bg-transparent rounded-full">
                <Lock className="mr-2 h-4 w-4" />
                {t("changePassword")}
              </Button>
            }
          />
          <Button
            variant="ghost"
            onClick={onLogout}
            className="rounded-full text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <LogOut className="mr-2 h-4 w-4" />
            {t("logout")}
          </Button>
        </div>

      </div>
    </main>
  )
}
