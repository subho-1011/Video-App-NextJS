"use server";

import { z } from "zod";

import { LoginFormSchema } from "@/lib/schemas";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { currentUserId } from "@/lib/auth";
import { db } from "@/lib/db";

export const getMe = async () => {
    try {
        const id = await currentUserId();
        if (!id) {
            return { error: "User not found" };
        }

        const data = await db.user.findUnique({
            where: { id },
            select: {
                id: true,
                email: true,
                name: true,
                image: true,
                username: true,
                watchHistory: true,
                createAt: true,
            },
        });

        return { data };
    } catch (error) {
        return { error: "User not found" };
    }
};

export const login = async (
    data: z.infer<typeof LoginFormSchema>,
    callbackUrl?: string | undefined | null
) => {
    const validateData = LoginFormSchema.safeParse(data);
    if (!validateData.success) {
        return { error: "Validation failed" };
    }

    const { email, password } = validateData.data;

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
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

export const logout = async () => {
    await signOut();
};
