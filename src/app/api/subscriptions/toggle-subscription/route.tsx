import { NextRequest, NextResponse } from "next/server";

import { currentUserId } from "@/lib/auth";
import { findSubscriptionData, getTotalSubscribers, toggleSubscription } from "@/data/subscription";

export async function POST(request: NextRequest) {
    try {
        const { searchParams } = request.nextUrl;

        const userId = await currentUserId();
        if (!userId || userId === undefined) {
            return NextResponse.json({ error: "You are not logged in" }, { status: 404 });
        }

        const channelId = searchParams.get("c");
        if (!channelId) {
            return NextResponse.json({ error: "Please provide a channelId" }, { status: 404 });
        }

        const isSubscribed = !!(await findSubscriptionData(userId, channelId));

        const subscription = !isSubscribed;
        const res = await toggleSubscription(userId, channelId, subscription);
        if (!res) {
            return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
        }

        const subscribers = await getTotalSubscribers(channelId);

        return NextResponse.json(
            {
                success: "Subscription toggled successfully",
                data: {
                    isSubscribed: subscription,
                    subscribers,
                },
            },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
