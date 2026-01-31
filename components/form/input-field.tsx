import { useFieldContext } from "@/lib/hooks/useAppForm";
import { ComponentProps, ReactNode } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

export function InputField({
  label,
  icon,
  ...inputProps
}: { label: string; icon?: ReactNode } & ComponentProps<typeof Input>) {
  const field = useFieldContext<string>();
  const error = field.state.meta.errors[0]?.message;
  return (
    <div className="space-y-2">
      <Label htmlFor={field.name}>{label}</Label>
      <InputGroup>
        <InputGroupInput
          {...inputProps}
          name={field.name}
          value={field.state.value}
          onChange={(e) => field.handleChange(e.target.value)}
          aria-invalid={!!error}
          className="bg-background text-foreground"
        />
        <InputGroupAddon>{icon}</InputGroupAddon>
      </InputGroup>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
