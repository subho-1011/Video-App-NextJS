import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const getCommunities = await db.community.findMany({
        orderBy: { createdAt: "desc" },
        include: {
            owner: {
                select: {
                    name: true,
                    username: true,
                    image: true,
                },
            },
            likes: true,
            comments: true,
        },
    });

    return NextResponse.json(
        {
            data: getCommunities,
            success: true,
            message: "Get community posts",
        },
        { status: 200 }
    );
}
