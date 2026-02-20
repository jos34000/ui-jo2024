import { EventResponseDTO } from "@/lib/types/event.type"
import { mapEventFromDTO } from "@/lib/utils/eventMapper"
import { Calendar } from "@/app/calendrier/Calendar"

async function getEvents() {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/events/all`, {
      cache: "force-cache",
      next: { revalidate: 60 },
    })

    if (!response.ok) {
      console.error(
        `Erreur HTTP ${response.status} lors du chargement des événements`,
      )
      return []
    }

    const data: EventResponseDTO[] = await response.json()
    return data.map(element => mapEventFromDTO(element))
  } catch (err) {
    console.error("Erreur lors du chargement:", err)
    return []
  }
}

export default async function CalendrierPage() {
  const events = await getEvents()

  return <Calendar initialEvents={events} />
}
