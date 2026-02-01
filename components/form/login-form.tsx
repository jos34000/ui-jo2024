"use client"

import { useRouter } from "next/navigation"
import { useAppForm } from "@/lib/hooks/useAppForm"
import { LoginFormValues } from "@/lib/types/Form"
import { loginAction } from "@/lib/actions/loginAction"
import { toast } from "sonner"
import { loginSchema } from "@/lib/schemas/FormValidation"
import { User } from "lucide-react"

export const LoginForm = () => {
  const router = useRouter()

  const loginForm = useAppForm({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    } as LoginFormValues,
    onSubmit: async ({ value }) => {
      const result = await loginAction(value)
      if (result.success) {
        toast.success(result.message || "Connexion réussie")

        if (result.data?.accessToken && result.data?.refreshToken) {
          localStorage.setItem("accessToken", result.data.accessToken)
          localStorage.setItem("refreshToken", result.data.refreshToken)
        }

        router.push("/")
      } else {
        toast.error(result.message || "Erreur lors de la connexion")

        if (result.errors) {
          Object.entries(result.errors).forEach(([field, message]) => {
            toast.error(`${field}: ${message}`)
          })
        }
      }
    },
    validators: {
      onSubmit: loginSchema,
    },
  })

  return (
    <form
      onSubmit={async e => {
        e.preventDefault()
        e.stopPropagation()
        await loginForm.handleSubmit()
      }}
      className="space-y-5"
    >
      <loginForm.AppField name="email">
        {field => (
          <field.TextField
            label="E-mail"
            placeholder="Entrez votre mail"
            icon={<User />}
          />
        )}
      </loginForm.AppField>

      <loginForm.AppField name="password">
        {field => (
          <field.PasswordField
            label="Mot de passe"
            placeholder="Entrez votre mot de passe ..."
            showForgetPassword={true}
          ></field.PasswordField>
        )}
      </loginForm.AppField>

      <loginForm.AppField name="rememberMe">
        {field => <field.RememberMeField></field.RememberMeField>}
      </loginForm.AppField>

      <loginForm.AppForm>
        <loginForm.SubmitButton className="w-full">
          Se connecter
        </loginForm.SubmitButton>
      </loginForm.AppForm>
    </form>
  )
}
