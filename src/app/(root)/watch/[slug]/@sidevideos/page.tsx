"use client";

import React from "react";

import { VideoCard } from "@/components/video/home-video-card";
import { useGetVideos } from "@/hooks/videos.hooks";

const HomePage = () => {
    const { isLoading, videos } = useGetVideos();

    return (
        <>
            {isLoading ? (
                "Loading..."
            ) : (
                <div className="flex w-full">
                    <div className="flex flex-col w-full min-w-92">
                        {videos && videos.map((video) => <VideoCard key={video.id} {...video} />)}
                    </div>
                </div>
            )}
        </>
    );
};

export default HomePage;
