"use client"

import { useRouter } from "next/navigation"
import { useAppForm } from "@/lib/hooks/useAppForm"
import { LoginFormValues } from "@/lib/types/Form"
import { toast } from "sonner"
import { loginSchema } from "@/lib/schemas/FormValidation"
import { User } from "lucide-react"
import { useAuthStore } from "@/lib/stores/authStore"
import { apiClient } from "@/lib/utils/apiClient"

export const LoginForm = () => {
  const router = useRouter()
  const { setUser } = useAuthStore()

  const loginForm = useAppForm({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    } as LoginFormValues,
    onSubmit: async ({ value }) => {
      try {
        const response = await apiClient("/auth/login", {
          method: "POST",
          body: JSON.stringify({
            email: value.email,
            password: value.password,
          }),
        })

        if (!response.ok) {
          const error = await response.json().catch(() => ({}))
          toast.error(error.message || "Email ou mot de passe incorrect")
          return
        }

        const data = await response.json()
        setUser(data.user)

        toast.success("Connexion réussie")
        router.push("/")
      } catch (error) {
        console.error("Login error:", error)
        toast.error("Une erreur est survenue")
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
