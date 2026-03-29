import { Checkbox } from "@/components/ui/checkbox"
import { ComponentProps } from "react"
import { Field, FieldLabel } from "@/components/ui/field"
import { useFieldValidation } from "@/lib/hooks/useFieldValidation"

export const RememberMeField = (props: ComponentProps<typeof Checkbox>) => {
  const { field } = useFieldValidation<boolean>()
  return (
    <Field orientation={"horizontal"}>
      <Checkbox
        {...props}
        id="rememberMe"
        checked={field.state.value}
        onCheckedChange={checked => field.handleChange(checked === true)}
      />
      <FieldLabel htmlFor="rememberMe">Se souvenir de moi.</FieldLabel>
    </Field>
  )
}
