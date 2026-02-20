import { Checkbox } from "@/components/ui/checkbox"
import { useFieldContext } from "@/lib/hooks/useAppForm"
import { ComponentProps } from "react"
import { Field, FieldLabel } from "@/components/ui/field"

export const RememberMeField = (props: ComponentProps<typeof Checkbox>) => {
  const field = useFieldContext<boolean>()
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
