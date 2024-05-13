"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dot, User2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getChannelInfo } from "@/services/dashboard.services";
import { useCurrentUser } from "@/hooks/user";
import { toggleSubscription } from "@/services/subscriptions.services";
import { useRouter } from "next/navigation";
import { DashboardSubPages } from "./dashboard-sub-page";

type ChannelInfo = {
    id: string;
    name: string;
    username: string;
    image: string;
    subscribers: number;
    videos: number;
    isSubscribed: boolean;
};

const Dashboard = ({ username }: { username?: string }) => {
    const router = useRouter();
    const user = useCurrentUser();

    const [channel, setChannel] = useState<ChannelInfo>();

    useEffect(() => {
        if (!username) return;

        getChannelInfo(username).then((res) => {
            if (res.success) {
                setChannel(res.data.channel);
            }
        });

        return () => {
            setChannel(undefined);
        };
    }, [username]);

    if (!username) return null;

    const onToggleSubscriptionButton = async () => {
        if (!user) {
            router.push("/auth/login");
            return;
        }

        const { isSubscribed, subscribers } = await toggleSubscription(
            channel?.id!
        );

        setChannel({ ...channel!, isSubscribed, subscribers });
    };

    return (
        <div className="space-y-8">
            <Card className="p-8">
                <CardContent className="flex gap-10 items-center">
                    <AvatarLogo avatar={channel?.image} />
                    <Informations
                        channel={channel}
                        onSubscribed={onToggleSubscriptionButton}
                    />
                </CardContent>
            </Card>
            <DashboardSubPages />
        </div>
    );
};

const AvatarLogo = ({ avatar }: { avatar: string | undefined }) => {
    return (
        <Avatar className="h-36 w-36">
            <AvatarImage src={avatar} />
            <AvatarFallback>
                <User2Icon />
            </AvatarFallback>
        </Avatar>
    );
};

const Informations = ({ channel, onSubscribed }: { channel?: ChannelInfo; onSubscribed: () => void }) => {
    return (
        <div className="flex flex-col gap-3 w-fit justify-center items-start">
            <h1 className="text-3xl">{channel?.name}</h1>
            <div className="inline-flex opacity-75">
                <span>@{channel?.username}</span>
                <Dot />
                <span>{channel?.subscribers} subscribers</span>
                <Dot />
                <span>{channel?.videos} videos</span>
            </div>
            <Button size="sm" className="flex rounded-full px-6" onClick={onSubscribed}>
                {channel?.isSubscribed ? "subscribed" : "subscribe"}
            </Button>
        </div>
    );
};

export default Dashboard;
