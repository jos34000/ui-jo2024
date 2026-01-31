"use client";

import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AuthFormProps,
  LoginFormValues,
  RegisterFormValues,
} from "@/lib/types/Form";
import { useAppForm } from "@/lib/hooks/useAppForm";
import { loginSchema, registerSchema } from "@/lib/schemas/FormValidation";
import { toast } from "sonner";
import { registerAction } from "@/lib/actions/registerAction";
import { useRouter } from "next/navigation";

export function AuthForm({ mode, onToggleMode }: Readonly<AuthFormProps>) {
  const router = useRouter();
  const loginForm = useAppForm({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    } as LoginFormValues,
    onSubmit: async ({ value }) => {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      alert(JSON.stringify(value));
    },
    validators: {
      onSubmit: loginSchema,
    },
  });

  const registerForm = useAppForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    } as RegisterFormValues,
    onSubmit: async ({ value }) => {
      const result = await registerAction(value);
      if (result.success) {
        toast.success(result.message || "Inscription réussie", {
          position: "top-center",
        });

        if (result.data?.token) {
          localStorage.setItem("token", result.data.token);
        }

        router.push("/");
      } else {
        toast.error(result.message || "Erreur lors de l'inscription", {
          position: "top-center",
        });

        if (result.errors) {
          Object.entries(result.errors).forEach(([field, message]) => {
            toast.error(`${field}: ${message}`, {
              position: "top-center",
            });
          });
        }
      }
    },
    validators: {
      onSubmit: registerSchema,
    },
  });

  if (mode === "login") {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          loginForm.handleSubmit();
        }}
        className="space-y-5"
      >
        <loginForm.AppField name="email">
          {(field) => (
            <field.TextField
              label="E-mail"
              placeholder="Entrez votre mail"
              icon={<User />}
            />
          )}
        </loginForm.AppField>

        <loginForm.AppField name="password">
          {(field) => (
            <field.PasswordField
              label="Mot de passe"
              placeholder="Entrez votre mot de passe ..."
            ></field.PasswordField>
          )}
        </loginForm.AppField>

        <loginForm.AppField name="rememberMe">
          {(field) => <field.RememberMeField></field.RememberMeField>}
        </loginForm.AppField>

        <loginForm.AppForm>
          <loginForm.SubmitButton className="w-full">
            Se connecter
          </loginForm.SubmitButton>
        </loginForm.AppForm>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-card px-4 text-muted-foreground">
              Pas encore de compte ?
            </span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full bg-transparent"
          onClick={onToggleMode}
        >
          Créer un compte
        </Button>
      </form>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        registerForm.handleSubmit();
      }}
      className="space-y-4"
    >
      <div className="grid grid-cols-2 gap-4">
        <registerForm.AppField name="firstName">
          {(field) => (
            <field.TextField label="Prénom" placeholder="Entrez votre prénom" />
          )}
        </registerForm.AppField>

        <registerForm.AppField name="lastName">
          {(field) => (
            <field.TextField
              label="Nom"
              placeholder="Entrez votre nom de famille"
            />
          )}
        </registerForm.AppField>
      </div>

      <registerForm.AppField name="email">
        {(field) => (
          <field.TextField
            label="E-mail"
            placeholder="Entrez votre mail"
            icon={<User />}
          />
        )}
      </registerForm.AppField>

      <registerForm.AppField name="password">
        {(field) => (
          <field.PasswordField
            label="Mot de passe"
            placeholder="Entrez votre mot de passe"
          />
        )}
      </registerForm.AppField>

      <registerForm.AppField name="confirmPassword">
        {(field) => (
          <field.PasswordField
            label="Confirmation"
            placeholder="Confirmez votre mot de passe"
          />
        )}
      </registerForm.AppField>

      <registerForm.AppField name="acceptTerms">
        {(field) => <field.AcceptTermsField />}
      </registerForm.AppField>

      <registerForm.AppForm>
        <registerForm.SubmitButton className="w-full">
          S&apos;enregistrer
        </registerForm.SubmitButton>
      </registerForm.AppForm>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-card px-4 text-muted-foreground">
            Déjà un compte ?
          </span>
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full bg-transparent"
        onClick={onToggleMode}
      >
        Se connecter
      </Button>
    </form>
  );
}
