import { Header } from "@/components/Header"
import { HeroSection } from "@/components/HeroSection"
import { FeaturedEvents } from "@/components/FeaturedEvents"
import { SportCategories } from "@/components/SportCategories"
import { Offers } from "@/components/Offers"
import { Footer } from "@/components/Footer"
import { EventDTO } from "@/lib/types/event.type"
import { toOlympicEvent } from "@/lib/utils/eventMapper"

const HomePage = async () => {
  const apiUrl = process.env.API_BASE_URL ?? "http://localhost:8000"
  const events = await fetch(`${apiUrl}/events/all`).then(r => r.json())
  const mappedEvents = events.map((event: EventDTO) => toOlympicEvent(event))
  const featuredEvents = mappedEvents.slice(0, 6)

  const offers = await fetch(`${apiUrl}/offer/all`).then(r => r.json())

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturedEvents events={featuredEvents} />
        <SportCategories />
        <Offers offers={offers} />
      </main>
      <Footer />
    </div>
  )
}

export default HomePage
