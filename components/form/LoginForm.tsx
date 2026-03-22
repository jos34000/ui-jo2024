"use client"

import { useRouter } from "next/navigation"
import { useAppForm } from "@/lib/hooks/useAppForm"
import { toast } from "sonner"
import { loginSchema } from "@/lib/schemas/login.schema"
import { useAuthStore } from "@/lib/stores/auth.store"
import { apiClient, parseApiError } from "@/lib/utils/apiClient"
import { useState } from "react"
import { OTPDialog } from "@/components/OTPDialog"
import { User } from "@/lib/types/user.types"
import { User as UserIcon } from "lucide-react"
import { z } from "zod"
import { useTranslations } from "next-intl"

type LoginFormValues = z.infer<typeof loginSchema>

export const LoginForm = () => {
  const router = useRouter()
  const [showOtpDialog, setShowOtpDialog] = useState(false)
  const [pendingUser, setPendingUser] = useState<User | null>(null)
  const [pendingEmail, setPendingEmail] = useState("")
  const { setUser } = useAuthStore()
  const t = useTranslations("loginForm")
  const tErrors = useTranslations("errors")

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
          toast.error(await parseApiError(response, t("error"), tErrors))
          return
        }

        const data = await response.json()

        if (response.status === 202) {
          setPendingUser(data)
          setPendingEmail(data.email)
          setShowOtpDialog(true)
        } else {
          setUser(data)
          toast.success(t("success"))
          router.push("/")
        }
      } catch (error) {
        console.error("Login error:", error)
        toast.error(t("genericError"))
      }
    },
    validators: {
      onSubmit: loginSchema,
    },
  })

  return (
    <>
      {pendingUser && (
        <OTPDialog
          open={showOtpDialog}
          onOpenChange={setShowOtpDialog}
          pendingEmail={pendingEmail}
          pendingUser={pendingUser}
        />
      )}
      <form
        onSubmit={e => {
          e.preventDefault()
          e.stopPropagation()
          loginForm.handleSubmit()
        }}
        className="space-y-5"
      >
        <loginForm.AppField name="email">
          {field => (
            <field.TextField
              label={t("email")}
              placeholder={t("emailPlaceholder")}
              icon={<UserIcon />}
            />
          )}
        </loginForm.AppField>

        <loginForm.AppField name="password">
          {field => (
            <field.PasswordField
              label={t("password")}
              placeholder={t("passwordPlaceholder")}
              showForgetPassword={true}
              resetPasswordMode="request"
            ></field.PasswordField>
          )}
        </loginForm.AppField>

        <loginForm.AppField name="rememberMe">
          {field => <field.RememberMeField></field.RememberMeField>}
        </loginForm.AppField>

        <loginForm.AppForm>
          <loginForm.SubmitButton className="w-full">
            {t("submit")}
          </loginForm.SubmitButton>
        </loginForm.AppForm>
      </form>
    </>
  )
}
