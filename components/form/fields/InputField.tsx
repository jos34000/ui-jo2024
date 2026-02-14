import { useFieldContext } from "@/lib/hooks/useAppForm"
import { ComponentProps, ReactNode } from "react"
import { Input } from "@/components/ui/input"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"

interface InputFieldProps extends ComponentProps<typeof Input> {
  label: string
  icon?: ReactNode
}

export const InputField = ({
  label,
  icon,
  ...inputProps
}: Readonly<InputFieldProps>) => {
  const field = useFieldContext<string>()
  const error = field.state.meta.errors[0]?.message
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
