"use client"

import { User } from "lucide-react"
import { useAppForm } from "@/lib/hooks/useAppForm"
import { RegisterFormValues } from "@/lib/types/Form"
import { registerAction } from "@/lib/actions/registerAction"
import { toast } from "sonner"
import { registerSchema } from "@/lib/schemas/FormValidation"
import { useRouter } from "next/navigation"

export const RegisterForm = () => {
  const router = useRouter()
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
      const result = await registerAction(value)
      if (result.success) {
        toast.success(result.message || "Inscription réussie")

        if (result.data?.token) {
          localStorage.setItem("token", result.data.token)
        }

        router.push("/")
      } else {
        toast.error(result.message || "Erreur lors de l'inscription")

        if (result.errors) {
          Object.entries(result.errors).forEach(([field, message]) => {
            toast.error(`${field}: ${message}`)
          })
        }
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
