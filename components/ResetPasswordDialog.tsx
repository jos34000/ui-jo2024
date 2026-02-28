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
import { resetPasswordSchema } from "@/lib/schemas/resetPassword.schema"
import { changePasswordSchema } from "@/lib/schemas/changePassword.schema"
import { useAppForm } from "@/lib/hooks/useAppForm"

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
  const [open, setOpen] = useState(false)
  const [success, setSuccess] = useState(false)

  const requestForm = useAppForm({
    defaultValues: {
      email: userEmail || "",
    },
    onSubmit: async ({ value }) => {
      console.log(value)
      setSuccess(true)
    },
    validators: {
      onSubmit: resetPasswordSchema,
    },
  })

  const changeForm = useAppForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    onSubmit: async ({ value }) => {
      console.log(value)
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
          <h3 className="text-lg font-semibold mb-2">Email envoyé</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Si un compte existe avec cette adresse, vous recevrez un email avec
            les instructions pour reinitialiser votre mot de passe.
          </p>
          <Button onClick={() => handleOpenChange(false)} className="w-full">
            Fermer
          </Button>
        </div>
      )
    }

    return (
      <form
        onSubmit={e => {
          e.preventDefault()
          e.stopPropagation()
          requestForm.handleSubmit()
        }}
        className="space-y-4"
      >
        <requestForm.AppField name="email">
          {field => (
            <field.TextField
              label="Adresse email"
              placeholder="votre@email.com"
              icon={<Mail />}
            />
          )}
        </requestForm.AppField>

        <requestForm.AppForm>
          <requestForm.SubmitButton className="w-full">
            Envoyer le lien
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
          <h3 className="text-lg font-semibold mb-2">Mot de passe modifié</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Votre mot de passe a ete modifie avec succes. Vous pouvez maintenant
            utiliser votre nouveau mot de passe pour vous connecter.
          </p>
          <Button onClick={() => handleOpenChange(false)} className="w-full">
            Fermer
          </Button>
        </div>
      )
    }

    return (
      <form
        onSubmit={e => {
          e.preventDefault()
          e.stopPropagation()
          changeForm.handleSubmit()
        }}
        className="space-y-4"
      >
        <changeForm.AppField name="currentPassword">
          {field => (
            <field.PasswordField
              label="Mot de passe actuel"
              showForgetPassword={false}
              placeholder="Votre mot de passe actuel"
            />
          )}
        </changeForm.AppField>
        <changeForm.AppField name="newPassword">
          {field => (
            <field.PasswordField
              label="Nouveau mot de passe."
              showForgetPassword={false}
              placeholder="Nouveau mot de passe"
            />
          )}
        </changeForm.AppField>
        <changeForm.AppField name="confirmPassword">
          {field => (
            <field.PasswordField
              label="Confirmez le mot de passe."
              showForgetPassword={false}
              placeholder="Confirmation"
            />
          )}
        </changeForm.AppField>

        <changeForm.AppForm>
          <changeForm.SubmitButton className="w-full">
            Modifier le mot de passe
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
            Mot de passe oublie ?
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-mono">
            {mode === "request"
              ? "Reinitialiser le mot de passe"
              : "Changer le mot de passe"}
          </DialogTitle>
          <DialogDescription>
            {mode === "request"
              ? "Entrez votre adresse email pour recevoir un lien de reinitialisation."
              : "Entrez votre mot de passe actuel puis choisissez un nouveau mot de passe."}
          </DialogDescription>
        </DialogHeader>
        {mode === "request" ? renderRequestForm() : renderChangeForm()}
      </DialogContent>
    </Dialog>
  )
}
