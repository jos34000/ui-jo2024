"use client"

import { Button } from "@/components/ui/button"
import { LoginForm } from "@/components/form/LoginForm"
import { RegisterForm } from "@/components/form/RegisterForm"

interface AuthFormProps {
  mode: "login" | "register"
  onToggleMode: () => void
}

export const AuthForm = ({ mode, onToggleMode }: Readonly<AuthFormProps>) => {
  const isLogin = mode === "login"

  return (
    <>
      {isLogin ? <LoginForm /> : <RegisterForm />}

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-card px-4 text-muted-foreground">
            {isLogin ? "Pas encore de compte ?" : "Déjà un compte ?"}
          </span>
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full bg-transparent"
        onClick={onToggleMode}
      >
        {isLogin ? "Créer un compte" : "Se connecter"}
      </Button>
    </>
  )
}
