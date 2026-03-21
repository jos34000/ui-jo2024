"use client"

import { User } from "lucide-react"
import { useAppForm } from "@/lib/hooks/useAppForm"
import { registerSchema } from "@/lib/schemas/register.schema"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/lib/stores/auth.store"
import { z } from "zod"
import { apiClient, parseApiError } from "@/lib/utils/apiClient"
import { toast } from "sonner"
import { useTranslations } from "next-intl"

type RegisterFormValues = z.infer<typeof registerSchema>

export const RegisterForm = () => {
  const router = useRouter()
  const { setUser } = useAuthStore()
  const t = useTranslations("registerForm")

  const registerForm = useAppForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      enableTwoFactor: false,
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
            enableTwoFactor: value.enableTwoFactor,
          }),
        })

        if (!response.ok) {
          toast.error(await parseApiError(response, t("error")))
          return
        }

        const data = await response.json()
        setUser(data.user)

        toast.success(t("success"))
        router.push("/")
      } catch (error) {
        console.error("Register error:", error)
        toast.error(t("genericError"))
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
            <field.TextField label={t("firstName")} placeholder={t("firstNamePlaceholder")} />
          )}
        </registerForm.AppField>

        <registerForm.AppField name="lastName">
          {field => (
            <field.TextField
              label={t("lastName")}
              placeholder={t("lastNamePlaceholder")}
            />
          )}
        </registerForm.AppField>
      </div>

      <registerForm.AppField name="email">
        {field => (
          <field.TextField
            label={t("email")}
            placeholder={t("emailPlaceholder")}
            icon={<User />}
          />
        )}
      </registerForm.AppField>

      <registerForm.AppField name="password">
        {field => (
          <field.PasswordField
            label={t("password")}
            placeholder={t("passwordPlaceholder")}
            showForgetPassword={false}
          />
        )}
      </registerForm.AppField>

      <registerForm.AppField name="confirmPassword">
        {field => (
          <field.PasswordField
            label={t("confirmPassword")}
            placeholder={t("confirmPasswordPlaceholder")}
            showForgetPassword={false}
          />
        )}
      </registerForm.AppField>
      <registerForm.AppField name="enableTwoFactor">
        {field => <field.TwoFactorField />}
      </registerForm.AppField>

      <registerForm.AppField name="acceptTerms">
        {field => <field.AcceptTermsField />}
      </registerForm.AppField>

      <registerForm.AppForm>
        <registerForm.SubmitButton className="w-full">
          {t("submit")}
        </registerForm.SubmitButton>
      </registerForm.AppForm>
    </form>
  )
}
