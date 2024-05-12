"use client";

import React, { useEffect } from "react";
import { Dot, User2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TChannel } from "@/types";
import { useCurrentUser } from "@/hooks/user";
import { useRouter } from "next/navigation";
import { getDashboardInfo } from "@/services/dashboard.services";

const DashboardPage = () => {
    const user = useCurrentUser();
    const router = useRouter();
    const [channel, setChannel] = React.useState<TChannel | undefined>(undefined);

    useEffect(() => {
        getDashboardInfo().then((res) => {
            if (res.success) {
                setChannel(res.data.channel);
            }
        });
    }, []);

    if (!user) {
        router.push("/auth/login");
        return null;
    }

    const onToggleSubscriptionButton = async () => {
        return null;
    };

    return (
        <div className="space-y-8">
            <Card className="p-8">
                <CardContent className="flex gap-10 items-center">
                    <AvatarLogo avatar={channel?.image!} />
                    <Informations channel={channel} onSubscribed={onToggleSubscriptionButton} />
                </CardContent>
            </Card>
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

const Informations = ({ channel, onSubscribed }: { channel?: TChannel; onSubscribed: () => void }) => {
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

export default DashboardPage;
