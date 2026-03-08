import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { NotFoundContent } from "@/components/NotFoundContent"

const SportNotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <NotFoundContent type="sport" />
      </main>
      <Footer />
    </div>
  )
}

export default SportNotFoundPage
