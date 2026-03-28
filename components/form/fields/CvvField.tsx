import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { InputGroup, InputGroupInput } from "@/components/ui/input-group"
import type { ChangeEvent } from "react"
import { useFieldValidation } from "@/lib/hooks/useFieldValidation"

export const CvvField = () => {
  const { field, validation } = useFieldValidation()

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
          aria-invalid={validation.invalid}
        />
      </InputGroup>
      <FieldError>{validation.error}</FieldError>
    </Field>
  )
}
