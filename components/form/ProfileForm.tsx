"use client"

import { z } from "zod"
import { UserIcon } from "lucide-react"
import { useAuthStore } from "@/lib/stores/auth.store"
import { profileSchema } from "@/lib/schemas/profile.schema"
import { StoredUser } from "@/lib/types/user.types"
import { useAppForm } from "@/lib/hooks/useAppForm"
import { Button } from "@/components/ui/button"
import { apiClient } from "@/lib/utils/apiClient"

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
      password: undefined,
    } as ProfileFormValues,
    onSubmit: async ({ value }) => {
      const response = await apiClient("/user", {
        method: "PATCH",
        body: JSON.stringify(value),
      })
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
          <form.AppField name="password">
            {field => (
              <field.PasswordField
                label="Mot de passe"
                placeholder="*********"
                showForgetPassword={false}
              />
            )}
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
