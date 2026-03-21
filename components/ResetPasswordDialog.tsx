"use client"

import React, { useState } from "react"
import { CheckCircle2, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { emailForReset } from "@/lib/schemas/resetPassword.schema"
import { changePasswordSchema } from "@/lib/schemas/changePassword.schema"
import { useAppForm } from "@/lib/hooks/useAppForm"
import { apiClient, parseApiError } from "@/lib/utils/apiClient"
import { toast } from "sonner"
import { useTranslations } from "next-intl"

interface ResetPasswordDialogProps {
  mode: "request" | "change" | undefined
  trigger?: React.ReactNode
  userEmail?: string
}

export const ResetPasswordDialog = ({
  mode,
  trigger,
  userEmail,
}: ResetPasswordDialogProps) => {
  const t = useTranslations("changePassword")
  const [open, setOpen] = useState(false)
  const [success, setSuccess] = useState(false)

  const requestForm = useAppForm({
    defaultValues: {
      email: userEmail || "",
    },
    onSubmit: async ({ value }) => {
      try {
        const response = await apiClient("/user/forget-password", {
          method: "POST",
          body: JSON.stringify({
            email: value.email,
          }),
        })

        if (!response.ok) {
          toast.error(await parseApiError(response, t("genericError")))
          return
        }

        toast.success(t("requestSent"))
        setSuccess(true)
      } catch (error) {
        console.error("Reset error:", error)
        toast.error(t("genericError"))
      }
    },
    validators: {
      onSubmit: emailForReset,
    },
  })

  const changeForm = useAppForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    onSubmit: async ({ value }) => {
      try {
        const response = await apiClient("/user/password", {
          method: "PUT",
          body: JSON.stringify({
            oldPassword: value.currentPassword,
            newPassword: value.newPassword,
          }),
        })

        if (!response.ok) {
          toast.error(await parseApiError(response, t("genericError")))
          return
        }

        toast.success(t("changeSuccess"))
        setSuccess(true)
      } catch (error) {
        console.error("Update error:", error)
        toast.error(t("genericError"))
      }
    },
    validators: {
      onSubmit: changePasswordSchema,
    },
  })

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
    if (!newOpen) {
      requestForm.reset()
      changeForm.reset()
    }
  }

  const renderRequestForm = () => {
    if (success) {
      return (
        <div className="flex flex-col items-center py-6 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
            <CheckCircle2 className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2">{t("emailSentTitle")}</h3>
          <p className="text-sm text-muted-foreground mb-6">
            {t("emailSentDescription")}
          </p>
          <Button onClick={() => handleOpenChange(false)} className="w-full">
            {t("close")}
          </Button>
        </div>
      )
    }

    return (
      <form
        onSubmit={e => {
          e.preventDefault()
          e.stopPropagation()
          requestForm.handleSubmit().then()
        }}
        className="space-y-4"
      >
        <requestForm.AppField name="email">
          {field => (
            <field.TextField
              label={t("emailLabel")}
              placeholder={t("emailPlaceholder")}
              icon={<Mail />}
            />
          )}
        </requestForm.AppField>

        <requestForm.AppForm>
          <requestForm.SubmitButton className="w-full">
            {t("sendLink")}
          </requestForm.SubmitButton>
        </requestForm.AppForm>
      </form>
    )
  }

  const renderChangeForm = () => {
    if (success) {
      return (
        <div className="flex flex-col items-center py-6 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
            <CheckCircle2 className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2">{t("successTitle")}</h3>
          <p className="text-sm text-muted-foreground mb-6">
            {t("successDescription")}
          </p>
          <Button onClick={() => handleOpenChange(false)} className="w-full">
            {t("close")}
          </Button>
        </div>
      )
    }

    return (
      <form
        onSubmit={e => {
          e.preventDefault()
          e.stopPropagation()
          changeForm.handleSubmit().then()
        }}
        className="space-y-4"
      >
        <changeForm.AppField name="currentPassword">
          {field => (
            <field.PasswordField
              label={t("currentPassword")}
              showForgetPassword={false}
              placeholder={t("currentPasswordPlaceholder")}
            />
          )}
        </changeForm.AppField>
        <changeForm.AppField name="newPassword">
          {field => (
            <field.PasswordField
              label={t("newPassword")}
              showForgetPassword={false}
              placeholder={t("newPasswordPlaceholder")}
            />
          )}
        </changeForm.AppField>
        <changeForm.AppField name="confirmPassword">
          {field => (
            <field.PasswordField
              label={t("confirmPassword")}
              showForgetPassword={false}
              placeholder={t("confirmPasswordPlaceholder")}
            />
          )}
        </changeForm.AppField>

        <changeForm.AppForm>
          <changeForm.SubmitButton className="w-full">
            {t("submit")}
          </changeForm.SubmitButton>
        </changeForm.AppForm>
      </form>
    )
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || (
          <button
            type="button"
            className="text-sm text-primary hover:underline"
          >
            {t("forgotTrigger")}
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-mono">
            {mode === "request" ? t("forgotTitle") : t("changeTitle")}
          </DialogTitle>
          <DialogDescription>
            {mode === "request" ? t("forgotDescription") : t("changeDescription")}
          </DialogDescription>
        </DialogHeader>
        {mode === "request" ? renderRequestForm() : renderChangeForm()}
      </DialogContent>
    </Dialog>
  )
}
