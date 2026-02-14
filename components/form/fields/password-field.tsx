import { useFieldContext } from "@/lib/hooks/useAppForm"
import { ComponentProps, useState } from "react"
import { Input } from "@/components/ui/input"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Eye, EyeOff, Lock } from "lucide-react"
import Link from "next/link"

export function PasswordField({
  label,
  showForgetPassword,
  placeholder,
  ...inputProps
}: { label: string; showForgetPassword: boolean } & ComponentProps<
  typeof Input
>) {
  const field = useFieldContext<string>()
  const error = field.state.meta.errors[0]?.message
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Field>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
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
            aria-label="Show password"
            title="show"
            size="icon-xs"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <FieldError>{error}</FieldError>
      {showForgetPassword && (
        <FieldDescription>
          <Link href="/">Mot de passe oublié ? </Link>
        </FieldDescription>
      )}
    </Field>
  )
}
