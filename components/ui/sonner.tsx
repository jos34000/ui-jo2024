"use client"
import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
          // Success - Vert olympique
          "--success-bg": "var(--olympic-green)",
          "--success-text": "oklch(1 0 0)",
          "--success-border": "var(--olympic-green)",
          // Error - Rouge olympique
          "--error-bg": "var(--olympic-red)",
          "--error-text": "oklch(1 0 0)",
          "--error-border": "var(--olympic-red)",
          // Warning - Jaune olympique
          "--warning-bg": "var(--olympic-yellow)",
          "--warning-text": "var(--olympic-black)",
          "--warning-border": "var(--olympic-yellow)",
          // Info - Bleu olympique
          "--info-bg": "var(--olympic-blue)",
          "--info-text": "oklch(1 0 0)",
          "--info-border": "var(--olympic-blue)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
