"use client"
import { useFieldContext } from "@/lib/hooks/formContexts"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { useTranslations } from "next-intl"
import { translateValidationError } from "@/lib/utils/validationErrors"

interface OTPFieldProps {
  label: string
}

export const OTPField = ({ label, ...otpProps }: Readonly<OTPFieldProps>) => {
  const tV = useTranslations("validation")
  const field = useFieldContext<string>()
  const rawError = field.state.meta.errors[0]?.message
  const error = rawError ? translateValidationError(rawError, tV) : undefined
  const slotClassName =
    "*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl"
  return (
    <Field>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <InputOTP
        {...otpProps}
        maxLength={6}
        value={field.state.value}
        name={field.name}
        onChange={field.handleChange}
        aria-invalid={!!error}
      >
        <InputOTPGroup className={slotClassName}>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup className={slotClassName}>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <FieldError>{error}</FieldError>
    </Field>
  )
}
