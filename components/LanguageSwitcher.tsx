"use client"

import { useLocale } from "next-intl"
import { useRouter } from "next/navigation"
import { Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuthStore } from "@/lib/stores/auth.store"
import { api } from "@/lib/utils/api"

const LOCALES = [
  { code: "fr", flag: "🇫🇷", label: "Français" },
  { code: "en", flag: "🇬🇧", label: "English" },
  { code: "de", flag: "🇩🇪", label: "Deutsch" },
  { code: "es", flag: "🇪🇸", label: "Español" },
]

export const LanguageSwitcher = () => {
  const locale = useLocale()
  const router = useRouter()
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)

  const setLocale = async (code: string) => {
    if (code === locale) return
    // eslint-disable-next-line react-hooks/immutability
    document.cookie = `NEXT_LOCALE=${code}; path=/; max-age=31536000`

    if (isAuthenticated) {
      try {
        await api("/user/locale", { method: "PATCH", body: { locale: code } })
      } catch {}
    }

    router.refresh()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Globe className="h-5 w-5" />
          <span className="sr-only">Changer la langue</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        {LOCALES.map(l => (
          <DropdownMenuItem
            key={l.code}
            onClick={() => setLocale(l.code)}
            className={`gap-2 cursor-pointer ${l.code === locale ? "font-semibold text-primary" : ""}`}
          >
            <span>{l.flag}</span>
            <span>{l.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
