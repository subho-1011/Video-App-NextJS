"use client";

import { addVideoInHistoryAndViews } from "@/services/video.services";
import { useRouter } from "next/navigation";
import React from "react";

export const VideoClickButton = ({ children, videoId }: { children: React.ReactNode; videoId: string }) => {
    const router = useRouter();

    const onClick = async () => {
        router.push(`/watch?v=${videoId}`);
        await addVideoInHistoryAndViews(videoId);
    };

    return (
        <span onClick={onClick} className="cursor-pointer">
            {children}
        </span>
    );
};
