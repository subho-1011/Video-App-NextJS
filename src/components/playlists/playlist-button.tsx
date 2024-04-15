"use client";

import React from "react";
import { useRouter } from "next/navigation";

export const PlaylistButton = ({
    children,
    videosId,
    playlistId,
}: {
    children: React.ReactNode;
    videosId: string[];
    playlistId: string;
}) => {
    const router = useRouter();

    const onClick = () => {
        router.push(`/watch?v=${videosId[0]}&list=${playlistId}`);
    };

    return (
        <span className="hover:scale-[1.01] cursor-pointer" onClick={onClick}>
            {children}
        </span>
    );
};
