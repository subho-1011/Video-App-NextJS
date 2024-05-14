import { createSlice } from "@reduxjs/toolkit";
import {
    getChannelInfo,
    toggleSubscription,
} from "../asyncThunkApi/dashboard.asyncthunkApi";
import { TVideo } from "@/types";

export interface DashboardState {
    channelName: string | undefined;
    channel:
        | {
              id: string;
              name: string;
              username: string;
              image: string;
              subscribers: number;
          }
        | undefined;
    isSubscribed: boolean;
    videos: TVideo[];
}

const initialState: DashboardState = {
    channelName: undefined,
    channel: undefined,
    isSubscribed: false,
    videos: [],
};

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        setChannelName: (state, action) => {
            state.channelName = action.payload;
        },

        setChannelInfo: (state, action) => {
            state.channel = action.payload.channel;
            state.isSubscribed = action.payload.isSubscribed;
            state.videos = action.payload.videos;
        },

        resetChannel: (state) => {
            state.channelName = undefined;
            state.channel = undefined;
            state.isSubscribed = false;
            state.videos = [];
        },
    },

    extraReducers: (builder) => {
        builder.addCase(getChannelInfo.fulfilled, (state, action) => {
            state.channel = action.payload.channel;
            state.isSubscribed = action.payload.isSubscribed;
            state.videos = action.payload.videos;
        });

        builder.addCase(toggleSubscription.fulfilled, (state) => {
            state.isSubscribed = !state.isSubscribed;
            state.channel!.subscribers += state.isSubscribed ? 1 : -1;
        });
    },
});

export const { setChannelName, setChannelInfo, resetChannel } =
    dashboardSlice.actions;

export default dashboardSlice.reducer;
