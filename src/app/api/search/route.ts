import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const query = request.nextUrl.searchParams.get("q");

    if (!query) {
        return NextResponse.json(
            {
                data: [],
            },
            { status: 200 }
        );
    }

    const videos = await db.video.findMany({
        where: {
            OR: [
                {
                    title: {
                        contains: query,
                        mode: "insensitive",
                    },
                },
                {
                    description: {
                        contains: query,
                        mode: "insensitive",
                    },
                },
            ],
        },
        include: {
            owner: true,
        },
    });

    return NextResponse.json(
        {
            videos,
        },
        { status: 200 }
    );
}
