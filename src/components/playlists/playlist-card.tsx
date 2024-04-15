"use client";

import Image from "next/image";
import { timeInterval } from "@/lib/utils";

import { Dot } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

import { TPlaylistWithVideos } from "@/services/playlists.services";
import { PlaylistButton } from "@/components/playlists/playlist-button";

export const PlaylistCard = ({ playlist }: { playlist: TPlaylistWithVideos }) => {
    const time = timeInterval(playlist.createdAt.toString());

    return (
        <PlaylistButton videosId={playlist.videosId} playlistId={playlist.id}>
            <div className="flex flex-col space-y-2">
                <div className=" relative w-full">
                    <div className="h-2 flex rounded-t-xl border border-b-0" />
                    <div className="h-2 flex rounded-t-xl border border-b-0" />
                    <div className="min-h-36 border flex rounded-xl">
                        <AspectRatio ratio={16 / 9} className="w-full h-full absolute">
                            <Image
                                src={playlist.videos[0]?.thumbnail}
                                alt="playlist thumbanail"
                                height={240}
                                width={240}
                                loading="lazy"
                                className="flex rounded-lg w-full h-full object-cover"
                            />
                        </AspectRatio>
                    </div>
                </div>
                <h1 className="text-lg text-secondary-foreground line-clamp-2">{playlist.title}</h1>
                <p className="flex text-sm text-muted-foreground">
                    <span>{playlist.owner.username}</span>
                    <Dot />
                    <span>{time} ago</span>
                </p>
            </div>
        </PlaylistButton>
    );
};
