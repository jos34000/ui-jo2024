import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface SettingsSectionProps {
  title: string
  description: string
  icon: React.ReactNode
  children: React.ReactNode
}

export const SettingsSection = ({
  title,
  description,
  icon,
  children,
}: SettingsSectionProps) => (
  <Card>
    <CardHeader>
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          {icon}
        </div>
        <div>
          <CardTitle className="text-lg font-mono">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </div>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
)
