import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
    const prisma = new PrismaClient();

    const users = await prisma.user.findMany();

    return NextResponse.json({ users });
}
