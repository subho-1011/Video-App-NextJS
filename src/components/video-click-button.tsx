"use client";

import { useRouter } from "next/navigation";
import React from "react";

export const VideoClickButton = ({ children, videoId }: { children: React.ReactNode; videoId: string }) => {
    const router = useRouter();

    const onClick = () => {
        router.push(`/watch?v=${videoId}`);
    };

    return (
        <span onClick={onClick} className="cursor-pointer">
            {children}
        </span>
    );
};
