import { ButtonField } from "@/components/form/fields/ButtonField"
import { InputField } from "@/components/form/fields/InputField"
import { SelectField } from "@/components/form/fields/SelectField"
import { TextAreaField } from "@/components/form/fields/TextAreaField"
import { PasswordField } from "@/components/form/fields/PasswordField"
import { createFormHook, createFormHookContexts } from "@tanstack/react-form"
import { RememberMeField } from "@/components/form/fields/RememberMeField"
import { AcceptTermsField } from "@/components/form/fields/AcceptTermsField"

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts()

export const { useAppForm, withForm } = createFormHook({
  fieldComponents: {
    TextField: InputField,
    TextareaField: TextAreaField,
    SelectField: SelectField,
    PasswordField: PasswordField,
    RememberMeField: RememberMeField,
    AcceptTermsField: AcceptTermsField,
  },
  formComponents: {
    SubmitButton: ButtonField,
  },
  fieldContext,
  formContext,
})
