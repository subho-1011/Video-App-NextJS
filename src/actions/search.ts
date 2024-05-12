"use server";

import { getVideos } from "@/data/video";
import { TVideo } from "../types";

export const searchAll = async (query: string) => {
    if (!query) return null;

    const videos = await getVideos();
    if (!videos) return;

    const filterVideos = searchVideos(videos as TVideo[], query);

    return filterVideos;
};

export const searchVideos = (videos: TVideo[], query: string): TVideo[] => {
    const filteredVideos = videos.filter((video) => {
        const titleMatch = video.title.toLowerCase().includes(query.toLowerCase());
        const descriptionMatch = video.description?.toLowerCase().includes(query.toLowerCase());
        const usernameMatch = video.owner.username?.toLowerCase().includes(query.toLowerCase());
        const tagsMatch = video.tags?.some((tag) => tag.toLowerCase().includes(query.toLowerCase()));

        return titleMatch || descriptionMatch || usernameMatch;
    });

    return filteredVideos;
};
