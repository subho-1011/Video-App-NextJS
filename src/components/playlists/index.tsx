"use client";

import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import { PlaylistCard } from "@/components/playlists/playlist-card";
import { CreatePlaylistForm } from "@/components/playlists/create-playlist-form";

import { Plus } from "lucide-react";

import { getPlaylists, TPlaylistWithVideos } from "@/services/playlists.services";

const Playlists = () => {
    const [playlists, setPlaylists] = useState<TPlaylistWithVideos[]>();

    useEffect(() => {
        getPlaylists().then((res) => {
            if (res.success) {
                setPlaylists(res.data?.playlists);
            }
        });
    }, []);

    return (
        <div>
            <div className="flex justify-between items-center">
                <h1 className="text-2xl mb-4">Playlists</h1>
                <div className="flex gap-4 mr-4 items-center">
                    <span>add new playlist</span>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button size="icon">
                                <Plus />
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Create new playlist</DialogTitle>
                            </DialogHeader>
                            <div>
                                <CreatePlaylistForm />
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {playlists &&
                    playlists.length > 0 &&
                    playlists.map((playlist) => <PlaylistCard key={playlist.id} playlist={playlist} />)}
            </div>
        </div>
    );
};

export default Playlists;
