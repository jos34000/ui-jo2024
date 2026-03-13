import {
  ArrowLeft,
  ArrowRight,
  Lock,
  LogOut,
  Mail,
  Pencil,
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
import { useState } from "react"
import { ProfileForm } from "@/components/form/ProfileForm"
import { InfoRow } from "@/app/auth/InfoRow"
import { ResetPasswordDialog } from "@/components/ResetPasswordDialog"

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
  const [isEditing, setIsEditing] = useState(false)

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
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div>
              <CardTitle className="text-lg font-mono">
                {isEditing
                  ? "Modifier mes informations"
                  : "Informations du compte"}
              </CardTitle>
              <CardDescription className="mt-1">
                {isEditing
                  ? "Mettez a jour vos informations personnelles"
                  : "Vos informations personnelles"}
              </CardDescription>
            </div>
            {!isEditing && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="shrink-0"
              >
                <Pencil className="mr-2 h-4 w-4" />
                Modifier
              </Button>
            )}
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <ProfileForm
                user={user}
                onCancel={() => setIsEditing(false)}
                onSuccess={() => setIsEditing(false)}
              />
            ) : (
              <div className="space-y-0">
                <InfoRow
                  icon={User}
                  label="Nom complet"
                  value={`${user.firstName} ${user.lastName}`}
                  hasBorder
                />
                <InfoRow
                  icon={Mail}
                  label="Email"
                  value={user.email}
                  hasBorder
                />
                <InfoRow
                  icon={Ticket}
                  label="Billets"
                  value={undefined}
                  placeholder="Aucun billet pour le moment"
                />
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid sm:grid-cols-2 gap-4">
          <Link href="/calendrier">
            <Card className="border-border/50 hover:border-primary/30 transition-colors cursor-pointer h-full">
              <CardContent className="flex items-center gap-4 py-5 sm:py-6">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                  <Ticket className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm sm:text-base">
                    Acheter des billets
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {"Explorez les évènements"}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
              </CardContent>
            </Card>
          </Link>

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
                  {"Consultez vos reservations"}
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
              {"Retour a l'accueil"}
            </Link>
          </Button>
          <ResetPasswordDialog
            mode="change"
            trigger={
              <Button variant="outline" className="bg-transparent">
                <Lock className="mr-2 h-4 w-4" />
                Changer le mot de passe
              </Button>
            }
          />
          <Button
            variant="ghost"
            onClick={onLogout}
            className="text-destructive hover:text-destructive hover:bg-destructive/5"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Se deconnecter
          </Button>
        </div>
      </div>
    </main>
  )
}
