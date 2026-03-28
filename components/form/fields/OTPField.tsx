"use client"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { useFieldValidation } from "@/lib/hooks/useFieldValidation"

interface OTPFieldProps {
  label: string
}

export const OTPField = ({ label, ...otpProps }: Readonly<OTPFieldProps>) => {
  const { field, validation } = useFieldValidation()
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
        aria-invalid={validation.invalid}
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
      <FieldError>{validation.error}</FieldError>
    </Field>
  )
}
