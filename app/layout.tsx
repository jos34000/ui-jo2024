import React from "react"
import type { Metadata } from "next"
import { JetBrains_Mono, Nunito } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/ThemeProvider"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"

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

export default function RootLayout({ children }: Readonly<LayoutProps>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${_jetbrainsMono.variable} ${_nunito.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster
            position="bottom-right"
            richColors={true}
            closeButton={true}
          />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
