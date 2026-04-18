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
        hasBorder && "border-b border-dashed border-border/40",
      )}
    >
      <Icon className="h-4 w-4 text-primary/60 shrink-0" />
      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground">
          {label}
        </p>
        <p
          className={cn(
            "text-sm font-medium truncate mt-0.5",
            !value && "text-muted-foreground italic",
          )}
        >
          {value || placeholder}
        </p>
      </div>
    </div>
  )
}
