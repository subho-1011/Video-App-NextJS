import axios, { isAxiosError } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getChannelInfo = createAsyncThunk(
    "dashboard/getChannelInfo",
    async (username: string) => {
        try {
            const response = await axios.get(
                `/api/dashboard/channels/${username}`
            );

            console.log(response.data);
            return response.data.data;
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(
                    error.response?.data.error || "Failed to fetch channel info"
                );
            }
        }
    }
);

export const toggleSubscription = createAsyncThunk(
    "dashboard/toggleSubscription",
    async (channelId: string) => {
        try {
            const response = await axios.post(
                `/api/subscriptions/toggle-subscription?c=${channelId}`
            );

            return response.data.data;
        } catch (error) {
            if (isAxiosError(error)) {
                throw new Error(
                    error.response?.data.error ||
                        "Failed to toggle subscription"
                );
            }
        }
    }
);
