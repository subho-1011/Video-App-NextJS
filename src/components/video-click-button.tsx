"use client";

import { addVideoInHistory } from "@/services/video.services";
import { useRouter } from "next/navigation";
import React from "react";

export const VideoClickButton = ({ children, videoId }: { children: React.ReactNode; videoId: string }) => {
    const router = useRouter();

    const onClick = async () => {
        router.push(`/watch?v=${videoId}`);
        await addVideoInHistory(videoId);
    };

    return (
        <span onClick={onClick} className="cursor-pointer">
            {children}
        </span>
    );
};
