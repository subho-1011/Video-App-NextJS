import { getUserByUsername } from "@/data/user";
import { currentUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: { username: string } }
) {
    try {
        const username = params.username;
        if (!username)
            return NextResponse.json(
                { error: "Please provide a username" },
                { status: 404 }
            );

        const data = await db.user.findFirst({
            where: { username },
            select: {
                id: true,
                username: true,
                name: true,
                image: true,
                subscribers: {
                    select: {
                        subscriberId: true,
                    },
                },
                videos: {
                    select: {
                        id: true,
                        title: true,
                        description: true,
                        thumbnail: true,
                        views: true,
                        createdAt: true,
                        owner: {
                            select: {
                                id: true,
                                name: true,
                                username: true,
                                image: true,
                            },
                        },
                    },
                },
            },
        });

        const userId = await currentUserId();
        const isSubscribed = data?.subscribers.some(
            (subscriber) => subscriber.subscriberId === userId
        );

        if (!data) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                data: {
                    channel: {
                        id: data.id,
                        username: data.username,
                        name: data.name,
                        image: data.image,
                        subscribers: data.subscribers.length,
                    },
                    videos: data.videos,
                    isSubscribed,
                },
                success: true,
                message: "Channel information fetch successfully",
            },
            { status: 200 }
        );

        // const user = await getUserByUsername(username);
        // if (!user)
        //     return NextResponse.json(
        //         { error: "User not found" },
        //         { status: 404 }
        //     );

        // const subscribers = await db.subscription.count({
        //     where: { subscriberId: user.id },
        // });

        // const videos = await db.video.count({ where: { ownerId: user.id } });

        // const currUserId = await currentUserId();

        // const isSubscribed = currUserId
        //     ? !!(await db.subscription.findFirst({
        //           where: {
        //               subscriberId: currUserId,
        //               channelToSubscribedId: user.id,
        //           },
        //       }))
        //     : false;
    } catch {
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 400 }
        );
    }
}
