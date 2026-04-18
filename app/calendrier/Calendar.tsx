"use client"

import { useMemo, useState } from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Search, Trophy, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { formatDateFull } from "@/lib/utils/date"
import { DayTimeline } from "@/app/calendrier/DayTimeLine"
import { EventCard } from "@/app/calendrier/EventCard"
import { SportFilter } from "@/app/calendrier/SportFilter"
import { NothingFound } from "@/app/sports/[id]/NothingFound"
import { OlympicEvent } from "@/lib/types/event.type"
import { useTranslations } from "next-intl"

interface CalendarProps {
  initialEvents: OlympicEvent[]
}

export const Calendar = ({ initialEvents }: CalendarProps) => {
  const t = useTranslations("calendar")
  const [selectedDate, setSelectedDate] = useState("2024-07-26")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const sports = [...new Set(initialEvents?.map(e => e.category))]

  const eventCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const event of initialEvents) {
      counts[event.date] = (counts[event.date] || 0) + 1
    }
    return counts
  }, [initialEvents])

  const filteredEvents = useMemo(() => {
    return initialEvents
      .filter(event => {
        if (event.date !== selectedDate) return false
        if (selectedCategory && event.category !== selectedCategory)
          return false
        if (searchQuery) {
          const q = searchQuery.toLowerCase()
          return (
            event.name.toLowerCase().includes(q) ||
            event.sport.toLowerCase().includes(q) ||
            event.location.toLowerCase().includes(q)
          )
        }
        return true
      })
      .sort((a, b) => a.time.localeCompare(b.time))
  }, [initialEvents, selectedDate, selectedCategory, searchQuery])

  const totalForDay = initialEvents.filter(e => e.date === selectedDate).length

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="border-b border-border bg-background">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-10">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight font-mono">
                  {t("title")}
                </h1>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  {t("subtitle")}
                </p>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
                <Trophy className="h-4 w-4 text-primary" />
                <span className="font-mono font-medium">
                  {initialEvents.length}
                </span>
                <span>{t("events")}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="sticky top-[57px] z-40 border-b border-border bg-background/95 backdrop-blur">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 py-3">
            <DayTimeline
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
              eventCounts={eventCounts}
            />
          </div>
        </section>

        <section className="bg-muted/30">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 py-6 sm:py-8">
            <div className="space-y-4 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-bold font-mono capitalize">
                    {formatDateFull(selectedDate)}
                  </h2>
                  <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground border border-border/40 bg-card">
                    <span className="w-1.5 h-1.5 rounded-full block bg-primary" />
                    {totalForDay} {totalForDay > 1 ? t("events") : t("event")}
                  </span>
                </div>

                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder={t("search")}
                    className="pl-9 pr-8 h-9 text-sm rounded-full"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      aria-label={t("clearSearch")}
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>

              <SportFilter
                selected={selectedCategory}
                onSelect={setSelectedCategory}
                categories={sports}
              />
            </div>

            {filteredEvents.length > 0 ? (
              <div className="space-y-3">
                {filteredEvents.map(event => (
                  <EventCard key={event.name} event={event} />
                ))}
              </div>
            ) : (
              <NothingFound
                hasSportFilter={!!selectedCategory || !!searchQuery}
              />
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
