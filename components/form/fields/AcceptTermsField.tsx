import { Checkbox } from "@/components/ui/checkbox"
import { ComponentProps } from "react"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import Link from "next/link"
import { useFieldValidation } from "@/lib/hooks/useFieldValidation"

export const AcceptTermsField = (props: ComponentProps<typeof Checkbox>) => {
  const { field, validation } = useFieldValidation<boolean>()
  return (
    <div className="flex flex-col gap-1">
      <Field orientation="horizontal">
        <Checkbox
          {...props}
          id="acceptTerms"
          checked={field.state.value}
          onCheckedChange={checked => field.handleChange(checked === true)}
          className="mt-1"
          aria-invalid={validation.invalid}
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
      <FieldError>{validation.error}</FieldError>
    </div>
  )
}
