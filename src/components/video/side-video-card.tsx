import Image from "next/image";

import { AspectRatio } from "@/components/ui/aspect-ratio";

import { timeInterval } from "@/lib/utils";
import { Dot } from "lucide-react";
import { VideoWithOwner } from "@/services/playlists.services";
import { VideoClickButton } from "../video-click-button";
import { ThumbnailCard } from "./thumbnail-card";

export const SideVideoCard = ({ video, listId }: { video: VideoWithOwner; listId?: string }) => {
    return (
        <VideoClickButton videoId={video.id} slug={video.slug} playlistId={listId ?? undefined}>
            <div className="flex w-full gap-2">
                <div className="flex w-1/2">
                    <AspectRatio ratio={16 / 9}>
                        <Image
                            src={video.thumbnail}
                            alt="thumbnail"
                            width={240}
                            height={240}
                            loading="lazy"
                            className="w-full h-full object-cover flex rounded-md"
                        />
                    </AspectRatio>
                </div>
                <div className="flex flex-col w-1/2 justify-between">
                    <h1 className="line-clamp-2">{video.title}</h1>
                    <span>
                        <h3 className="text-muted-foreground">@{video.owner.username}</h3>
                        <p className="flex text-sm items-center text-muted-foreground">
                            <span>{video.views} views</span>
                            <Dot />
                            <span>{timeInterval(video.createdAt.toString())} ago</span>
                        </p>
                    </span>
                </div>
            </div>
        </VideoClickButton>
    );
};
