"use server";

import { z } from "zod";
import { registerSchema } from "@/lib/schemas/FormValidation";

export const registerAction = async (
  formData: z.infer<typeof registerSchema>,
): Promise<ApiResponse<{ token: string; user: string }>> => {
  try {
    const validatedData = registerSchema.parse(formData);

    const response = await fetch(`${process.env.API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        email: validatedData.email,
        password: validatedData.password,
      }),
    });

    console.log(response);
    if (!response.ok) {
      const error = await response.json();
      return {
        success: false,
        message: error.message || "Erreur lors de l'inscription",
        errors: error.errors,
      };
    }

    const data = await response.json();

    return {
      success: true,
      data: data,
      message: "Inscription réussie",
    };
  } catch (error) {
    console.error("Register error:", error);
    return {
      success: false,
      message: "Une erreur est survenue lors de l'inscription",
    };
  }
};
