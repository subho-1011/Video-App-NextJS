"use client";

import { Dot } from "lucide-react";
import { DashboardButton } from "../dashboard-button";
import { UserDashboardButton } from "../user-dashboard-button";
import { VideoClickButton } from "../video-click-button";
import { slugTransform, timeInterval } from "@/lib/utils";
import { VideoFuturesButton } from "./video-fetures-button";
import { TOwner } from "@/types";

interface VideoTitleProps {
    id: string;
    title: string;
    views: number;
    createdAt: Date;
    owner: TOwner;
}

interface VideoCardFooterProps extends VideoTitleProps {}

export const VideoCardFooter = ({
    id,
    title,
    views,
    owner,
    createdAt,
}: VideoCardFooterProps) => {
    return (
        <>
            <UserDashboardButton {...owner} />
            <VideoTitle {...{ id, title, views, owner, createdAt }} />
            <VideoFuturesButton />
        </>
    );
};

export const VideoTitle = ({
    id,
    title,
    views,
    owner,
    createdAt,
}: VideoTitleProps) => {
    const createdTimeInterval = timeInterval(createdAt.toString());

    return (
        <div className="flex flex-col">
            <h1 className="lg:text-lg line-clamp-2 md:mb-2">
                <VideoClickButton slug={slugTransform(title)} videoId={id}>
                    {title}
                </VideoClickButton>
            </h1>
            <h1 className="text-muted-foreground">
                <DashboardButton username={owner.username}>
                    @{owner.username}
                </DashboardButton>
            </h1>
            <p className="text-muted-foreground inline-flex">
                <span>{views} views</span>
                <Dot />
                <span>{createdTimeInterval}</span>
            </p>
        </div>
    );
};
