import { useFieldContext } from "@/lib/hooks/formContexts"
import { ComponentProps, ReactNode } from "react"
import { Input } from "@/components/ui/input"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { useTranslations } from "next-intl"
import { translateValidationError } from "@/lib/utils/validationErrors"

interface InputFieldProps extends ComponentProps<typeof Input> {
  label: string
  icon?: ReactNode
}

export const InputField = ({
  label,
  icon,
  ...inputProps
}: Readonly<InputFieldProps>) => {
  const tV = useTranslations("validation")
  const field = useFieldContext<string>()
  const rawError = field.state.meta.errors[0]?.message
  const error = rawError ? translateValidationError(rawError, tV) : undefined
  return (
    <Field>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <InputGroup>
        <InputGroupInput
          {...inputProps}
          name={field.name}
          value={field.state.value}
          onChange={e => field.handleChange(e.target.value)}
          aria-invalid={!!error}
        />
        <InputGroupAddon>{icon}</InputGroupAddon>
      </InputGroup>
      <FieldError>{error}</FieldError>
    </Field>
  )
}
