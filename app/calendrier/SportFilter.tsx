"use client"

import { useTranslations } from "next-intl"
import { useTranslateSport } from "@/lib/utils/i18nHelpers"

interface SportFilterProps {
  selected: string | null
  onSelect: (sport: string | null) => void
  categories: string[]
}

export const SportFilter = ({
  selected,
  onSelect,
  categories,
}: SportFilterProps) => {
  const t = useTranslations("calendar")
  const translateSport = useTranslateSport()
  return (
    <div className="flex flex-wrap gap-1.5">
      <button
        key="all-categories"
        onClick={() => onSelect(null)}
        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
          selected
            ? "bg-card border border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
            : "bg-primary text-primary-foreground"
        }`}
      >
        {t("allCategories")}
      </button>
      {categories.map((cat, index) => (
        <button
          key={`sport-${index}-${cat}`}
          onClick={() => onSelect(selected === cat ? null : cat)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
            selected === cat
              ? "bg-primary text-primary-foreground"
              : "bg-card border border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
          }`}
        >
          {translateSport(cat)}
        </button>
      ))}
    </div>
  )
}
