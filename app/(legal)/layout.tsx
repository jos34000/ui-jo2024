import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"

interface LegalLayoutProps {
  children: React.ReactNode
}

const LegalLayout = ({ children }: LegalLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default LegalLayout
