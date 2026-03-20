import { useFieldContext } from "@/lib/hooks/formContexts"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { InputGroup, InputGroupInput } from "@/components/ui/input-group"
import type { ChangeEvent } from "react"

export const ExpiryField = () => {
  const field = useFieldContext<string>()
  const error = field.state.meta.errors[0]?.message

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 4)
    const formatted = digits.length >= 3
      ? `${digits.slice(0, 2)}/${digits.slice(2)}`
      : digits
    field.handleChange(formatted)
  }

  return (
    <Field>
      <FieldLabel htmlFor={field.name}>Expiration</FieldLabel>
      <InputGroup>
        <InputGroupInput
          id={field.name}
          name={field.name}
          value={field.state.value}
          onChange={handleChange}
          placeholder="MM/AA"
          inputMode="numeric"
          maxLength={5}
          autoComplete="cc-exp"
          aria-invalid={!!error}
        />
      </InputGroup>
      <FieldError>{error}</FieldError>
    </Field>
  )
}
