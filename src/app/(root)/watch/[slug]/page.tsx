"use client";

import React from "react";
import ReactPlayer from "react-player";
import { useGetAVideoData } from "@/hooks/videos.hooks";

import { DashboardButton } from "@/components/dashboard-button";
import { VideoLikeButton } from "../_components/video-like-button";
import { VideoShareButton } from "../_components/video-share-button";
import { OwnerAvatarButton } from "../_components/owner-avatar-button";
import { VideoSubscriberButton } from "../_components/video-subscription-button";

import { Dot } from "lucide-react";
import { timeInterval, useAppDispatch } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { toggleLiked, toggleSubscription } from "@/store/asyncThunkApi/videos.asyncthunkApi";

export default function Page() {
    const dispatch = useAppDispatch();
    const { isLoading, video, isLiked } = useGetAVideoData();

    if (!video) return null;

    return (
        <>
            <div className="w-full h-full shadow-md border">
                <ReactPlayer
                    url={video?.videoUrl}
                    height="100%"
                    width="100%"
                    playing
                    controls
                />
            </div>
            <div className="flex items-center">
                <h1 className="text-lg font-medium">{video.title}</h1>
            </div>
            <div className="flex flex-col-reverse md:flex-row gap-x-2 gap-y-4 justify-between">
                <div className="flex gap-x-4 items-center">
                    <OwnerAvatarButton {...video.owner} />
                    <DashboardButton username={video.owner.username}>
                        <div className="flex flex-col justify-center">
                            <h1 className="font-normal">{video.owner.name}</h1>
                            <p className="text-muted-foreground text-sm">
                                {video.owner.subscribers} subscribers
                            </p>
                        </div>
                    </DashboardButton>
                    <VideoSubscriberButton
                        isSubscribed={video.owner.isSubscribed}
                        onToggleSubscriptionButton={() => {
                            dispatch(toggleSubscription(video.owner.id));
                        }}
                    />
                </div>
                <div className="flex gap-x-10 items-center justify-end">
                    <VideoLikeButton
                        isLiked={isLiked}
                        likes={video.likes.length}
                        onToggleLikeButton={() => {
                            dispatch(toggleLiked(video.id));
                        }}
                    />
                    <VideoShareButton />
                </div>
            </div>
            <Card className="flex flex-col space-y-2 bg-secondary p-4">
                <h1 className="text-lg text-secondary-foreground">
                    {video.title}
                </h1>
                <p className="flex text-muted-foreground">
                    <span className="text-secondary-foreground">
                        {video.views} views
                    </span>
                    <Dot />
                    <span className="text-secondary-foreground">
                        {timeInterval(video.createdAt)}
                    </span>
                </p>
                <p className="text-muted-foreground">{video.description}</p>
            </Card>
        </>
    );
}
