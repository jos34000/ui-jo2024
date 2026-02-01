import { useFieldContext } from "@/lib/hooks/useAppForm"
import { cn } from "@/lib/utils"
import { ComponentProps } from "react"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SelectField({
  label,
  options,
  placeholder,
  ...selectProps
}: {
  label: string
  options: SelectOptions[]
  placeholder: string
} & ComponentProps<typeof Select>) {
  const field = useFieldContext<string>()
  const error = field.state.meta.errors[0]?.message
  return (
    <div className="space-y-2">
      <Label htmlFor={field.name}>{label}</Label>
      <Select
        {...selectProps}
        name={field.name}
        onValueChange={field.handleChange}
      >
        <SelectTrigger
          className={cn(
            "bg-background text-foreground rounded-lg transition-all duration-300",
            error ? "border-red-500" : "border-secondary"
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="bg-background border-secondary text-foreground">
          {options.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}
