import { db } from "@/lib/db";
``;
import { currentUserId } from "@/lib/auth";

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, { params }: { params: { videoId: string } }) {
    try {
        const videoId = params.videoId;
        if (!videoId) {
            return NextResponse.json({ error: "Please provide a videoId" }, { status: 404 });
        }

        const currUserId = await currentUserId();
        if (!currUserId) {
            return NextResponse.json({ error: "You are not logged in" }, { status: 404 });
        }

        const isLiked = await db.like.findFirst({
            where: {
                ownerId: currUserId,
                videoId,
            },
        });

        if (isLiked) {
            const deleteLike = await db.like.deleteMany({
                where: {
                    ownerId: currUserId,
                    videoId,
                },
            });

            return NextResponse.json(
                {
                    success: true,
                    message: "Liked toggle successfully",
                    data: {
                        isLiked: false,
                        like: isLiked,
                    },
                },
                { status: 200 }
            );
        }

        const newLike = await db.like.create({
            data: {
                ownerId: currUserId,
                videoId,
            },
        });

        return NextResponse.json(
            {
                success: true,
                message: "Liked toggle successfully",
                data: {
                    isLiked: true,
                    like: newLike,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        throw error;
    }
}
