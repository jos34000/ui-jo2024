import { Card, CardContent } from "@/components/ui/card"

interface StatCardProps {
  label: string
  value: number | string
  icon: React.ReactNode
  iconWrapperClassName: string
  valueClassName?: string
}

export const StatCard = ({
  label,
  value,
  icon,
  iconWrapperClassName,
  valueClassName,
}: StatCardProps) => (
  <Card>
    <CardContent className="p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p
            className={`text-2xl font-bold font-mono mt-1${valueClassName ? ` ${valueClassName}` : ""}`}
          >
            {value}
          </p>
        </div>
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-lg ${iconWrapperClassName}`}
        >
          {icon}
        </div>
      </div>
    </CardContent>
  </Card>
)
