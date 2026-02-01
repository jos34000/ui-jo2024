"use server";

import { z } from "zod";
import { loginSchema } from "@/lib/schemas/FormValidation";

export const loginAction = async (
  formData: z.infer<typeof loginSchema>,
): Promise<ApiResponse<{ accessToken: string; refreshToken: string }>> => {
  try {
    const validatedData = loginSchema.parse(formData);

    const response = await fetch(`${process.env.API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: validatedData.email,
        password: validatedData.password,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        success: false,
        message: error.message || "Erreur lors de la connexion",
        errors: error.errors,
      };
    }

    const data = await response.json();

    return {
      success: true,
      data: data,
      message: "Connexion réussie",
    };
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      message: "Une erreur est survenue lors de la connexion",
    };
  }
};
