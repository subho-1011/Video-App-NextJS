import { z } from "zod";
import axios from "axios";

import { Playlist, Video } from "@prisma/client";

import { PlaylistForm } from "@/lib/schemas";

type TResponse = {
    success?: boolean;
    error?: string;
    message?: string;
};

export type VideoWithOwner = Video & {
    owner: {
        id: string;
        name: string;
        username: string;
        image: string;
    };
};

export type TPlaylistWithVideos = Playlist & {
    videos: VideoWithOwner[];
    owner: {
        id: string;
        name: string;
        username: string;
        image: string;
    };
};

type TGetAPlaylistResponse = TResponse & {
    data?: {
        playlist: Playlist & {
            videos: VideoWithOwner[];
            owner: {
                id: string;
                name: string;
                username: string;
                image: string;
            };
        };
    };
};

type TGetPlaylistResponse = TResponse & {
    data?: {
        playlists: TPlaylistWithVideos[];
    };
};

type TCreatePlaylistResponse = TResponse & {
    data?: {
        playlist: Playlist;
    };
};

export const getAPlaylist = async (listId: string): Promise<TGetAPlaylistResponse> => {
    try {
        const res = await axios.get(`/api/playlists/${listId}`);

        return res.data;
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            if (error.response) return error.response.data;
            return { error: "Network error" };
        }

        return error.message;
    }
};

export const getPlaylists = async (): Promise<TGetPlaylistResponse> => {
    try {
        const res = await axios.get(`/api/playlists`);

        return res.data;
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            if (error.response) return error.response.data;
            return { error: "Network error" };
        }

        return error.message;
    }
};

export const createPlaylist = async (values: z.infer<typeof PlaylistForm>): Promise<TCreatePlaylistResponse> => {
    try {
        const res = await axios.post(`/api/playlists`, values);

        return res.data;
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            if (error.response) return error.response.data;
            return { error: "Network error" };
        }

        return error.message;
    }
};
