import { TVideo } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchAVideoData, toggleLiked, toggleSubscription } from "../asyncThunkApi/videos.asyncthunkApi";

type TVideoDataState = {
    video: TVideo | null;
    loading: boolean;
    error?: string;
};

const initialState: TVideoDataState = {
    video: null,
    loading: false,
    error: undefined,
};

const videoDataSlice = createSlice({
    name: "videoData",
    initialState,
    reducers: {
        clearVideoData(state) {
            state.video = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAVideoData.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchAVideoData.fulfilled, (state, action: PayloadAction<TVideo>) => {
            state.video = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchAVideoData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Failed to fetch video data";
        });

        // toggleLike
        builder.addCase(toggleLiked.fulfilled, (state, action) => {
            if (!state.video) return;

            if (!action.payload.isLiked) {
                state.video.likes = state.video.likes.filter((like) => like.id !== action.payload.like.id);
                return;
            }

            state.video.likes.push({
                id: action.payload.like.id,
                ownerId: action.payload.like.ownerId,
            });
        });

        // toggleSubscription
        builder.addCase(toggleSubscription.fulfilled, (state, action) => {
            if (!action.payload.isSubscribed) {
                state.video!.owner.isSubscribed = !state.video!.owner.isSubscribed;
                state.video!.owner.subscribers -= 1;
                return;
            }

            state.video!.owner.isSubscribed = !state.video!.owner.isSubscribed;
            state.video!.owner.subscribers += 1;
        });
    },
});

export const { clearVideoData } = videoDataSlice.actions;

export default videoDataSlice.reducer;
