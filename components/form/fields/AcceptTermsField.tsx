import { Checkbox } from "@/components/ui/checkbox"
import { useFieldContext } from "@/lib/hooks/useAppForm"
import { ComponentProps } from "react"
import { Field, FieldLabel } from "@/components/ui/field"
import Link from "next/link"

export const AcceptTermsField = (props: ComponentProps<typeof Checkbox>) => {
  const field = useFieldContext<boolean>()
  const error = field.state.meta.errors[0]?.message
  return (
    <Field orientation="horizontal">
      <Checkbox
        {...props}
        id="acceptTerms"
        checked={field.state.value}
        onCheckedChange={checked => field.handleChange(checked === true)}
        className="mt-1"
        aria-invalid={error !== undefined}
      />
      <FieldLabel htmlFor="acceptTerms">
        J&apos;accepte les{" "}
        <Link href="#" className="text-primary hover:underline">
          conditions d&apos;utilisation
        </Link>{" "}
        et la{" "}
        <Link href="#" className="text-primary hover:underline">
          politique de confidentialité
        </Link>
      </FieldLabel>
    </Field>
  )
}
