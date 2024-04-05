import { getLikesAVideo, isVideoLikedByUser, toggleVideoLike } from "@/data/like";
import { currentUserId } from "@/lib/auth";

import { revalidateTag } from "next/cache";
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

        const isLiked = await isVideoLikedByUser(currUserId, videoId);

        const liked = !isLiked;
        const res = await toggleVideoLike(currUserId, videoId, liked);
        if (!res) {
            return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
        }

        const likes = await getLikesAVideo(videoId);

        revalidateTag("likes");
        return NextResponse.json(
            {
                success: "Liked toggle successfully",
                data: {
                    isLiked: liked,
                    likes: likes,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        throw error;
    }
}
