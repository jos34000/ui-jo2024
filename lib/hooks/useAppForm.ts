import { ButtonField } from "@/components/form/fields/button-field";
import { InputField } from "@/components/form/fields/input-field";
import { SelectField } from "@/components/form/fields/select-field";
import { TextareaField } from "@/components/form/fields/textarea-field";
import { PasswordField } from "@/components/form/fields/password-field";
import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { RemembermeField } from "@/components/form/fields/rememberme-field";
import { AcceptTermsField } from "@/components/form/fields/acceptTerms-field";

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
