"use client"

import { useEffect, useState } from "react"
import { ShoppingCart, Trash2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useCartStore } from "@/lib/stores/cart.store"
import { useAuthStore } from "@/lib/stores/auth.store"
import { CartItemCard } from "@/components/cart/CartItemCard"
import { toast } from "sonner"
import Link from "next/link"
import { useRouter } from "next/navigation"

function formatPrice(amount: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(amount)
}

export const CartSidebar = () => {
  const router = useRouter()
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)
  const { cart, isLoading, fetchCart, clearCart, sidebarOpen, setSidebarOpen } =
    useCartStore()
  const [isClearing, setIsClearing] = useState(false)

  useEffect(() => {
    if (sidebarOpen && isAuthenticated) {
      fetchCart()
    }
  }, [fetchCart, isAuthenticated, sidebarOpen])

  const handleOpenChange = (open: boolean) => {
    setSidebarOpen(open)
  }

  const handleClearCart = async () => {
    setIsClearing(true)
    try {
      await clearCart()
      toast.success("Panier vidé")
    } catch {
      toast.error("Impossible de vider le panier")
    } finally {
      setIsClearing(false)
    }
  }

  const itemCount = cart?.items.length ?? 0

  return (
    <Sheet open={sidebarOpen} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {itemCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-4 w-4 min-w-4 p-0 flex items-center justify-center text-[10px] font-bold rounded-full">
              {itemCount > 9 ? "9+" : itemCount}
            </Badge>
          )}
          <span className="sr-only">Panier</span>
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-full sm:w-[400px] flex flex-col p-0"
        showCloseButton={false}
      >
        <SheetHeader className="border-b border-border px-5 py-4">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 shrink-0" />
            <span className="flex-1 truncate">Mon panier</span>
            {itemCount > 0 && (
              <Badge variant="secondary" className="shrink-0 font-mono">
                {itemCount} article{itemCount > 1 ? "s" : ""}
              </Badge>
            )}
            <SheetClose asChild>
              <Button variant="ghost" size="icon" className="shrink-0 h-7 w-7">
                <X className="h-4 w-4" />
                <span className="sr-only">Fermer</span>
              </Button>
            </SheetClose>
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          {!isAuthenticated ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-16">
              <ShoppingCart className="h-12 w-12 text-muted-foreground/40" />
              <div>
                <p className="font-medium">
                  Connectez-vous pour voir votre panier
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Vos articles seront sauvegardés dans votre compte.
                </p>
              </div>
              <Button asChild className="mt-2">
                <Link href="/auth">Se connecter</Link>
              </Button>
            </div>
          ) : isLoading ? (
            <div className="flex flex-col gap-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="h-24 rounded-lg bg-muted animate-pulse"
                />
              ))}
            </div>
          ) : !cart || cart.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-center py-16">
              <ShoppingCart className="h-12 w-12 text-muted-foreground/40" />
              <p className="font-medium">Votre panier est vide</p>
              <p className="text-sm text-muted-foreground">
                Ajoutez des billets pour les retrouver ici.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {cart.items.map(item => (
                <CartItemCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {isAuthenticated && cart && cart.items.length > 0 && (
          <div className="border-t border-border px-5 py-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-muted-foreground">Total</span>
              <span className="font-bold font-mono text-lg">
                {formatPrice(cart.totalPrice)}
              </span>
            </div>
            <Separator className="mb-4" />
            <Button
              className="w-full"
              size="lg"
              onClick={() => {
                setSidebarOpen(false)
                router.push("/checkout")
              }}
            >
              Procéder au paiement
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full mt-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
              onClick={handleClearCart}
              disabled={isClearing}
            >
              <Trash2 className="h-3.5 w-3.5 mr-1.5" />
              Vider le panier
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
