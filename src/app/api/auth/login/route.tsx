import { signIn } from "@/auth";

import { LoginFormSchema } from "@/lib/schemas";

import { AuthError } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const resBody = await request.json();

    const validatedData = LoginFormSchema.safeParse(resBody);
    if (!validatedData.success) {
        return NextResponse.json(
            { error: "Server side validation failed" },
            { status: 400 }
        );
    }

    const { email, password } = validatedData.data;

    try {
        await signIn("credentials", {
            email,
            password,
        });

        return NextResponse.json(
            { success: "Login successful" },
            { status: 200 }
        );
    } catch (error: any) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return NextResponse.json(
                        { error: "Invalid credentials" },
                        { status: 400 }
                    );
                default:
                    return NextResponse.json(
                        { error: error.message },
                        { status: 400 }
                    );
            }
        }
    }
}
