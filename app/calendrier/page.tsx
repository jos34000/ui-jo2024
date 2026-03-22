import { EventDTO } from "@/lib/types/event.type"
import { toOlympicEvent } from "@/lib/utils/eventMapper"
import { Calendar } from "@/app/calendrier/Calendar"
import { getLocale } from "next-intl/server"

export const dynamic = "force-dynamic"

async function getEvents(locale: string) {
  try {
    const response = await fetch(`${(process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL)}/events/all`, {
      cache: "force-cache",
      next: { revalidate: 60 },
      headers: { "Accept-Language": locale },
    })

    if (!response.ok) {
      console.error(
        `Erreur HTTP ${response.status} lors du chargement des événements`,
      )
      return []
    }

    const data: EventDTO[] = await response.json()
    return data.map(element => toOlympicEvent(element))
  } catch (err) {
    console.error("Erreur lors du chargement:", err)
    return []
  }
}

export default async function CalendrierPage() {
  const locale = await getLocale()
  const events = await getEvents(locale)

  return <Calendar initialEvents={events} />
}
