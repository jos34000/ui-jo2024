import { cn } from "@/lib/utils"
import { ComponentProps } from "react"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useFieldValidation } from "@/lib/hooks/useFieldValidation"

interface SelectOption {
  label: string
  value: string
}
interface SelectFieldProps extends ComponentProps<typeof Select> {
  label: string
  options: SelectOption[]
  placeholder: string
}

export const SelectField = ({
  label,
  options,
  placeholder,
  ...selectProps
}: Readonly<SelectFieldProps>) => {
  const { field, validation } = useFieldValidation<string>()

  return (
    <Field>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <Select
        {...selectProps}
        name={field.name}
        onValueChange={field.handleChange}
      >
        <SelectTrigger
          className={cn(
            "bg-background text-foreground rounded-lg transition-all duration-300",
            validation.invalid ? "border-red-500" : "border-secondary",
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="bg-background border-secondary text-foreground">
          {options.map(item => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FieldError>{validation.error}</FieldError>
    </Field>
  )
}
