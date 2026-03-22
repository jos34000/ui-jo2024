import { useFieldContext } from "@/lib/hooks/formContexts"
import { ComponentProps, useState } from "react"
import { Input } from "@/components/ui/input"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Eye, EyeOff, Lock } from "lucide-react"
import { ResetPasswordDialog } from "@/components/ResetPasswordDialog"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"
import { translateValidationError } from "@/lib/utils/validationErrors"

interface PasswordFieldProps extends ComponentProps<typeof Input> {
  label: string
  showForgetPassword: boolean
  resetPasswordMode?: "request" | "change"
}

export const PasswordField = ({
  label,
  showForgetPassword,
  resetPasswordMode,
  placeholder,
  ...inputProps
}: Readonly<PasswordFieldProps>) => {
  const t = useTranslations("common")
  const tV = useTranslations("validation")
  const field = useFieldContext<string>()
  const rawError = field.state.meta.errors[0]?.message
  const error = rawError ? translateValidationError(rawError, tV) : undefined
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Field>
      <div className="flex items-center justify-between">
        <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
        {showForgetPassword && resetPasswordMode && (
          <ResetPasswordDialog
            mode={resetPasswordMode}
            trigger={
              <Button
                variant="link"
                className="h-auto p-0 text-sm"
                type="button"
              >
                {t("forgotPassword")}
              </Button>
            }
          />
        )}
      </div>
      <InputGroup>
        <InputGroupInput
          {...inputProps}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          name={field.name}
          value={field.state.value}
          onChange={e => field.handleChange(e.target.value)}
          aria-invalid={!!error}
        />
        <InputGroupAddon>
          <Lock />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            aria-label={t("showPassword")}
            size="icon-xs"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <FieldError>{error}</FieldError>
    </Field>
  )
}
