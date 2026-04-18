"use client"

import { useTranslations } from "next-intl"
import { useTranslateSport } from "@/lib/utils/i18nHelpers"
import { cn } from "@/lib/utils"

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

  const pillBase = "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.1em] transition-all duration-150 border"
  const pillActive = "bg-primary text-primary-foreground border-primary shadow-sm"
  const pillInactive = "bg-card border-border/40 text-muted-foreground hover:border-border/80 hover:text-foreground"

  return (
    <div className="flex flex-wrap gap-1.5">
      <button
        key="all-categories"
        onClick={() => onSelect(null)}
        className={cn(pillBase, !selected ? pillActive : pillInactive)}
      >
        {!selected && <span className="w-1.5 h-1.5 rounded-full block bg-primary-foreground" />}
        {t("allCategories")}
      </button>
      {categories.map((cat, index) => (
        <button
          key={`sport-${index}-${cat}`}
          onClick={() => onSelect(selected === cat ? null : cat)}
          className={cn(pillBase, selected === cat ? pillActive : pillInactive)}
        >
          {selected === cat && (
            <span className="w-1.5 h-1.5 rounded-full block bg-primary-foreground" />
          )}
          {translateSport(cat)}
        </button>
      ))}
    </div>
  )
}
