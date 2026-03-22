import { useFieldContext } from "@/lib/hooks/formContexts"
import { ComponentProps } from "react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useTranslations } from "next-intl"
import { translateValidationError } from "@/lib/utils/validationErrors"

interface TextareaFieldProps extends ComponentProps<typeof Textarea> {
  label: string
}

export const TextAreaField = ({
  label,
  ...textareaProps
}: Readonly<TextareaFieldProps>) => {
  const tV = useTranslations("validation")
  const field = useFieldContext<string>()
  const error = field.state.meta.errors
    .map(e => e.message ? translateValidationError(e.message, tV) : "")
    .filter(Boolean)
    .join(", ")
  return (
    <div className="space-y-2">
      <Label htmlFor={field.name} className="text-foreground">
        {label}
      </Label>
      <Textarea
        {...textareaProps}
        name={field.name}
        value={field.state.value}
        onChange={e => field.handleChange(e.target.value)}
        aria-invalid={!!error}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}
