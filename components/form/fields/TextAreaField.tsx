import { ComponentProps } from "react"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import { useFieldValidation } from "@/lib/hooks/useFieldValidation"

interface TextareaFieldProps extends ComponentProps<typeof Textarea> {
  label: string
}

export const TextAreaField = ({
  label,
  ...textareaProps
}: Readonly<TextareaFieldProps>) => {
  const { field, validation } = useFieldValidation<string>()
  return (
    <Field>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <Textarea
        {...textareaProps}
        name={field.name}
        value={field.state.value}
        onChange={e => field.handleChange(e.target.value)}
        aria-invalid={validation.invalid}
      />
      <FieldError>{validation.error}</FieldError>
    </Field>
  )
}
