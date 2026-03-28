"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { Mail, Shield } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useAppForm } from "@/lib/hooks/useAppForm"
import { User } from "@/lib/types/user.types"
import { api, ApiError, resolveApiErrorMessage } from "@/lib/utils/api"
import { toast } from "sonner"
import { useAuthStore } from "@/lib/stores/auth.store"
import { useTranslations } from "next-intl"

interface OTPDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  pendingEmail: string
  pendingUser: User | null
}

export const OTPDialog = ({
  open,
  onOpenChange,
  pendingEmail,
  pendingUser,
}: OTPDialogProps) => {
  const router = useRouter()
  const { setUser } = useAuthStore()
  const t = useTranslations("otp")
  const tErrors = useTranslations("errors")

  const form = useAppForm({
    defaultValues: {
      otp: "",
    },
    onSubmit: async ({ value }) => {
      try {
        await api("/2fa/verify", {
          method: "POST",
          body: { code: value.otp, email: pendingEmail },
        })
        setUser(pendingUser)
        onOpenChange(false)
        toast.success(t("success"))
        router.push("/")
      } catch (err) {
        if (err instanceof ApiError) {
          toast.error(resolveApiErrorMessage(err, tErrors, t("invalidCode")))
        } else {
          toast.error(t("invalidCode"))
        }
      }
    },
  })

  const maskedEmail = pendingEmail.replace(/(.{2})(.*)(@.*)/, "$1***$3")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-md"
        onInteractOutside={e => e.preventDefault()}
      >
        <DialogHeader className="text-center sm:text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <Shield className="h-7 w-7 text-primary" />
          </div>
          <DialogTitle className="text-xl font-mono">{t("title")}</DialogTitle>
          <DialogDescription className="text-center">
            {t("description", { email: maskedEmail })}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/50 p-3">
            <Mail className="h-5 w-5 text-muted-foreground shrink-0" />
            <div className="text-sm">
              <p className="text-muted-foreground">{t("instruction")}</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            <form
              className="flex flex-col gap-4"
              onSubmit={e => {
                e.preventDefault()
                e.stopPropagation()
                form.handleSubmit().then()
              }}
            >
              <form.AppField name="otp">
                {field => <field.OTPField label={t("label")} />}
              </form.AppField>
              <form.AppForm>
                <form.SubmitButton className="w-full">
                  {t("submit")}
                </form.SubmitButton>
              </form.AppForm>
            </form>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            {t("noCode")}{" "}
            <button type="button" className="text-primary hover:underline">
              {t("resend")}
            </button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
