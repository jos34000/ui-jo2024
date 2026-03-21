"use client"

import { CalendarDays } from "lucide-react"
import { useTranslations } from "next-intl"

interface NothingFoundProps {
  hasSportFilter: boolean
}

export const NothingFound = ({ hasSportFilter }: NothingFoundProps) => {
  const t = useTranslations("calendar")
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted mb-4">
        <CalendarDays className="h-7 w-7 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold font-mono">{t("noEventsFound")}</h3>
      <p className="text-sm text-muted-foreground mt-1 max-w-xs">
        {hasSportFilter
          ? t("noEventsForFilter")
          : t("noEventsForDay")}
      </p>
    </div>
  )
}
