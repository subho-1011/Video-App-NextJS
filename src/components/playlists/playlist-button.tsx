"use client";

import React from "react";
import { useRouter } from "next/navigation";

export const PlaylistButton = ({
    children,
    videoId,
    slug,
    playlistId,
}: {
    children: React.ReactNode;
    videoId: string;
    slug: string;
    playlistId: string;
}) => {
    const router = useRouter();

    const onClick = () => {
        router.push(`/watch/${slug}?v=${videoId}&list=${playlistId}`);
    };

    return (
        <span className="hover:scale-[1.01] cursor-pointer" onClick={onClick}>
            {children}
        </span>
    );
};
