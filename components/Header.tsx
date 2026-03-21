"use client"

import Link from "next/link"
import {
  ChevronDown,
  LogOut,
  Menu,
  ShoppingCart,
  Ticket,
  User,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { OlympicRings } from "@/lib/svg/OlympicRings"
import { useAuthStore } from "@/lib/stores/auth.store"
import { apiClient } from "@/lib/utils/apiClient"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { CartSidebar } from "@/components/cart/CartSidebar"
import { useCartStore } from "@/lib/stores/cart.store"
import { useTranslations } from "next-intl"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"

export const Header = () => {
  const router = useRouter()
  const t = useTranslations("header")

  const user = useAuthStore(state => state.user)
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)
  const logout = useAuthStore(state => state.logout)
  const setSidebarOpen = useCartStore(state => state.setSidebarOpen)

  const navigation = [
    { name: t("nav.events"), href: "#events" },
    { name: t("nav.sports"), href: "#sports" },
    { name: t("nav.calendar"), href: "/calendrier" },
  ]

  const handleLogout = async () => {
    try {
      await apiClient("/auth/logout", { method: "POST" })
      logout()
      router.push("/")
      toast.success(t("logoutSuccess"))
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  const initials = user
    ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase()
    : ""

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-3 sm:py-4 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-3">
            <OlympicRings className="h-7 sm:h-8 w-auto" />
            <span className="font-bold text-lg sm:text-xl tracking-tight font-mono">
              Paris <span className="text-primary">2024</span>
            </span>
          </Link>
        </div>

        <div className="flex lg:hidden items-center gap-1">
          <LanguageSwitcher />
          <ThemeToggle />
          <CartSidebar />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">{t("openMenu")}</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] p-0" showCloseButton={false}>
              <SheetHeader className="border-b border-border px-5 py-4">
                <SheetTitle className="flex items-center gap-3">
                  <OlympicRings className="h-7 w-auto shrink-0" />
                  <span className="flex-1 font-bold text-lg font-mono truncate">
                    Paris 2024
                  </span>
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon" className="shrink-0 h-7 w-7">
                      <X className="h-4 w-4" />
                      <span className="sr-only">{t("closeMenu")}</span>
                    </Button>
                  </SheetClose>
                </SheetTitle>
              </SheetHeader>

              {isAuthenticated && user && (
                <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-mono font-bold shrink-0">
                    {initials}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {user.email}
                    </p>
                  </div>
                </div>
              )}

              <nav
                className="flex flex-col px-3 py-3 border-b border-border"
                aria-label="Menu principal mobile"
              >
                {navigation.map(item => (
                  <SheetClose key={item.name} asChild>
                    <Link
                      href={item.href}
                      className="flex items-center rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-primary/5 hover:text-primary transition-colors"
                    >
                      {item.name}
                    </Link>
                  </SheetClose>
                ))}
              </nav>

              {isAuthenticated && user && (
                <nav
                  className="flex flex-col px-3 py-3 border-b border-border"
                  aria-label="Menu utilisateur mobile"
                >
                  <SheetClose asChild>
                    <Link
                      href="/auth"
                      className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-primary/5 hover:text-primary transition-colors"
                    >
                      <User className="h-4 w-4" />
                      {t("myAccount")}
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <button
                      onClick={() => setSidebarOpen(true)}
                      className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-primary/5 hover:text-primary transition-colors w-full text-left"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      {t("myCart")}
                    </button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/billets"
                      className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-primary/5 hover:text-primary transition-colors"
                    >
                      <Ticket className="h-4 w-4" />
                      {t("myTickets")}
                    </Link>
                  </SheetClose>
                </nav>
              )}

              <SheetFooter className="flex flex-col gap-3 px-5 py-4">
                <SheetClose asChild>
                  <Button className="w-full">{t("buyTickets")}</Button>
                </SheetClose>
                {isAuthenticated && user ? (
                  <SheetClose asChild>
                    <Button
                      variant="ghost"
                      className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      {t("logout")}
                    </Button>
                  </SheetClose>
                ) : (
                  <SheetClose asChild>
                    <Button
                      variant="outline"
                      className="w-full bg-transparent"
                      asChild
                    >
                      <Link href="/auth">{t("myAccount")}</Link>
                    </Button>
                  </SheetClose>
                )}
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>

        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map(item => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4 lg:items-center">
          <LanguageSwitcher />
          <ThemeToggle />
          <CartSidebar />

          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2 px-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-mono font-bold">
                    {initials}
                  </span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-56">
                <div className="px-2 py-2">
                  <p className="text-sm font-medium">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/auth" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    {t("myAccount")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/billets" className="cursor-pointer">
                    <Ticket className="mr-2 h-4 w-4" />
                    {t("myTickets")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onSelect={handleLogout}
                  className="text-destructive focus:text-destructive cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  {t("logout")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="ghost" size="icon" asChild>
              <Link href="/auth">
                <User className="h-5 w-5" />
                <span className="sr-only">{t("account")}</span>
              </Link>
            </Button>
          )}
        </div>
      </nav>
    </header>
  )
}
