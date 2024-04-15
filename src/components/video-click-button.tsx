"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { addVideoInHistoryAndViews } from "@/services/video.services";

export const VideoClickButton = ({
    children,
    videoId,
    playlistId,
    disabled,
}: {
    children: React.ReactNode;
    videoId: string;
    playlistId?: string;
    disabled?: boolean;
}) => {
    const router = useRouter();

    const onClick = async () => {
        if (disabled) return;

        await addVideoInHistoryAndViews(videoId);

        if (playlistId) {
            router.push(`/watch?v=${videoId}&list=${playlistId}`);
        } else {
            router.push(`/watch?v=${videoId}`);
        }
    };

    return (
        <span onClick={onClick} className="cursor-pointer">
            {children}
        </span>
    );
};
