import { ComponentProps } from "react"
import { Shield } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useFieldValidation } from "@/lib/hooks/useFieldValidation"

export const TwoFactorField = (props: ComponentProps<typeof Switch>) => {
  const { field } = useFieldValidation<boolean>()
  return (
    <div className="flex items-center justify-between rounded-lg border border-border p-4">
      <div className="flex items-start gap-3">
        <Shield className="h-5 w-5 text-primary mt-0.5 shrink-0" />
        <div className="space-y-1">
          <Label
            htmlFor="twoFactorEnabled"
            className="text-sm font-medium cursor-pointer"
          >
            Authentification a deux facteurs (2FA)
          </Label>
          <p className="text-xs text-muted-foreground">
            Recevez un code de verification par email a chaque connexion
          </p>
        </div>
      </div>
      <Switch
        {...props}
        id="twoFactorEnabled"
        checked={field.state.value}
        onCheckedChange={checked => field.handleChange(checked)}
      />
    </div>
  )
}
