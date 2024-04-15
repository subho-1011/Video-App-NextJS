"use client";

import React, { useEffect, useState } from "react";
import { SubscriptionCard } from "./subscription-card";
import { getSubscribedChannels } from "@/services/subscriptions.services";
import { useCurrentUser } from "@/hooks/user";
import SubscriptionSkeletonPage from "./subscription-skeleton-page";
import NotLogin from "../not-login";

interface IChannel {
    id: string;
    username: string;
    name: string;
    image: string;
    subscribers: number;
    totalLikes: number;
    totalViews: number;
    totalVideos: number;
}

const Subscriptions = () => {
    const user = useCurrentUser();

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [channels, setChannels] = useState<IChannel[]>([]);

    useEffect(() => {
        setIsLoading(true);

        async function fetchData() {
            if (user && user?.id) {
                await getSubscribedChannels(user?.id).then((res) => {
                    setChannels(res.data);
                });
            }
        }

        fetchData();

        setIsLoading(false);
    }, [user]);

    if (!user) return <NotLogin />;

    return (
        <>
            {isLoading ? (
                <SubscriptionSkeletonPage />
            ) : (
                <div className="flex min-h-screen flex-col">
                    {!channels ? (
                        <ZeroChannelSubscriptions />
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6">
                            {channels.length > 0 &&
                                channels.map((channel) => <SubscriptionCard key={channel.id} {...channel} />)}
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default Subscriptions;

const ZeroChannelSubscriptions = () => {
    return (
        <>
            <div className="flex h-full justify-center items-center">
                <h1 className="text-lg">You are not subscribed to any channels</h1>
            </div>
        </>
    );
};

const IsLoading = () => {
    return (
        <div>
            <h1>Loading....</h1>
        </div>
    );
};


