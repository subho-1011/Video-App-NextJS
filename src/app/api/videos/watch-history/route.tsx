import { getUserById } from "@/data/user";
import { getVideoById } from "@/data/video";
import { currentUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
    const { searchParams } = request.nextUrl;

    const userId = await currentUserId();
    if (!userId) {
        return NextResponse.json({ error: "You are not logged in" }, { status: 404 });
    }

    const videoId = searchParams.get("v");
    const video = !!(await getVideoById(videoId!));
    if (!videoId || !video) {
        return NextResponse.json({ error: "Valid video id required" }, { status: 404 });
    }

    const user = await getUserById(userId);
    const watchHistory = user?.watchHistory;

    const filteredWatchHistory = watchHistory?.filter((id) => id !== videoId);
    const updatedWatchHistory = [videoId, ...filteredWatchHistory!];

    const updatedUser = await db.user.update({
        where: { id: userId },
        data: { watchHistory: updatedWatchHistory },
    });

    if (!updatedUser) {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }

    return NextResponse.json({ data: updatedUser, success: "Watch history updated successfully" }, { status: 200 });
}

export async function GET(request: NextRequest) {
    const userId = await currentUserId();
    if (!userId) {
        return NextResponse.json({ error: "You are not logged in" }, { status: 404 });
    }

    const user = await db.user.findUnique({
        where: { id: userId },
    });
    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { watchHistory } = user;
    if (!watchHistory || watchHistory.length === 0) {
        return NextResponse.json({ error: "No videos found" }, { status: 404 });
    }

    const videos = await Promise.all(
        watchHistory.map(async (id) => {
            const video = await db.video.findUnique({
                where: { id },
                include: {
                    owner: {
                        select: {
                            id: true,
                            username: true,
                            name: true,
                            image: true,
                        },
                    },
                },
            });

            return video;
        })
    );

    return NextResponse.json({ data: videos, success: "Watch history fetch successfully" }, { status: 200 });
}
