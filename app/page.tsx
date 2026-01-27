import { Header } from "@/lib/components/header"
import { HeroSection } from "@/lib/components/hero-section"
import { FeaturedEvents } from "@/lib/components/featured-events"
import { SportsCategories } from "@/lib/components/sports-categories"
import { TicketTypes } from "@/lib/components/ticket-types"
import { Footer } from "@/lib/components/footer"

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
