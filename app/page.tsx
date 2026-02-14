import { Header } from "@/components/Header"
import { HeroSection } from "@/components/HeroSection"
import { FeaturedEvents } from "@/components/FeaturedEvents"
import { SportCategories } from "@/components/SportCategories"
import { TicketTypes } from "@/components/TicketTypes"
import { Footer } from "@/components/Footer"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturedEvents />
        <SportCategories />
        <TicketTypes />
      </main>
      <Footer />
    </div>
  )
}
