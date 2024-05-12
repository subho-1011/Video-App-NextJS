"use client";

import { Card, CardFooter } from "@/components/ui/card";

import { ThumbnailCard } from "./thumbnail-card";
import { VideoCardFooter } from "./video-card-footer";
import { TVideoCard } from "@/types";

export const VideoCard = ({ id, title, slug, thumbnail, views, duration, createdAt, owner }: TVideoCard) => {
    return (
        <Card className="space-y-3 border-0">
            <ThumbnailCard {...{ id, slug, thumbnail }}>
                <p className="flex rounded-lg right-3 bottom-3 px-1.5 bg-black/70 absolute">{duration}</p>
            </ThumbnailCard>
            <CardFooter className="flex items-start gap-4 px-3">
                <VideoCardFooter id={id} title={title} views={views} owner={owner} createdAt={createdAt} />
            </CardFooter>
        </Card>
    );
};


