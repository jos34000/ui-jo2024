"use client"

import { Loader2 } from "lucide-react"
import { Suspense } from "react"
import ResetPassword from "@/app/reset-password/ResetPassword"

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      }
    >
      <ResetPassword />
    </Suspense>
  )
}
