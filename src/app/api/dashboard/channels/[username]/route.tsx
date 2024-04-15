import { getUserByUsername } from "@/data/user";
import { currentUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { username: string } }) {
    try {
        const username = params.username;
        if (!username) return NextResponse.json({ error: "Please provide a username" }, { status: 404 });

        const user = await getUserByUsername(username);
        if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

        const subscribers = await db.subscription.count({ where: { subscriberId: user.id } });

        const videos = await db.video.count({ where: { ownerId: user.id } });

        const currUserId = await currentUserId();

        const isSubscribed = currUserId
            ? !!(await db.subscription.findFirst({
                  where: { subscriberId: currUserId, channelToSubscribedId: user.id },
              }))
            : false;

        return NextResponse.json(
            {
                data: {
                    channel: {
                        id: user.id,
                        username: user.username,
                        name: user.name,
                        image: user.image,
                        subscribers,
                        videos,
                        isSubscribed,
                    },
                },
                success: true,
                message: "Channel information fetch successfully",
            },
            { status: 200 }
        );
    } catch {
        return NextResponse.json({ error: "Something went wrong" }, { status: 400 });
    }
}
