"use client";

import React from "react";
import Image from "next/image";

import { AspectRatio } from "../ui/aspect-ratio";
import { VideoClickButton } from "../video-click-button";

interface ThumbnailCardProps {
    id: string;
    thumbnail: string;
    children?: React.ReactNode;
    disabled?: boolean;
}

export const ThumbnailCard = ({ id, thumbnail, disabled, children }: ThumbnailCardProps) => {
    return (
        <VideoClickButton videoId={id} disabled>
            <AspectRatio ratio={16 / 9} className="w-full relative">
                <>
                    <Image
                        src={thumbnail}
                        alt="thumbnail"
                        width={400}
                        height={400}
                        loading="lazy"
                        className="h-full w-full flex rounded-lg object-cover"
                    />
                    {children}
                </>
            </AspectRatio>
        </VideoClickButton>
    );
};
