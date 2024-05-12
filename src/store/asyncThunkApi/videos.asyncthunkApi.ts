import axios, { isAxiosError } from "axios";
import { TVideo, TVideoCard } from "@/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllVideos } from "@/services/video.services";

export const toggleSubscription = createAsyncThunk("video/toggleSubscription", async (channelId: string) => {
    try {
        const res = await axios.post(`/api/subscriptions/toggle-subscription?c=${channelId}`);
        console.log(res.data.data);

        return res.data.data;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.error || "Failed to subscribe to channel");
        }
    }
});

export const toggleLiked = createAsyncThunk("video/toggleLiked", async (videoId: string) => {
    try {
        const response = await axios.post(`/api/videos/${videoId}/toggle-like`);

        return response.data.data;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.error || "Failed to toggle like");
        }
    }
});

export const fetchAVideoData = createAsyncThunk("video/fetchData", async (videoId: string) => {
    try {
        const response = await axios.get(`/api/videos/${videoId}`);

        const video = response.data.data;
        return video;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.error || "Failed to fetch video data");
        }
    }
});

export const fetchAllVideos = createAsyncThunk("videos/fetchAll", async () => {
    try {
        const response = await getAllVideos();

        const videos: TVideoCard[] = response.data as TVideoCard[];

        return videos;
    } catch (error) {
        throw new Error("Failed to fetch videos");
    }
});
