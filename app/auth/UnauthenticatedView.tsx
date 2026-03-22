"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
    <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 py-8 sm:py-12 lg:py-16">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
        <div className="hidden lg:block">
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-balance font-mono">
                {t("accountTitle")}
                <span className="block text-primary">Paris 2024</span>
              </h1>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                {t("accountSubtitle")}
              </p>
            </div>

            <div className="space-y-6">
              {features.map(feature => (
                <div key={feature.title} className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-8 border-t border-border">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-[#0081C8]" />
                <div className="h-3 w-3 rounded-full bg-[#FCB131]" />
                <div className="h-3 w-3 rounded-full bg-foreground" />
                <div className="h-3 w-3 rounded-full bg-[#00A651]" />
                <div className="h-3 w-3 rounded-full bg-[#EE334E]" />
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                {t("moreThan10M")}
              </p>
            </div>
          </div>
        </div>

        <div>
          <Card className="border-border/50 shadow-lg">
            <CardHeader className="space-y-1 pb-6">
              <div className="lg:hidden flex justify-center mb-4">
                <OlympicRings className="h-10 w-auto" />
              </div>
              <CardTitle className="text-2xl text-center lg:text-left">
                {mode === "login" ? t("login") : t("register")}
              </CardTitle>
              <CardDescription className="text-center lg:text-left">
                {mode === "login"
                  ? t("loginSubtitle")
                  : t("registerSubtitle")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AuthForm mode={mode} onToggleMode={onToggleMode} />
            </CardContent>
          </Card>

          <div className="mt-6 text-center lg:hidden">
            <Button variant="ghost" asChild>
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
