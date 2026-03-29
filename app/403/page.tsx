"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ShieldX } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"

export default function ForbiddenPage() {
  const t = useTranslations("forbidden")

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-[15%] w-96 h-96 rounded-full bg-[#EE334E]/10 blur-3xl animate-[float_8s_ease-in-out_infinite]" />
        <div
          className="absolute top-1/2 right-[15%] w-80 h-80 rounded-full bg-[#FCB131]/10 blur-3xl animate-[float_8s_ease-in-out_infinite]"
          style={{ animationDelay: "-2s" }}
        />
        <div
          className="absolute bottom-1/4 left-1/3 w-72 h-72 rounded-full bg-[#EE334E]/8 blur-3xl animate-[float_8s_ease-in-out_infinite]"
          style={{ animationDelay: "-4s" }}
        />
        <div
          className="absolute bottom-1/3 right-1/3 w-64 h-64 rounded-full bg-[#FCB131]/8 blur-3xl animate-[float_8s_ease-in-out_infinite]"
          style={{ animationDelay: "-6s" }}
        />
        <div
          className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div
        className={cn(
          "relative z-10 mx-4 w-full max-w-md",
          "backdrop-blur-xl bg-card/60 dark:bg-card/40",
          "rounded-2xl border border-white/10 dark:border-white/5",
          "shadow-2xl",
          "p-8 sm:p-10",
        )}
      >
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <div className="relative flex flex-col items-center text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#EE334E]/10 ring-1 ring-[#EE334E]/20">
            <ShieldX className="h-10 w-10 text-[#EE334E]" />
          </div>

          <div className="relative mb-6">
            <span
              className="absolute inset-0 flex justify-center font-mono text-7xl sm:text-8xl font-black text-foreground/5 select-none"
              style={{ transform: "translate(3px, 3px)" }}
              aria-hidden="true"
            >
              403
            </span>
            <span
              className="absolute inset-0 flex justify-center font-mono text-7xl sm:text-8xl font-black text-foreground/10 select-none"
              style={{ transform: "translate(1.5px, 1.5px)" }}
              aria-hidden="true"
            >
              403
            </span>
            <span className="relative font-mono text-7xl sm:text-8xl font-black bg-gradient-to-b from-[#EE334E] via-[#EE334E]/80 to-[#EE334E]/50 bg-clip-text text-transparent">
              403
            </span>
          </div>

          <h1 className="text-lg sm:text-xl font-bold font-mono text-foreground mb-2">
            {t("title")}
          </h1>

          <p className="text-sm text-muted-foreground mb-8 max-w-xs">
            {t("description")}
          </p>

          <Button asChild size="lg" className="w-full shadow-lg">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("backHome")}
            </Link>
          </Button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 rounded-b-2xl bg-gradient-to-t from-[#EE334E]/5 to-transparent pointer-events-none" />
      </div>

      <div className="absolute bottom-8 left-0 right-0 text-center">
        <span className="text-xs font-mono text-muted-foreground/40 tracking-widest">
          PARIS 2024
        </span>
      </div>
    </div>
  )
}
