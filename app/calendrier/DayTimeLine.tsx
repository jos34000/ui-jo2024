import { useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import {
  formatDateFull,
  formatDay,
  formatDayNum,
  getMonth,
  olympicDays,
} from "@/lib/utils/date"
import { useTranslations } from "next-intl"

interface DayTimelineProps {
  selectedDate: string
  onSelectDate: (date: string) => void
  eventCounts: Record<string, number>
}

export const DayTimeline = ({
  selectedDate,
  onSelectDate,
  eventCounts,
}: DayTimelineProps) => {
  const t = useTranslations("calendar")
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: number) => {
    if (!scrollRef.current) return
    const scrollAmount = dir * 200
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
  }

  useEffect(() => {
    if (!scrollRef.current) return
    const selected = scrollRef.current.querySelector(
      `[data-date="${selectedDate}"]`,
    )
    if (selected) {
      selected.scrollIntoView({ block: "nearest", inline: "center" })
    }
  }, [selectedDate])

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => scroll(-1)}
        className="shrink-0 flex items-center justify-center h-9 w-9 rounded-full border border-border bg-card hover:bg-accent text-foreground transition-colors"
        aria-label={t("scrollLeft")}
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      <div
        ref={scrollRef}
        className="flex gap-1.5 overflow-x-auto scrollbar-none"
        style={{ scrollbarWidth: "none" }}
      >
        {olympicDays.map((day, i) => {
          const isSelected = day === selectedDate
          const count = eventCounts[day] || 0
          const month = getMonth(day)
          const prevMonth = i > 0 ? getMonth(olympicDays[i - 1]) : -1
          const showMonthLabel = month !== prevMonth

          return (
            <div key={day} className="flex flex-col items-center gap-1">
              {showMonthLabel && (
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.12em] mb-0.5">
                  {month === 6 ? t("july") : t("august")}
                </span>
              )}
              <button
                data-date={day}
                onClick={() => onSelectDate(day)}
                className={`
                  relative overflow-hidden flex flex-col items-center gap-0.5 rounded-xl px-3 py-2 transition-all duration-150 border
                  ${
                    isSelected
                      ? "bg-primary text-primary-foreground border-primary shadow-sm"
                      : "bg-card border-border/40 hover:border-border/80 hover:bg-accent text-foreground"
                  }
                `}
                aria-label={t("viewEventsOf", { date: formatDateFull(day) })}
              >
                {isSelected && (
                  <span className="absolute top-0 left-0 right-0 h-[3px] rounded-t-xl bg-primary-foreground/40" />
                )}
                <span className="text-[10px] font-bold uppercase tracking-[0.08em] opacity-90">
                  {formatDay(day)}
                </span>
                <span className="text-base font-black font-mono leading-none">
                  {formatDayNum(day)}
                </span>
                <span
                  className={`text-[9px] font-bold font-mono ${
                    isSelected ? "opacity-80" : "text-muted-foreground"
                  }`}
                >
                  {count > 0 ? count : "—"}
                </span>
              </button>
            </div>
          )
        })}
      </div>

      <button
        onClick={() => scroll(1)}
        className="shrink-0 flex items-center justify-center h-9 w-9 rounded-full border border-border bg-card hover:bg-accent text-foreground transition-colors"
        aria-label={t("scrollRight")}
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  )
}
