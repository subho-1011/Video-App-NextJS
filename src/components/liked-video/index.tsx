"use client";

import React, { useEffect, useState } from "react";

import { VideoCard } from "@/components/video/home-video-card";

import { getAllVideos, getLikedVideos } from "@/services/video.services";
import { IVideoCard } from "@/lib/types";

const LikedVideo = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();

    const [videos, setVideos] = useState<IVideoCard[]>();

    useEffect(() => {
        setIsLoading(true);

        getLikedVideos()
            .then((res) => {
                console.log(res.data);

                if (res.success) {
                    setSuccess(res.success);
                    setVideos(res.data);
                }

                if (res.error) {
                    setError(res.error);
                }
            })
            .finally(() => setIsLoading(false));
    }, []);

    return (
        <>
            {isLoading ? (
                "Loading..."
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
