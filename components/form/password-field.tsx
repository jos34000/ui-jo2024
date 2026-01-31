import {useFieldContext} from "@/lib/hooks/useAppForm";
import {ComponentProps, useState} from "react";
import {Eye, EyeOff, Lock} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {cn} from "@/lib/utils";

export function PasswordField({
                                  label,
                                  placeholder,
                                  className,
                                  ...inputProps
                              }: { label: string } & ComponentProps<typeof Input>) {
    const field = useFieldContext<string>();
    const error = field.state.meta.errors[0]?.message;
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <Label htmlFor={field.name}>{label}</Label>
                <button type="button" className="text-sm text-primary hover:underline">
                    Mot de passe oublié ?
                </button>
            </div>
            <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
                <Input
                    {...inputProps}
                    type={showPassword ? "text" : "password"}
                    placeholder={placeholder}
                    className={cn(
                        "pl-10 pr-10",
                        error && "border-destructive",
                        className
                    )}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    aria-invalid={!!error}
                />
                <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? (
                        <EyeOff className="h-4 w-4"/>
                    ) : (
                        <Eye className="h-4 w-4"/>
                    )}
                </button>
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
    );
}
