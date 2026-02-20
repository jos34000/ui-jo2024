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

export const getMonth = (dateStr: string) => {
  return new Date(dateStr + "T00:00:00").getMonth()
}
