import { db } from "@/lib/db";
import { currentUserId } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const userId = await currentUserId();

    if (!userId) {
        return NextResponse.json({ error: "You are not logged in" }, { status: 404 });
    }

    const likesByUser = await db.like.findMany({
        where: {
            AND: {
                ownerId: userId,
                videoId: {
                    not: null,
                },
            },
        },
        select: {
            videoId: true,
        },
    });

    if (likesByUser.length === 0) {
        return NextResponse.json({ error: "You have no likes videos" }, { status: 404 });
    }

    const res = await Promise.all(
        likesByUser.map(async (like) => {
            
            const video = await db.video.findUnique({
                where: { id: like.videoId! },
                include: {
                    owner: {
                        select: {
                            id: true,
                            name: true,
                            username: true,
                            image: true,
                        },
                    },
                },
            });

            return video;
        })
    );

    return NextResponse.json({ data: res, success: "Liked video fetch successfully" }, { status: 200 });
}
