import {
  ArrowLeft,
  ArrowRight,
  LogOut,
  Mail,
  Shield,
  Ticket,
  User,
} from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { StoredUser } from "@/lib/types/user.types"

interface AuthenticatedViewProps {
  user: StoredUser
  onLogout: () => void
  initials: string
}

export const AuthenticatedView = ({
  user,
  onLogout,
  initials,
}: Readonly<AuthenticatedViewProps>) => {
  return (
    <main className="flex-1 mx-auto w-full max-w-3xl px-4 sm:px-6 py-8 sm:py-12 lg:py-16">
      <div className="space-y-8">
        <div className="flex items-center gap-4 sm:gap-5">
          <span className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-lg sm:text-xl font-mono font-bold shrink-0">
            {initials}
          </span>
          <div className="min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight font-mono truncate">
              Bonjour, {user.firstName}
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              {"Bienvenue dans votre espace personnel Paris 2024"}
            </p>
          </div>
        </div>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-lg font-mono">
              Informations du compte
            </CardTitle>
            <CardDescription>{"Vos informations personnelles"}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-0">
            <div className="flex items-center gap-3 py-3 border-b border-border">
              <User className="h-5 w-5 text-muted-foreground shrink-0" />
              <div className="min-w-0">
                <p className="text-sm text-muted-foreground">Nom complet</p>
                <p className="font-medium truncate">
                  {user.firstName} {user.lastName}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 py-3 border-b border-border">
              <Mail className="h-5 w-5 text-muted-foreground shrink-0" />
              <div className="min-w-0">
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium truncate">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 py-3">
              <Ticket className="h-5 w-5 text-muted-foreground shrink-0" />
              <div>
                <p className="text-sm text-muted-foreground">Billets</p>
                <p className="font-medium text-muted-foreground">
                  {"Aucun billet pour le moment"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid sm:grid-cols-2 gap-4">
          <Card className="border-border/50 hover:border-primary/30 transition-colors cursor-pointer">
            <CardContent className="flex items-center gap-4 py-5 sm:py-6">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                <Ticket className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm sm:text-base">
                  Acheter des billets
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {"Explorez les événements"}
                </p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
            </CardContent>
          </Card>

          <Card className="border-border/50 hover:border-primary/30 transition-colors cursor-pointer">
            <CardContent className="flex items-center gap-4 py-5 sm:py-6">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm sm:text-base">
                  Mes billets
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {"Consultez vos réservations"}
                </p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button variant="outline" className="bg-transparent" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {"Retour à l'accueil"}
            </Link>
          </Button>
          <Button
            variant="ghost"
            onClick={onLogout}
            className="text-destructive hover:text-destructive hover:bg-destructive/5"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Se déconnecter
          </Button>
        </div>
      </div>
    </main>
  )
}
