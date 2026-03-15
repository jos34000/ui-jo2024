import { ButtonField } from "@/components/form/fields/ButtonField"
import { InputField } from "@/components/form/fields/InputField"
import { SelectField } from "@/components/form/fields/SelectField"
import { TextAreaField } from "@/components/form/fields/TextAreaField"
import { PasswordField } from "@/components/form/fields/PasswordField"
import { ExpiryField } from "@/components/form/fields/ExpiryField"
import { CvvField } from "@/components/form/fields/CvvField"
import { createFormHook } from "@tanstack/react-form"
import { RememberMeField } from "@/components/form/fields/RememberMeField"
import { AcceptTermsField } from "@/components/form/fields/AcceptTermsField"
import { TwoFactorField } from "@/components/form/fields/TwoFactorField"
import { OTPField } from "@/components/form/fields/OTPField"
import { fieldContext, formContext } from "./formContexts"

export { fieldContext, formContext, useFieldContext, useFormContext } from "./formContexts"

export const { useAppForm, withForm } = createFormHook({
  fieldComponents: {
    TextField: InputField,
    TextareaField: TextAreaField,
    SelectField: SelectField,
    PasswordField: PasswordField,
    RememberMeField: RememberMeField,
    AcceptTermsField: AcceptTermsField,
    TwoFactorField: TwoFactorField,
    OTPField: OTPField,
    ExpiryField: ExpiryField,
    CvvField: CvvField,
  },
  formComponents: {
    SubmitButton: ButtonField,
  },
  fieldContext,
  formContext,
})
