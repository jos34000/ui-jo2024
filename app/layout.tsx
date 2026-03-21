import React from "react"
import type { Metadata } from "next"
import { JetBrains_Mono, Nunito } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/ThemeProvider"
import { CartInitializer } from "@/components/CartInitializer"
import { CartSidebar } from "@/components/cart/CartSidebar"
import { NextIntlClientProvider } from "next-intl"
import { getLocale, getMessages } from "next-intl/server"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"
import { CookieBanner } from "@/components/CookieBanner"

const _jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})
const _nunito = Nunito({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  title: "Paris 2024 - Billetterie Officielle | Jeux Olympiques",
  description:
    "Achetez vos billets officiels pour les Jeux Olympiques de Paris 2024. Vivez des moments inoubliables aux JO.",
}

interface LayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({ children }: Readonly<LayoutProps>) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${_jetbrainsMono.variable} ${_nunito.variable} font-sans antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <CartInitializer />
            <CartSidebar hideTrigger />
            {children}
            <Toaster
              position="bottom-right"
              richColors={true}
              closeButton={true}
            />
            <CookieBanner />
          </ThemeProvider>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  )
}
