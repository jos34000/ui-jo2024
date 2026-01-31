import { ButtonField } from "@/components/form/button-field";
import { InputField } from "@/components/form/input-field";
import { SelectField } from "@/components/form/select-field";
import { TextareaField } from "@/components/form/textarea-field";
import { PasswordField } from "@/components/form/password-field";
import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { RemembermeField } from "@/components/form/rememberme-field";
import { AcceptTermsField } from "@/components/acceptTerms-field";

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm, withForm } = createFormHook({
  fieldComponents: {
    TextField: InputField,
    TextareaField: TextareaField,
    SelectField: SelectField,
    PasswordField: PasswordField,
    RememberMeField: RemembermeField,
    AcceptTermsField: AcceptTermsField,
  },
  formComponents: {
    SubmitButton: ButtonField,
  },
  fieldContext,
  formContext,
});
