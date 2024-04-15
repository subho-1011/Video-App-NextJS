"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { addVideoInHistoryAndViews } from "@/services/video.services";

export const VideoClickButton = ({
    children,
    videoId,
    slug,
    playlistId,
    disabled,
}: {
    children: React.ReactNode;
    videoId: string;
    slug: string;
    playlistId?: string;
    disabled?: boolean;
}) => {
    const router = useRouter();

    const onClick = async () => {
        if (disabled) return;

        await addVideoInHistoryAndViews(videoId);

        if (playlistId) {
            router.push(`/watch/${slug}?v=${videoId}&list=${playlistId}`);
        } else {
            router.push(`/watch/${slug}?v=${videoId}`);
        }
    };

    return (
        <span onClick={onClick} className="cursor-pointer">
            {children}
        </span>
    );
};
