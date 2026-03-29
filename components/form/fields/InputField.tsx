import { ComponentProps, ReactNode } from "react"
import { Input } from "@/components/ui/input"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { useFieldValidation } from "@/lib/hooks/useFieldValidation"

interface InputFieldProps extends ComponentProps<typeof Input> {
  label: string
  icon?: ReactNode
}

export const InputField = ({
  label,
  icon,
  ...inputProps
}: Readonly<InputFieldProps>) => {
  const { field, validation } = useFieldValidation()
  return (
    <Field>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <InputGroup>
        <InputGroupInput
          {...inputProps}
          name={field.name}
          value={field.state.value}
          onChange={e => field.handleChange(e.target.value)}
          aria-invalid={validation.invalid}
        />
        <InputGroupAddon>{icon}</InputGroupAddon>
      </InputGroup>
      <FieldError>{validation.error}</FieldError>
    </Field>
  )
}
