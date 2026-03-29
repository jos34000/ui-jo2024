export const olympicDays = (() => {
  const days: string[] = []
  const start = new Date(2024, 6, 26)
  const end = new Date(2024, 7, 11)
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    days.push(d.toISOString().split("T")[0])
  }
  return days
})()

export const formatDay = (dateStr: string) => {
  const d = new Date(dateStr + "T00:00:00")
  return d.toLocaleDateString("fr-FR", { weekday: "short" }).slice(0, 3)
}

export const formatDayNum = (dateStr: string) => {
  return new Date(dateStr + "T00:00:00").getDate().toString()
}

export const formatDateFull = (dateStr: string) => {
  const d = new Date(dateStr + "T00:00:00")
  return d.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  })
}

export const formatDateLong = (dateStr: string) => {
  const d = new Date(dateStr + "T00:00:00")
  return d.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

export const formatDateShort = (dateStr: string) => {
  const d = new Date(dateStr + "T00:00:00")
  return d.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
  })
}

export const getMonth = (dateStr: string) => {
  return new Date(dateStr + "T00:00:00").getMonth()
}

export const formatDateWithTime = (dateStr: string) =>
  new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateStr))

export const formatStringDateClassic = (dateStr: string) =>
  new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(dateStr))

export const formatDateClassic = (date: Date) => {
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}
