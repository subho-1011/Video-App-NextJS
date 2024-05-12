"use client";

import React from "react";

import { VideoCard } from "@/components/video/home-video-card";

import { SkeletonPage } from "../home-skeleton-page";
import { useGetVideos } from "@/hooks/videos.hooks";

const HomePage = () => {
    const { isLoading, videos, error } = useGetVideos();

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

export default HomePage;
