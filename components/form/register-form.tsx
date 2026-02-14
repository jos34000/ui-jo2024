"use client"

import { User } from "lucide-react"
import { useAppForm } from "@/lib/hooks/useAppForm"
import { RegisterFormValues } from "@/lib/types/Form"
import { toast } from "sonner"
import { registerSchema } from "@/lib/schemas/FormValidation"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/lib/stores/authStore"
import { apiClient } from "@/lib/utils/apiClient"

export const RegisterForm = () => {
  const router = useRouter()
  const { setUser } = useAuthStore()

  const registerForm = useAppForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    } as RegisterFormValues,
    onSubmit: async ({ value }) => {
      try {
        const response = await apiClient("/auth/register", {
          method: "POST",
          body: JSON.stringify({
            email: value.email,
            password: value.password,
            firstName: value.firstName,
            lastName: value.lastName,
          }),
        })

        if (!response.ok) {
          const error = await response.json().catch(() => ({}))
          toast.error(error.message || "Erreur lors de l'inscription")
          return
        }

        const data = await response.json()
        setUser(data.user)

        toast.success("Inscription réussie")
        router.push("/")
      } catch (error) {
        console.error("Register error:", error)
        toast.error("Une erreur est survenue")
      }
    },
    validators: {
      onSubmit: registerSchema,
    },
  })
  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        e.stopPropagation()
        registerForm.handleSubmit()
      }}
      className="space-y-4"
    >
      <div className="grid grid-cols-2 gap-4">
        <registerForm.AppField name="firstName">
          {field => (
            <field.TextField label="Prénom" placeholder="Entrez votre prénom" />
          )}
        </registerForm.AppField>

        <registerForm.AppField name="lastName">
          {field => (
            <field.TextField
              label="Nom"
              placeholder="Entrez votre nom de famille"
            />
          )}
        </registerForm.AppField>
      </div>

      <registerForm.AppField name="email">
        {field => (
          <field.TextField
            label="E-mail"
            placeholder="Entrez votre mail"
            icon={<User />}
          />
        )}
      </registerForm.AppField>

      <registerForm.AppField name="password">
        {field => (
          <field.PasswordField
            label="Mot de passe"
            placeholder="Entrez votre mot de passe"
            showForgetPassword={false}
          />
        )}
      </registerForm.AppField>

      <registerForm.AppField name="confirmPassword">
        {field => (
          <field.PasswordField
            label="Confirmation"
            placeholder="Confirmez votre mot de passe"
            showForgetPassword={false}
          />
        )}
      </registerForm.AppField>

      <registerForm.AppField name="acceptTerms">
        {field => <field.AcceptTermsField />}
      </registerForm.AppField>

      <registerForm.AppForm>
        <registerForm.SubmitButton className="w-full">
          S&apos;enregistrer
        </registerForm.SubmitButton>
      </registerForm.AppForm>
    </form>
  )
}
