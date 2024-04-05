"use client";

import React, { useEffect, useState } from "react";

import { Card } from "@/components/ui/card";
import { useSearchParams } from "next/navigation";

import ReactPlayer from "react-player/lazy";
import { videoUrlById } from "@/data/video";

export const VideoCardPlayer = () => {
    const searchParams = useSearchParams();
    const videoId = searchParams.get("v");

    if (!videoId) {
        return <Card className="flex w-full h-full justify-center items-center">Video not found</Card>;
    }

    return <VideoPlayer videoId={videoId} />;
};

const VideoPlayer = ({ videoId }: { videoId: string }) => {
    const [isLoading, setIsLoading] = useState<boolean>();
    const [error, setError] = useState<boolean>();

    const [video, setVideo] = useState<string | undefined>(undefined);

    useEffect(() => {
        setIsLoading(true);

        const res = videoUrlById(videoId).then((res) => {
            if (res?.videoUrl) {
                setVideo(res.videoUrl);
            }
        });

        setIsLoading(false);
    }, [videoId]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-full h-full shadow-md border">
            <ReactPlayer url={video} height="100%" width="100%" playing controls />
        </div>
    );
};
