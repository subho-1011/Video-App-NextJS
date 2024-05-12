"use client";

import React from "react";

import NotLogin from "@/components/not-login";
import { useCurrentUser } from "@/hooks/user";
import { VideoCard } from "@/components/video/home-video-card";
import { SkeletonPage } from "@/components/home-skeleton-page";
import { useLikedVideos } from "@/hooks";

const LikedVideo = () => {
    const user = useCurrentUser();
    const { isLoading, error, videos } = useLikedVideos();

    if (!user) return <NotLogin />;

    return (
        <>
            {isLoading ? (
                <SkeletonPage />
            ) : (
                <div className="flex min-h-screen flex-col">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-4 md:gap-y-6">
                        {videos && videos.map((video) => <VideoCard key={video.id} {...video} />)}
                    </div>
                </div>
            )}
        </>
    );
};

export default LikedVideo;
