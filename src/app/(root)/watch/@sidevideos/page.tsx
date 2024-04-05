"use client";

import React, { useEffect, useState } from "react";

import { VideoCard } from "@/components/video/home-video-card";

import { getAllVideos } from "@/services/video.services";
import { IVideoCard } from "@/lib/types";

const HomePage = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();

    const [videos, setVideos] = useState<IVideoCard[]>();

    useEffect(() => {
        setIsLoading(true);

        getAllVideos()
            .then((res) => {
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
