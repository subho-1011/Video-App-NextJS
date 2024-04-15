"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SideVideoCard } from "@/components/video/side-video-card";

import { getAPlaylist, TPlaylistWithVideos } from "@/services/playlists.services";

const VideoPlaylist = () => {
    const seatchParams = useSearchParams();
    const playlistId = seatchParams.get("list");

    const [playlist, setPlaylist] = useState<TPlaylistWithVideos>();

    useEffect(() => {
        if (!playlistId) return;
        getAPlaylist(playlistId).then((res) => {
            if (res.success) {
                setPlaylist(res.data?.playlist);
            }
        });
    }, [playlistId]);

    console.log(playlist);

    if (!playlist) return null;

    return (
        <Card>
            <CardHeader className="flex rounded-md rounded-b-none">
                <CardTitle>{playlist.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col rounded-md bg-secondary m-0 px-2 py-4 gap-3">
                {playlist.videos.length > 0 &&
                    playlist.videos.map((video) => <SideVideoCard key={video.id} video={video} listId={playlist.id} />)}
            </CardContent>
        </Card>
    );
};

export default VideoPlaylist;
