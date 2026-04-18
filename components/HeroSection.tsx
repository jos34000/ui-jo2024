"use client"

import { Calendar, MapPin, Star, Ticket } from "lucide-react"
import { useAuthStore } from "@/lib/stores/auth.store"
import { useTranslations } from "next-intl"

const STATS = [
  { icon: Calendar, value: "16", accent: "#0081C8" },
  { icon: Ticket, value: "32", accent: "#FCB131" },
  { icon: MapPin, value: "35", accent: "#00A651" },
] as const

export const HeroSection = () => {
  const user = useAuthStore(state => state.user)
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)
  const t = useTranslations("hero")

  const statLabels = [t("stats.days"), t("stats.sports"), t("stats.venues")]

  return (
    <section className="relative overflow-hidden bg-background">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,transparent_49%,var(--border)_50%,transparent_51%,transparent_100%)] bg-[length:60px_100%] opacity-30" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,transparent_49%,var(--border)_50%,transparent_51%,transparent_100%)] bg-[length:100%_60px] opacity-30" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-20 lg:py-32 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            {isAuthenticated && user ? (
              <>
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
                  <Star className="h-3.5 w-3.5 fill-primary" />
                  {t("authenticated.badge")}
                </div>

                <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl text-balance font-mono">
                  {t("authenticated.greeting")}{" "}
                  <span className="text-primary">{user.firstName.trim()}</span>
                </h1>

                <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                  {t("authenticated.subtitle")}
                </p>
              </>
            ) : (
              <>
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                  </span>
                  {t("unauthenticated.badge")}
                </div>

                <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl text-balance font-mono">
                  {t.rich("unauthenticated.title", {
                    highlight: chunks => (
                      <span className="text-primary">{chunks}</span>
                    ),
                  })}
                </h1>

                <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                  {t("unauthenticated.subtitle")}
                </p>
              </>
            )}

            <div className="grid grid-cols-3 gap-3 pt-8 border-t border-border">
              {STATS.map(({ icon: Icon, value, accent }, i) => (
                <div
                  key={value}
                  className="relative overflow-hidden rounded-xl border border-border/40 bg-card px-4 py-3 shadow-sm"
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-[3px] rounded-t-xl"
                    style={{ backgroundColor: accent }}
                  />
                  <div className="flex items-center gap-2 mt-1" style={{ color: accent }}>
                    <Icon className="h-3.5 w-3.5 shrink-0" />
                    <span className="text-2xl font-black font-mono leading-none">{value}</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-1.5 leading-tight">
                    {statLabels[i]}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative lg:pl-8">
            <div className="relative max-w-lg mx-auto">
              <div className="grid grid-cols-3 gap-3">

                {/* Main PARIS 2024 card */}
                <div className="col-span-2 row-span-2 relative overflow-hidden bg-card border border-border/40 rounded-2xl p-6 flex flex-col justify-between min-h-[280px] shadow-sm">
                  <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl bg-[#0081C8]" />
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                      {t("labels.olympicGames")}
                    </span>
                    <h3 className="text-5xl sm:text-6xl font-mono font-bold mt-2 tracking-tight">
                      <span className="text-[#0081C8]">P</span>
                      <span className="text-foreground">A</span>
                      <span className="text-[#EE334E]">R</span>
                      <span className="text-[#FCB131]">I</span>
                      <span className="text-[#00A651]">S</span>
                    </h3>
                  </div>
                  <div className="border-t-2 border-dashed border-border/30" />
                  <div>
                    <div className="text-7xl sm:text-8xl font-mono font-bold text-foreground tracking-tighter">
                      2024
                    </div>
                    <div className="flex gap-2 mt-4">
                      <div className="h-1.5 w-8 rounded-full bg-[#0081C8]" />
                      <div className="h-1.5 w-8 rounded-full bg-foreground" />
                      <div className="h-1.5 w-8 rounded-full bg-[#EE334E]" />
                      <div className="h-1.5 w-8 rounded-full bg-[#FCB131]" />
                      <div className="h-1.5 w-8 rounded-full bg-[#00A651]" />
                    </div>
                  </div>
                </div>

                <div className="relative overflow-hidden bg-[#0081C8] rounded-2xl p-4 flex flex-col justify-center items-center text-white shadow-sm">
                  <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl bg-white/30" />
                  <span className="text-3xl font-mono font-bold">206</span>
                  <span className="text-xs opacity-80 text-center mt-0.5">{t("labels.nations")}</span>
                </div>

                <div className="relative overflow-hidden bg-[#FCB131] rounded-2xl p-4 flex flex-col justify-center items-center text-black shadow-sm">
                  <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl bg-black/20" />
                  <span className="text-3xl font-mono font-bold">329</span>
                  <span className="text-xs opacity-80 text-center mt-0.5">{t("labels.events")}</span>
                </div>

                <div className="relative overflow-hidden bg-[#00A651] rounded-2xl p-4 flex flex-col justify-center items-center text-white shadow-sm">
                  <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl bg-white/30" />
                  <span className="text-2xl font-mono font-bold">26/07</span>
                  <span className="text-xs opacity-80 mt-0.5">{t("labels.start")}</span>
                </div>

                <div className="relative overflow-hidden bg-card border border-border/40 rounded-2xl p-4 flex flex-col justify-center items-center shadow-sm">
                  <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl bg-border" />
                  <span className="text-2xl font-mono font-bold text-foreground">10K+</span>
                  <span className="text-xs text-muted-foreground mt-0.5">{t("labels.athletes")}</span>
                </div>

                <div className="relative overflow-hidden bg-[#EE334E] rounded-2xl p-4 flex flex-col justify-center items-center text-white shadow-sm">
                  <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl bg-white/30" />
                  <span className="text-2xl font-mono font-bold">11/08</span>
                  <span className="text-xs opacity-80 mt-0.5">{t("labels.end")}</span>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
