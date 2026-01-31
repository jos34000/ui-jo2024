import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useFieldContext } from "@/lib/hooks/useAppForm";
import { ComponentProps } from "react";

export function AcceptTermsField(props: ComponentProps<typeof Checkbox>) {
  const field = useFieldContext<boolean>();

  return (
    <div className="space-y-2">
      <div className="flex items-start space-x-2">
        <Checkbox
          {...props}
          id="acceptTerms"
          checked={field.state.value}
          onCheckedChange={(checked) => field.handleChange(checked === true)}
          className="mt-1"
        />
        <Label
          htmlFor="acceptTerms"
          className="text-sm font-normal cursor-pointer leading-relaxed"
        >
          J&apos;accepte les{" "}
          <a href="#" className="text-primary hover:underline">
            conditions d&apos;utilisation
          </a>{" "}
          et la{" "}
          <a href="#" className="text-primary hover:underline">
            politique de confidentialité
          </a>
        </Label>
      </div>
      {field.state.meta.errors.length > 0 && (
        <p className="text-sm text-destructive">
          {field.state.meta.errors[0]?.message}
        </p>
      )}
    </div>
  );
}
