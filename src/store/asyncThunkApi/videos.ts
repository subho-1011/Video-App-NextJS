import { createAsyncThunk } from "@reduxjs/toolkit";
import { TVideo, TVideoCard } from "@/types";
import { getAllVideos } from "@/services/video.services";

export const fetchAllVideos = createAsyncThunk("videos/fetchAll", async () => {
    try {
        const response = await getAllVideos();

        const videos: TVideoCard[] = response.data as TVideoCard[];

        return videos;
    } catch (error) {
        throw new Error("Failed to fetch videos");
    }
});
