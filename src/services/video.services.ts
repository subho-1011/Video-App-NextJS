import axios from "axios";

import { IVideoCard } from "@/lib/types";

export const toggleLikedButton = async (videoId: string) => {
    try {
        const res = await axios.post(`/api/videos/${videoId}/toggle-like`, { next: { tag: "likes" } });

        console.log(res.data);

        return res.data.data;
    } catch (error) {
        throw error;
    }
};

export const videoData = async (videoId: string) => {
    if (!videoId) return;

    try {
        const videos = await axios.get(`/api/videos/${videoId}`);
        return videos.data;
    } catch (error: any) {
        if (error.response) {
            return error.response.data;
        }
    }
};

export const getAllVideos = async (): Promise<{ data?: IVideoCard[]; error?: string; success?: string }> => {
    try {
        const videos = await axios.get(`/api/videos`);

        return videos.data;
    } catch (error: any) {
        if (error.response) {
            return error.response.data;
        }

        return { error: "Something went wrong" };
    }
};

export const addVideo = async (formData: any) => {
    console.log(formData);

    try {
        const res = await axios.post(`/api/videos/add-video`, formData);

        return res.data;
    } catch (error: any) {
        if (error.response) {
            return error.response.data;
        }
    }
};
