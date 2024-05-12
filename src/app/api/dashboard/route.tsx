import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { currentUserId } from "@/lib/auth";

export async function GET() {
    const userId = await currentUserId();
    if (!userId) {
        return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const user = await db.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            username: true,
            email: true,
            image: true,
            name: true,
        },
    });

    if (!user) {
        return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    const subscribers = await db.subscription.count({ where: { channelToSubscribedId: userId } });
    const isSubscribed = await db.subscription.findFirst({
        where: { channelToSubscribedId: userId, subscriberId: userId },
    });
    const videos = await db.video.count({ where: { ownerId: userId } });

    const channel = { ...user, subscribers, isSubscribed: !!isSubscribed, videos };

    return NextResponse.json(
        { success: true, message: "Get channel data successfully", data: { channel } },
        { status: 200 }
    );
}
