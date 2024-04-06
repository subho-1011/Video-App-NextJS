import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = request.nextUrl;

    const userId = searchParams.get("u");
    if (!userId) {
        return NextResponse.json({ error: "You are not logged in" }, { status: 404 });
    }

    const channels = await db.subscription.findMany({
        where: {
            subscriberId: userId,
        },
    });
    if (!channels || channels.length === 0) {
        return NextResponse.json({ error: "You are not subscribed to any channels" }, { status: 200 });
    }

    const channelIds = channels.map((channel) => channel.channelToSubscribedId);

    const channelDetails = await Promise.all(
        channelIds.map(async (id) => {
            const channel = await db.user.findUnique({
                where: { id },
                select: {
                    id: true,
                    username: true,
                    name: true,
                    image: true,
                    videos: { select: { views: true } },
                },
            });

            const subscribers = await db.subscription.count({
                where: {
                    channelToSubscribedId: id,
                },
            });

            const channelTotalLikes = await db.like.count({
                where: {
                    AND: {
                        ownerId: id,
                        videoId: { not: null },
                    },
                },
            });

            const totalVideos = channel.videos.length;

            const totalViews = channel.videos.reduce((total: number, video) => {
                return total + video.views;
            }, 0);

            return {
                ...channel,
                subscribers,
                totalVideos,
                totalViews,
                totalLikes: channelTotalLikes,
            };
        })
    );

    return NextResponse.json({ data: channelDetails, success: "Channels data fetch successfully" }, { status: 200 });
}
