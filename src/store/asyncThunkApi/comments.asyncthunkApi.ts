import axios, { isAxiosError } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchVideoComments = createAsyncThunk(
    "comments/fetchVideoComments",
    async ({ videoId, limit, offset }: { videoId: string; limit?: number; offset?: number }) => {
        try {
            const response = await axios.get(`/api/videos/${videoId}/comments?limit=${limit}&offset=${offset}`);

            console.log("fetchVideoComments: ", response.data.data);

            return response.data.data;
        } catch (error) {
            if (isAxiosError(error)) {
                console.log("ERROR :: Video Comments asyncThunkApi: ", error.response?.data);
                throw new Error(error.response?.data.error || "Failed to fetch comments");
            }
        }
    }
);

export const fetchToggleCommentLike = createAsyncThunk(
    "comments/fetchToggleCommentLike",
    async ({ commentId }: { commentId: string }) => {
        try {
            const response = await axios.post(`/api/comments/${commentId}/toggle-like`);
            console.log("fetchToggleCommentLike: ", response.data.data);

            return response.data.data;
        } catch (error) {
            if (isAxiosError(error)) {
                console.log("ERROR :: Video Comments asyncThunkApi: ", error.response?.data);
                throw new Error(error.response?.data.error || "Failed to toggle comment like");
            }
        }
    }
);

export const addComment = createAsyncThunk(
    "comments/addComment",
    async ({ text, videoId }: { text: string; videoId: string }) => {
        try {
            const response = await axios.post(`/api/videos/${videoId}/comments/add-comment`, { text });

            return response.data.data;
        } catch (error) {
            if (isAxiosError(error)) {
                console.log("ERROR :: Video Comments asyncThunkApi: ", error.response?.data);
                throw new Error(error.response?.data.error || "Failed to add comment");
            }
        }
    }
);

export const addReplyComment = createAsyncThunk(
    "comments/addReplyComment",
    async ({ text, commentId }: { text: string; commentId: string }) => {
        try {
            const response = await axios.post(`/api/comments/${commentId}/add-reply`, { text });

            return response.data.data;
        } catch (error) {
            if (isAxiosError(error)) {
                console.log("ERROR :: Video Comments asyncThunkApi: ", error.response?.data);
                throw new Error(error.response?.data.error || "Failed to add reply comment");
            }
        }
    }
);
