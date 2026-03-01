import { cn } from "@/lib/utils"
import React from "react"

interface InfoRowProps {
  icon: React.ElementType
  label: string
  value?: string
  placeholder?: string
  hasBorder?: boolean
}

export const InfoRow = ({
  icon: Icon,
  label,
  value,
  placeholder,
  hasBorder,
}: InfoRowProps) => {
  return (
    <div
      className={cn(
        "flex items-center gap-3 py-3",
        hasBorder && "border-b border-border",
      )}
    >
      <Icon className="h-5 w-5 text-muted-foreground shrink-0" />
      <div className="min-w-0">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p
          className={cn(
            "font-medium truncate",
            !value && "text-muted-foreground italic",
          )}
        >
          {value || placeholder}
        </p>
      </div>
    </div>
  )
}
