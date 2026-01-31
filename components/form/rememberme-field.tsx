import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useFieldContext } from "@/lib/hooks/useAppForm";
import { ComponentProps } from "react";

export function RemembermeField(props: ComponentProps<typeof Checkbox>) {
  const field = useFieldContext<boolean>();
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        {...props}
        id="rememberMe"
        checked={field.state.value}
        onCheckedChange={(checked) => field.handleChange(checked === true)}
      />
      <Label
        htmlFor="rememberMe"
        className="text-sm font-normal cursor-pointer"
      >
        Se souvenir de moi
      </Label>
    </div>
  );
}
