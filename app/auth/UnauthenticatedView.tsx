"use client"

import { OlympicRings } from "@/lib/svg/OlympicRings"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Clock, Shield, Ticket } from "lucide-react"
import { AuthForm } from "@/components/AuthForm"
import { useTranslations } from "next-intl"

interface UnauthenticatedViewProps {
  mode: "login" | "register"
  onToggleMode: () => void
}

export const UnauthenticatedView = ({
  mode,
  onToggleMode,
}: Readonly<UnauthenticatedViewProps>) => {
  const t = useTranslations("auth")
  const features = [
    {
      icon: Ticket,
      title: t("features.priority.title"),
      description: t("features.priority.description"),
    },
    {
      icon: Shield,
      title: t("features.secure.title"),
      description: t("features.secure.description"),
    },
    {
      icon: Clock,
      title: t("features.history.title"),
      description: t("features.history.description"),
    },
  ]

  return (
    <main className="flex-1 flex flex-col justify-center mx-auto w-full max-w-7xl px-4 sm:px-6 py-8 sm:py-12">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">

        {/* Left — pitch */}
        <div className="hidden lg:block space-y-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-balance font-mono">
              {t("accountTitle")}
              <span className="block text-primary">Paris 2024</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              {t("accountSubtitle")}
            </p>
          </div>

          <div className="space-y-3">
            {features.map(feature => (
              <div
                key={feature.title}
                className="relative overflow-hidden flex gap-4 rounded-2xl border border-border/40 bg-card px-5 py-4 shadow-sm"
              >
                <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl bg-primary/25" />
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-sm">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground mt-0.5 leading-snug">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-border">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-[#0081C8]" />
              <div className="h-3 w-3 rounded-full bg-[#FCB131]" />
              <div className="h-3 w-3 rounded-full bg-foreground" />
              <div className="h-3 w-3 rounded-full bg-[#00A651]" />
              <div className="h-3 w-3 rounded-full bg-[#EE334E]" />
            </div>
            <p className="mt-4 text-sm text-muted-foreground">{t("moreThan10M")}</p>
          </div>
        </div>

        {/* Right — form card */}
        <div>
          <article className="relative overflow-hidden rounded-2xl border border-border/40 bg-card shadow-lg">
            <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl bg-primary" />
            <div className="px-6 pt-7 pb-5">
              <div className="lg:hidden flex justify-center mb-5">
                <OlympicRings className="h-10 w-auto" />
              </div>
              <h2 className="text-2xl font-bold text-center lg:text-left font-mono">
                {mode === "login" ? t("login") : t("register")}
              </h2>
              <p className="text-sm text-muted-foreground text-center lg:text-left mt-1">
                {mode === "login" ? t("loginSubtitle") : t("registerSubtitle")}
              </p>
            </div>
            <div className="border-t-2 border-dashed border-border/30 mx-6" />
            <div className="px-6 pb-6 pt-5">
              <AuthForm mode={mode} onToggleMode={onToggleMode} />
            </div>
          </article>

          <div className="mt-6 text-center lg:hidden">
            <Button variant="ghost" className="rounded-full" asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t("backHome")}
              </Link>
            </Button>
          </div>
        </div>

      </div>
    </main>
  )
}
