"use client";

import React, { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dot, User2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardSubPages } from "./dashboard-sub-page";
import { useAppDispatch, useAppSelector } from "@/lib/utils";
import {
    getChannelInfo,
    toggleSubscription,
} from "@/store/asyncThunkApi/dashboard.asyncthunkApi";
import { resetChannel } from "@/store/features/dashboard-slice";

const Dashboard = () => {
    const dispatch = useAppDispatch();
    const channelName = useAppSelector((state) => state.Dashboard.channelName);

    useEffect(() => {
        return () => {
            dispatch(resetChannel());
        };
    }, [dispatch]);

    if (!channelName) return null;

    return (
        <div className="space-y-8">
            <Card className="p-8">
                <CardContent className="flex gap-10 items-center">
                    <AvatarLogo />
                    <ChannelInformations />
                </CardContent>
            </Card>
            <DashboardSubPages />
        </div>
    );
};

const AvatarLogo = () => {
    const image = useAppSelector((state) => state.Dashboard.channel?.image);

    return (
        <Avatar className="h-36 w-36">
            <AvatarImage src={image} />
            <AvatarFallback>
                <User2Icon />
            </AvatarFallback>
        </Avatar>
    );
};

const ChannelInformations = () => {
    const dispatch = useAppDispatch();

    const { channelName, channel, isSubscribed, videos } = useAppSelector(
        (state) => state.Dashboard
    );

    useEffect(() => {
        if (channelName) {
            dispatch(getChannelInfo(channelName));
        }
    }, [dispatch, channelName]);

    return (
        <div className="flex flex-col gap-3 w-fit justify-center items-start">
            <h1 className="text-3xl">{channel?.name}</h1>
            <div className="inline-flex opacity-75">
                <span>@{channel?.username}</span>
                <Dot />
                <span>{channel?.subscribers} subscribers</span>
                <Dot />
                <span>{videos.length} videos</span>
            </div>
            <Button
                size="sm"
                className="flex rounded-full px-6"
                onClick={() => dispatch(toggleSubscription(channel?.id || ""))}
            >
                {isSubscribed ? "subscribed" : "subscribe"}
            </Button>
        </div>
    );
};

export default Dashboard;
