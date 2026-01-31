import { z } from "zod";
import { loginSchema, registerSchema } from "@/lib/schemas/FormValidation";

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
export interface AuthFormProps {
  mode: "login" | "register";
  onToggleMode: () => void;
}
