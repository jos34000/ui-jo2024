import { QrCode } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const StaffScanner = () => {
  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-mono">Scanner</h1>
        <p className="text-muted-foreground mt-1">
          Scannez le QR code d&apos;un billet pour valider l&apos;entrée
        </p>
      </div>

      <Card className="max-w-md">
        <CardContent className="flex flex-col items-center gap-4 py-16">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <QrCode className="h-10 w-10 text-primary" />
          </div>
          <p className="text-sm text-muted-foreground text-center">
            La fonctionnalité de scan n&apos;est pas encore disponible
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default StaffScanner
