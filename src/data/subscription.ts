"use server";

import { currentUserId } from "@/lib/auth";
import { db } from "@/lib/db";

export const createSubscription = async (userId: string, channelId: string) => {
    try {
        return await db.subscription.create({
            data: {
                subscriberId: userId,
                channelToSubscribedId: channelId,
            },
        });
    } catch {
        return null;
    }
};

export const deleteSubscription = async (userId: string, channelId: string) => {
    try {
        return await db.subscription.deleteMany({
            where: {
                subscriberId: userId,
                channelToSubscribedId: channelId,
            },
        });
    } catch {
        return null;
    }
};

export const toggleSubscription = (userId: string, channelId: string, subscription: boolean) => {
    try {
        if (subscription) {
            return createSubscription(userId, channelId);
        }
        return deleteSubscription(userId, channelId);
    } catch (error) {
        console.error("Error toggling subscription", error);
        throw new Error("Error toggling subscription");
    }
};

export const findSubscriptionData = async (userId: string, channelId: string) => {
    try {
        const response = await db.subscription.findFirst({
            where: {
                subscriberId: userId,
                channelToSubscribedId: channelId,
            },
        });

        return response;
    } catch {
        return null;
    }
};

export const getTotalSubscribers = async (channelId: string) => {
    const subscribers = await db.subscription.count({
        where: {
            channelToSubscribedId: channelId,
        },
    });

    return subscribers;
};

export const isSubscribedByUser = async (chnnelId: string, userId: string | undefined) => {
    if (!userId) return false;

    const isSubscribed = !!(await db.subscription.findFirst({
        where: {
            subscriberId: chnnelId,
            channelToSubscribedId: userId,
        },
    }));

    return isSubscribed;
};
