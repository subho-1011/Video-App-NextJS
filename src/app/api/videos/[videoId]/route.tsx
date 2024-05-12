import { db } from "@/lib/db";

import { NextRequest, NextResponse } from "next/server";
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
    const id = params.videoId;
    const video = await db.video.findUnique({
        where: { id },
        include: {
            owner: {
                select: { id: true, name: true, username: true, image: true, subscribers: true },
            },
            likes: {
                select: { id: true, ownerId: true },
            },
            comments: {
                select: {
                    id: true,
                    text: true,
                    createdAt: true,
                    owner: {
                        select: { id: true, name: true, username: true, image: true },
                    },
                    likes: {
                        select: { id: true, ownerId: true },
                    },
                },
            },
        },
    });

    if (!video) {
        return NextResponse.json({ error: "Couldn't find video" }, { status: 404 });
    }

    const currUserId = await currentUserId();

    // TODO: Add subscribers count and remove the subscribers array
    const subscribers = video.owner.subscribers.length;
    const isSubscribed = video.owner.subscribers.some((sub) => sub.subscriberId === currUserId);

    const videoData = { ...video, owner: { ...video.owner, subscribers, isSubscribed } };
    return NextResponse.json({ data: videoData, success: "Video data fetch successfully" }, { status: 200 });
}
