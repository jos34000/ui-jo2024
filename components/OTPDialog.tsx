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
import { apiClient } from "@/lib/utils/apiClient"
import { toast } from "sonner"
import { useAuthStore } from "@/lib/stores/auth.store"

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

  const form = useAppForm({
    defaultValues: {
      otp: "",
    },
    onSubmit: async ({ value }) => {
      const res = await apiClient("/2fa/verify", {
        method: "POST",
        body: JSON.stringify({ code: value.otp, email: pendingEmail }),
      })

      if (res.ok) {
        setUser(pendingUser)
        onOpenChange(false)
        toast.success("Connexion réussie!")
        router.push("/")
      } else {
        const error = await res.json().catch(() => ({}))
        toast.error(error.message || "Code invalide.")
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
          <DialogTitle className="text-xl font-mono">
            Vérification en deux étapes
          </DialogTitle>
          <DialogDescription className="text-center">
            Un code de vérification a été envoyé a{" "}
            <span className="font-medium text-foreground">{maskedEmail}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/50 p-3">
            <Mail className="h-5 w-5 text-muted-foreground shrink-0" />
            <div className="text-sm">
              <p className="text-muted-foreground">
                Consultez votre boite de reception et entrez le code a 6
                chiffres
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            <form
              className="flex flex-col gap-4"
              onSubmit={e => {
                e.preventDefault()
                e.stopPropagation()
                form.handleSubmit()
              }}
            >
              <form.AppField name="otp">
                {field => <field.OTPField label="Code" />}
              </form.AppField>
              <form.AppForm>
                <form.SubmitButton className="w-full">Send</form.SubmitButton>
              </form.AppForm>
            </form>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            {"Vous n'avez pas recu le code ? Verifiez vos spams ou"}{" "}
            <button type="button" className="text-primary hover:underline">
              renvoyez-le
            </button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
