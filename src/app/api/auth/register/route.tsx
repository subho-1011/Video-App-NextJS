"use server";

import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

import { RegisterFormShema } from "@/lib/schemas";
import { NextRequest, NextResponse } from "next/server";

export async function POST(resquest: NextRequest) {
    const resBody = await resquest.json();

    const validatedData = RegisterFormShema.safeParse(resBody);
    if (!validatedData.success) {
        return NextResponse.json(
            { error: "Server side validation failed" },
            { status: 400 }
        );
    }

    const { email, name, username, password } = validatedData.data;

    const isUniqueUsername = await db.user.findUnique({
        where: { username },
    });
    if (isUniqueUsername) {
        return NextResponse.json(
            { error: "Username is already taken" },
            { status: 400 }
        );
    }

    const isUniqueEmail = await db.user.findUnique({
        where: { email },
    });
    if (isUniqueEmail) {
        return NextResponse.json(
            { error: "Email is already taken" },
            { status: 400 }
        );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.user.create({
        data: {
            email,
            name,
            username,
            password: hashedPassword,
        },
    });

    if (!newUser) {
        return NextResponse.json(
            { error: "Account create fail" },
            { status: 400 }
        );
    }

    return NextResponse.json(
        { data: newUser, success: "Account created!" },
        { status: 200 }
    );
}
