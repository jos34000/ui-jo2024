import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturedEvents } from "@/components/featured-events"
import { SportsCategories } from "@/components/sports-categories"
import { TicketTypes } from "@/components/ticket-types"
import { Footer } from "@/components/footer"

export default function HomePage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
                <HeroSection />
                <FeaturedEvents />
                <SportsCategories />
                <TicketTypes />
            </main>
            <Footer />
        </div>
    )
}
