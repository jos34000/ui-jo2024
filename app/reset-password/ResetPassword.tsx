"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { AlertCircle, ArrowLeft, CheckCircle2, Loader2 } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { useAppForm } from "@/lib/hooks/useAppForm"
import { OlympicRings } from "@/lib/svg/OlympicRings"
import { resetPasswordSchema } from "@/lib/schemas/resetPassword.schema"
import { apiClient } from "@/lib/utils/apiClient"
import { useTranslations } from "next-intl"

type PageState = "loading" | "valid" | "invalid" | "expired" | "success"

export default function ResetPassword() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const [pageState, setPageState] = useState<PageState>("loading")
  const t = useTranslations("resetPassword")

  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setPageState("invalid")
        return
      }
      try {
        const result = await apiClient(
          `/users/validate-reset-token?token=${token}`,
        )
        if (result.status === 200) setPageState("valid")
        else if (result.status === 410) setPageState("expired")
        else if (result.status === 400) setPageState("invalid")
        else setPageState("success")
      } catch (error: any) {
        console.error(error)
      }
    }
    void validateToken()
  }, [token])

  const form = useAppForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    onSubmit: async () => {
      await new Promise(resolve => setTimeout(resolve, 1500))
      setPageState("success")
    },
    validators: {
      onSubmit: resetPasswordSchema,
    },
  })

  const renderContent = () => {
    switch (pageState) {
      case "loading":
        return (
          <div className="flex flex-col items-center py-12 text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <h2 className="text-xl font-semibold font-mono mb-2">
              {t("loading")}
            </h2>
            <p className="text-muted-foreground">
              {t("loadingSubtitle")}
            </p>
          </div>
        )

      case "invalid":
        return (
          <div className="flex flex-col items-center py-12 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 mb-4">
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
            <h2 className="text-xl font-semibold font-mono mb-2">
              {t("invalidTitle")}
            </h2>
            <p className="text-muted-foreground mb-6 max-w-sm">
              {t("invalidDescription")}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline" asChild className="bg-transparent">
                <Link href="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {t("backToLogin")}
                </Link>
              </Button>
              <Button asChild>
                <Link href="/auth">{t("requestNew")}</Link>
              </Button>
            </div>
          </div>
        )

      case "expired":
        return (
          <div className="flex flex-col items-center py-12 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 mb-4">
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
            <h2 className="text-xl font-semibold font-mono mb-2">
              {t("expiredTitle")}
            </h2>
            <p className="text-muted-foreground mb-6 max-w-sm">
              {t("expiredDescription")}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline" asChild className="bg-transparent">
                <Link href="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {t("backToLogin")}
                </Link>
              </Button>
              <Button asChild>
                <Link href="/auth">{t("requestNew")}</Link>
              </Button>
            </div>
          </div>
        )

      case "success":
        return (
          <div className="flex flex-col items-center py-12 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
              <CheckCircle2 className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-xl font-semibold font-mono mb-2">
              {t("successTitle")}
            </h2>
            <p className="text-muted-foreground mb-6 max-w-sm">
              {t("successDescription")}
            </p>
            <Button asChild>
              <Link href="/auth">{t("signIn")}</Link>
            </Button>
          </div>
        )

      case "valid":
        return (
          <>
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl text-center font-mono">
                {t("newPasswordTitle")}
              </CardTitle>
              <CardDescription className="text-center">
                {t("newPasswordSubtitle")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={e => {
                  e.preventDefault()
                  e.stopPropagation()
                  form.handleSubmit()
                }}
                className="space-y-4"
              >
                <form.AppField name="password">
                  {field => (
                    <field.PasswordField
                      label={t("newPassword")}
                      placeholder={t("newPasswordPlaceholder")}
                      showForgetPassword={false}
                    />
                  )}
                </form.AppField>
                <form.AppField name="confirmPassword">
                  {field => (
                    <field.PasswordField
                      label={t("confirmPassword")}
                      placeholder={t("confirmPasswordPlaceholder")}
                      showForgetPassword={false}
                    />
                  )}
                </form.AppField>
                <form.AppForm>
                  <form.SubmitButton className="w-full">
                    {t("submit")}
                  </form.SubmitButton>
                </form.AppForm>
              </form>

              <div className="mt-6 text-center">
                <Button variant="ghost" asChild>
                  <Link href="/auth">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {t("backToLogin")}
                  </Link>
                </Button>
              </div>
            </CardContent>
          </>
        )
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b border-border bg-background/95 backdrop-blur shrink-0">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
          <Link href="/" className="flex items-center gap-3">
            <OlympicRings className="h-7 sm:h-8 w-auto" />
            <span className="font-bold text-lg sm:text-xl tracking-tight font-mono">
              Paris <span className="text-primary">2024</span>
            </span>
          </Link>
          <ThemeToggle />
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
        <Card className="w-full max-w-md border-border/50 shadow-lg">
          {renderContent()}
        </Card>
      </main>

      <footer className="border-t border-border shrink-0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between gap-3 text-xs sm:text-sm text-muted-foreground">
            <p className="shrink-0">Paris 2024</p>
            <nav className="flex items-center gap-3 sm:gap-6">
              <a href="#" className="hover:text-primary transition-colors">
                {t("footerHelp")}
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                {t("footerPrivacy")}
              </a>
              <a
                href="#"
                className="hidden sm:inline hover:text-primary transition-colors"
              >
                {t("footerTerms")}
              </a>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}
