import axios from "axios";
import { TVideoCard } from "@/types";

export const addVideoInHistoryAndViews = async (videoId: string) => {
    try {
        const res = await axios.patch(`/api/videos/watch-history?v=${videoId}`);

        return res.data;
    } catch (error: any) {
        if (error.response) {
            return error.response.data;
        }
    }
};

export const getWatchHistory = async () => {
    try {
        const videos = await axios.get(`/api/videos/watch-history`);

        return videos.data;
    } catch (error: any) {
        if (error.response) {
            return error.response.data;
        }
    }
};

export const getLikedVideos = async () => {
    try {
        const videos = await axios.get(`/api/videos/liked-videos`);

        return videos.data;
    } catch (error: any) {
        if (error.response) {
            return error.response.data;
        }
    }
};

export const toggleLikedButton = async (videoId: string) => {
    try {
        const res = await axios.post(`/api/videos/${videoId}/toggle-like`);

        return res.data;
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

export const getAllVideos = async (): Promise<{ data?: TVideoCard[]; error?: string; success?: string }> => {
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

export const editVideo = async (formData: any, videoId: string) => {
    try {
        const res = await axios.post(`/api/videos/${videoId}/edit-video`, formData);

        return res.data;
    } catch (error: any) {
        if (error.response) {
            return error.response.data;
        }
    }
};

export const addVideo = async (formData: any) => {
    try {
        const res = await axios.post(`/api/videos/add-video`, formData);

        return res.data;
    } catch (error: any) {
        if (error.response) {
            return error.response.data;
        }
    }
};
