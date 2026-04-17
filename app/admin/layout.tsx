"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuthStore } from "@/lib/stores/auth.store"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import {
  CalendarDays,
  ChevronLeft,
  LayoutDashboard,
  LogOut,
  Settings,
  Ticket,
  TrendingUp,
  Users,
} from "lucide-react"
import { cn } from "@/lib/utils"
import React from "react"

interface AdminLayoutProps {
  children: React.ReactNode
}

const navItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Ventes", href: "/admin/ventes", icon: TrendingUp },
  { name: "Offres", href: "/admin/offres", icon: Ticket },
  { name: "Évènements", href: "/admin/evenements", icon: CalendarDays },
  { name: "Utilisateurs", href: "/admin/utilisateurs", icon: Users },
  { name: "Paramètres", href: "/admin/parametres", icon: Settings },
]

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const user = useAuthStore(state => state.user)
  const logout = useAuthStore(state => state.logout)
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <div className="min-h-screen flex bg-muted/30">
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 border-r border-border bg-background">
        <div className="flex items-center justify-between h-16 px-4 border-b border-border">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-sm font-bold text-primary-foreground font-mono">
                P24
              </span>
            </div>
            <span className="font-bold font-mono">Admin</span>
          </Link>
          <ThemeToggle />
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                "text-muted-foreground hover:text-foreground hover:bg-muted",
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
              {user?.firstName?.[0]?.toUpperCase() || "A"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {user?.email}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 bg-transparent"
              asChild
            >
              <Link href="/">
                <ChevronLeft className="mr-1 h-4 w-4" />
                Site
              </Link>
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </aside>

      <div className="lg:hidden fixed top-0 inset-x-0 h-14 bg-background border-b border-border flex items-center justify-between px-4 z-50">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
            <span className="text-xs font-bold text-primary-foreground font-mono">
              P24
            </span>
          </div>
          <span className="font-bold font-mono text-sm">Admin</span>
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">
              <ChevronLeft className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="lg:hidden fixed bottom-0 inset-x-0 h-16 bg-background border-t border-border flex items-center justify-around px-2 z-50">
        {navItems.slice(0, 4).map(item => (
          <Link
            key={item.href}
            href={item.href}
            className="flex flex-col items-center gap-1 px-3 py-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <item.icon className="h-5 w-5" />
            <span className="text-[10px] font-medium">{item.name}</span>
          </Link>
        ))}
      </div>

      <main className="flex-1 lg:pl-64">
        <div className="pt-14 lg:pt-0 pb-20 lg:pb-0">{children}</div>
      </main>
    </div>
  )
}

export default AdminLayout
