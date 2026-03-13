"use client"

import { z } from "zod"
import { UserIcon } from "lucide-react"
import { useAuthStore } from "@/lib/stores/auth.store"
import { profileSchema } from "@/lib/schemas/profile.schema"
import { StoredUser } from "@/lib/types/user.types"
import { useAppForm } from "@/lib/hooks/useAppForm"
import { Button } from "@/components/ui/button"
import { apiClient, parseApiError } from "@/lib/utils/apiClient"
import { toast } from "sonner"

type ProfileFormValues = z.infer<typeof profileSchema>

interface ProfileFormProps {
  user: StoredUser
  onCancel: () => void
  onSuccess: () => void
}

export const ProfileForm = ({
  user,
  onCancel,
  onSuccess,
}: ProfileFormProps) => {
  const updateUser = useAuthStore(state => state.updateUser)

  const form = useAppForm({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      twoFactor: user.mfaEnabled,
    } as ProfileFormValues,
    onSubmit: async ({ value }) => {
      const response = await apiClient("/user", {
        method: "PUT",
        body: JSON.stringify(value),
      })
      if (!response.ok) {
        toast.error(await parseApiError(response, "Erreur lors de la mise à jour du profil"))
        return
      }
      const data = await response.json()
      updateUser(data)
      onSuccess()
    },
    validators: {
      onSubmit: profileSchema,
    },
  })

  return (
    <form
      onSubmit={async e => {
        e.preventDefault()
        e.stopPropagation()
        await form.handleSubmit()
      }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider font-mono">
          Identite
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <form.AppField name="firstName">
            {field => (
              <field.TextField
                label="Prenom"
                placeholder="Votre prénom"
                icon={<UserIcon />}
              />
            )}
          </form.AppField>
          <form.AppField name="lastName">
            {field => <field.TextField label="Nom" placeholder="Votre nom" />}
          </form.AppField>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider font-mono">
          Contact
        </h3>
        <div className="space-y-4">
          <form.AppField name="email">
            {field => (
              <field.TextField label="Email" placeholder="votre@email.com" />
            )}
          </form.AppField>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider font-mono">
          Securité
        </h3>
        <div className="space-y-4">
          <form.AppField name="twoFactor">
            {field => <field.TwoFactorField />}
          </form.AppField>
        </div>
      </div>

      <div className="flex flex-col gap-3 pt-2 border-t border-border">
        <form.AppForm>
          <form.SubmitButton className="w-full">Modifier</form.SubmitButton>
        </form.AppForm>
        <Button
          variant="secondary"
          className="w-full"
          onClick={() => onCancel()}
        >
          Annuler
        </Button>
      </div>
    </form>
  )
}
