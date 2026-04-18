"use client"

import React, { useState, useSyncExternalStore } from "react"
import {
  BarChart3,
  ChevronDown,
  ChevronUp,
  Cookie,
  Megaphone,
  Settings2,
  Shield,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useCookieStore } from "@/lib/stores/cookie.store"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"

type CategoryId = "necessary" | "analytics" | "marketing" | "preferences"

interface CookieCategory {
  id: CategoryId
  icon: React.ElementType
  required?: boolean
}

const COOKIE_CATEGORIES: CookieCategory[] = [
  { id: "necessary", icon: Shield, required: true },
  { id: "analytics", icon: BarChart3 },
  { id: "marketing", icon: Megaphone },
  { id: "preferences", icon: Settings2 },
]

export const CookieBanner = () => {
  const t = useTranslations("cookieBanner")
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  )
  const [showDetails, setShowDetails] = useState(false)
  const [showDialog, setShowDialog] = useState(false)

  const {
    hasConsented,
    showBanner,
    preferences,
    setPreferences,
    acceptAll,
    rejectAll,
    savePreferences,
    closeBanner,
  } = useCookieStore()

  if (!mounted || (hasConsented && !showBanner)) {
    return null
  }

  const handleClose = () => {
    if (hasConsented) {
      closeBanner()
    } else {
      rejectAll()
    }
  }

  const handleSaveAndClose = () => {
    savePreferences()
    setShowDialog(false)
  }

  return (
    <>
      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6",
          "transform transition-all duration-500 ease-out",
          showBanner && !showDialog
            ? "translate-y-0 opacity-100"
            : "translate-y-full opacity-0 pointer-events-none",
        )}
      >
        <div className="mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/95 backdrop-blur-xl shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-[#FCB131]/5 pointer-events-none" />

            <button
              onClick={handleClose}
              className="absolute top-3 right-3 z-10 p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">{t("close")}</span>
            </button>

            <div className="relative p-4 sm:p-6">
              <div className="flex items-start gap-4 pr-8">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <Cookie className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg font-semibold font-mono">
                    {t("title")}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                    {t("description")}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowDetails(!showDetails)}
                className="flex items-center gap-2 mt-4 text-sm text-primary hover:underline sm:hidden"
              >
                {showDetails ? (
                  <>
                    {t("hideDetails")}
                    <ChevronUp className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    {t("showDetails")}
                    <ChevronDown className="h-4 w-4" />
                  </>
                )}
              </button>

              <div
                className={cn(
                  "mt-4 space-y-3 overflow-hidden transition-all duration-300 sm:hidden",
                  showDetails
                    ? "max-h-[400px] opacity-100"
                    : "max-h-0 opacity-0",
                )}
              >
                {COOKIE_CATEGORIES.map(category => (
                  <CookieCategoryItem
                    key={category.id}
                    category={category}
                    checked={preferences[category.id]}
                    onCheckedChange={checked =>
                      setPreferences({ [category.id]: checked })
                    }
                  />
                ))}
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Button
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={rejectAll}
                >
                  {t("rejectAll")}
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 bg-transparent hidden sm:flex"
                  onClick={() => setShowDialog(true)}
                >
                  {t("customize")}
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 bg-transparent sm:hidden"
                  onClick={handleSaveAndClose}
                >
                  {t("save")}
                </Button>
                <Button className="flex-1" onClick={acceptAll}>
                  {t("acceptAll")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Cookie className="h-5 w-5 text-primary" />
              </div>
              <div>
                <DialogTitle className="font-mono">
                  {t("dialog.title")}
                </DialogTitle>
                <DialogDescription>{t("dialog.description")}</DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="mt-4 space-y-4">
            {COOKIE_CATEGORIES.map(category => (
              <CookieCategoryItem
                key={category.id}
                category={category}
                checked={preferences[category.id]}
                onCheckedChange={checked =>
                  setPreferences({ [category.id]: checked })
                }
                expanded
              />
            ))}
          </div>

          <div className="mt-6 flex gap-3">
            <Button
              variant="outline"
              className="flex-1 bg-transparent"
              onClick={rejectAll}
            >
              {t("rejectAll")}
            </Button>
            <Button className="flex-1" onClick={handleSaveAndClose}>
              {t("saveChoices")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

interface CookieCategoryItemProps {
  category: CookieCategory
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  expanded?: boolean
}

const CookieCategoryItem = ({
  category,
  checked,
  onCheckedChange,
  expanded,
}: CookieCategoryItemProps) => {
  const t = useTranslations("cookieBanner")
  const Icon = category.icon

  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-lg border border-border/50 p-3",
        category.required && "bg-muted/30",
      )}
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10">
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-3">
          <Label
            htmlFor={`cookie-${category.id}`}
            className="text-sm font-medium cursor-pointer"
          >
            {t(`categories.${category.id}.title`)}
            {category.required && (
              <span className="ml-2 text-xs text-muted-foreground">
                ({t("required")})
              </span>
            )}
          </Label>
          <Switch
            id={`cookie-${category.id}`}
            checked={checked}
            onCheckedChange={onCheckedChange}
            disabled={category.required}
          />
        </div>
        {expanded && (
          <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
            {t(`categories.${category.id}.description`)}
          </p>
        )}
      </div>
    </div>
  )
}

export const CookieSettingsButton = () => {
  const t = useTranslations("cookieBanner")
  const openBanner = useCookieStore(state => state.openBanner)

  return (
    <button
      onClick={openBanner}
      className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
    >
      <Cookie className="h-3.5 w-3.5" />
      {t("manage")}
    </button>
  )
}
