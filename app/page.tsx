import { Header } from "@/components/Header"
import { HeroSection } from "@/components/HeroSection"
import { FeaturedEvents } from "@/components/FeaturedEvents"
import { SportCategories } from "@/components/SportCategories"
import { TicketTypes } from "@/components/TicketTypes"
import { Footer } from "@/components/Footer"
import { EventDTO } from "@/lib/types/event.type"
import { toOlympicEvent } from "@/lib/utils/eventMapper"

export default async function HomePage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL
  const events = await fetch(`${apiUrl}/events/all`).then(r => r.json())
  const mappedEvents = events.map((event: EventDTO) => {
    return toOlympicEvent(event)
  })
  const featuredEvents = mappedEvents.slice(0, 6)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturedEvents events={featuredEvents} />
        <SportCategories />
        <TicketTypes />
      </main>
      <Footer />
    </div>
  )
}
