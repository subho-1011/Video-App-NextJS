import { db } from "@/lib/db";

import { NextRequest, NextResponse } from "next/server";

import { getLikesByVideoId, isVideoLikedByUser } from "@/data/like";
import { getTotalSubscribers, isSubscribedByUser } from "@/data/subscription";
import { currentUserId } from "@/lib/auth";

export async function PATCH(request: NextRequest, { params }: { params: { videoId: string } }) {
    const owner = await currentUserId();

    const id = params.videoId;
    const existingVideo = await db.video.findUnique({ where: { id } });
    if (!existingVideo) {
        return NextResponse.json({ error: "Couldn't find video" }, { status: 404 });
    }

    if (existingVideo.ownerId !== owner) {
        return NextResponse.json({ error: "You are not the owner of this video" }, { status: 403 });
    }

    const { searchParams } = request.nextUrl;

    return NextResponse.json({ success: "OK" }, { status: 200 });
}

export async function GET(request: NextRequest, { params }: { params: { videoId: string } }) {
    const currentUser = await currentUserId();

    const id = params.videoId;
    const video = await db.video.findUnique({
        where: { id },
        include: { owner: true },
    });
    if (!video) {
        return NextResponse.json({ error: "Couldn't find video" }, { status: 404 });
    }

    const likes = await getLikesByVideoId(video.id);
    const isLiked = !!(await isVideoLikedByUser(currentUser!, video.id));
    const subscribers = await getTotalSubscribers(video.owner.id);
    const isSubscribed = await isSubscribedByUser(video.owner.id, currentUser);

    const videoData = { ...video, isLiked, isSubscribed, subscribers, likes };
    return NextResponse.json({ data: videoData, success: "Video data fetch successfully" }, { status: 200 });
}
