"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Bell, Globe, Mail, Save, Shield } from "lucide-react"
import { SettingsSection } from "@/app/admin/parametres/SettingsSection"

const AdminSettingsPage = () => {
  const [isSaving, setIsSaving] = useState(false)

  // General settings state
  const [siteName, setSiteName] = useState("Paris 2024 - Billetterie")
  const [siteDescription, setSiteDescription] = useState(
    "Billetterie officielle des Jeux Olympiques de Paris 2024",
  )
  const [contactEmail, setContactEmail] = useState("")

  // Notification settings state
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [newUserNotifications, setNewUserNotifications] = useState(true)
  const [orderNotifications, setOrderNotifications] = useState(true)

  // Security settings state
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [sessionTimeout, setSessionTimeout] = useState("30")

  const handleSave = async () => {
    setIsSaving(true)
    // Simule une sauvegarde - a remplacer par l'appel API
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold font-mono">Parametres</h1>
          <p className="text-muted-foreground mt-1">
            Configurez les parametres de la plateforme
          </p>
        </div>
        <Button onClick={handleSave} disabled={isSaving}>
          <Save className="mr-2 h-4 w-4" />
          {isSaving ? "Enregistrement..." : "Enregistrer"}
        </Button>
      </div>

      <div className="space-y-6">
        <SettingsSection
          title="Informations generales"
          description="Parametres de base de la plateforme"
          icon={<Globe className="h-5 w-5 text-primary" />}
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="siteName">Nom du site</Label>
              <Input
                id="siteName"
                value={siteName}
                onChange={e => setSiteName(e.target.value)}
                placeholder="Paris 2024 - Billetterie"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="siteDescription">Description</Label>
              <Textarea
                id="siteDescription"
                value={siteDescription}
                onChange={e => setSiteDescription(e.target.value)}
                placeholder="Description du site..."
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactEmail">Email de contact</Label>
              <Input
                id="contactEmail"
                type="email"
                value={contactEmail}
                onChange={e => setContactEmail(e.target.value)}
                placeholder="contact@paris2024.org"
              />
            </div>
          </div>
        </SettingsSection>

        <SettingsSection
          title="Notifications"
          description="Configurez les notifications email"
          icon={<Bell className="h-5 w-5 text-primary" />}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border border-border p-4">
              <div className="space-y-0.5">
                <Label htmlFor="emailNotifications">
                  Notifications par email
                </Label>
                <p className="text-xs text-muted-foreground">
                  Recevoir les notifications importantes par email
                </p>
              </div>
              <Switch
                id="emailNotifications"
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
              />
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border p-4">
              <div className="space-y-0.5">
                <Label htmlFor="newUserNotifications">
                  Nouveaux utilisateurs
                </Label>
                <p className="text-xs text-muted-foreground">
                  Etre notifie lors de nouvelles inscriptions
                </p>
              </div>
              <Switch
                id="newUserNotifications"
                checked={newUserNotifications}
                onCheckedChange={setNewUserNotifications}
              />
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border p-4">
              <div className="space-y-0.5">
                <Label htmlFor="orderNotifications">Commandes</Label>
                <p className="text-xs text-muted-foreground">
                  Recevoir une notification pour chaque nouvelle commande
                </p>
              </div>
              <Switch
                id="orderNotifications"
                checked={orderNotifications}
                onCheckedChange={setOrderNotifications}
              />
            </div>
          </div>
        </SettingsSection>

        <SettingsSection
          title="Securite"
          description="Parametres de securite de la plateforme"
          icon={<Shield className="h-5 w-5 text-primary" />}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border border-border p-4">
              <div className="space-y-0.5">
                <Label htmlFor="twoFactor">
                  Authentification a deux facteurs
                </Label>
                <p className="text-xs text-muted-foreground">
                  Exiger la 2FA pour les comptes administrateurs
                </p>
              </div>
              <Switch
                id="twoFactor"
                checked={twoFactorEnabled}
                onCheckedChange={setTwoFactorEnabled}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sessionTimeout">
                Delai d&apos;expiration de session (minutes)
              </Label>
              <Input
                id="sessionTimeout"
                type="number"
                min={5}
                max={1440}
                value={sessionTimeout}
                onChange={e => setSessionTimeout(e.target.value)}
                className="max-w-32"
              />
              <p className="text-xs text-muted-foreground">
                Duree avant deconnexion automatique (5-1440 minutes)
              </p>
            </div>
          </div>
        </SettingsSection>

        <SettingsSection
          title="Configuration email"
          description="Parametres du serveur SMTP"
          icon={<Mail className="h-5 w-5 text-primary" />}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="smtpHost">Serveur SMTP</Label>
                <Input id="smtpHost" placeholder="smtp.example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="smtpPort">Port</Label>
                <Input id="smtpPort" type="number" placeholder="587" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="smtpUser">Utilisateur SMTP</Label>
                <Input id="smtpUser" placeholder="user@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="smtpPassword">Mot de passe SMTP</Label>
                <Input
                  id="smtpPassword"
                  type="password"
                  placeholder="••••••••"
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Ces parametres seront utilises pour l&apos;envoi d&apos;emails
              transactionnels
            </p>
          </div>
        </SettingsSection>
      </div>
    </div>
  )
}

export default AdminSettingsPage
