import { useFieldContext } from "@/lib/hooks/formContexts"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { InputGroup, InputGroupInput } from "@/components/ui/input-group"
import type { ChangeEvent } from "react"
import { useTranslations } from "next-intl"
import { translateValidationError } from "@/lib/utils/validationErrors"

export const CvvField = () => {
  const tV = useTranslations("validation")
  const field = useFieldContext<string>()
  const rawError = field.state.meta.errors[0]?.message
  const error = rawError ? translateValidationError(rawError, tV) : undefined

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 3)
    field.handleChange(digits)
  }

  return (
    <Field>
      <FieldLabel htmlFor={field.name}>CVV</FieldLabel>
      <InputGroup>
        <InputGroupInput
          id={field.name}
          name={field.name}
          value={field.state.value}
          onChange={handleChange}
          placeholder="123"
          inputMode="numeric"
          maxLength={3}
          autoComplete="cc-csc"
          aria-invalid={!!error}
        />
      </InputGroup>
      <FieldError>{error}</FieldError>
    </Field>
  )
}
