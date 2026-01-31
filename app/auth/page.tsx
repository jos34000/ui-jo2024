"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Ticket, Shield, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { AuthForm } from "@/components/auth-form"

function OlympicRings({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 100 40"
            className={className}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle cx="15" cy="15" r="12" stroke="#0081C8" strokeWidth="3" fill="none" />
            <circle cx="35" cy="15" r="12" stroke="currentColor" strokeWidth="3" fill="none" className="text-foreground" />
            <circle cx="55" cy="15" r="12" stroke="#EE334E" strokeWidth="3" fill="none" />
            <circle cx="25" cy="25" r="12" stroke="#FCB131" strokeWidth="3" fill="none" />
            <circle cx="45" cy="25" r="12" stroke="#00A651" strokeWidth="3" fill="none" />
        </svg>
    )
}

const features = [
    {
        icon: Ticket,
        title: "Accès prioritaire",
        description: "Soyez informé en avant-première des nouvelles ventes de billets",
    },
    {
        icon: Shield,
        title: "Billets sécurisés",
        description: "Vos billets sont garantis authentiques et protégés",
    },
    {
        icon: Clock,
        title: "Historique complet",
        description: "Retrouvez tous vos achats et billets en un seul endroit",
    },
]

export default function AuthPage() {
    const [mode, setMode] = useState<"login" | "register">("login")

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b border-border bg-background/95 backdrop-blur">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                    <Link href="/" className="flex items-center gap-3">
                        <OlympicRings className="h-8 w-auto" />
                        <span className="font-bold text-xl tracking-tight font-mono">
              Paris <span className="text-primary">2024</span>
            </span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        <Button variant="ghost" asChild className="hidden sm:inline-flex">
                            <Link href="/">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Retour à l'accueil
                            </Link>
                        </Button>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-6 py-12 lg:py-20">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Left side - Features */}
                    <div className="hidden lg:block">
                        <div className="space-y-8">
                            <div>
                                <h1 className="text-4xl font-bold tracking-tight text-balance font-mono">
                                    Votre compte
                                    <span className="block text-primary">Paris 2024</span>
                                </h1>
                                <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                                    Créez votre compte pour accéder à la billetterie officielle des Jeux Olympiques et Paralympiques de Paris 2024.
                                </p>
                            </div>

                            <div className="space-y-6">
                                {features.map((feature) => (
                                    <div key={feature.title} className="flex gap-4">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                                            <feature.icon className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">{feature.title}</h3>
                                            <p className="text-sm text-muted-foreground">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Olympic rings decoration */}
                            <div className="relative mt-12 pt-8 border-t border-border">
                                <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded-full bg-olympic-blue" />
                                    <div className="h-3 w-3 rounded-full bg-olympic-yellow" />
                                    <div className="h-3 w-3 rounded-full bg-foreground" />
                                    <div className="h-3 w-3 rounded-full bg-olympic-green" />
                                    <div className="h-3 w-3 rounded-full bg-olympic-red" />
                                </div>
                                <p className="mt-4 text-sm text-muted-foreground">
                                    Plus de 10 millions de billets disponibles pour les Jeux Olympiques et Paralympiques de Paris 2024.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right side - Auth Form */}
                    <div className="lg:pl-8">
                        <Card className="border-border/50 shadow-lg">
                            <CardHeader className="space-y-1 pb-6">
                                <div className="lg:hidden flex justify-center mb-4">
                                    <OlympicRings className="h-10 w-auto" />
                                </div>
                                <CardTitle className="text-2xl text-center lg:text-left">
                                    {mode === "login" ? "Connexion" : "Créer un compte"}
                                </CardTitle>
                                <CardDescription className="text-center lg:text-left">
                                    {mode === "login"
                                        ? "Connectez-vous pour accéder à vos billets et achats"
                                        : "Rejoignez la communauté Paris 2024"}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <AuthForm
                                    mode={mode}
                                    onToggleMode={() => setMode(mode === "login" ? "register" : "login")}
                                />
                            </CardContent>
                        </Card>

                        {/* Mobile back link */}
                        <div className="mt-6 text-center lg:hidden">
                            <Button variant="ghost" asChild>
                                <Link href="/">
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Retour à l'accueil
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-border mt-auto">
                <div className="mx-auto max-w-7xl px-6 py-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
                        <p>Billetterie officielle Paris 2024</p>
                        <div className="flex gap-6">
                            <a href="#" className="hover:text-primary transition-colors">
                                Aide
                            </a>
                            <a href="#" className="hover:text-primary transition-colors">
                                Confidentialité
                            </a>
                            <a href="#" className="hover:text-primary transition-colors">
                                Mentions légales
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
