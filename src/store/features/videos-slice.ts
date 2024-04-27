import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TVideoCard } from "@/types";
import { fetchAllVideos } from "../asyncThunkApi/videos";

type TVideosState = {
    videos: TVideoCard[];
    loading: boolean;
    error?: string;
};

const initialState: TVideosState = {
    videos: [],
    loading: false,
    error: undefined,
};

const videosSlice = createSlice({
    name: "videos",
    initialState,
    reducers: {
        setVideos: (state, action: PayloadAction<TVideoCard[]>) => {
            state.videos = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder.addCase(fetchAllVideos.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchAllVideos.fulfilled, (state, action: PayloadAction<TVideoCard[]>) => {
            state.loading = false;
            state.videos = action.payload;
        });
        builder.addCase(fetchAllVideos.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Failed to fetch videos";
        });
    },
});

export const { setVideos, setLoading, setError } = videosSlice.actions;

export default videosSlice.reducer;
