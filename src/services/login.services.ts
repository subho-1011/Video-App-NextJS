"use server";

import { signIn } from "@/auth";
import { LoginFormSchema } from "@/lib/schemas";
import { AuthError } from "next-auth";
import { z } from "zod";

const HOME_PATH = "/";

export const login = async (data: z.infer<typeof LoginFormSchema>) => {
    const validateData = LoginFormSchema.safeParse(data);
    if (!validateData.success) {
        return { error: "Validation failed" };
    }

    const { email, password } = validateData.data;

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: HOME_PATH,
        });

        return { success: "Login successful" };
    } catch (err: any) {
        if (err instanceof AuthError) {
            switch (err.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials" };
                default:
                    return { error: "Something went wrong" };
            }
        }

        throw err;
    }
};
